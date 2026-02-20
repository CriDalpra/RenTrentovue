<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { apiFetch } from '@/services/api'

const route = useRoute()
const userId = route.params.id ? String(route.params.id).split('/').filter(Boolean).pop() : ''

const seller = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  if (!userId) {
    errorMessage.value = "ID utente non valido."
    isLoading.value = false
    return
  }

  try {
    const userData = await apiFetch(`/users/${userId}`)
    
    seller.value = {
      id: userId,
      name: userData.userName,
      email: userData.email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.userName}`,
      bio: userData.bio || "Questo utente non ha ancora scritto una biografia."
    }
  } catch (error) {
    console.error("Errore caricamento utente:", error)
    errorMessage.value = "Impossibile trovare questo utente. Potrebbe essere stato rimosso."
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="p-8 max-w-4xl mx-auto">
    
    <button @click="$router.back()" class="btn btn-ghost mb-6 gap-2">
      &larr; Torna indietro
    </button>

    <div v-if="isLoading" class="flex justify-center py-12">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <div v-else-if="seller" class="card bg-base-100 shadow-xl border border-base-200">
      <div class="card-body items-center text-center">
        
        <div class="avatar mb-4">
          <div class="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img :src="seller.avatar" :alt="seller.name" />
          </div>
        </div>
        
        <h1 class="card-title text-3xl">{{ seller.name }}</h1>
        <p class="text-sm opacity-60 mb-4">Utente Verificato</p>
        
        <p class="max-w-md italic opacity-80 bg-base-200 p-4 rounded-lg">
          "{{ seller.bio }}"
        </p>

        <div class="divider w-full"></div>

        <div class="card-actions">
          <a :href="`mailto:${seller.email}`" class="btn btn-primary gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Contatta l'utente
          </a>
        </div>

      </div>
    </div>

    <div v-else class="alert alert-error shadow-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>{{ errorMessage }}</span>
    </div>

  </div>
</template>