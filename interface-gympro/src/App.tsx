import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navegacao from './components/Navegacao/Navegacao'; 
import PHome from './pages/PHome/PHome';
import PLogin from './pages/PLogin/PLogin';
import PListagemAluno from './pages/PListagem/PListagemAluno/PListagemAluno';
import PListagemMatricula from './pages/PListagem/PListagemMatricula/PListagemMatricula';
import PListagemPlano from './pages/PListagem/PListagemPlano/PListagemPlano';
import PDetalhesAluno from './pages/PDetalhes/PDetalhesAlunos/PDetalhesAlunos';
import PDetalhesMatricula from './pages/PDetalhes/PDetalhesMatricula/PDetalhesMatricula';
import PDetalhesPlano from './pages/PDetalhes/PDetalhesPlano/PDetalhesPlano';
import AuthRequests from './fetch/AuthRequests';
import { type JSX } from 'react';

function RotaProtegida({ children }: { children: JSX.Element }) {
    const token = localStorage.getItem('token');
    const isAuth = localStorage.getItem('isAuth');
    const role = localStorage.getItem('role');

    const autenticado = !!(token && isAuth && AuthRequests.checkTokenExpiry());
    const isProfessor = role?.toLowerCase() === 'admin';

    if (!autenticado || !isProfessor) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

function App() {
    return (
        <BrowserRouter>

            <Navegacao /> 

            <Routes>
                <Route path='/' element={<PHome />} />
                <Route path='/login' element={<PLogin />} />

                <Route path='/lista/alunos' element={
                    <RotaProtegida><PListagemAluno /></RotaProtegida>
                } />
                <Route path='/lista/matriculas' element={
                    <RotaProtegida><PListagemMatricula /></RotaProtegida>
                } />
                <Route path='/lista/planos' element={
                    <RotaProtegida><PListagemPlano /></RotaProtegida>
                } />

           
                <Route path='/detalhes/aluno/:id_aluno' element={
                    <RotaProtegida><PDetalhesAluno /></RotaProtegida>
                } />
                <Route path='/detalhes/matricula/:id_matricula' element={
                    <RotaProtegida><PDetalhesMatricula /></RotaProtegida>
                } />
                <Route path='/detalhes/plano/:id_plano' element={
                    <RotaProtegida><PDetalhesPlano /></RotaProtegida>
                } />

            </Routes>

        </BrowserRouter>
    );
}

export default App;