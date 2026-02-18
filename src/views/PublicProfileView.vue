<script setup>
import { useRoute, RouterLink } from 'vue-router'
import { computed } from 'vue'
import { users } from '@/data/users'
import { products } from '@/data/products'

const route = useRoute()
const userId = route.params.id

// 1. Trova l'utente basandosi sull'ID nell'URL
const user = computed(() => {
  return users.find(u => u.id == userId)
})

// 2. Trova tutti i prodotti che appartengono a questo utente
const userProducts = computed(() => {
  // Nota: usiamo == invece di === perché l'ID nell'URL è stringa, nei dati è numero
  return products.filter(p => p.owner.id == userId)
})
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto">
    
    <div v-if="user" class="card lg:card-side bg-base-100 shadow-xl mb-10">
      <figure class="p-6 lg:w-1/4">
        <div class="avatar">
          <div class="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img :src="user.avatar" :alt="user.name" />
          </div>
        </div>
      </figure>
      <div class="card-body lg:w-3/4">
        <div class="flex items-center gap-2">
          <h1 class="card-title text-3xl">{{ user.name }}</h1>
          <div v-if="user.verified" class="badge badge-success gap-1 text-white">
            ✓ Verificato
          </div>
        </div>
        
        <div class="flex items-center gap-2 text-warning font-bold my-1">
          <span>★ {{ user.rating }} / 5.0</span>
          <span class="text-base-content/40 font-normal text-sm">(Basato su recensioni recenti)</span>
        </div>

        <p class="py-2 italic">"{{ user.bio }}"</p>
        
        <p class="text-sm text-base-content/60">Membro dal: {{ user.joinedDate }}</p>
        
        <div class="card-actions justify-end">
          <button class="btn btn-primary btn-outline btn-sm">Contatta Utente</button>
        </div>
      </div>
    </div>

    <div v-if="user">
      <h2 class="text-2xl font-bold mb-6 border-b pb-2">
        Gli oggetti di {{ user.name.split(' ')[0] }} ({{ userProducts.length }})
      </h2>

      <div v-if="userProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RouterLink 
          v-for="product in userProducts" 
          :key="product.id"
          :to="{ name: 'product-detail', params: { id: product.id } }"
          class="card bg-base-100 shadow-xl hover:scale-[1.02] transition-transform duration-200"
        >
          <figure class="h-48">
            <img :src="product.image" class="w-full h-full object-cover" />
          </figure>
          <div class="card-body p-4">
            <h3 class="font-bold text-lg">{{ product.name }}</h3>
            <p class="text-primary font-bold">€ {{ product.price.toFixed(2) }} <span class="text-xs text-base-content/50">/gg</span></p>
          </div>
        </RouterLink>
      </div>

      <div v-else class="alert">
        <span>Questo utente non ha oggetti disponibili al momento.</span>
      </div>
    </div>

    <div v-else class="alert alert-error">
      <span>Utente non trovato!</span>
      <RouterLink to="/" class="btn btn-sm">Torna alla Home</RouterLink>
    </div>

  </div>
</template>