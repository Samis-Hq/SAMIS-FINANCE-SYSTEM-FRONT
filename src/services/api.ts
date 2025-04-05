import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://192.168.40.15:8081/api",
    headers: {
        "Content-Type": "application/json"
    }
});

// Endpoint configuration
const NO_HEADERS_ENDPOINTS = [
    '/schools/register'
];

const SCHOOL_ONLY_ENDPOINTS = [
    '/auth/signin',

];

// Request interceptor
apiClient.interceptors.request.use((config) => {
    // Skip all headers for excluded endpoints
    if (NO_HEADERS_ENDPOINTS.some(endpoint => config.url?.includes(endpoint))) {
        return config;
    }

    // Get token from localStorage
    const authToken = localStorage.getItem('authToken');
    const schoolCode = localStorage.getItem('schoolCode');

    // Add school code for relevant endpoints
    if (schoolCode) {
        config.headers['X-School'] = schoolCode;
    }

    // Only add auth token for non-auth endpoints
    if (!SCHOOL_ONLY_ENDPOINTS.some(endpoint => config.url?.includes(endpoint))) {
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }
    }

    return config;
});

// Response interceptor
apiClient.interceptors.response.use(
    (response) => {
        // Handle successful auth responses
        if (response.config.url?.includes('/auth/signin')) {
            const token = response.data?.token;

            if (token) {
                // Save token to localStorage
                localStorage.setItem('authToken', token);

                // Update axios default headers
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                // Optionally save user data if available
                if (response.data?.user) {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                }
            }
        }
        return response;
    },
    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem('authToken');
            delete apiClient.defaults.headers.common['Authorization'];


            if (typeof window !== 'undefined') {
                window.location.href = '/home';
            }
        }
        return Promise.reject(error);
    }
);


export const getAuthToken = (): string | null => {
    return localStorage.getItem('authToken');
};

export default apiClient;