class AuthRequests {

    private serverUrl: string;
    private endpointLogin: string;

    constructor() {
        this.serverUrl = 'http://localhost:3333';
        this.endpointLogin = '/api/login';
    }

    async login(login: { email: string, senha: string }): Promise<boolean> {
        try {

            if (!login.email.includes('@adigital.com.br')) {
                alert('Use um email com domínio @adigital.com.br');
                return false;
            }

            const response = await fetch(this.serverUrl + this.endpointLogin, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            });

            if (!response.ok) {
                return false;
            }

            const data = await response.json();

            if (data.auth) {
                this.persistToken(
                    data.token,
                    data.usuario.nome,
                    data.usuario.id_usuario,
                    data.auth
                );
                return true;
            }

            return false;

        } catch (error) {
            console.log('Erro no login:', error);
            return false;
        }
    }

    persistToken(token: string, username: string, idUsuario: number, isAuth: boolean) {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('idUsuario', idUsuario.toString());
        localStorage.setItem('isAuth', isAuth.toString());
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('idUsuario');
        localStorage.removeItem('isAuth');

        window.location.href = '/login';
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');

        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const now = Math.floor(Date.now() / 1000);

            if (payload.exp < now) {
                this.logout();
                return false;
            }

            return true;
        } catch {
            this.logout();
            return false;
        }
    }
}

export default new AuthRequests();