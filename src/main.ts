import './assets/main.css'
import ToastPlugin from 'vue-toast-notification';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {useAuthenticationStore} from "@/stores/AuthenticationStore.ts";

const app = createApp(App)



app.use(createPinia())

const authStore = useAuthenticationStore();

authStore.initialize();
app.use(router)
app.use(ToastPlugin);
app.mount('#app')
