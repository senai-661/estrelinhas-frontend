import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PLogin from './pages/PLogin/PLogin'
import PListagemAluno from './pages/PListagens/PListagemAlunos/PListagemAlunos'
import PListagemPlano from './pages/PListagens/PListagemPlano/PListagemPlano'
import PListagemMatricula from './pages/PListagens/PListagemMatricula/PListagemMatricula'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<PHome />} />
        <Route path='/login' element={<PLogin />} />

        <Route path='/lista/planos' element={<PListagemPlano />} />
        <Route path='/lista/alunos' element={<PListagemAluno />} />
        <Route path='/lista/matriculas' element={<PListagemMatricula />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;