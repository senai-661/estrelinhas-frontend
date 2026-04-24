import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PLogin from './pages/PLogin/PLogin'

import PListagemAluno from './pages/PListagem/PListagemAluno/PListagemAluno'
import PListagemMatricula from './pages/PListagem/PListagemMatricula/PListagemMatricula'
import PListagemPlano from './pages/PListagem/PListagemPlano/PListagemPlano'
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<PHome />} />
        <Route path='/login' element={<PLogin />} />

        <Route path='/lista/alunos' element={<PListagemAluno />} />
        <Route path='/lista/matriculas' element={<PListagemMatricula />} />
        <Route path='/lista/planos' element={<PListagemPlano />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App