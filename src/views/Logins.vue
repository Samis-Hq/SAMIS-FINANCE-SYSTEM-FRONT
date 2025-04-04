<script setup lang="ts">
import {ref, onMounted} from "vue";
import type {Users} from "@/model/User.ts";
import 'vue-toast-notification/dist/theme-sugar.css';
import {EyeIcon, EyeSlashIcon} from '@heroicons/vue/24/outline';
import {useToast} from "vue-toast-notification";
import {useAuthenticationStore} from "@/stores/AuthenticationStore.ts";
import router from "@/router";

const showPassword = ref(false);
const $toast = useToast();
const authStore = useAuthenticationStore();
const showUserPassForm = ref(false);
const schoolName = ref("Welcome To SAMIS Finance");
const user = ref<Users>({
  id: "",
  username: "",
  password: "",
  schoolCode: "",
});

onMounted(() => {
  const savedSchoolCode = localStorage.getItem('schoolCode');
  const savedSchoolName = localStorage.getItem('schoolName');
  if (savedSchoolCode) {
    user.value.schoolCode = savedSchoolCode;
    showUserPassForm.value = true;
  }
  if (savedSchoolName) {
    schoolName.value = savedSchoolName;
  }
});

const RegisterSchool = () => {
  if (!user.value.schoolCode) {
    $toast.warning('School code is required!', {
      position: 'top',
      type: 'warning',
      duration: 3000
    });
    return;
  }
  localStorage.setItem('schoolCode', user.value.schoolCode);
  localStorage.setItem('schoolName', "SAMIS SAMPLE SCHOOL");
  localStorage.setItem('userRegion', "Mombasa");
  schoolName.value = "SAMIS SAMPLE SCHOOL";
  showUserPassForm.value = true;
};

const resetSchoolCode = () => {
  localStorage.removeItem('schoolCode');
  localStorage.removeItem('schoolName');
  user.value.schoolCode = '';
  schoolName.value = "Welcome To SAMIS Finance";
  showUserPassForm.value = false;
};

const LoginForm = async () => {
  if (!user.value.username || !user.value.password) {
    $toast.warning('Username and password are required!', {
      position: 'top',
      type: 'warning',
      duration: 3000
    });
    return;
  }

  if (!user.value.schoolCode) {
    const savedSchoolCode = localStorage.getItem('schoolCode');
    if (savedSchoolCode) {
      user.value.schoolCode = savedSchoolCode;
    }
  }

  const success = await authStore.login({
    username: user.value.username,
    password: user.value.password,
    schoolCode: user.value.schoolCode
  });

  if (success) {
    $toast.success('Login successful!', {
      position: 'top',
      duration: 3000,
      type: 'success',
      pauseOnHover: true,
    });
    await router.push('/');
  } else {
    $toast.error(authStore.error?.message || 'Login failed', {
      position: 'top',
      duration: 3000,
    });
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
    <div class="fixed top-0 left-0 container mx-auto right-0 z-30 flex
    justify-around items-center p-4 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm">
      <span class="text-white font-serif font-bold text-3xl">SAMIS FINANCE</span>
      <router-link to="/home" class=" text-white hover:bg-blue-400  p-2 rounded-md
      shadow-md transition-colors font-serif"> Go Back
      </router-link>
    </div>
    <div class="fixed inset-0 bg-[url('../assets/login.jpg')] bg-cover bg-center bg-no-repeat z-0"></div>
    <div class="fixed inset-0 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm z-10 "></div>
    <div class="w-full max-w-md px-4 z-20 relative font-serif">

      <div class="bg-blue-300 p-8 rounded-md shadow-lg w-full border border-blue-800 backdrop-blur-sm">
        <form @submit.prevent="showUserPassForm ? LoginForm() : RegisterSchool()">
          <div class="grid grid-cols-1 gap-4">
            <h1 class="font-serif font-bold text-xl mb-8 text-center text-black capitalize">
              {{ schoolName }}
            </h1>

            <Transition name="fade" mode="out-in">
              <div v-if="!showUserPassForm" key="schoolCode">
                <div class="mb-4">
                  <label for="schoolCode" class="form-labels">
                    School Code*
                  </label>
                  <input
                      type="text"
                      id="schoolCode"
                      v-model="user.schoolCode"
                      class="form-input"
                  />
                  <p v-if="!user.schoolCode" class="required-txt">
                    School Code is required
                  </p>
                </div>
              </div>

              <div v-else key="loginForm">
                <div class="text-right mb-2">
                  <button
                      @click="resetSchoolCode"
                      type="button"
                      class="text-blue-800 text-sm hover:underline font-medium"
                  >
                    Change School Code
                  </button>
                </div>

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
              </div>
            </Transition>

            <div class="mt-6">
              <button
                  type="submit"
                  class="w-full bg-blue-600 text-white px-4 py-2 rounded-md
                   hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="authStore.isLoading"
              >
                {{
                  authStore.isLoading ? 'Processing...' :
                      showUserPassForm ? 'Login' : 'Continue'
                }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>