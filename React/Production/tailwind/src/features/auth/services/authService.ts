import { apiService } from '@/api/axiosService';
import { AUTH_ENDPOINTS } from "../contstants";
import type { LoginPayload, RegisterPayload, User } from "../types";


interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export const authService = {
    login: async (payload: LoginPayload): Promise<AuthResponse> => {
        return await apiService.postCall<AuthResponse, LoginPayload>(
            AUTH_ENDPOINTS.LOGIN,
            payload,
        );
    },

    register: async (payload: RegisterPayload): Promise<AuthResponse> => {
        return await apiService.postCall<AuthResponse, RegisterPayload>(
            AUTH_ENDPOINTS.REGISTER,
            payload
        );
    },

    getProfile: async (): Promise<User> => {
        return await apiService.getCall<User>(AUTH_ENDPOINTS.PROFILE);
    },

    logout: async (): Promise<void> => {
        await apiService.postCall<void, {}>(AUTH_ENDPOINTS.LOGOUT, {});
    },
};
