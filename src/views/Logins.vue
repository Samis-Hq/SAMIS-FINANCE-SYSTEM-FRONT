<script setup lang="ts">
import {ref, onMounted} from "vue";
import 'vue-toast-notification/dist/theme-sugar.css';
import {EyeIcon, EyeSlashIcon} from '@heroicons/vue/24/outline';
import {useToast} from "vue-toast-notification";
import {useAuthenticationStore} from "@/stores/AuthenticationStore.ts";

import router from "@/router";
import type {LoginRequest} from "@/model/Login.ts";
import type {RegisterSchoolModuleRequest} from "@/model/SchoolModuleRegister.ts";
import {SchoolModuleService} from "@/services/SchoolRegister.ts";

const showPassword = ref(false);
const $toast = useToast();
const authStore = useAuthenticationStore();
const schoolService = SchoolModuleService;
const showUserPassForm = ref(false);
const schoolName = ref("Welcome To SAMIS Finance");
const isLoading = ref(false);

const school = ref<RegisterSchoolModuleRequest>({
  schoolCode: "",
  moduleName: "FINANCE", // Default module
});

const user = ref<LoginRequest>({
  phoneNo: "",
  password: "",
});

onMounted(() => {
  const savedSchoolCode = localStorage.getItem('schoolCode');
  const savedSchoolName = localStorage.getItem('schoolName');
  if (savedSchoolCode) {
    school.value.schoolCode = savedSchoolCode;
    showUserPassForm.value = true;
  }
  if (savedSchoolName) {
    schoolName.value = savedSchoolName;
  }
});

const RegisterSchool = async () => {
  if (!school.value.schoolCode) {
    $toast.warning('School code is required!', {
      position: 'top',
      type: 'warning',
      duration: 3000
    });
    return;
  }

  try {
    isLoading.value = true;
    const response = await schoolService.registerSchoolModule({
      schoolCode: school.value.schoolCode,
      moduleName: school.value.moduleName
    });


    localStorage.setItem('schoolName', response.school.schoolName || '');
    schoolName.value = response.school.schoolName || schoolName.value;

    $toast.success('School module registered successfully!', {
      position: 'top',
      duration: 3000,
      type: 'success'
    });

    showUserPassForm.value = true;
  } catch (error) {
    $toast.error(error instanceof Error ? error.message : 'Failed to register school module', {
      position: 'top',
      duration: 3000
    });
  } finally {
    isLoading.value = false;
  }
};

const resetSchoolCode = () => {
  localStorage.removeItem('schoolCode');
  localStorage.removeItem('schoolName');
  school.value.schoolCode = '';
  schoolName.value = "Welcome To SAMIS Finance";
  showUserPassForm.value = false;
};

const LoginForm = async () => {
  if (!user.value.phoneNo || !user.value.password) {
    $toast.warning('Phone number and password are required!', {
      position: 'top',
      type: 'warning',
      duration: 3000
    });
    return;
  }

  try {
    isLoading.value = true;
    const success = await authStore.login({
      phoneNo: user.value.phoneNo,
      password: user.value.password,
    });

    if (success) {
      $toast.success('Login successful!,Redirecting....', {
        position: 'top',
        duration: 3000,
        type: 'success',
        pauseOnHover: true,
      });

      setTimeout(() => {
        router.push('/');
      }, 3000)

    }
  } catch (error) {
    $toast.error(authStore.error || 'Login failed', {
      position: 'top',
      duration: 3000,
    });
  } finally {
    isLoading.value = false;
  }
};
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
           <div>
             <h1 class="font-serif font-bold text-xl  text-center text-black capitalize">
               {{ schoolName }}
             </h1>
             <h1 class="font-serif font-bold text-sm  text-center text-black capitalize">
               P.o Box 200 ,Nakuru
             </h1>
             <h1 class="font-serif font-bold text-sm  text-center text-black capitalize">
               chris@gmail.com
             </h1>
             <h1 class="font-serif font-bold text-sm mb-8 text-center text-black capitalize">
               0711766223
             </h1>
           </div>
            <Transition name="fade" mode="out-in">
              <div v-if="!showUserPassForm" key="schoolCode">
                <div class="mb-4">
                  <label for="schoolCode" class="form-labels">
                    School Code*
                  </label>
                  <input
                      type="text"
                      id="schoolCode"
                      v-model="school.schoolCode"
                      class="form-input"
                  />
                  <p v-if="!school.schoolCode" class="required-txt">
                    School Code is required
                  </p>
                </div>

                <div class="mb-4">
                  <label for="moduleNAme" class="form-labels">
                    System Module*
                  </label>
                  <input
                      type="text"
                      id="schoolCode"
                      v-model="school.moduleName"
                      class="form-input"
                  />
                  <p v-if="!school.moduleName" class="required-txt">
                    Module is required
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
                    Phone No *
                  </label>
                  <input
                      type="text"
                      id="accountName"
                      v-model="user.phoneNo"
                      class="form-input"
                  />
                  <p v-if="!user.phoneNo" class="required-txt">
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