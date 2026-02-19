const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('token')

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}) 
  }

  //il tokenChecker si aspetta 'x-access-token'
  if (token) {
    headers['x-access-token'] = token
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers
  })

  // Gestione errori 
  if (!response.ok) {
    //Leggo l'errore dal backend, se c'è
    let errorMsg = `Errore HTTP! Status: ${response.status}`
    try {
      const errData = await response.json()
      if (errData.message || errData.error) {
        errorMsg = errData.message || errData.error
      }
    } catch (e) {}
    
    throw new Error(errorMsg)
  }

  // 204 = No Content 
  if (response.status === 204) {
    return null
  }

  return response.json()
}