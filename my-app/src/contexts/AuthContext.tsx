import { createContext, ReactNode, useState, useEffect } from 'react';

import { api } from '../services/apiClient';

import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router';

import { toast } from 'react-toastify'

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
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_name");

        destroyCookie(undefined, '@nextauth.token' )
        Router.push('/')
    } catch(error) {
        toast.error("access not alow")
    }
}

export function AuthProvider({ children }: AuthProviderProps ){
    const [ user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    useEffect(() => {
        const { '@nextauth.token': token } = parseCookies();
        if(token){
            const name = localStorage.getItem("user_name");
            const user_name = JSON.parse(name)
            const email = localStorage.getItem("user_email");
            const user_email = JSON.parse(email)

            setUser({
                id: null,
                name: user_name,
                email: user_email
            })
        }  
    }, [])


    async function signIn({email}: SignInProps){
        try{
            const response = await api.post('/signin', {
                email
            })
            
            const { _id, name, token, iat, exp } = response.data;
            localStorage.setItem('user_id', JSON.stringify(_id));
            localStorage.setItem('user_email', JSON.stringify(email));
            localStorage.setItem('user_name', JSON.stringify(name));

            // expires cookies options
            // const expYear = 60 * 60 * 24 * 365; Year
            // const expMonth = 60 * 60 * 24 * 30; Month
            const expWeek = exp - iat // week  from DataBase

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: expWeek,
                path: "/"
            })

            setUser({
                id: _id,
                name,
                email
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success("Success!")

            Router.push('/search')

        } catch(err) {
            toast.error("access not alow")
        }
    }

    async function signUp({email, name}: SignUpProps){
        try {
            const response = await api.post('/signup', {
                name,
                email
            })

            toast.success(response.data.msg)

            Router.push('/');

        } catch (error) {
            toast.error(error)
        }
    
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp}}>
            { children }
        </AuthContext.Provider>
    )
}
