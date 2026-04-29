import './App.css'
import FormLogin from './components/FormLogin/FormLogin'
import Rodape from './components/Rodape/Rodape'

function App() {
  return (
    <div className="app-shell">
      <header className="hero-banner">
        <div className="brand">
          <span>Gyn</span>Pro
        </div>
        <p className="hero-text">
          Academia laranja para seu treino, sua força e sua transformação.
        </p>
      </header>

      <main className="content">
        <section className="intro-card">
          <h2>Bem-vinda ao GynPro</h2>
          <p>
            Uma academia digital com visual laranja, login rápido e um rodapé com estilo.
          </p>
        </section>

        <FormLogin />
      </main>

      <Rodape />
    </div>
  )
}

export default App
