<script setup>
import { ref } from 'vue'
import { RouterView, RouterLink, useRouter } from 'vue-router'
import { useAuth } from '@/components/auth' 
import logo from '@/assets/images/logo.png' 

const router = useRouter()
const { user } = useAuth() 
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push('/home/products')
    searchQuery.value = '' 
  }
}
</script>

<template>
  <div class="h-screen bg-base-200 font-sans flex flex-col overflow-hidden">
    
    <div class="navbar bg-base-100 shadow-md z-50 relative h-16 shrink-0 px-4">
      
      <div class="flex-1">
        <RouterLink to="/" class="btn btn-ghost h-auto py-1">
          <img :src="logo" class="h-16 w-auto object-contain" />
        </RouterLink>
      </div>
      
      <div class="flex-none gap-4 flex items-center"> <div v-if="user" class="hidden md:block font-medium text-base-content/80">
          Benvenuto, <span class="font-bold text-primary">{{ user.name }}</span>
        </div>

        <RouterLink to="/home/users" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" alt="Profilo Utente" />
          </div>
        </RouterLink>
      </div>

    </div>

    <div class="bg-base-100 w-full flex justify-center py-2 shadow-sm z-40">
      <div class="form-control w-full max-w-md px-4">
        <input 
          type="text" 
          placeholder="Cerca prodotti..." 
          class="input input-bordered w-full" 
          v-model="searchQuery"
          @keyup.enter="handleSearch"
        />
      </div>
    </div>

    <div class="flex-grow relative w-full overflow-y-auto">
      <RouterView />
    </div>

  </div>
</template>