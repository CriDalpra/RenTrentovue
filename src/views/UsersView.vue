<script setup>
import { ref, onMounted, reactive } from 'vue' 
import { useAuth } from '@/components/auth' 
import { apiFetch } from '@/services/api'

const { user, updateUser } = useAuth()

const isEditing = ref(false)
const formData = reactive({
  name: '',
  email: '',
  phone: '',
  location: '',
  bio: ''
})
const wallet = ref(0)

const newCategoryName = ref('')
const categorySuccessMessage = ref('')

const startEditing = () => {
  if (user.value) {
    formData.name = user.value.name || ''
    formData.email = user.value.email || ''
    formData.phone = user.value.phone || ''
    formData.location = user.value.location || ''
    formData.bio = user.value.bio || ''
  }
  isEditing.value = true
}

const saveProfile = () => {
  updateUser(formData)
  isEditing.value = false
}

const cancelEditing = () => {
  isEditing.value = false
}

// funzuione per l'admin
const addCategory = async () => {
  if (!newCategoryName.value.trim()) return

  try {
    await apiFetch('/categories', {
      method: 'POST',
      body: JSON.stringify({ categoryName: newCategoryName.value })
    })
    
    categorySuccessMessage.value = `Categoria "${newCategoryName.value}" aggiunta con successo!`
    newCategoryName.value = ''
    
    setTimeout(() => { categorySuccessMessage.value = '' }, 3000)

  } catch (error) {
    console.error(error)
    alert("Errore durante la creazione della categoria. Sei sicuro di essere admin?")
  }
}

//portafoglio finto
onMounted(() => {
  wallet.value = (Math.random() * 990 + 10).toFixed(2)
})
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-base-content">Il mio Profilo</h1>
      
      <button v-if="!isEditing" @click="startEditing" class="btn btn-outline btn-primary gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
        Modifica Dati
      </button>
    </div>

    <div class="flex flex-col md:flex-row gap-6">
      
      <div class="card bg-base-100 shadow-xl flex-1">
        <div class="card-body">
          
          <div class="flex justify-center mb-6">
            <div class="avatar">
              <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img :src="user?.avatar" alt="Avatar" />
              </div>
            </div>
          </div>

          <div v-if="isEditing" class="flex flex-col gap-4">
            <div class="form-control">
              <label class="label"><span class="label-text">Nome visualizzato</span></label>
              <input v-model="formData.name" type="text" class="input input-bordered" />
            </div>

            <div class="form-control">
              <label class="label"><span class="label-text">Email</span></label>
              <input v-model="formData.email" type="email" class="input input-bordered" />
            </div>

            <div class="flex gap-4">
              <div class="form-control flex-1">
                <label class="label"><span class="label-text">Telefono</span></label>
                <input v-model="formData.phone" type="tel" class="input input-bordered" placeholder="+39 ..." />
              </div>
              <div class="form-control flex-1">
                <label class="label"><span class="label-text">Città</span></label>
                <input v-model="formData.location" type="text" class="input input-bordered" />
              </div>
            </div>

            <div class="form-control">
              <label class="label"><span class="label-text">Biografia</span></label>
              <textarea v-model="formData.bio" class="textarea textarea-bordered h-24" placeholder="Raccontaci di te..."></textarea>
            </div>

            <div class="flex gap-2 mt-4">
              <button @click="saveProfile" class="btn btn-primary flex-1">Salva</button>
              <button @click="cancelEditing" class="btn btn-ghost flex-1">Annulla</button>
            </div>
          </div>

          <div v-else class="text-center space-y-4">
            <div>
              <h2 class="text-2xl font-bold">{{ user?.name }}</h2>
              <p class="text-sm opacity-60">{{ user?.location || 'Posizione non inserita' }}</p>
            </div>

            <div class="divider"></div>

            <div class="text-left space-y-2">
              <p><span class="font-bold">Email:</span> {{ user?.email || 'Non specificata' }}</p>
              <p><span class="font-bold">Telefono:</span> {{ user?.phone || 'Non specificato' }}</p>
              <p class="mt-4"><span class="font-bold">Bio:</span></p>
              <p class="italic text-base-content/70 bg-base-200 p-3 rounded-lg">
                "{{ user?.bio || 'Nessuna biografia inserita.' }}"
              </p>
            </div>
          </div>

        </div>
      </div>
      <div class="flex-1 flex flex-col gap-6">
        
        <div class="stats shadow bg-base-100 w-full">
          <div class="stat">
            <div class="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div class="stat-title">Saldo Portafoglio</div>
            <div class="stat-value text-primary">€ {{ wallet }}</div>
            <div class="stat-desc">Ricarica disponibile</div>
          </div>
        </div>

        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h3 class="card-title text-lg">Stato Account</h3>
            <RouterLink to="/users/me/rentals" class="btn btn-primary w-full shadow-lg mt-4 gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Gestisci i miei Annunci
                </RouterLink>
            <div class="flex items-center gap-2 mt-2">
              <div class="badge badge-success gap-1 text-white">
                Verificato
              </div>
              <span class="text-sm opacity-70">Utente affidabile</span>
            </div>
            <p class="text-xs mt-4 opacity-50">Iscritto dal: 18/02/2026</p>
          </div>
        </div>

        <div v-if="user?.role === 'admin'" class="card bg-warning/20 shadow-xl border border-warning/50">
          <div class="card-body">
            <h3 class="card-title text-warning-content flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
              </svg>
              Amministrazione
            </h3>
            <p class="text-sm opacity-80 mb-2">Aggiungi una nuova categoria di prodotti al database.</p>
            
            <div class="form-control">
              <div class="input-group flex gap-2">
                <input 
                  v-model="newCategoryName" 
                  type="text" 
                  placeholder="Es: Ciaspole" 
                  class="input input-bordered w-full" 
                  @keyup.enter="addCategory"
                />
                <button @click="addCategory" class="btn btn-warning">Aggiungi</button>
              </div>
            </div>

            <div v-if="categorySuccessMessage" class="alert alert-success mt-4 p-2 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{{ categorySuccessMessage }}</span>
            </div>

          </div>
        </div>
        </div>
      </div>
  </div>
</template>