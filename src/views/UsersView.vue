<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useAuth } from '@/components/auth'

const { user, updateUser } = useAuth()

// Variabile per gestire la modalità modifica
const isEditing = ref(false)

// Oggetto reattivo per il form 
const formData = reactive({
  name: '',
  email: '',
  phone: '',
  location: '',
  bio: ''
})

// Dati simulati del portafoglio (non modificabili)
const wallet = ref(0)

// Funzione per attivare la modifica
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

// Funzione per Salvare
const saveProfile = () => {
  // Chiamiamo la funzione di useAuth per salvare permanentemente
  updateUser(formData)
  isEditing.value = false
}

// Funzione per Annullare
const cancelEditing = () => {
  isEditing.value = false
  // I dati nel form verranno sovrascritti al prossimo click su "Modifica"
}

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
              <button @click="saveProfile" class="btn btn-primary flex-1">Salva Modifiche</button>
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
            <div class="flex items-center gap-2 mt-2">
              <div class="badge badge-success gap-1 text-white">
                Verificato
              </div>
              <span class="text-sm opacity-70">Utente affidabile</span>
            </div>
            <p class="text-xs mt-4 opacity-50">Iscritto dal: 18/02/2026</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>