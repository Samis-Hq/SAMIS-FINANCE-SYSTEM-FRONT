import { defineStore } from "pinia";
import type { LoginRequest, LoginResponse } from "@/model/Login.ts";
import apiClient from "@/services/api.ts";
import router from "@/router";

interface AuthState {
    currentUser: LoginResponse | null;
    error: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

export const useAuthenticationStore = defineStore('authenticationStore', {
    state: (): AuthState => ({
        currentUser: JSON.parse(localStorage.getItem('user') || 'null'),
        error: null,
        isLoading: false,
        isAuthenticated: !!localStorage.getItem('authToken')
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

                // Save user data
                localStorage.setItem('user', JSON.stringify(response.data));
                this.currentUser = response.data;
                this.isAuthenticated = true;

                return true;
            } catch (error: unknown) {
                this.logout(); // Clear all auth data on failure
                this.error = error instanceof Error
                    ? error.message
                    : 'Login failed. Please try again.';
                return false;
            } finally {
                this.isLoading = false;
            }
        },

        logout() {
            // Clear local storage
            localStorage.removeItem('user');
            localStorage.removeItem('authToken');
            // Reset store state
            this.currentUser = null;
            this.isAuthenticated = false;
            this.error = null;

            router.push('/auth');
        },

        initialize() {
            // Check for existing session on app startup
            const token = localStorage.getItem('authToken');
            const user = localStorage.getItem('user');

            if (token && user) {
                try {
                    this.currentUser = JSON.parse(user);
                    this.isAuthenticated = true;
                } catch (error) {
                    this.logout();
                }
            }
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
        },

        // New getter for checking auth state
        isAuthenticatedWithCheck(state): boolean {
            return state.isAuthenticated && !!localStorage.getItem('authToken');
        }
    }
});