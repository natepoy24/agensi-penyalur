// src/app/api/invoice/route.ts
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('invoices')
    .select(`
      *,
      payment_methods (
        bank_name,
        account_name,
        account_number
      )
    `)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const {
    invoice_number,
    invoice_date,
    due_date,
    customer_name,
    customer_address,
    item_type,
    worker_name,
    price,
    ongkos_kirim = 0,
    custom_items = [],
    total,
    payment_method_id,
  } = body;

  if (!invoice_number || !invoice_date || !customer_name || !customer_address || !item_type || !worker_name || !price) {
    return NextResponse.json({ error: 'Field wajib tidak lengkap' }, { status: 400 });
  }

  const adminPrice = Number(price);
  const ongkir = Number(ongkos_kirim || 0);
  const customItemsList = Array.isArray(custom_items) ? custom_items : [];
  const customTotal = customItemsList.reduce((s: number, ci: any) => s + (Number(ci.price) || 0), 0);
  const grandTotal = Number(total || (adminPrice + ongkir + customTotal));

  // Simpan metadata item ke item_type sebagai fallback aman bila kolom khusus belum ada
  const cleanItemType = String(item_type).split('|||')[0].trim();
  const metaObj = {
    price: adminPrice,
    ongkos_kirim: ongkir,
    custom_items: customItemsList,
  };
  const storedItemType = (ongkir > 0 || customItemsList.length > 0)
    ? `${cleanItemType}|||${JSON.stringify(metaObj)}`
    : cleanItemType;

  // Coba insert dengan kolom khusus (bila migration sql sudah dijalankan di Supabase)
  const fullPayload = {
    invoice_number,
    invoice_date,
    due_date,
    customer_name,
    customer_address,
    item_type: storedItemType,
    worker_name,
    price: adminPrice,
    subtotal: adminPrice,
    total: grandTotal,
    payment_method_id: payment_method_id || null,
    ongkos_kirim: ongkir,
    custom_items: customItemsList,
  };

  let { data, error } = await supabase
    .from('invoices')
    .insert([fullPayload])
    .select()
    .single();

  // Jika kolom ongkos_kirim atau custom_items belum dibuat (code 42703), insert dengan payload standar
  if (error && error.code === '42703') {
    const fallbackPayload = {
      invoice_number,
      invoice_date,
      due_date,
      customer_name,
      customer_address,
      item_type: storedItemType,
      worker_name,
      price: adminPrice,
      subtotal: adminPrice,
      total: grandTotal,
      payment_method_id: payment_method_id || null,
    };
    const fallbackRes = await supabase.from('invoices').insert([fallbackPayload]).select().single();
    data = fallbackRes.data;
    error = fallbackRes.error;
  }

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID tidak ditemukan' }, { status: 400 });

  const { error } = await supabase.from('invoices').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
