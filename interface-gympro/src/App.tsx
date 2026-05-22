import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PLogin from './pages/PLogin/PLogin'
import PListagemAluno from './pages/PListagens/PListagemAlunos/PListagemAlunos'
import PDetalhesAluno from './pages/PDetalhesAluno/PDetalhesAluno'


// import ProtectedRoute from './components/Rotas/ProtectedRoutes'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PHome />} />
        <Route path='/login' element={<PLogin />} />
        <Route path='/lista/alunos' element={<PListagemAluno />} />
        <Route path='/detalhes/aluno/:id_aluno' element={<PDetalhesAluno />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App