import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './src/App'

// garante que o elemento root existe
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Elemento root não encontrado');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);