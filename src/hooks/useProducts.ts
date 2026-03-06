import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { Product, Category } from '../types'

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }
    fetchProducts()
    fetchCategories()
  }, [])

  async function fetchProducts() {
    if (!supabase) return
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')
    setProducts(data ?? [])
    setLoading(false)
  }

  async function fetchCategories() {
    if (!supabase) return
    const { data } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')
    setCategories(data ?? [])
  }

  async function fetchProductById(id: string) {
    if (!supabase) return null
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    return data as Product | null
  }

  const fetchFeaturedProducts = useCallback(async () => {
    if (!supabase) return []
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('sort_order')
      .limit(4)
    return (data ?? []) as Product[]
  }, [])

  const fetchFilteredProducts = useCallback(async (params: {
    categorySlug?: string
    minPrice?: number
    maxPrice?: number
    search?: string
    sortBy?: string
  }) => {
    if (!supabase) return []

    // 先用 slug 查出 category_id
    let categoryId: string | undefined
    if (params.categorySlug && params.categorySlug !== 'all') {
      const { data: cat } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', params.categorySlug)
        .single()
      if (cat) categoryId = cat.id
      else return [] // slug 不存在，直接回空
    }

    let query = supabase
      .from('products')
      .select('*, categories(slug, name)')
      .eq('is_active', true)

    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }
    if (params.minPrice !== undefined) {
      query = query.gte('price', params.minPrice)
    }
    if (params.maxPrice !== undefined) {
      query = query.lte('price', params.maxPrice)
    }
    if (params.search) {
      query = query.ilike('name', `%${params.search}%`)
    }

    switch (params.sortBy) {
      case 'price_asc':
        query = query.order('price', { ascending: true })
        break
      case 'price_desc':
        query = query.order('price', { ascending: false })
        break
      case 'newest':
        query = query.order('created_at', { ascending: false })
        break
      default:
        query = query.order('sort_order')
    }

    const { data } = await query
    return (data ?? []) as Product[]
  }, [])

  // 管理員：取得所有商品（包含未上架）
  async function fetchAllProducts() {
    if (!supabase) return []
    const { data } = await supabase
      .from('products')
      .select('*, categories(name)')
      .order('created_at', { ascending: false })
    return (data ?? []) as Product[]
  }

  // 管理員：新增商品
  async function createProduct(product: Partial<Product>) {
    if (!supabase) return { error: '尚未連接資料庫' }
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single()
    return { data: data as Product | null, error: error?.message }
  }

  // 管理員：更新商品
  async function updateProduct(id: string, updates: Partial<Product>) {
    if (!supabase) return { error: '尚未連接資料庫' }
    const { error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
    return { error: error?.message }
  }

  // 管理員：刪除商品
  async function deleteProduct(id: string) {
    if (!supabase) return { error: '尚未連接資料庫' }
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    return { error: error?.message }
  }

  // 管理員：取得所有分類（包含未啟用）
  async function fetchAllCategories() {
    if (!supabase) return []
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order')
    return (data ?? []) as Category[]
  }

  // 管理員：新增分類
  async function createCategory(category: { name: string; slug: string; icon?: string; sort_order?: number }) {
    if (!supabase) return { error: '尚未連接資料庫' }
    const { data, error } = await supabase
      .from('categories')
      .insert({ ...category, is_active: true })
      .select()
      .single()
    return { data: data as Category | null, error: error?.message }
  }

  // 管理員：更新分類
  async function updateCategory(id: string, updates: Partial<Category>) {
    if (!supabase) return { error: '尚未連接資料庫' }
    const { error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
    return { error: error?.message }
  }

  // 管理員：刪除分類
  async function deleteCategory(id: string) {
    if (!supabase) return { error: '尚未連接資料庫' }
    // 先將使用此分類的商品設為未分類
    await supabase
      .from('products')
      .update({ category_id: null })
      .eq('category_id', id)
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)
    return { error: error?.message }
  }

  return {
    products, categories, loading,
    fetchProducts, fetchCategories, fetchProductById,
    fetchFeaturedProducts, fetchFilteredProducts, fetchAllProducts,
    createProduct, updateProduct, deleteProduct,
    fetchAllCategories, createCategory, updateCategory, deleteCategory,
  }
}
