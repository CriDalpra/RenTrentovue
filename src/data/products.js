export const products = [
  {
    id: 1,
    name: 'Sci Professionali Alpine',
    price: 45.00, // Prezzo giornaliero
    description: 'Sci di alta qualità per discese veloci. Usati pochissimo, lamine appena rifatte.',
    image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
    category: 'Inverno',
    owner: {
      id: 101,
      name: 'Luigi Verdi',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luigi', // Avatar generato
      rating: 4.8
    }
  },
  {
    id: 2,
    name: 'Scarponi Termici Extreme',
    price: 12.50,
    description: 'Scarponi numero 42, impermeabili e caldissimi. Ideali per ciaspolate.',
    image: 'https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp',
    category: 'Inverno',
    owner: {
      id: 102,
      name: 'Giulia Bianchi',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Giulia',
      rating: 5.0
    }
  },
  {
    id: 3,
    name: 'Tenda da Campeggio 2 Posti',
    price: 20.00,
    description: 'Tenda leggera, si monta in 5 minuti. Perfetta per trekking estivi.',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Estate',
    owner: {
      id: 101,
      name: 'Luigi Verdi', // Lo stesso di prima
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luigi',
      rating: 4.8
    }
  }
]