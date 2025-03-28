import axios from "axios";


const apiClient = axios.create({
    baseURL: "http://192.168.40.166:8080/api/students",
    headers: {
        "Content-Type": "application/json"
    }
});
//  add headers
apiClient.interceptors.request.use((config) => {
    //do not add to this endpoints
    if (!config.url?.includes('/login') && !config.url?.includes('/register')) {
        const tenantId = localStorage.getItem('tenant-id') || '';
        config.headers['tenant-id'] = tenantId;
    }
    const authToken = localStorage.getItem('authToken');
    if (authToken && !isAuthEndpoint(config.url)) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
});

function isAuthEndpoint(url?: string): boolean {
    if (!url) return false;
    const authEndpoints = ['/login', '/register', '/forgot-password'];
    return authEndpoints.some(endpoint => url.includes(endpoint));
}

export default apiClient;
