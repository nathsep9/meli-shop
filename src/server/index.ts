import { Product } from '@/types/product';
import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from '../App';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '../public')));
app.use('/static', express.static(path.join(__dirname, 'public')));

const productCache = new Map<string, Product>();
let productListCache: Product[] | null = null;

function getAssetFilenames() {
  try {
    const publicDir = path.join(__dirname, 'public');
    const files = fs.readdirSync(publicDir);
    const cssFile = files.find(file => file.startsWith('styles.') && file.endsWith('.css'));
    const jsFile = files.find(file => file.startsWith('bundle.') && file.endsWith('.js'));
    return {
      css: cssFile ? `/static/${cssFile}` : '/static/styles.css',
      js: jsFile ? `/static/${jsFile}` : '/static/bundle.js'
    };
  } catch (error) {
    return {
      css: '/static/styles.css',
      js: '/static/bundle.js'
    };
  }
}

function getHtmlTemplate(content: string, title: string = 'Productos SSR', preloadedData?: any): string {
  const assets = getAssetFilenames();
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <link rel="stylesheet" href="${assets.css}">
    </head>
    <body>
      <div id="root">${content}</div>
      ${preloadedData ? `<script>window.__PRELOADED_DATA__ = ${JSON.stringify(preloadedData)};</script>` : ''}
      <script src="${assets.js}"></script>
    </body>
    </html>
  `;
}

async function loadProductData(): Promise<Product[]> {
  if (productListCache) return productListCache;
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products: Product[] = await response.json();
    products.forEach(product => productCache.set(product.id.toString(), product));
    productListCache = products;
    return products;
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

app.get('/', async (req, res) => {
  try {
    const products = await loadProductData();
    const appProps = { products, currentRoute: 'list' as const, pageType: 'list' as const };
    const reactContent = renderToString(React.createElement(App, appProps));
    const html = getHtmlTemplate(reactContent, 'Productos SSR', appProps);
    res.send(html);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.get('/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let product = productCache.get(id);
    if (!product) {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      product = await response.json();
      if (product && product.id) {
        productCache.set(id, product);
      }
    }
    if (!product || !product.id) return res.status(404).send('Producto no encontrado');
    const appProps = { productDetail: product, currentRoute: 'detail' as const, pageType: 'detail' as const };
    const reactContent = renderToString(React.createElement(App, appProps));
    const html = getHtmlTemplate(reactContent, `${product.title} - Productos SSR`, appProps);
    res.send(html);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await loadProductData();
    res.json({ products, currentRoute: 'list' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let product = productCache.get(id);

    if (!product) {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      product = await response.json();
      if (product && product.id) {
        productCache.set(id, product);
      } else {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
    }

    res.json({ productDetail: product, currentRoute: 'detail' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('*', (req, res) => {
  const notFoundContent = renderToString(
    React.createElement('div', { style: { padding: '40px', textAlign: 'center' } }, [
      React.createElement('h1', { key: 'title' }, '404 - Página no encontrada'),
      React.createElement('a', { key: 'home', href: '/', style: { color: '#1976d2', textDecoration: 'none' } }, '← Volver al inicio'),
    ])
  );
  const html = getHtmlTemplate(notFoundContent, '404 - Productos SSR');
  res.status(404).send(html);
});

app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  await loadProductData();
  console.log('✅ Product data preloaded successfully!');
});

export default app;