import api from '../../../shared/lib/api';

export const loginRequest = async (email: string, password: string) => {
    const response = await api.post('/users/login', { email, password });
    return response.data;
};