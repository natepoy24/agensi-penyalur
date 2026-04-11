import fs from 'fs';
import { google } from 'googleapis';

// Menggunakan metode GoogleAuth modern yang jauh lebih stabil
const auth = new google.auth.GoogleAuth({
  keyFile: 'C:\\Users\\Laptop kantor 1\\Documents\\agensi-penyalur\\gsc bot.json',
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly', 'https://www.googleapis.com/auth/webmasters'],
});

async function run() {
  console.log("Mencoba otentikasi GSC dengan metode GoogleAuth modern...");
  
  try {
    const authClient = await auth.getClient();
    google.options({ auth: authClient }); // Set global auth
    console.log("Otentikasi berhasil! Token didapatkan.");
    
    const searchconsole = google.searchconsole({ version: 'v1' });
    
    // Cek daftar situs yang benar-benar ada di akun Service Account ini
    const sites = await searchconsole.sites.list();
    console.log("\n=== Daftar properti web yang terhubung dengan Bot JSON ini: ===");
    if (!sites.data.siteEntry || sites.data.siteEntry.length === 0) {
      console.log("KOSONG. Bot ini belum ditambahkan ke Webmasters GSC manapun!");
      return;
    }
    console.table(sites.data.siteEntry.map(s => s.siteUrl));

    // Coba ambil data dari situs pertama yang terdaftar
    const verifiedUrl = sites.data.siteEntry[0].siteUrl;
    console.log(`\nMengambil performa pencarian untuk: ${verifiedUrl}...`);
    
    const res = await searchconsole.searchanalytics.query({
      siteUrl: verifiedUrl,
      requestBody: {
        startDate: '2024-01-01',
        endDate: '2026-04-10',
        dimensions: ['query'],
        rowLimit: 10,
      },
    });
    
    console.log(`\n=== GSC RESULTS ===`);
    if(res.data.rows && res.data.rows.length > 0) {
      console.table(res.data.rows);
    } else {
      console.log("Tidak ada data keyword yang ditemukan.");
    }
    
  } catch (err) {
    console.error("\nGAGAL:", err.message);
  }
}

run();
