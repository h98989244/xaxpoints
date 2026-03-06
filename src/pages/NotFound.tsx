
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="max-w-md mx-auto px-4 py-24 text-center">
        <span className="material-symbols-outlined text-8xl text-slate-400 mb-6">search_off</span>
        <h1 className="text-5xl font-black mb-4">404</h1>
        <p className="text-xl text-slate-500 mb-8">找不到您要的頁面</p>
        <a href="/" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold transition-all">
          返回首頁
        </a>
      </main>
      <Footer />
    </>
  )
}
