<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { products } from '@/data/products'

const route = useRoute()

// 1. Creiamo una proprietà computata che filtra i prodotti in base alla ricerca
const filteredProducts = computed(() => {
  const searchTerm = route.query.category?.toLowerCase() || ''
  
  if (!searchTerm) {
    return products // Se non c'è ricerca, mostra tutto
  }

  // Filtra per nome o descrizione
  return products.filter(p => 
    p.name.toLowerCase().includes(searchTerm) || 
    p.description.toLowerCase().includes(searchTerm)
  )
})

// 2. Controllo se la ricerca ha prodotto risultati
const hasResults = computed(() => filteredProducts.value.length > 0)

// 3. Se non ci sono risultati, mostro i "Consigliati" (prodotti di esempio in data/products)
const displayProducts = computed(() => {
  return hasResults.value ? filteredProducts.value : products
})
</script>

<template>
  <div class="p-8">
    
    <div class="mb-6">
      <h1 v-if="!route.query.category" class="text-3xl font-bold">I Nostri Prodotti</h1>
      
      <div v-else>
        <h1 v-if="hasResults" class="text-3xl font-bold">
          Risultati per "<span class="text-primary">{{ route.query.category }}</span>"
        </h1>
        <div v-else>
          <h1 class="text-3xl font-bold text-error mb-2">Nessun risultato trovato</h1>
          <p class="text-lg opacity-70">
            Non abbiamo trovato nulla per "{{ route.query.category }}".<br>
            <span class="font-bold text-base-content mt-2 block">Noi ti consigliamo:</span>
          </p>
        </div>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <div v-for="product in displayProducts" :key="product.id" class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
        <div class="card-body">
            <h2 class="card-title text-lg">
                {{ product.name }}
                <div v-if="!hasResults && route.query.q" class="badge badge-accent text-xs">Consigliato</div>
            </h2>
            
            <div class="flex items-center gap-2 mt-1 mb-2">
                <div class="avatar">
                <div class="w-6 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                    <img :src="product.owner.avatar" alt="Avatar Owner" />
                </div>
                </div>
                <span class="text-xs text-base-content/70">
                Di <span class="font-bold">{{ product.owner.name }}</span>
                </span>
                <span class="text-xs text-warning flex items-center">
                ★ {{ product.owner.rating }}
                </span>
            </div>
            <p class="truncate text-sm">{{ product.description }}</p>
            
            <div class="flex justify-between items-center mt-4">
                <div class="flex flex-col">
                <span class="text-xs opacity-70">Prezzo al giorno</span>
                <span class="text-xl font-bold text-primary">€ {{ product.price.toFixed(2) }}</span>
                </div>
                
                <RouterLink 
                :to="{ name: 'product-detail', params: { id: product.id } }" 
                class="btn btn-sm btn-primary"
                >
                Vedi
                </RouterLink>
            </div>

            </div>
      </div>

    </div>
  </div>
</template>