<template>
  <div class="modal-overlay z-50">
    <div class="bg-white p-6 rounded-md shadow-md  w-2/3 md:w-1/3">
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
      <div v-if="error" class="required-txt my-2">{{ error.message }}</div>

      <form v-if="inputMethod === 'keyIn'" @submit.prevent="submitForm">
        <div class="grid grid-cols-2 gap-4">
          <div class="mb-4">
            <label for="admissionNumber" class="form-labels">
              Admission Number *
            </label>
            <input
              type="text"
              id="admissionNumber"
              v-model="form.admissionNumber"
              class="form-input"
              required
            />
            <p v-if="!form.admissionNumber" class="text-red-500 text-sm mt-1">
              Admission number is required
            </p>
          </div>

          <div class="mb-4">
            <label for="name" class="form-labels"> Name * </label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="form-input"
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
            <select id="form" v-model="form.form" class="form-input" required>
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
            <label for="stream" class="block text-sm font-medium text-gray-700">
              Stream *
            </label>
            <select
              id="stream"
              v-model="form.stream"
              class="form-input"
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
                    value="Male"
                    class="form-radio h-4 w-4 text-blue-600"
                    required
                  />
                  <span class="ml-2">Male</span>
                </label>
                <label class="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    v-model="form.gender"
                    value="Female"
                    class="form-radio h-4 w-4 text-blue-600"
                    required
                  />
                  <span class="ml-2">Female</span>
                </label>
              </div>
            </div>

            <div>
              <label for="phone" class="form-labels"> Phone Number </label>
              <input
                type="tel"
                id="phone"
                v-model="form.phone"
                class="form-input"
                placeholder="+254 712 3## ###"
              />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="mb-4">
            <label for="residence" class="form-labels"> Residence </label>
            <select id="residence" v-model="form.residence" class="form-input">
              <option value="" disabled>Select Residence</option>
              <option value="Boarding">Boarding</option>
              <option value="Day">Day</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="form-labels"> Upload Student Image </label>
            <input type="file" @change="handleFileUpload" class="form-input" />
          </div>
        </div>
        <div class="mt-6">
          <button
            type="button"
            @click="close"
            class="mr-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Cancel
          </button>
          <button type="submit" class="my-button" :disabled="loading">
            {{ loading ? "Adding Student..." : "Submit" }}
          </button>
        </div>
      </form>

      <!-- Bulk Upload Form -->
      <div v-if="inputMethod === 'upload'" class="mt-4">
        <label class="block text-sm font-medium text-gray-700">
          Upload Student Details (CSV/Excel)
        </label>
        <input
          type="file"
          @change="handleBulkUpload"
          class="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <p class="text-sm text-gray-500 mt-2">
          Ensure the file contains columns: Admission Number, Name, Form,
          Stream, Gender, Primary Phone, Secondary Phone, Residence.
        </p>

        <p v-if="uploadProgress > 0" class="mt-2 text-sm text-green-600">
          Uploading: {{ uploadProgress }}%
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStudentsStore } from "@/stores/StudentStore";
import { storeToRefs } from "pinia";
import type { Student } from "@/model/students";

const emit = defineEmits(["close", "save"]);
const studentsStore = useStudentsStore();
const { students, loading, error } = storeToRefs(studentsStore);
const { fetchStudents, addStudent } = studentsStore;
const uploadProgress = ref(0);

const inputMethod = ref("keyIn");


onMounted(() => {
  fetchStudents();
});



// Form data
const form = ref<Student>({
  id: "",
  admissionNumber: "",
  name: "",
  form: "",
  stream: "",
  gender: "",
  phone: "",
  residence: "",
  image: null as File | null,
});
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    form.value.image = target.files[0];
  }
};

const handleBulkUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    console.log("Uploaded file:", file);
  }
};


const close = () => {
  emit("close");
};

const submitForm = async () => {
  if (
    !form.value.admissionNumber ||
    !form.value.name ||
    !form.value.form ||
    !form.value.stream ||
    !form.value.gender
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  try {
    await addStudent(form.value);
    alert("Student added successfully!");
    fetchStudents()
  } catch (err) {
    console.error("Error adding student:", err);
    alert("Failed to add student.");
  }
};
</script>
