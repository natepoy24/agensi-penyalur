// src/app/api/payment-methods/route.ts
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('payment_methods')
    .select('*')
    .order('is_default', { ascending: false })
    .order('created_at', { ascending: true });

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
  const { bank_name, account_name, account_number } = body;

  if (!bank_name || !account_name || !account_number) {
    return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('payment_methods')
    .insert([{ bank_name, account_name, account_number, is_default: false }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
