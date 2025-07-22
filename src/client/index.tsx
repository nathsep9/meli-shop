import React from 'react';

import { Product } from '@/types/product';
import { hydrateRoot } from 'react-dom/client';
import { App } from '../App';

import '../styles/global.scss';

interface AppProps {
  currentRoute: 'list' | 'detail';
  products?: Product[];
  productDetail?: Product;
}

const preloadedData = (window as any).__PRELOADED_DATA__;

const container = document.getElementById('root');

if (container) {
  if (preloadedData) {
    hydrateRoot(container, React.createElement(App, preloadedData));
  } else {
    fetchAndRender();
  }
} else {
  console.error('Root container not found');
}

async function fetchAndRender() {
  try {
    const path = window.location.pathname;
    let data;

    if (path === '/') {
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();
      data = { currentRoute: 'list', products } as AppProps;
    } else if (path.startsWith('/product/')) {
      const id = path.split('/product/')[1];
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const productDetail = await response.json();
      data = { currentRoute: 'detail', productDetail } as AppProps;
    } else {
      data = { currentRoute: 'list', products: [] } as AppProps;
    }

    if (container) {
      hydrateRoot(container, React.createElement(App, data));
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    if (container) {
      container.innerHTML =
        '<div style="padding: 40px; text-align: center;"><h1>Error loading page</h1><p>Please refresh and try again.</p></div>';
    }
  }
}
