<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '@/components/auth'
import { apiFetch } from '@/services/api'

const { user } = useAuth()

const products = ref([])
const categories = ref([])
const successMessage = ref('')

const newProduct = ref({
  productName: '',
  category: '',
  productInfo: '',
  productPrice: null
})

//categorie per il menu a tendina
const loadCategories = async () => {
  try {
    categories.value = await apiFetch('/categories')
  } catch (error) {
    console.error("Errore caricamento categorie:", error)
  }
}

//prodotti dell'utente loggato!
const loadMyProducts = async () => {
  try {
    // Aggiungiamo il parametro productUserId alla chiamata API!
    const data = await apiFetch(`/products?productUserId=${user.value.id}`)
    products.value = data.reverse() // I più recenti in alto
  } catch (error) {
    console.error("Errore caricamento dei tuoi prodotti:", error)
  }
}

//salva nuovo prodotto
const submitProduct = async () => {
  if (!newProduct.value.productName || !newProduct.value.category || !newProduct.value.productPrice) {
    alert("Compila tutti i campi obbligatori!")
    return
  }

  try {
    await apiFetch('/products', {
      method: 'POST',
      body: JSON.stringify({
        productUserId: user.value.id,
        productUserName: user.value.name,
        productName: newProduct.value.productName,
        category: newProduct.value.category,
        productInfo: newProduct.value.productInfo,
        productPrice: newProduct.value.productPrice,
        status: 'available'
      })
    })

    successMessage.value = "Annuncio pubblicato con successo!"
    newProduct.value = { productName: '', category: '', productInfo: '', productPrice: null }
    
    //ricarica la lista per mostrare nuovo prodotto appena aggiunto
    loadMyProducts()

    setTimeout(() => { successMessage.value = '' }, 3000)

  } catch (error) {
    console.error(error)
    alert("Errore durante l'inserimento del prodotto.")
  }
}

onMounted(() => {
  if (user.value && user.value.id) {
    loadCategories()
    loadMyProducts()
  }
})
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto space-y-8">
    
    <div class="flex items-center justify-between border-b pb-4">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Gestione Noleggi</h1>
        <p class="text-sm opacity-70">Pubblica nuovi annunci e gestisci quelli attivi</p>
      </div>
      <RouterLink to="/home/users/me" class="btn btn-ghost btn-sm">
        &larr; Torna al Profilo
      </RouterLink>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <div class="lg:col-span-1">
        <div class="card bg-base-100 shadow-xl border border-base-200 sticky top-6">
          <div class="card-body">
            <h2 class="card-title text-primary">Nuovo Annuncio</h2>
            <p class="text-sm opacity-70 mb-4">Cosa vuoi mettere a noleggio oggi?</p>

            <form @submit.prevent="submitProduct" class="space-y-4">
              <div class="form-control">
                <label class="label"><span class="label-text">Nome Prodotto *</span></label>
                <input v-model="newProduct.productName" type="text" placeholder="Es: Sci Head" class="input input-bordered w-full" required />
              </div>

              <div class="form-control">
                <label class="label"><span class="label-text">Categoria *</span></label>
                <select v-model="newProduct.category" class="select select-bordered w-full" required>
                  <option disabled value="">Scegli una categoria...</option>
                  <option v-for="cat in categories" :key="cat.self" :value="cat.categoryName">
                    {{ cat.categoryName }}
                  </option>
                </select>
              </div>

              <div class="form-control">
                <label class="label"><span class="label-text">Prezzo (€/giorno) *</span></label>
                <input v-model="newProduct.productPrice" type="number" min="0" step="0.5" placeholder="Es: 15.50" class="input input-bordered w-full" required />
              </div>

              <div class="form-control">
                <label class="label"><span class="label-text">Descrizione</span></label>
                <textarea v-model="newProduct.productInfo" class="textarea textarea-bordered h-24" placeholder="Dettagli, taglia, condizioni..."></textarea>
              </div>

              <button type="submit" class="btn btn-primary w-full mt-4">Pubblica Annuncio</button>
            </form>

            <div v-if="successMessage" class="alert alert-success mt-4 p-2 text-sm shadow-sm">
              <span>{{ successMessage }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-2">
        <h2 class="text-2xl font-bold mb-4">I Miei Annunci Pubblicati</h2>
        
        <div v-if="products.length === 0" class="alert alert-info shadow-lg opacity-80">
          <span>Non hai ancora pubblicato nessun annuncio. Inizia ora!</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="product in products" :key="product.id" class="card bg-base-100 shadow hover:shadow-lg transition-shadow border border-base-200">
            <div class="card-body p-5">
              
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="card-title text-lg">{{ product.productName }}</h3>
                  <div class="badge badge-outline text-xs mt-1">{{ product.category || 'Generico' }}</div>
                </div>
                <div class="text-right">
                  <span class="text-xl font-bold text-primary">€{{ product.productPrice }}</span>
                  <span class="text-xs opacity-60 block">/ giorno</span>
                </div>
              </div>
              
              <p class="text-sm opacity-80 mt-2 line-clamp-2">
                {{ product.productInfo || 'Nessuna descrizione fornita.' }}
              </p>
              
              <div class="divider my-2"></div>
              
              <div class="flex items-center justify-between text-xs">
                <span class="badge" :class="product.status === 'available' ? 'badge-success text-white' : 'badge-warning'">
                  {{ product.status === 'available' ? 'In Vetrina' : 'Noleggiato/Non Disp.' }}
                </span>
                
                <button class="btn btn-xs btn-outline btn-error">Rimuovi</button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>