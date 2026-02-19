/*
Il backend si aspetta email e password nel body della richiesta e restituirà success e un token JWT.
Sia qui che in ProductsView ho adattato i miss-match tra frontend e DB
*/

import { ref } from 'vue'
import router from '@/router'
import { apiFetch } from '@/services/api' 

const storedUser = localStorage.getItem('user')
const user = ref(storedUser ? JSON.parse(storedUser) : null)

export function useAuth() {
  
  const login = async (email, password) => {
    try {
      const data = await apiFetch('/authentication', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })

      if (data.success && data.token) {
        localStorage.setItem('token', data.token)
        
        //dati dell'utente loggato
        const backendUser = await apiFetch('/users/me', { method: 'GET' })

        //adatto l'utente dal DB a qua: userName diventa name
        const adaptedUser = {
            id: backendUser.self ? backendUser.self.replace('renTrentoAPI/users', '') : '',
            name: backendUser.userName, 
            email: backendUser.email,
            wallet: backendUser.wallet,
            
            //Fake datas
            location: 'Trento',
            phone: '',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${backendUser.userName}`
        }

        user.value = adaptedUser
        localStorage.setItem('user', JSON.stringify(adaptedUser))
        
        router.push('/home/users/me')
      }
    } catch (error) {
      console.error("Errore di login:", error.message)
      alert("Autenticazione fallita!")
    }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token') 
    router.push('/')
  }

  
  const updateUser = (newData) => {
    user.value = { ...user.value, ...newData }
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  return {
    user,
    login,
    logout,
    updateUser
  }
}