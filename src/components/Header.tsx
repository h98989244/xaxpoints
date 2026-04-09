import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Crown, LogOut, Package, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export default function Header() {
  const { user, signOut, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#1A1A2E]/95 backdrop-blur-md border-b border-[#C9A84C]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Crown className="w-7 h-7 text-[#C9A84C]" />
            <span className="text-xl font-bold text-[#C9A84C]">佐和點數王</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-[#C9A84C] transition-colors font-medium"
            >
              首頁
            </Link>
            <Link
              to="/products"
              className="text-gray-300 hover:text-[#C9A84C] transition-colors font-medium"
            >
              商品列表
            </Link>
          </nav>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-300 hover:text-[#C9A84C] transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C9A84C] text-[#1A1A2E] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 text-gray-300 hover:text-[#C9A84C] transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">{user.display_name}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#1E2A3A] border border-[#C9A84C]/20 rounded-lg shadow-xl overflow-hidden">
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-[#253448] hover:text-[#C9A84C] transition-colors"
                      >
                        <Crown className="w-4 h-4" />
                        管理後台
                      </Link>
                    )}
                    <Link
                      to="/orders"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-[#253448] hover:text-[#C9A84C] transition-colors"
                    >
                      <Package className="w-4 h-4" />
                      我的訂單
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-300 hover:bg-[#253448] hover:text-red-400 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      登出
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm text-gray-300 hover:text-[#C9A84C] transition-colors font-medium"
                >
                  登入
                </Link>
                <Link
                  to="/register"
                  className="btn-gold text-sm px-4 py-2 rounded-lg"
                >
                  註冊
                </Link>
              </div>
            )}
          </div>

          {/* Mobile buttons */}
          <div className="flex md:hidden items-center gap-3">
            <Link to="/cart" className="relative p-2 text-gray-300 hover:text-[#C9A84C]">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C9A84C] text-[#1A1A2E] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-gray-300 hover:text-[#C9A84C]"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#16213E] border-t border-[#C9A84C]/20">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="block text-gray-300 hover:text-[#C9A84C] transition-colors font-medium py-2"
            >
              首頁
            </Link>
            <Link
              to="/products"
              onClick={() => setMobileOpen(false)}
              className="block text-gray-300 hover:text-[#C9A84C] transition-colors font-medium py-2"
            >
              商品列表
            </Link>
            <hr className="border-[#C9A84C]/10" />
            {user ? (
              <>
                <div className="text-sm text-[#C9A84C] font-medium py-2">
                  {user.display_name}
                </div>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 text-gray-300 hover:text-[#C9A84C] py-2"
                  >
                    <Crown className="w-4 h-4" />
                    管理後台
                  </Link>
                )}
                <Link
                  to="/orders"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-gray-300 hover:text-[#C9A84C] py-2"
                >
                  <Package className="w-4 h-4" />
                  我的訂單
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-2 text-gray-300 hover:text-red-400 py-2"
                >
                  <LogOut className="w-4 h-4" />
                  登出
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3 py-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-300 hover:text-[#C9A84C] font-medium"
                >
                  登入
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="btn-gold text-sm px-4 py-2 rounded-lg"
                >
                  註冊
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
