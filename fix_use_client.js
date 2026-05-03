const fs = require('fs');

const files = [
  'src/app/artikel/page.tsx', 
  'src/app/kontak/KontakContent.tsx', 
  'src/app/layanan/art/page.tsx', 
  'src/app/layanan/baby-sitter/page.tsx', 
  'src/app/layanan/page.tsx', 
  'src/app/layanan/perawat-lansia/page.tsx', 
  'src/app/lowongan-kerja/page.tsx', 
  'src/app/pekerja/page.tsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('"use client"')) {
    content = content.replace(/"use client";?\r?\n?/g, '');
    content = '"use client";\n' + content;
    fs.writeFileSync(file, content);
    console.log('Fixed ' + file);
  } else if (content.includes("'use client'")) {
    content = content.replace(/'use client';?\r?\n?/g, '');
    content = '"use client";\n' + content;
    fs.writeFileSync(file, content);
    console.log('Fixed ' + file);
  }
});
