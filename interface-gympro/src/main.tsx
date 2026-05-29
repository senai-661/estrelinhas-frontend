import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
<<<<<<< HEAD
import App from '../App'
=======
import App from './App'
>>>>>>> origin/lais-zanqueta

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Elemento root não encontrado')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
<<<<<<< HEAD
)
=======
)  
>>>>>>> origin/lais-zanqueta
