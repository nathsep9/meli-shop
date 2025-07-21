import { ProductCardProps } from './types';

import styles from './ProductCard.module.scss';

const ProductCard = ({ product }: ProductCardProps) => (
  <a href={`/product/${product.id}`} className={styles.rootProductCard}>
    <div className={styles.card}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <div className={styles.info}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.price}>${product.price.toLocaleString()}</p>
        <p className={styles.installments}>
          Mismo precio en 9 cuotas de <span>${(product.price / 9).toFixed(2)}</span>
        </p>
        <p className={styles.shipping}>Envío gratis</p>
      </div>
    </div>
    <hr className={styles.separator} />
  </a>
);

export default ProductCard;
