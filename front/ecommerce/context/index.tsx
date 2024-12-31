"use client"
import { User } from '@/types/user';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';



interface UserContextType {
    user: User | null;
    token: string | null;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Funciones auxiliares para manejar el localStorage
const getStoredUser = (): User | null => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
};

const getStoredToken = (): string | null => {
    return localStorage.getItem('token');
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => getStoredUser());
    const [token, setToken] = useState<string | null>(() => getStoredToken());

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        // Aquí puedes agregar cualquier otra lógica necesaria para el logout,
        // como hacer una llamada a la API
    };

    return (
        <UserContext.Provider value={{ user, token, setUser, setToken, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

