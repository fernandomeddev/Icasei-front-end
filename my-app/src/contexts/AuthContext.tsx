import { createContext, ReactNode, useState } from 'react';

import { destroyCookie } from 'nookies'
import Router from 'next/router';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
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
        console.log('user email', email)
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
            { children }
        </AuthContext.Provider>
    )
}