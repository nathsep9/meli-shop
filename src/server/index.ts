import { Product } from '@/types/product';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from '../App';

dotenv.config();

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
    const cssFile = files.find((file) => file.startsWith('styles.') && file.endsWith('.css'));
    const jsFile = files.find((file) => file.startsWith('bundle.') && file.endsWith('.js'));
    return {
      css: cssFile ? `/static/${cssFile}` : '/static/styles.css',
      js: jsFile ? `/static/${jsFile}` : '/static/bundle.js',
    };
  } catch (error) {
    return {
      css: '/static/styles.css',
      js: '/static/bundle.js',
    };
  }
}

function getHtmlTemplate(content: string, title: string = 'Products', preloadedData?: any): string {
  const assets = getAssetFilenames();
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="${assets.css}">
     <link rel="icon" type="image/x-icon" href="/favicon.svg">

      <title>Meli Shop - Tu tienda de productos online</title>
    <meta
      name="description"
      content="Meli Shop: Búsqueda, detalle y compra de productos con React, TypeScript y SSR. Moderno, rápido y responsivo."
    />
    <meta property="og:title" content="Meli Shop - Tu tienda de productos online" />
    <meta
      property="og:description"
      content="Explora y busca productos, consulta detalles y disfruta de una experiencia moderna y rápida en Meli Shop."
    />
    <meta property="og:type" content="website" />
   <meta property="og:url" content="https://meli-shop.vercel.app/" />
    <meta property="og:image" content="https://meli-shop.vercel.app/logo.png" />
    <meta property="og:locale" content="es_CO" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Meli Shop - Tu tienda de productos online" />
    <meta
      name="twitter:description"
      content="Explora y busca productos, consulta detalles y disfruta de una experiencia moderna y rápida en Meli Shop."
    />
    <meta name="twitter:image" content="http://localhost:3000/logo.png" />
    <meta name="author" content="Angie Natalia Antonio" />
    <meta name="copyright" content="Angie Natalia Antonio" />
    <link rel="icon" type="image/png" href="/logo.png" />
    </head>
    <body>
      <div id="root">${content}</div>
      ${
        preloadedData
          ? `<script>window.__PRELOADED_DATA__ = ${JSON.stringify(preloadedData)};</script>`
          : ''
      }
      <script src="${assets.js}"></script>
    </body>
    </html>
  `;
}

async function loadProductData(): Promise<Product[]> {
  if (productListCache) return productListCache;
  try {
    const response = await fetch(process.env.FAKESTORE_API as string);
    const products: Product[] = await response.json();
    products.forEach((product) => productCache.set(product.id.toString(), product));
    productListCache = products;
    return products;
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

app.get('/', async (req, res) => {
  try {
    const searchQuery = (req.query.search as string)?.toLowerCase() || '';
    const allProducts = await loadProductData();
    const filteredProducts = searchQuery
      ? allProducts.filter((p) => p.title.toLowerCase().includes(searchQuery))
      : allProducts;

    const appProps = {
      products: filteredProducts,
      currentRoute: 'list' as const,
      pageType: 'list' as const,
    };

    const reactContent = renderToString(React.createElement(App, appProps));
    const title = searchQuery ? `${searchQuery} - Meli Shop` : 'Meli Shop';
    const html = getHtmlTemplate(reactContent, title, appProps);
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
      const response = await fetch(`${process.env.FAKESTORE_API}/${id}`);
      product = await response.json();
      if (product && product.id) {
        productCache.set(id, product);
      }
    }
    if (!product || !product.id) return res.status(404).send('Producto no encontrado');
    const appProps = {
      productDetail: product,
      currentRoute: 'detail' as const,
      pageType: 'detail' as const,
    };
    const reactContent = renderToString(React.createElement(App, appProps));
    const html = getHtmlTemplate(reactContent, `${product.title} - Productos SSR2`, appProps);
    res.send(html);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});
/**
 * NOTA SOBRE LA PAGINACIÓN:
 * Actualmente, la paginación se realiza en el frontend trayendo todos los productos desde la API,
 * y luego filtrando y mostrando los resultados de 10 en 10 según la búsqueda realizada.
 * No se implementó paginación a través de query params en el endpoint porque la API utilizada
 * no soporta parámetros de paginación ni filtrado por query.
 */
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
      const response = await fetch(`${process.env.FAKESTORE_API}/${id}`);
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
      React.createElement(
        'a',
        { key: 'home', href: '/', style: { color: '#1976d2', textDecoration: 'none' } },
        '← Volver al inicio'
      ),
    ])
  );
  const html = getHtmlTemplate(notFoundContent, '404 - Productos SSR');
  res.status(404).send(html);
});

app.listen(PORT, async () => {
  console.log(`✅ Servidor iniciado correctamente en http://localhost:${PORT}`);
  await loadProductData();
});

export default app;
