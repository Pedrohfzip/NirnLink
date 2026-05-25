import api from './index';

type LoginPayload = {
    email: string;
    password: string;
};

type LoginResponse = {
    token: string;
};

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>('/login', payload);
    return { token: data.token };
};

export const logout = async (): Promise<void> => {
    await api.post('/logout');
};