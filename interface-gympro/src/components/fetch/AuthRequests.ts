type LoginData = {
    email: string;
    senha: string;
};

type LoginResponse = {
    token?: string;
    accessToken?: string;
    [key: string]: unknown;
};

const serverURL = 'http://localhost:3333';
const endpointLogin = '/api/login';

class AuthRequests {
    static async login(data: LoginData): Promise<boolean> {
        try {
            const response = await fetch(`${serverURL}${endpointLogin}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                return false;
            }

            const payload = (await response.json()) as LoginResponse;
            const token = payload.token ?? payload.accessToken;

            if (!token) {
                return false;
            }

            localStorage.setItem('token', String(token));
            return true;
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            return false;
        }
    }
}

export default AuthRequests;
