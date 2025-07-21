
import ProductGallery from '../ProductGallery';

import './ProductDetail.scss';
import { ProductDetailProps } from './types';



const ProductDetail = ({ product }: ProductDetailProps) => {
  const images = product.image ? [product.image] : [];

  return (
    <div className="product-detail">
      <div className={"product-detail__breadcrumb"}>
     
        <span
          className={"product-detail__back"}
          onClick={() => window.history.back()}
          style={{ cursor: 'pointer', color: '#0070f3' }    }
        >
          Volver al listado
        </span>
        <span className={"product-detail__separator"}>|</span>
        <span className={"product-detail__path"}>{product.title}</span>
      </div>

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
          <span>Descripción</span>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
