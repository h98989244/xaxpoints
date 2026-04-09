import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Minus, Plus } from 'lucide-react';
import { api } from '../lib/api';
import type { Product } from '../lib/types';
import { useCart } from '../contexts/CartContext';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!id) return;
    api
      .getProduct(id)
      .then((data) => setProduct(data.product))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const handleAdd = () => {
    if (!product) return;
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 animate-pulse">
        <div className="h-6 bg-[#253448] rounded w-24 mb-8" />
        <div className="grid md:grid-cols-2 gap-10">
          <div className="h-80 bg-[#253448] rounded-xl" />
          <div className="space-y-4">
            <div className="h-8 bg-[#253448] rounded w-3/4" />
            <div className="h-5 bg-[#253448] rounded w-1/2" />
            <div className="h-10 bg-[#253448] rounded w-1/3" />
            <div className="h-20 bg-[#253448] rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-400 text-lg mb-4">找不到此商品</p>
        <Link to="/products" className="text-[#C9A84C] hover:text-[#E8D48B]">
          返回商品列表
        </Link>
      </div>
    );
  }

  const discount = product.price < product.denomination;
  const discountPercent = discount
    ? Math.round((1 - product.price / product.denomination) * 100)
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        to="/products"
        className="inline-flex items-center gap-1 text-gray-400 hover:text-[#C9A84C] transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        返回商品列表
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div>
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-80 object-contain bg-white rounded-xl p-4"
            />
          ) : (
            <div className="w-full h-80 bg-gradient-to-br from-[#C9A84C] to-[#A68A3E] rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-[#1A1A2E] text-4xl font-bold">
                  NT${product.denomination.toLocaleString()}
                </div>
                <div className="text-[#1A1A2E]/70 text-lg mt-2">點數卡</div>
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-3">{product.name}</h1>
          <p className="text-gray-400 text-lg mb-4">
            面額 NT${product.denomination.toLocaleString()}
          </p>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-[#C9A84C] text-3xl font-bold">
              NT${product.price.toLocaleString()}
            </span>
            {discount && (
              <span className="bg-red-500/20 text-red-400 text-sm font-bold px-3 py-1 rounded-full">
                -{discountPercent}%
              </span>
            )}
          </div>

          {product.description && (
            <p className="text-gray-300 leading-relaxed mb-8">{product.description}</p>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-400">數量</span>
            <div className="flex items-center border border-[#C9A84C]/30 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-gray-300 hover:bg-[#253448] transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-5 py-2 text-white font-medium bg-[#1E2A3A] min-w-[48px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-gray-300 hover:bg-[#253448] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Subtotal */}
          <div className="text-gray-400 mb-6">
            小計：
            <span className="text-white font-semibold text-lg ml-2">
              NT${(product.price * quantity).toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleAdd}
            className="btn-gold flex items-center justify-center gap-2 w-full py-3 rounded-xl text-lg"
          >
            <ShoppingCart className="w-5 h-5" />
            {added ? '已加入購物車!' : '加入購物車'}
          </button>
        </div>
      </div>
    </div>
  );
}
