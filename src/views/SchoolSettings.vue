<template>
  <div class="h-full mt-20">
    <div
      class="flex justify-between border rounded-sm shadow-md bg-white p-2 mb-4"
    >
      <button
        @click="showSchoolSettings"
        :class="{
          'bg-blue-700': isSchoolProfileVisible,
          'bg-blue-500': !isSchoolProfileVisible,
        }"
        class="text-white px-4 py-2 rounded"
      >
        School Profile
      </button>
      <button
        @click="showotherSettingsForm"
        :class="{
          'bg-blue-700': isOtherSettingsVisible,
          'bg-blue-500': !isOtherSettingsVisible,
        }"
        class="text-white px-4 py-2 rounded"
      >
        other Settings
      </button>
    </div>

    <div
      v-if="isOtherSettingsVisible"
      class="border rounded-sm shadow-md bg-white p-4"
    >
      <h2 class="text-xl font-bold mb-4">Other Settings</h2>
      <div class="flex items-center mb-6">
        <label class="flex items-center mr-6">
          <input
            type="radio"
            v-model="inputMethod"
            value="keyIn"
            class="form-radio h-4 w-4 text-blue-600"
          />
          <span class="ml-2">other settings</span>
        </label>
      </div>

      <div v-if="inputMethod === 'keyIn'" @submit.prevent="submitForm">
        <p>other settings</p>
      </div>
    </div>

    <div
      v-if="isSchoolProfileVisible"
      class="flex flex-col md:flex-row gap-4 border rounded-sm shadow-md bg-white p-4"
    >
      <div class="rounded-sm shadow-md bg-white p-4">
        <div class="flex flex-col items-center">
          <img
            src="../assets/home.png"
            alt="School"
            width="200"
            height="300"
            class="rounded-full"
          />
          <h1 class="text-2xl font-bold mt-4">{{ school.schoolName }}</h1>
          <p class="text-gray-600 italic">{{ school.schoolMotto }}</p>
          <div class="text-start items-start">
            <p class="text-gray-600">{{ school.schoolAddress }}</p>
          <p class="text-gray-600">{{ school.schoolEmail }}</p>
          <p class="text-gray-600">{{ school.schoolPhone }}</p>
         
          </div>
        </div>
      </div>

      <div class="rounded-sm shadow-md bg-white p-4 flex-1">
        <h2 class="text-xl font-bold mb-4">Update School Details</h2>
        <form @submit.prevent="submitForm">
          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label
                for="schoolLogo"
                class="block text-sm font-medium text-gray-700"
              >
                Upload School Logo
              </label>
              <input
                type="file"
                id="schoolLogo"
                @change=""
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div class="mb-4">
              <label
                for="schoolName"
                class="block text-sm font-medium text-gray-700"
              >
                School Name *
              </label>
              <input
                type="text"
                id="schoolName"
                v-model="school.schoolName"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <p v-if="!school.schoolName" class="text-red-500 text-sm mt-1">
                School name is required
              </p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label
                for="schoolAddress"
                class="block text-sm font-medium text-gray-700"
              >
                School Address *
              </label>
              <input
                type="text"
                id="schoolAddress"
                v-model="school.schoolAddress"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <p v-if="!school.schoolAddress" class="text-red-500 text-sm mt-1">
                School address is required
              </p>
            </div>

            <div class="mb-4">
              <label
                for="schoolEmail"
                class="block text-sm font-medium text-gray-700"
              >
                School Email *
              </label>
              <input
                type="email"
                id="schoolEmail"
                v-model="school.schoolEmail"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <p v-if="!school.schoolEmail" class="text-red-500 text-sm mt-1">
                School email is required
              </p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label
                for="schoolPhone"
                class="block text-sm font-medium text-gray-700"
              >
                School Phone *
              </label>
              <input
                type="tel"
                id="schoolPhone"
                v-model="school.schoolPhone"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <p v-if="!school.schoolPhone" class="text-red-500 text-sm mt-1">
                School phone is required
              </p>
            </div>

            <div class="mb-4">
              <label
                for="schoolMotto"
                class="block text-sm font-medium text-gray-700"
              >
                School Motto *
              </label>
              <input
                type="text"
                id="schoolMotto"
                v-model="school.schoolMotto"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <p v-if="!school.schoolMotto" class="text-red-500 text-sm mt-1">
                School motto is required
              </p>
            </div>
          </div>
          <div class="mt-6">
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Update Details
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

import type { SchoolProfile } from "@/model/SchoolProfile";

export default {
  setup() {
    const isSchoolProfileVisible = ref(true);
    const isOtherSettingsVisible = ref(false);
    const inputMethod = ref("keyIn");
    const isLoading = ref(false);
    const errorMessage = ref(false);

    const school = ref<SchoolProfile>({
      id: "",
      schoolName: "Samis Sample school",
      schoolAddress: "po box 1234",
      schoolEmail: " email.com",
      schoolPhone: "o711766223",
      schoolMotto: "Only the best",
      schoolLogo: null,
    });

    const handleLogoUpload = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const schoolLogo = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    };

    const submitForm = () => {
      console.log("Form Submitted:", {});
    };

    const showSchoolSettings = () => {
      isSchoolProfileVisible.value = true;
      isOtherSettingsVisible.value = false;
    };

    const showotherSettingsForm = () => {
      isSchoolProfileVisible.value = false;
      isOtherSettingsVisible.value = true;
    };

    return {
      isSchoolProfileVisible,
      isOtherSettingsVisible,
      inputMethod,
      school,
      showSchoolSettings,
      showotherSettingsForm,
      submitForm,
    };
  },
};
</script>
