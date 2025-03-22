<template>
  <div class="h-full mt-20 px-10">
    <div
      class="flex justify-between border rounded-sm shadow-md bg-white p-2 mb-4"
    ></div>

    <div class="flex flex-col md:flex-row gap-4 p-4">
      <div class="rounded-sm shadow-md bg-white p-6 relative">
        <div class="flex flex-col items-center justify-center">
          <div class="relative">
            <img
              src="../assets/user.png"
              alt="User"
              width="100"
              height="100"
              class="rounded-full"
            />

            <button
              class="bg-gray-500 px-2 rounded-sm text-white mt-2 shadow-md hover:bg-blue-700"
            >
              Edit Image
            </button>
          </div>

          <h1 class="text-2xl font-bold mt-4">{{ user.name }}</h1>
          <p class="text-gray-600 italic">{{ user.role }}</p>
          <div class="text-start">
            <p class="text-gray-600">{{ user.email }}</p>
            <p class="text-gray-600">{{ user.phone }}</p>
          </div>
        </div>
      </div>

      <div class="rounded-sm shadow-md bg-white p-6 flex-1">
        <h2 class="text-xl font-bold mb-4">Update User Details</h2>
        <form @submit.prevent="submitForm">
          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label
                for="schoolName"
                class="block text-sm font-medium text-gray-700"
              >
                Name *
              </label>
              <input
                type="text"
                id="name"
                v-model="user.name"
                class="form-input"
                required
              />
            </div>

            <!-- School Address -->
            <div class="mb-4">
              <label
                for="schoolAddress"
                class="form-labels"
              >
                User Role
              </label>
              <input
                type="text"
                id="role"
                disabled
                v-model="user.role"
                class="form-input"
                required
              />
            </div>

            <div class="mb-4">
              <label
                for="schoolEmail"
                class="block text-sm font-medium text-gray-700"
              >
                Email *
              </label>
              <input
                type="email"
                id="schoolEmail"
                disabled
                v-model="user.email"
                class="form-input"
                required
              />
            </div>

            <!-- School Phone -->
            <div class="mb-4">
              <label
                for="schoolPhone"
                class="block text-sm font-medium text-gray-700"
              >
                Phone *
              </label>
              <input
                type="tel"
                id="schoolPhone"
                v-model="user.phone"
                class="form-input"
                required
              />
            </div>
          </div>

          <!-- Submit Button -->
          <div class="mt-6">
            <button type="submit" class="my-button">Update Details</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import type { UserProfile } from "@/model/UserProfile";
import { PencilIcon } from "@heroicons/vue/24/outline";


    const user = ref<UserProfile>({
      id: "",
      name: "KENETH KIPYEGON",
      image: null,
      phone: "07117666223",
      email: "k@gmail.com",
      role: "ADMIN",
    });

    const handleLogoUpload = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const image = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    };

    const submitForm = () => {
      console.log("Form Submitted:", {});
    };

  
</script>
