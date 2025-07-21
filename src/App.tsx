import React, { useState } from 'react';

import { Product } from '@/types/product';
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


  const handleSearch = (value: string) => {
    setSearch(value);
    if (value.trim() === '') {
      setFiltered([]);
    } else {
      setFiltered(products.filter((p) => p.title.toLowerCase().includes(value.toLowerCase())));
    }
  };
  
  const paginatedProducts = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
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
      />
    </div>
  );
};
