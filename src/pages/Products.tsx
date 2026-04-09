import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import type { Product } from '../lib/types';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getProducts()
      .then((data) => setProducts(data.products.filter((p) => p.is_active)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">所有商品</h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card p-4 animate-pulse">
              <div className="w-full h-48 bg-[#253448] rounded-lg mb-4" />
              <div className="h-5 bg-[#253448] rounded w-3/4 mb-2" />
              <div className="h-4 bg-[#253448] rounded w-1/2 mb-4" />
              <div className="h-10 bg-[#253448] rounded" />
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">目前沒有可購買的商品</p>
        </div>
      )}
    </div>
  );
}
