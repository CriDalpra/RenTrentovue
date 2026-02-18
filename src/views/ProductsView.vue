<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

// Recuperiamo cosa ha scritto l'utente dalla query string (es. ?q=qualcosa)
const searchTerm = computed(() => route.query.q || '')
</script>

<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-4">Risultati ricerca</h1>
    <p v-if="searchTerm">
      Hai cercato: <span class="text-primary font-bold">{{ searchTerm }}</span>
    </p>
    <p v-else>Nessun termine di ricerca inserito.</p>

    </div>
</template>