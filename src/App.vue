<script setup>
import { RouterView, RouterLink } from 'vue-router'
import logo from '@/assets/images/logo.png' 
</script>

<template>
  <div class="h-screen bg-base-200 font-sans flex flex-col overflow-hidden">
    
    <div class="navbar bg-base-100 shadow-md z-50 relative h-16 shrink-0 px-4">
      
      <div class="flex-1">
        <RouterLink to="/" class="btn btn-ghost h-auto py-1">
          <img 
            :src="logo" 
            class="h-16 w-auto object-contain" />
        </RouterLink>
      </div>
      
      <div class="flex-none gap-2">
        <RouterLink to="/home/account" class="btn btn-ghost btn-circle avatar">
          
          <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" alt="Profilo Utente" />
          </div>
          </RouterLink>
      </div>

    </div>

    <div class="flex-grow relative w-full">
      <RouterView />
    </div>

  </div>
</template>