<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/components/auth' 
import montagnaImg from '@/assets/images/montagna.png'

//importo anche register da usaAuth
const { login, register, user } = useAuth()
const router = useRouter()

//false = Registrazione (default), true = Login
const isLoginMode = ref(false) 

// Variabili per i campi
const nameInput = ref('')
const emailInput = ref('')
const passwordInput = ref('')
const showPassword = ref(false)

const handleSubmit = async () => {
  if (isLoginMode.value) {
    
    if (emailInput.value.trim() && passwordInput.value.trim()) {
      login(emailInput.value, passwordInput.value)
    } else {
      alert("Compila entrambi i campi!")
    }
  } else {
    
    if (nameInput.value.trim() && emailInput.value.trim() && passwordInput.value.trim()) {
      try {
        await register(nameInput.value, emailInput.value, passwordInput.value)
      } catch (error) {
        alert("Errore durante la registrazione. Riprova.")
      }
    } else {
      alert("Compila tutti i campi per registrarti!")
    }
  }
}
</script>

<template>
  <div class="relative h-full w-full overflow-hidden bg-base-200 flex items-center">
    
    <div class="z-10 ml-12 w-full max-w-sm">
      
      <div v-if="!user" class="card bg-base-100 shadow-xl">       
        <div class="card-body">
          <h2 class="card-title text-2xl font-bold mb-4">
            {{ isLoginMode ? 'Accedi' : 'Registrati' }}
          </h2>
          
          <form @submit.prevent="handleSubmit">
            
            <div v-if="!isLoginMode" class="form-control w-full mb-2">
              <label class="label">
                <span class="label-text">Nome</span>
              </label>
              <input 
                type="text" 
                placeholder="Es: Mario Rossi" 
                class="input input-bordered w-full" 
                v-model="nameInput"
                required
              />
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input 
                type="email" 
                placeholder="Es: Cristian.Dalpra@esempio.com" 
                class="input input-bordered w-full" 
                v-model="emailInput"
                required
              />
            </div>

            <div class="form-control w-full mt-2">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <div class="relative">
                <input 
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Password segreta" 
                  class="input input-bordered w-full pr-10" 
                  v-model="passwordInput"
                  required
                />
                <button 
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-3 text-sm opacity-60 hover:opacity-100"
                >
                  {{ showPassword ? 'Nascondi' : 'Mostra' }}
                </button>
              </div>
            </div>

            <div class="card-actions justify-end mt-6">
              <button type="submit" class="btn btn-primary w-full">
                {{ isLoginMode ? 'Entra' : 'Crea account' }}
              </button>
            </div>

            <div class="mt-4 text-center text-sm">
              <span v-if="!isLoginMode">
                Hai già un account? 
                <a href="#" @click.prevent="isLoginMode = true" class="text-primary font-bold hover:underline">Accedi</a>
              </span>
              <span v-else>
                Non hai un account? 
                <a href="#" @click.prevent="isLoginMode = false" class="text-primary font-bold hover:underline">Registrati</a>
              </span>
            </div>

          </form>
        </div>
      </div>

      <div v-else class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Bentornato!</h2>
          <p>Hai effettuato l'accesso come <span class="font-bold text-primary">{{ user.name }}</span>.</p>
        </div>
      </div>

    </div>

    <div class="absolute bottom-0 right-0 w-full h-full flex justify-end items-end pointer-events-none">
      <img 
        :src="montagnaImg" 
        alt="Sfondo Montagna" 
        class="w-[70%] h-auto max-h-full object-contain object-right-bottom opacity-80" 
      />
    </div>

  </div>
</template>