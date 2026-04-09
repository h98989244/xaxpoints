import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Shield, Tag, ArrowRight } from 'lucide-react';
import { api } from '../lib/api';
import type { Product } from '../lib/types';
import ProductCard from '../components/ProductCard';

export default function Home() {
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
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#1A1A2E]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A84C] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#C9A84C] rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <img src="/logo.png" alt="佐和點數王" className="w-24 h-24 sm:w-32 sm:h-32 object-contain mx-auto mb-6 drop-shadow-[0_0_30px_rgba(201,168,76,0.3)]" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            <span className="text-[#C9A84C]">佐和</span>點數王
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
            最安全快速的點數卡購買平台
          </p>
          <Link
            to="/products"
            className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg"
          >
            立即選購
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">熱門商品</h2>
          <p className="text-gray-400">精選熱門點數卡，優惠價格等你來搶</p>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
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
          <p className="text-center text-gray-400 py-12">目前沒有商品</p>
        )}
        {products.length > 0 && (
          <div className="text-center mt-10">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-[#E8D48B] font-medium transition-colors"
            >
              查看所有商品
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#16213E]/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">為什麼選擇我們</h2>
            <p className="text-gray-400">值得信賴的點數卡購買平台</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: '快速出貨',
                desc: '付款確認後即時發送點數卡序號，不需漫長等待。',
              },
              {
                icon: Shield,
                title: '安全保障',
                desc: '全程加密交易，保護您的個人資訊與付款安全。',
              },
              {
                icon: Tag,
                title: '優惠價格',
                desc: '批量採購優勢，提供市場最具競爭力的價格。',
              },
            ].map((item) => (
              <div key={item.title} className="card p-8 text-center">
                <div className="w-16 h-16 bg-[#C9A84C]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-[#C9A84C]" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="card p-10 sm:p-14 text-center bg-gradient-to-br from-[#1E2A3A] to-[#16213E]">
          <h2 className="text-3xl font-bold text-white mb-4">立即開始購買</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            註冊帳號即可享受快速、安全的點數卡購買服務
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="btn-gold px-8 py-3 rounded-xl font-medium">
              免費註冊
            </Link>
            <Link
              to="/track"
              className="border border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C]/10 px-8 py-3 rounded-xl font-medium transition-colors"
            >
              訂單查詢
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
