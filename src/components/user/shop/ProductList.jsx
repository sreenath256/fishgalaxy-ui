import React from 'react';
import ProductCard from '../../products/ProductCard';
import Skeleton from 'react-loading-skeleton';

const ProductList = ({ products, loading, lastProductRef, resetFilters }) => {
  // Show skeleton loaders when loading and no products exist yet
  if (loading && products.length === 0) {
    return (
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-3'>
        {Array.from({ length: 12 }).map((_, idx) => (
          <Skeleton key={idx} className="h-64 w-full" />
        ))}
      </div>
    );
  }

  // Show empty state when no products found (and not loading)
  if (products.length === 0 && !loading) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm text-center">
        <h3 className="text-lg font-medium text-gray-700 mb-2">No products found</h3>
        <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
        <button
          onClick={resetFilters}
          className="mt-4 text-mainclr hover:text-mainhvr font-medium"
        >
          Reset all filters
        </button>
      </div>
    );
  }

  // Show products (with loading indicator at bottom if loading more)
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {/* Render actual products */}
      {products.map((product, index) => {
        const isLast = index === products.length - 1;
        return (
          <div key={product._id} ref={isLast ? lastProductRef : null}>
            <ProductCard product={product} isLatestProduct={product.isLatestProduct} isOfferProduct={product.isOfferProduct} />
          </div>
        );
      })}

      {/* Render skeleton loaders in the same grid */}
      {loading &&
        Array.from({ length: 8 }).map((_, idx) => (
          <Skeleton key={`skeleton-${idx}`} className="h-64 w-full" />
        ))
      }
    </div>
  );
};

export default ProductList;