import { create } from 'zustand';

type loginState = {
    email: string;
    password: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
};


export const useLoginStore = create<loginState>((set) => ({
    email: '',
    password: '',
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
}));