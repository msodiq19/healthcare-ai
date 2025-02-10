"use client"
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react'
import { getToken, setToken } from '@/lib/utils';

type User = {
    email: string;
    isLoggedIn: boolean
}

type AuthContextType = {
    user: User
    authenticateUser: (data: {email: string, token: string}) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState({
        email: "",
        isLoggedIn: false
    })
    const router = useRouter();

    useEffect(() => {
        const token = getToken("accessToken")
        if(token){
            setUser((prev) => ({...prev, isLoggedIn: true}))
        }else{
            router.push('/')
        }

    }, [router])

    const authenticateUser = (data: {email: string, token: string}) => {

        setToken('accessToken', data.token)

        setUser({
            email: data.email,
            isLoggedIn: true
        })
        router.push('/main')
    }

    
    return (
    <AuthContext.Provider value={{user, authenticateUser}}>
        {children}
    </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error("useAuth must be within AuthProvider")
    }

    return context
}