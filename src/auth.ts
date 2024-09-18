import { jwtDecode } from 'jwt-decode';
import {login,register} from './Services/backend';
import Cookies from 'js-cookie';
interface AuthProvider {
isAuthenticated: boolean;
username: null | string;
login(username: string,password: string): Promise<void>;
signout(): Promise<void>;
checkAuthenticated: ()=>void;
}
  
/**
 * This represents some generic auth provider API, like Firebase.
 */
export const authProvider: AuthProvider = {
isAuthenticated: false,
username: null,
async login(username: string,password: string) {
    let token;
    try {
        token = await login(username,password);
    } catch(error) {
        const parsedError = error as any;
        throw new Error(parsedError.message);
    }
    const decodedToken: any = jwtDecode(token);

    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      throw new Error('Token has expired');
    }

    if (decodedToken.username !== username) {
      throw new Error('Username does not match token');
    }
    authProvider.isAuthenticated = true;
    authProvider.username = username;
    Cookies.set('token',token,{expires:new Date(decodedToken.exp * 1000)})
},
async signout() {
    await new Promise((r) => setTimeout(r, 500)); // fake delay
    authProvider.isAuthenticated = false;
    authProvider.username = "";
},
checkAuthenticated() {
    const loggedInCookie = Cookies.get('token');
    if (!loggedInCookie) {
        return;
    }
    const decodedToken: any = jwtDecode(loggedInCookie);
    authProvider.isAuthenticated = true;
    authProvider.username = decodedToken.username;
}
};
