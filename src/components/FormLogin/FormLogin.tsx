import { useState, type JSX } from "react";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import AuthRequests from '../fetch/AuthRequests';

function FormLogin(): JSX.Element {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const success = await AuthRequests.login({ email, senha });
            if (success) {
                navigate('/');
            } else {
                alert('Login falhou');
            }
        } catch (error) {
            alert('Erro no login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Login" className="p-shadow-5" style={{ width: '400px', margin: 'auto' }}>
            <form onSubmit={handleSubmit}>
                <div className="p-field">
                    <label htmlFor="email">Email</label>
                    <InputText
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="senha">Senha</label>
                    <Password
                        id="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        feedback={false}
                    />
                </div>
                <Button type="submit" label="Entrar" loading={loading} />
            </form>
        </Card>
    );
}

export default FormLogin;