<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '@/components/auth' 

// 2. Recupera l'utente dallo stato globale
const { user } = useAuth()

const userProfile = ref({
  firstName: '',
  lastName: '',
  wallet: 0,
  avatar: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp'
})

onMounted(() => {
  //ASSEGNAZIONE DEL NOME
  
  if (user.value && user.value.name) {  // Se l'utente è loggato, usiamo il suo nome
    userProfile.value.firstName = user.value.name
  } else {                              // Se non è loggato (o ricarichi la pagina), mettiamo un nome generico
    userProfile.value.firstName = 'Ospite'
  }

  // Il cognome non lo chiediamo al login, quindi lo lasciamo finto per ora
  userProfile.value.lastName = '(Demo)' 
  
  // Generiamo sempre il portafoglio casuale
  userProfile.value.wallet = (Math.random() * 990 + 10).toFixed(2)
})
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    
    <h1 class="text-3xl font-bold mb-8 text-base-content">Il mio Profilo</h1>

    <div class="flex flex-col md:flex-row gap-6">
      
      <div class="card bg-base-100 shadow-xl flex-1">
        <div class="card-body items-center text-center">
          
          <div class="avatar mb-4">
            <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img :src="userProfile.avatar" alt="Avatar Utente" />
            </div>
          </div>

          <h2 class="card-title text-2xl capitalize">
            {{ userProfile.firstName }} {{ userProfile.lastName }}
          </h2>
          
          <p class="text-base-content/60">
            {{ user.value ? 'Utente Verificato' : 'Utente non registrato' }}
          </p>

          <div class="card-actions mt-4">
            <button class="btn btn-primary btn-sm">Modifica Dati</button>
          </div>
        </div>
      </div>

      <div class="flex-1 flex flex-col gap-6">
        <div class="stats shadow bg-base-100 w-full">
          <div class="stat">
            <div class="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div class="stat-title">Saldo Disponibile</div>
            <div class="stat-value text-primary">€ {{ userProfile.wallet }}</div>
            <div class="stat-desc">Ultimo aggiornamento: Oggi</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>