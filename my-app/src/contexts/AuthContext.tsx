import { createContext, ReactNode, useState } from 'react';

import { api } from '../services/apiClient';

import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router';
import { config } from 'process';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
}

type SignUpProps = {
    name: string;
    email: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try {
        destroyCookie(undefined, '@nextauth.token' )
        Router.push('/')
    } catch(error) {
        console.log('erro ao deslogar', error)
    }
}

export function AuthProvider({ children }: AuthProviderProps ){
    const [ user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    async function signIn({email}: SignInProps){
        try{
            const response = await api.post('/signin', {
                email
            })
            //console.log(response.data);
            
            const { id, name, token, iat, exp } = response.data;

            // expires cookies options
            // const expYear = 60 * 60 * 24 * 365; Year
            // const expMonth = 60 * 60 * 24 * 30; Month
            const expWeek = exp - iat // week  from DataBase

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: expWeek,
                path: "/"
            })

            setUser({
                id,
                name,
                email
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            Router.push('/dashboard')

        } catch(err) {
            console.log('erro ao acessar', err)
        }
    }

    async function signUp({email, name}: SignUpProps){
        try {
            const response = await api.post('/signup', {
                name,
                email
            })

            console.log(response.data.msg);

            Router.push('/');

        } catch (error) {
            console.log('error ao cadastrar', error)
        }
    
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp}}>
            { children }
        </AuthContext.Provider>
    )
}
