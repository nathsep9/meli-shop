#!/usr/bin/env node

// Script de build para Vercel
const fs = require('fs');
const path = require('path');

console.log('🔥 Ejecutando build para Vercel...');

// Actualizar sitemap con URL de producción
const baseUrl = 'https://meli-shop-flouo6y5d-naliaab1809s-projects.vercel.app';
const currentDate = new Date().toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/api/products</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
${Array.from({ length: 20 }, (_, i) => i + 1).map(id => `  <url>
    <loc>${baseUrl}/product/${id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/api/products/${id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`).join('\n')}
</urlset>`;

// Escribir sitemap para producción
try {
  fs.writeFileSync('sitemap.xml', sitemap, 'utf8');
  fs.writeFileSync(path.join('public', 'sitemap.xml'), sitemap, 'utf8');
  console.log('✅ Sitemap de producción generado');
} catch (error) {
  console.log('⚠️ Error generando sitemap:', error.message);
}

console.log('✅ Build para Vercel completado');
console.log('🌐 URL de producción:', baseUrl);
console.log('📄 Sitemap disponible en:', baseUrl + '/sitemap.xml');
