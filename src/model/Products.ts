export interface ProductDimensions {
  width: number
  height: number
  depth: number
}

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  dimensions: ProductDimensions
}

export interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
}