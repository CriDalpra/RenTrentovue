import { ref } from 'vue'

// Creiamo una variabile reattiva che esiste fuori dai componenti
const user = ref(null)

export function useAuth() {
  
  const login = (name) => {
    // Simuliamo il login salvando il nome
    user.value = { name: name }
  }

  const logout = () => {
    user.value = null
  }

  return {
    user,
    login,
    logout
  }
}