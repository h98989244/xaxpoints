import { useEffect, useState, type FormEvent } from 'react';
import { Plus, Pencil, X } from 'lucide-react';
import { api } from '../../lib/api';
import type { Product } from '../../lib/types';

interface ProductForm {
  name: string;
  denomination: string;
  price: string;
  description: string;
  image_url: string;
  sort_order: string;
  is_active: boolean;
}

const emptyForm: ProductForm = {
  name: '',
  denomination: '',
  price: '',
  description: '',
  image_url: '',
  sort_order: '0',
  is_active: true,
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = () => {
    api
      .getProducts()
      .then((data) => setProducts(data.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError('');
    setShowModal(true);
  };

  const openEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      denomination: String(product.denomination),
      price: String(product.price),
      description: product.description || '',
      image_url: product.image_url || '',
      sort_order: String(product.sort_order),
      is_active: product.is_active,
    });
    setError('');
    setShowModal(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const payload = {
      name: form.name,
      denomination: Number(form.denomination),
      price: Number(form.price),
      description: form.description,
      image_url: form.image_url || null,
      sort_order: Number(form.sort_order),
      is_active: form.is_active,
    };

    try {
      if (editingId) {
        await api.updateProduct(editingId, payload);
      } else {
        await api.createProduct(payload);
      }
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : '操作失敗');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (product: Product) => {
    try {
      await api.updateProduct(product.id, { is_active: !product.is_active });
      fetchProducts();
    } catch {
      // ignore
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">商品管理</h1>
        <button onClick={openCreate} className="btn-gold flex items-center gap-2 px-4 py-2 rounded-lg text-sm">
          <Plus className="w-4 h-4" />
          新增商品
        </button>
      </div>

      {loading ? (
        <div className="card p-6 animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-[#253448] rounded" />
          ))}
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#C9A84C]/10">
                  <th className="text-left text-gray-400 font-medium px-4 py-3">商品名稱</th>
                  <th className="text-left text-gray-400 font-medium px-4 py-3">面額</th>
                  <th className="text-left text-gray-400 font-medium px-4 py-3">售價</th>
                  <th className="text-left text-gray-400 font-medium px-4 py-3">排序</th>
                  <th className="text-left text-gray-400 font-medium px-4 py-3">狀態</th>
                  <th className="text-right text-gray-400 font-medium px-4 py-3">操作</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-[#C9A84C]/5 hover:bg-[#253448]/50">
                    <td className="px-4 py-3 text-white font-medium">{product.name}</td>
                    <td className="px-4 py-3 text-gray-300">NT${product.denomination.toLocaleString()}</td>
                    <td className="px-4 py-3 text-[#C9A84C] font-semibold">NT${product.price.toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-400">{product.sort_order}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleActive(product)}
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full cursor-pointer ${
                          product.is_active
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {product.is_active ? '上架中' : '已下架'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => openEdit(product)}
                        className="text-gray-400 hover:text-[#C9A84C] transition-colors p-1"
                        title="編輯"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                      目前沒有商品
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowModal(false)} />
          <div className="relative bg-[#1E2A3A] border border-[#C9A84C]/20 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {editingId ? '編輯商品' : '新增商品'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-3 mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">商品名稱</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#16213E] border border-[#C9A84C]/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">面額</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={form.denomination}
                    onChange={(e) => setForm({ ...form, denomination: e.target.value })}
                    className="w-full bg-[#16213E] border border-[#C9A84C]/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">售價</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full bg-[#16213E] border border-[#C9A84C]/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">商品描述</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full bg-[#16213E] border border-[#C9A84C]/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#C9A84C] transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">圖片網址</label>
                <input
                  type="url"
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  className="w-full bg-[#16213E] border border-[#C9A84C]/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                  placeholder="https://..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">排序</label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
                    className="w-full bg-[#16213E] border border-[#C9A84C]/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer pb-2.5">
                    <input
                      type="checkbox"
                      checked={form.is_active}
                      onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                      className="accent-[#C9A84C] w-4 h-4"
                    />
                    <span className="text-gray-300 text-sm">上架</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-[#C9A84C]/30 text-gray-300 hover:bg-[#253448] py-2.5 rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 btn-gold py-2.5 rounded-lg disabled:opacity-50"
                >
                  {submitting ? '儲存中...' : '儲存'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
