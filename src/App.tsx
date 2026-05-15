import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PLogin from './pages/PLogin/PLogin'
import PListagemAluno from './pages/PListagem/PListagemAluno/PListagemAluno'
import PListagemMatricula from './pages/PListagem/PListagemMatricula/PListagemMatricula'
import PListagemPlano from './pages/PListagem/PListagemPlano/PListagemPlano'
import PDetalhesAluno from './pages/PDetalhes/PDetalhesAluno/PDetalhesAluno'
// import ProtectedRoute from './components/Rotas/ProtectedRoutes'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PHome />} />
        <Route path='/login' element={<PLogin />} />
        <Route path='/lista/alunos' element={<PListagemAluno />} />
        <Route path='/lista/emprestimos' element={<PListagemMatricula />} />
        <Route path='/lista/livros' element={<PListagemPlano />} />
        <Route path='/detalhes/aluno/:id_aluno' element={<PDetalhesAluno />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App