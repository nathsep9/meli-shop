import React, { useEffect, useState } from 'react';

import { Product } from './types/product';
import { MainContainer } from './components/MainContainer';
import Navbar from './components/Navbar';
import { PAGE_SIZE } from './constants';

import './styles/global.scss';

interface AppProps {
  products?: Product[];
  productDetail?: Product;
  currentRoute: 'list' | 'detail';
}

export const App: React.FC<AppProps> = ({ products = [], productDetail, currentRoute }) => {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const paginatedProducts = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const [allProducts, setAllProducts] = useState<Product[]>(products);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const preloadedData = (window as any).__PRELOADED_DATA__;
      if (preloadedData?.products) {
        setAllProducts(preloadedData.products);
      }
    }
  }, []);
  useEffect(() => {
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navEntry?.type === 'reload') {
      const params = new URLSearchParams(window.location.search);
      if (params.has('search')) {
        params.delete('search');
        const newParams = params.toString();
        const newUrl = newParams
          ? `${window.location.pathname}?${newParams}`
          : window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      }
      setSearch('');
      setFiltered([]);
    }
  }, []);

  const handleSearch = (value: string) => {
  setSearch(value);
  const params = new URLSearchParams(window.location.search);

  if (value.trim() === '') {
    params.delete('search');
    params.delete('page');
    const newParams = params.toString();
    const newUrl = newParams
      ? `${window.location.pathname}?${newParams}`
      : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
    document.title = 'Meli Shop'; 
    setFiltered([]);
  } else {
    params.set('search', value);
    params.delete('page');
    window.history.replaceState({}, '', `?${params.toString()}`);
    document.title = `${value} - Meli Shop`;
    setFiltered(allProducts.filter((p) => p.title.toLowerCase().includes(value.toLowerCase())));
  }
};
  return (
    <div className="app">
      <header>
        <Navbar onSearch={handleSearch} />
      </header>
      <MainContainer
        currentRoute={currentRoute}
        search={search}
        paginatedProducts={paginatedProducts}
        totalPages={totalPages}
        productDetail={productDetail}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};
