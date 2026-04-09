import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function Cart() {
  const { items, updateQuantity, removeItem, totalAmount } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-3">購物車是空的</h2>
        <p className="text-gray-400 mb-6">快去看看有什麼好商品吧！</p>
        <Link to="/products" className="btn-gold px-6 py-3 rounded-xl inline-block">
          瀏覽商品
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">購物車</h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="card p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            {/* Image */}
            {item.product.image_url ? (
              <img
                src={item.product.image_url}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-lg shrink-0"
              />
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-[#C9A84C] to-[#A68A3E] rounded-lg flex items-center justify-center shrink-0">
                <span className="text-[#1A1A2E] font-bold text-sm">
                  ${item.product.denomination}
                </span>
              </div>
            )}

            {/* Info */}
            <div className="flex-1 min-w-0">
              <Link
                to={`/products/${item.product.id}`}
                className="text-white font-semibold hover:text-[#C9A84C] transition-colors"
              >
                {item.product.name}
              </Link>
              <p className="text-gray-400 text-sm mt-1">
                NT${item.product.price.toLocaleString()} / 張
              </p>
            </div>

            {/* Quantity */}
            <div className="flex items-center border border-[#C9A84C]/30 rounded-lg overflow-hidden">
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                className="px-3 py-2 text-gray-300 hover:bg-[#253448] transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 text-white font-medium bg-[#1E2A3A] min-w-[40px] text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="px-3 py-2 text-gray-300 hover:bg-[#253448] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Subtotal */}
            <div className="text-[#C9A84C] font-bold text-lg w-28 text-right">
              NT${(item.product.price * item.quantity).toLocaleString()}
            </div>

            {/* Remove */}
            <button
              onClick={() => removeItem(item.product.id)}
              className="text-gray-500 hover:text-red-400 transition-colors p-1"
              title="移除"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-gray-400 text-lg">總計：</span>
          <span className="text-[#C9A84C] text-2xl font-bold ml-2">
            NT${totalAmount.toLocaleString()}
          </span>
        </div>
        <Link
          to="/checkout"
          className="btn-gold px-8 py-3 rounded-xl text-lg w-full sm:w-auto text-center"
        >
          前往結帳
        </Link>
      </div>
    </div>
  );
}
