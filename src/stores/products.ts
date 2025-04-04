import { defineStore } from 'pinia'
import axios from 'axios'
import type {Product, ProductState} from "@/model/Products.ts";


export const useProductStore = defineStore('products', {
    state: (): ProductState => ({
        products: [],
        loading: false,
        error: null
    }),
    getters: {
        getProductById: (state) => (id: number) => {
            return state.products.find(product => product.id === id)
        },
        getProductsByCategory: (state) => (category: string) => {
            return state.products.filter(product => product.category === category)
        },
        featuredProducts: (state) => {
            return state.products.filter(product => product.rating >= 4.5)
        }
    },
    actions: {
        async fetchProducts() {
            this.loading = true
            this.error = null
            try {
                const response = await axios.get<{ products: Product[] }>('https://dummyjson.com/products')
                this.products = response.data.products
            } catch (error) {
                this.error = error instanceof Error ? error.message : 'Failed to fetch products'
            } finally {
                this.loading = false
            }
        },
    }
})