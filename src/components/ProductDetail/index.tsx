import { Product } from '@/types/product';
import React from 'react';

import ProductGallery from '../ProductGallery';

import './ProductDetail.scss';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const images = product.image ? [product.image] : [];

  return (
    <div className="product-detail">
      <a href="/" className="product-detail__back">
        ← Volver a productos
      </a>

      <div className="product-detail__card">
        <div className="product-detail__main">
          <ProductGallery image={images} altText={product.title} />

          <div className="product-detail__info">
            <p className="product-detail__condition">Nuevo | +100 vendidos</p>
            <h1 className="product-detail__title">{product.title}</h1>
            <p className="product-detail__seller">Por OCEANGREEN ARGENTINA</p>
            <p className="product-detail__price">${product.price.toLocaleString()}</p>
            <p className="product-detail__installments">
              Mismo precio en 9 cuotas de <span>${(product.price / 9).toFixed(2)}</span>
            </p>
            <p className="product-detail__shipping">Envío gratis</p>
            <p className="product-detail__color">
              Color: <strong>Blanco estelar</strong>
            </p>
          </div>
        </div>

        <div className="product-detail__description">
          <h2>Descripción</h2>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
