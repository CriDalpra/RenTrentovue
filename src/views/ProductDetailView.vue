<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { apiFetch } from '@/services/api'
import { useAuth } from '@/components/auth'

const route = useRoute()
const { user } = useAuth()
const product = ref(null)

// Stato modale noleggio
const showRentalModal = ref(false)
const isRenting = ref(false)
const rentalSuccess = ref(false)
const rentalError = ref('')

onMounted(async () => {
  try {
    const p = await apiFetch(`/products/${route.params.id}`)

    const extractedId = p._id || (p.self ? (p.self.match(/[0-9a-f]{24}/) || [])[0] : '')
    const ownerId = p.productUserId ? (String(p.productUserId).match(/[0-9a-f]{24}/) || [])[0] : ''

    product.value = {
      id: extractedId,
      name: p.productName,
      price: p.productPrice,
      description: p.productInfo || 'Descrizione non disponibile.',
      category: p.category,
      image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
      owner: {
        id: ownerId,
        name: p.productUserName,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.productUserName}`,
        rating: 4.5
      }
    }
  } catch (error) {
    console.error("Errore nel caricamento prodotto dal server:", error)
  }
})

const confirmRental = async () => {
  if (!user.value) {
    rentalError.value = 'Devi essere loggato per noleggiare.'
    return
  }

  isRenting.value = true
  rentalError.value = ''

  try {
    await apiFetch('/rentals', {
      method: 'POST',
      body: JSON.stringify({
        productId: product.value.id,
        productName: product.value.name,
        renterId: product.value.owner.id,
        clientId: user.value.id,
        rentalPrice: product.value.price,
        status: 'active'
      })
    })
    rentalSuccess.value = true
  } catch (error) {
    rentalError.value = 'Errore durante il noleggio. Riprova.'
    console.error(error)
  } finally {
    isRenting.value = false
  }
}

const closeModal = () => {
  showRentalModal.value = false
  rentalSuccess.value = false
  rentalError.value = ''
}
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
            v-if="product.owner.id"
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

          <div v-else class="flex items-center gap-4">
            <div class="avatar">
              <div class="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img :src="product.owner.avatar" :alt="product.owner.name" />
              </div>
            </div>
            <div>
              <p class="text-xs uppercase tracking-wide opacity-60 font-bold">Noleggia da</p>
              <p class="font-bold text-lg text-base-content">{{ product.owner.name }}</p>
            </div>
          </div>

          <button class="btn btn-circle btn-ghost bg-base-100 shadow-sm" title="Invia Messaggio">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-primary">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </button>
        </div> 
        
        <div class="card-actions justify-end mt-auto">
          <button class="btn btn-outline flex-1">Aggiungi ai preferiti</button>
          <button class="btn btn-primary flex-1" @click="showRentalModal = true">Noleggia Ora</button>
        </div>

      </div> 
    </div> 
    
    <div v-else class="alert alert-error shadow-lg mt-8">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <div>
        <h3 class="font-bold">Errore!</h3>
        <div class="text-xs">Prodotto non trovato. Torna alla lista.</div>
      </div>
      <RouterLink to="/home/products" class="btn btn-sm">Torna indietro</RouterLink>
    </div>

    <!-- Modale conferma noleggio -->
    <div v-if="showRentalModal" class="modal modal-open">
      <div class="modal-box">

        <!-- Stato: successo -->
        <div v-if="rentalSuccess" class="text-center py-4">
          <div class="text-5xl mb-4">🎉</div>
          <h3 class="font-bold text-xl text-success mb-2">Noleggio confermato!</h3>
          <p class="opacity-70 mb-6">
            Hai noleggiato <span class="font-bold text-base-content">{{ product.name }}</span>. 
            Puoi trovarlo nel tuo storico noleggi.
          </p>
          <div class="flex gap-2 justify-center">
            <RouterLink to="/home/users/me" class="btn btn-primary">Vai al mio profilo</RouterLink>
            <button @click="closeModal" class="btn btn-ghost">Chiudi</button>
          </div>
        </div>

        <!-- Stato: conferma -->
        <div v-else>
          <h3 class="font-bold text-xl mb-2">Conferma noleggio</h3>
          <p class="opacity-70 mb-6">Stai per noleggiare:</p>
          
          <div class="bg-base-200 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div>
              <p class="font-bold text-lg">{{ product?.name }}</p>
              <p class="text-sm opacity-60">Da: {{ product?.owner.name }}</p>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-primary">€ {{ product?.price.toFixed(2) }}</p>
              <p class="text-xs opacity-60">/ giorno</p>
            </div>
          </div>

          <div v-if="rentalError" class="alert alert-error mb-4 text-sm">
            <span>{{ rentalError }}</span>
          </div>

          <div class="modal-action">
            <button @click="closeModal" class="btn btn-ghost">Annulla</button>
            <button 
              @click="confirmRental" 
              class="btn btn-primary"
              :class="{ 'loading': isRenting }"
              :disabled="isRenting"
            >
              Conferma Noleggio
            </button>
          </div>
        </div>

      </div>
      <div class="modal-backdrop" @click="closeModal"></div>
    </div>

  </div>
</template>