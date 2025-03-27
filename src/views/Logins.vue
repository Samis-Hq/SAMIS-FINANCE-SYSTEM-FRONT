<script setup lang="ts">
import {ref} from "vue";
import type {Users} from "@/model/User.ts";
import 'vue-toast-notification/dist/theme-sugar.css';
import {EyeIcon, EyeSlashIcon} from '@heroicons/vue/24/outline';
import {useToast} from "vue-toast-notification";
import {useAuthenticationStore} from "@/stores/AuthenticationStore.ts";
import router from "@/router";
const showPassword = ref(false);
const $toast = useToast();
const authStore = useAuthenticationStore();
const user = ref<Users>({
  id: "",
  username: "",
  password: "",
});
const LoginForm = async () => {
  if (!user.value.username || !user.value.password) {
    $toast.warning('All fields are required!',{
      position: 'top',
      type: 'warning',
      duration: 3000
    });
    return;
  }
  const success = await authStore.login({
    username: user.value.username,
    password: user.value.password
  });

  if (success) {
    $toast.success('Login successful!',{
      position: 'top',
      duration: 3000,
      type: 'success',
      pauseOnHover: true,


    });
    await router.push('/dashboard');
  } else {
    $toast.error(authStore.error?.message || 'Login failed');
  }
}





</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
    <!--    <h1 class="top-0 text-white text-end">go back</h1>-->
    <div class="fixed inset-0 bg-[url('../assets/login.jpg')] bg-cover bg-center bg-no-repeat z-0"
    ></div>
    <div class="fixed inset-0 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm z-10"
    ></div>
    <div class="w-full max-w-md px-4 z-20 relative font-serif">
      <h1 class="font-serif font-bold text-4xl mb-8 text-center text-white">Welcome Back</h1>
      <div class="bg-white p-8 rounded-md shadow-lg w-full border border-blue-800 backdrop-blur-sm">
        <form @submit.prevent="LoginForm">
          <div class="grid grid-cols-1 gap-4">
            <div class="mb-4">
              <label for="accountName" class="form-labels">
                User Name *
              </label>
              <input
                  type="text"
                  id="accountName"
                  v-model="user.username"
                  class="form-input"

              />
              <p v-if="!user.username" class="required-txt">
                User Name is required
              </p>
            </div>
            <div class="mb-4 relative">
              <label for="password" class="form-labels">Password *</label>
              <div class="relative">
                <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    v-model="user.password"
                    class="form-input pr-10"

                />
                <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                >
                  <component :is="showPassword ? EyeSlashIcon : EyeIcon" class="h-5 w-5"/>
                </button>
              </div>
              <p v-if="!user.password" class="required-txt">
                Password is required
              </p>
            </div>
            <div class="mt-6">
              <button type="submit"
                      class="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>