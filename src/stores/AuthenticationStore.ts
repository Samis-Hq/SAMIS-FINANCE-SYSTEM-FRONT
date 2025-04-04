import { defineStore } from "pinia";
import type { LoginRequest, LoginResponse } from "@/model/Login.ts";
import apiClient from "@/services/api.ts";

interface AuthState {
    currentUser: LoginResponse | null;
    error: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

export const useAuthenticationStore = defineStore('authenticationStore', {
    state: (): AuthState => ({
        currentUser: null,
        error: null,
        isLoading: false,
        isAuthenticated: false
    }),

    actions: {
        async login(loginRequest: LoginRequest) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await apiClient.post<LoginResponse>(
                    '/auth/signin',
                    loginRequest
                );

                // The API client interceptor should handle token storage
                this.currentUser = response.data;
                this.isAuthenticated = true;

                return true;
            } catch (error: unknown) {
                this.clearAuthData();
                this.error = error instanceof Error
                    ? error.message
                    : 'Login failed. Please try again.';
                return false;
            } finally {
                this.isLoading = false;
            }
        },

        clearAuthData() {
            // Let API client handle header cleanup
            this.currentUser = null;
            this.isAuthenticated = false;
            this.error = null;
        }
    },

    getters: {
        userInfo(state): Omit<LoginResponse, 'token'> | null {
            if (!state.currentUser) return null;
            const { token, ...userInfo } = state.currentUser;
            return userInfo;
        },

        isAdmin(state): boolean {
            return state.currentUser?.roles?.includes('ADMIN') ?? false;
        }
    }
});