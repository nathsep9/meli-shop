import { Product } from '@/types/product';
import NoResultsCard from '../NoResultsCard';
import ProductCard from '../ProductCard';

interface ProductListProps {
  products: Product[];
}

const ProductList= ({ products }: ProductListProps) => (
  <section className="product-list">
    <div className="product-list__list">
      {products.length === 0 ? (
        <div className="product-list__empty">
          <NoResultsCard />
        </div>
      ) : (
        products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  </section>
);


export default ProductList;