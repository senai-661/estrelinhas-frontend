import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './src/pages/PHome/PHome'
import PLogin from './src/pages/PLogin/PLogin'
import PListagemAluno from './src/pages/PListagem/PListagemAluno/PListagemAluno'
import PListagemMatricula from './src/pages/PListagem/PListagemMatricula/PListagemMatricula'
import PListagemPlano from './src/pages/PListagem/PListagemPlano/PListagemPlano'
import PDetalhesAluno from './src/pages/PDetalhes/PDetalhesAluno/PDetalhesAluno'
import PDetalhesMatricula from './src/pages/PDetalhes/PDetalhesMatricula/PDetalhesMatricula'
import PDetalhesPlano from './src/pages/PDetalhes/PDetalhesPlano/PDetalhesPlano'
// import ProtectedRoute from './components/Rotas/ProtectedRoutes'

function App() {

  return (
    <div className="app-shell">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PHome />} />
          <Route path='/login' element={<PLogin />} />
          <Route path='/lista/alunos' element={<PListagemAluno />} />
          <Route path='/lista/matriculas' element={<PListagemMatricula />} />
          <Route path='/lista/planos' element={<PListagemPlano />} />
          <Route path='/detalhes/aluno/:id_aluno' element={<PDetalhesAluno />} />
          <Route path='/detalhes/matricula/:id_matricula' element={<PDetalhesMatricula />} />
          <Route path='/detalhes/plano/:id_plano' element={<PDetalhesPlano />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App