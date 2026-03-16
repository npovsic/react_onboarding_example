// Simple authentication utility to store the authentication state in localStorage.
// Used to mock the login and logout functionality.
class AuthenticationUtil {
    static isAuthenticated() {
        return localStorage.getItem('authenticated') === 'true';
    }

    static setAuthenticated(authenticated: boolean) {
        localStorage.setItem('authenticated', authenticated.toString());
    }
}

export default AuthenticationUtil;