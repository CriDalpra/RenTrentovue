<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/components/auth' // Importiamo la logica
import montagnaImg from '@/assets/images/montagna.png'

const { login, user } = useAuth()
const router = useRouter()

const usernameInput = ref('')

const handleLogin = () => {
  if (usernameInput.value.trim()) {
    login(usernameInput.value)
    // Opzionale: se vuoi che dopo il login vada ai prodotti
    // router.push('/home/products') 
  }
}
</script>

<template>
  <div class="relative h-full w-full overflow-hidden bg-base-200 flex items-center">
    
    <div class="z-10 ml-10 w-full max-w-sm">
      
      <div v-if="!user" class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-2xl font-bold mb-4">Accedi</h2>
          
          <form @submit.prevent="handleLogin">
            <div class="form-control w-full" >
              <label class="label">
                <span class="label-text">Il tuo nome</span>
              </label>
              <input 
                type="text" 
                placeholder="Es. Mario Rossi" 
                class="input input-bordered w-full" 
                v-model="usernameInput"
                required
              />
            </div>

            <div class="card-actions justify-end mt-6">
              <button type="submit" class="btn btn-primary w-full">Entra</button>
            </div>
          </form>
        </div>
      </div>

      <div v-else class="absolute right-12  card bg-base-100 shadow-xl">
        <div class="card-body ">
          <h2 class="card-title">Bentornato!</h2>
          <p>Sei autenticato come <span class="font-bold text-primary">{{ user.name }}</span>.</p>
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