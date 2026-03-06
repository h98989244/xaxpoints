import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Product, Category } from '../types'

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  async function fetchProducts() {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')
    setProducts(data ?? [])
    setLoading(false)
  }

  async function fetchCategories() {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')
    setCategories(data ?? [])
  }

  async function fetchProductById(id: string) {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    return data as Product | null
  }

  async function fetchProductsByCategory(categorySlug: string) {
    const { data } = await supabase
      .from('products')
      .select('*, categories!inner(slug)')
      .eq('categories.slug', categorySlug)
      .eq('is_active', true)
      .order('sort_order')
    return (data ?? []) as Product[]
  }

  return { products, categories, loading, fetchProductById, fetchProductsByCategory }
}
