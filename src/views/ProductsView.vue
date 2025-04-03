<template>
  <div class="h-full  justify-center items-center w-full">

    <div v-if="error" class="mt-2 text-red-500">{{ error }}</div>

    <div v-if="products.length" class="mt-6">
      <h2 class="text-xl font-bold mb-4">Products</h2>
      <ul class="space-y-2">
        <li
            v-for="product in products"
            :key="product.id"
            class="p-3 border rounded hover:bg-gray-50"
        >
          <h3 class="font-medium">{{ product.title }}</h3>
          <p class="text-gray-600">${{ product.price }}</p>
        </li>
      </ul>
      <h3 class="text-lg font-bold mt-6 mb-3">Featured Products</h3>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <li
            v-for="product in featuredProducts"
            :key="product.id"
            class="p-4 border bg-blue-200 rounded-md shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="flex justify-between">
            <h3 class="font-medium">{{ product.title }}</h3>
            <span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
              {{ product.rating }} ★
            </span>
          </div>
          <p class="text-gray-500 text-sm mt-1">{{ product.description }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useProductStore } from '@/stores/products'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const productStore = useProductStore()
const { products, loading, error, featuredProducts } = storeToRefs(productStore)
const { fetchProducts } = productStore

onMounted(() => {
 fetchProducts()
})
</script>