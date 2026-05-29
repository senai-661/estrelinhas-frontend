import { type JSX, useState } from 'react';
<<<<<<< HEAD
import estilo from '../FormLogin/FormLogin.module.css';
import AuthRequests from '../fetch/AuthRequests';

function FormLogin(): JSX.Element {
=======
import estilo from './FormLogin.module.css';
import AuthRequests from '../../fetch/AuthRequests';

function LoginForm(): JSX.Element {
>>>>>>> origin/lais-zanqueta
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    interface LoginData {
        email: string;
        senha: string;
    }

    interface FormEvent {
        preventDefault: () => void;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
<<<<<<< HEAD

        const login: LoginData = { email: email, senha: senha };

        try {
            const sucesso = await AuthRequests.login(login);

            if (sucesso) {
                window.location.href = '/';
            } else {
                alert('E-mail ou senha incorretos');
            }

        } catch (error) {
            console.error(`Erro ao tentar fazer login: ${error}`);
            alert('Erro ao conectar com o servidor.');
=======
        const login: LoginData = { email: email, senha: senha }

  
        try {
            if (await AuthRequests.login(login)) {
                window.location.href = '/'; 
            }
        } catch (error) {
           
            console.error(`Erro ao tentar fazer login: ${error}`);
            alert('Erro ao fazer login, verifique se usuário e/ou senha estão corretos.');
>>>>>>> origin/lais-zanqueta
        }
    };

    return (
<<<<<<< HEAD
        <section className={estilo['login-form-container']}>

            <form className={estilo['login-form']} onSubmit={handleSubmit}>

                <h2 className={estilo['login-header']}>LOGIN</h2>

=======
        
        <section className={estilo['login-form-container']}>

           
            <form action="POST" className={estilo['login-form']} onSubmit={handleSubmit}>

               
                <h2 className={estilo['login-header']}>LOGIN</h2>

               
>>>>>>> origin/lais-zanqueta
                <div className={estilo['form-group']}>
                    <label>
                        E-mail
                        <input
<<<<<<< HEAD
                            type="email"
                            placeholder='Informe o seu email'
                            className={estilo['input-email-login']}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
=======
                            type="email" 
                            placeholder='Informe o seu email' 
                            className={estilo['input-email-login']} 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}  
                            required 
>>>>>>> origin/lais-zanqueta
                        />
                    </label>
                </div>

<<<<<<< HEAD
=======
              
>>>>>>> origin/lais-zanqueta
                <div className={estilo['form-group']}>
                    <label>
                        Senha
                        <input
<<<<<<< HEAD
                            type="password"
                            placeholder='Informe sua senha'
                            className={estilo['input-password-login']}
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
=======
                            type="password" 
                            placeholder='Informe sua senha' 
                            className={estilo['input-password-login']} 
                            value={senha}  
                            onChange={(e) => setSenha(e.target.value)} 
                            required  
>>>>>>> origin/lais-zanqueta
                        />
                    </label>
                </div>

<<<<<<< HEAD
                <input
                    type="submit"
                    value="Entrar"
                    className={estilo['login-button']}
=======
                
                <input
                    type="submit" 
                    value="Entrar" 
                    className={estilo['login-button']} 
>>>>>>> origin/lais-zanqueta
                />
            </form>
        </section>
    );
}

<<<<<<< HEAD
export default FormLogin;
=======

export default LoginForm;
>>>>>>> origin/lais-zanqueta
