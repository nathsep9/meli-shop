import ProductDetail from '../ProductDetail';
import ProductList from '../ProductList/ProductList';
import { MainContainerProps } from './types';

export const MainContainer = ({
  currentRoute,
  search,
  paginatedProducts,
  totalPages,
  productDetail,
  page,
  setPage,
}: MainContainerProps ) => {
  return (
    <main className="app__main">
      {currentRoute === 'list' && search.trim() !== '' && (
        <>
          <ProductList products={paginatedProducts} />
          {totalPages > 1 && (
            <nav className="pagination" aria-label="Paginación de productos">
              <button
                className="pagination__arrow"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                &lt; Anterior
              </button>
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx + 1}
                  className={`pagination__page${
                    page === idx + 1 ? ' pagination__page--active' : ''
                  }`}
                  onClick={() => setPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                className="pagination__arrow"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Siguiente &gt;
              </button>
            </nav>
          )}
        </>
      )}

      {currentRoute === 'detail' && productDetail && (
        <div className="app__detail">
          <ProductDetail product={productDetail} />
        </div>
      )}
    </main>
  );
};
