import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import type { Product } from '../lib/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const discount = product.price < product.denomination;
  const discountPercent = discount
    ? Math.round((1 - product.price / product.denomination) * 100)
    : 0;

  return (
    <div className="card overflow-hidden group flex flex-col">
      {/* Image / Placeholder */}
      <Link to={`/products/${product.id}`} className="block">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-[#C9A84C] to-[#A68A3E] flex items-center justify-center group-hover:from-[#E8D48B] group-hover:to-[#C9A84C] transition-all duration-300">
            <div className="text-center">
              <div className="text-[#1A1A2E] text-3xl font-bold">
                NT${product.denomination.toLocaleString()}
              </div>
              <div className="text-[#1A1A2E]/70 text-sm mt-1">點數卡</div>
            </div>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-white font-semibold text-lg hover:text-[#C9A84C] transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-400 text-sm mt-1">
          面額 NT${product.denomination.toLocaleString()}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#C9A84C] text-xl font-bold">
              NT${product.price.toLocaleString()}
            </span>
            {discount && (
              <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-0.5 rounded-full">
                -{discountPercent}%
              </span>
            )}
          </div>
          <button
            onClick={() => addItem(product)}
            className="btn-gold flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            加入購物車
          </button>
        </div>
      </div>
    </div>
  );
}
