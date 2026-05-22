import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PLogin from './pages/PLogin/PLogin'
import PListagemAluno from './pages/PListagem/PListagemAluno/PListagemAluno'
import PListagemMatricula from './pages/PListagem/PListagemMatricula/PListagemMatricula'
import PListagemPlanos from './pages/PListagem/PListagemPlano/PListagemPlano'
import PDetalhesAluno from './pages/PDetalhes/PDetalhesAluno'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PHome />} />
        <Route path='/login' element={<PLogin />} />
        <Route path='/lista/alunos' element={<PListagemAluno />} />
        <Route path='/lista/matriculas' element={<PListagemMatricula />} />
        <Route path='/lista/planos' element={<PListagemPlanos />} />
        <Route path='/detalhes/aluno/:id_aluno' element={<PDetalhesAluno />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App