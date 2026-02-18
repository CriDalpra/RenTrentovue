import { ref } from 'vue'
import router from '@/router' 

const storedUser = localStorage.getItem('user')
const user = ref(storedUser ? JSON.parse(storedUser) : null)

export function useAuth() {
  
  const login = (name) => {
    //prendiamo solo la parte prima della @ se è una email
    const cleanName = name.includes('@') ? name.split('@')[0] : name
    
    const userData = { name: cleanName }
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    // Pulisce i dati
    user.value = null
    localStorage.removeItem('user')
    
    // RIPORTA ALLA HOME
    router.push('/') 
    
    // Per un "refresh" completo per pulire tutto, potrei usare: (da valutare insime)
    // window.location.href = '/'
  }

  return {
    user,
    login,
    logout
  }
}