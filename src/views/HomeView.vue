<script setup>
import montagnaImg from '@/assets/images/montagna.png'
</script>

<template>
  <div class="relative h-full w-full overflow-hidden bg-base-200">
    
    <div class="absolute bottom-0 right-0 w-full h-full flex justify-end items-end pointer-events-none">
      <img 
        :src="montagnaImg" 
        alt="Sfondo Montagna" 
        class="w-[70%] h-auto max-h-full object-contain object-right-bottom" 
      />
    </div>

  </div>
</template>