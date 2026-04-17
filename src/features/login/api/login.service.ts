import api from '@/shared/lib/api';

type LoginRequest = {
    email: string;
    password: string;
};

type LoginResponse = {
    token: string;
};

export const loginRequest = async (
    data: LoginRequest
): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
        '/users/login',
        data
    );

    return response.data;
};