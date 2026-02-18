<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { products } from '@/data/products'

const route = useRoute()
const productId = route.params.id

const product = computed(() => {
  return products.find(p => p.id == productId)
})
</script>

<template>
  <div class="p-8 max-w-5xl mx-auto">
    
    <RouterLink to="/home/products" class="btn btn-ghost mb-4 gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
      </svg>
      Torna ai prodotti
    </RouterLink>

    <div v-if="product" class="card lg:card-side bg-base-100 shadow-xl overflow-hidden">
      
      <figure class="lg:w-1/2 relative bg-base-200">
        <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
      </figure>
      
      <div class="card-body lg:w-1/2">
        
        <div class="flex justify-between items-start">
          <h2 class="card-title text-4xl mb-2">{{ product.name }}</h2>
          <div class="badge badge-outline">{{ product.category }}</div>
        </div>
        
        <p class="text-3xl text-primary font-bold mb-4">
          € {{ product.price.toFixed(2) }} 
          <span class="text-sm font-normal text-base-content/60">/ giorno</span>
        </p>
        
        <p class="text-lg opacity-80 mb-6 leading-relaxed">{{ product.description }}</p>
        
        <div class="divider"></div>

        <div v-if="product.owner" class="bg-base-200/50 p-4 rounded-xl flex items-center justify-between border border-base-200 mb-6">

          <RouterLink 
            :to="{ name: 'public-profile', params: { id: product.owner.id } }"
            class="flex items-center gap-4 hover:opacity-80 transition-opacity cursor-pointer group"
          >
            <div class="avatar">
              <div class="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 group-hover:ring-accent transition-all">
                <img :src="product.owner.avatar" :alt="product.owner.name" />
              </div>
            </div>
            
            <div>
              <p class="text-xs uppercase tracking-wide opacity-60 font-bold">Noleggia da</p>
              <p class="font-bold text-lg text-base-content group-hover:text-primary transition-colors">
                {{ product.owner.name }}
              </p>
            </div>
          </RouterLink>
          
          <button class="btn btn-circle btn-ghost bg-base-100 shadow-sm" title="Invia Messaggio">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-primary">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </button>

        </div> <div class="card-actions justify-end mt-auto">
          <button class="btn btn-outline flex-1">Aggiungi ai preferiti</button>
          <button class="btn btn-primary flex-1">Noleggia Ora</button>
        </div>

      </div> </div> <div v-else class="alert alert-error shadow-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <div>
        <h3 class="font-bold">Errore!</h3>
        <div class="text-xs">Prodotto non trovato. Torna alla lista.</div>
      </div>
      <RouterLink to="/home/products" class="btn btn-sm">Torna indietro</RouterLink>
    </div>

  </div>
</template>