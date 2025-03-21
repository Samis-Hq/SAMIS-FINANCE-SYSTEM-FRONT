<template>
  <div class="h-full mt-20">
    <div
      class="flex justify-between border rounded-sm shadow-md bg-white p-2 mb-4"
    >
      <button
        @click="showStudentList"
        :class="{
          'bg-blue-700': isStudentListVisible,
          'bg-blue-500': !isStudentListVisible,
        }"
        class="text-white px-4 py-2 rounded"
      >
        Student List
      </button>

      <button
        v-if="isStudentListVisible"
        @click="showAddStudentForm"
        :class="{
          'bg-blue-700': isAddStudentFormVisible,
          'bg-blue-500': !isAddStudentFormVisible,
        }"
        class="text-white px-4 py-2 rounded"
      >
        Add Student
      </button>
      <button
        v-if="isAddStudentFormVisible"
        @click="showStudentList"
        :class="{
          'bg-red-700': isAddStudentFormVisible,
          'bg-red-500': !isAddStudentFormVisible,
        }"
        class="text-white px-4 py-2 rounded"
      >
        close
      </button>
    </div>

    <div>
      <div
        v-if="isAddStudentFormVisible"
        class="border rounded-sm shadow-md bg-white items-start p-4 w-1/2 mx-auto"
      >
        <h2 class="text-xl font-bold mb-4">Add Student</h2>

        <div class="flex items-center mb-6">
          <label class="flex items-center mr-6">
            <input
              type="radio"
              v-model="inputMethod"
              value="keyIn"
              class="form-radio h-4 w-4 text-blue-600"
            />
            <span class="ml-2">Key in Student Details</span>
          </label>
          <label class="flex items-center">
            <input
              type="radio"
              v-model="inputMethod"
              value="upload"
              class="form-radio h-4 w-4 text-blue-600"
            />
            <span class="ml-2">Upload Multiple Students</span>
          </label>
        </div>

        <form v-if="inputMethod === 'keyIn'" @submit.prevent="submitForm">
          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label
                for="admissionNumber"
                class="block text-sm font-medium text-gray-700"
              >
                Admission Number *
              </label>
              <input
                type="text"
                id="admissionNumber"
                v-model="form.admissionNumber"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <p v-if="!form.admissionNumber" class="text-red-500 text-sm mt-1">
                Admission number is required
              </p>
            </div>

            <div class="mb-4">
              <label for="name" class="block text-sm font-medium text-gray-700">
                Name *
              </label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <p v-if="!form.name" class="text-red-500 text-sm mt-1">
                Name is required
              </p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label for="form" class="block text-sm font-medium text-gray-700">
                Form *
              </label>
              <select
                id="form"
                v-model="form.form"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="" disabled>Select Form</option>
                <option value="Form 1">Form 1</option>
                <option value="Form 2">Form 2</option>
                <option value="Form 3">Form 3</option>
                <option value="Form 4">Form 4</option>
              </select>
              <p v-if="!form.form" class="text-red-500 text-sm mt-1">
                Form is required
              </p>
            </div>

            <div class="mb-4">
              <label
                for="stream"
                class="block text-sm font-medium text-gray-700"
              >
                Stream *
              </label>
              <select
                id="stream"
                v-model="form.stream"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="" disabled>Select Stream</option>
                <option value="East">East</option>
                <option value="West">West</option>
                <option value="North">North</option>
                <option value="South">South</option>
              </select>
              <p v-if="!form.stream" class="text-red-500 text-sm mt-1">
                Stream is required
              </p>
            </div>
          </div>
          <div class="mb-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Gender *
                </label>
                <div class="mt-1">
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      v-model="form.gender"
                      value="Female"
                      class="form-radio h-4 w-4 text-blue-600"
                      required
                    />
                    <span class="ml-2">Female</span>
                  </label>
                  <label class="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      v-model="form.gender"
                      value="Male"
                      class="form-radio h-4 w-4 text-blue-600"
                      required
                    />
                    <span class="ml-2">Male</span>
                  </label>
                </div>
              </div>

              <div>
                <label
                  for="phone"
                  class="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  v-model="form.phone"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+254 712 3## ###"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label
                for="residence"
                class="block text-sm font-medium text-gray-700"
              >
                Residence
              </label>
              <select
                id="residence"
                v-model="form.residence"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>Select Residence</option>
                <option value="Hostel">Hostel</option>
                <option value="Day">Day</option>
              </select>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">
                Upload Student Image
              </label>
              <input
                type="file"
                @change="handleImageUpload"
                class="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div class="mt-6">
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>

        <div v-if="inputMethod === 'upload'" class="mt-4">
          <label class="block text-sm font-medium text-gray-700">
            Upload Student Details (CSV/Excel)
          </label>
          <input
            type="file"
            @change="handleFileUpload"
            class="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <p class="text-sm text-gray-500 mt-2">
            Ensure the file contains columns: Admission Number, Name, Form,
            Stream, Gender, Primary Phone, Secondary Phone, Residence.
          </p>
        </div>
      </div>
    </div>
    <div
      v-if="isStudentListVisible"
      class="border rounded-sm shadow-md bg-white p-4"
    >
      <div class="flex justify-between mb-4">
        <h2 class="text-xl font-bold mb-4">Student List</h2>
        <input
          type="search"
          name="search"
          id="search"
          class="w-1/3 md:w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all"
          placeholder="Search Student"
        />
      </div>

      <p>List of students will be displayed here.</p>
    </div>
  </div>
</template>

<script lang="ts">
import type { Student } from "@/model/students";
import { ref } from "vue";

export default {
  setup() {
    const isStudentListVisible = ref(true);
    const isAddStudentFormVisible = ref(false);
    const inputMethod = ref("keyIn");
    const form = ref<Student>({
      id: "",
      admissionNumber: "",
      name: "",
      form: "",
      stream: "",
      gender: "",
      phone: "",
      residence: "",
      image: null,
    });
    const handleImageUpload = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        form.value.image = target.files[0];
      }
    };

    const handleFileUpload = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        console.log("Uploaded file:", file);
      }
    };

    const showStudentList = () => {
      isStudentListVisible.value = true;
      isAddStudentFormVisible.value = false;
    };

    const showAddStudentForm = () => {
      isStudentListVisible.value = false;
      isAddStudentFormVisible.value = true;
    };

    const submitForm = () => {
      console.log("Form Submitted:", form.value);
      // Add logic to submit the form data
    };

    return {
      isStudentListVisible,
      isAddStudentFormVisible,
      form,
      inputMethod,
      handleFileUpload,
      showStudentList,
      showAddStudentForm,
      handleImageUpload,
      submitForm,
    };
  },
};
</script>
