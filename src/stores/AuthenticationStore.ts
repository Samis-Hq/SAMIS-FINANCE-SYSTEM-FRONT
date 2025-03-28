import {defineStore} from "pinia";
import type {Users} from "@/model/User.ts";
import apiClient from "@/services/api.ts";

export const useAuthenticationStore = defineStore('authenticationStore', {
    state: () => ({
        currentUser: null as Users | null,
        error: null as Error | null,
        isLoading: false,
        isAuthenticated: false
    }),
    actions: {
        async login(credentials: { username: string; password: string, schoolCode: string }) {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await apiClient.post<{
                    user: Users;
                    token: string;
                }>('/login', credentials);
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                const {user, token} = response.data;
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('authToken', token);
                this.currentUser = user;
                this.isAuthenticated = true;
                return true;
            } catch (error: unknown) {
                this.clearAuthData();
                if (error instanceof Error) {
                    this.error = error;
                    console.error('Login failed:', error.message);
                } else {
                    this.error = new Error('An unknown error occurred during login');
                    console.error('Unknown login error:', error);
                }
                this.isAuthenticated = false;
                return false;
            } finally {
                this.isLoading = false;
            }
        },

        clearAuthData() {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            localStorage.removeItem('tokenExpiration');
            this.currentUser = null;
            this.isAuthenticated = false;
        },
        logout() {
            this.clearAuthData()
        },
    },
    getters: {
        userName(): string | null {
            return this.currentUser
                ? `${this.currentUser.username} ${this.currentUser.username}`
                : null;
        }
    }
});