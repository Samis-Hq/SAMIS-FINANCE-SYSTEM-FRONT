<template>
  <div class="h-full mt-20">
    <!-- Header Buttons -->
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

      <button @click="fetchStudents" class="my-button">Reload Students</button>

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
        Close
      </button>
    </div>

    <!-- Add Student Form -->
    <div
      v-if="isAddStudentFormVisible"
      class="border rounded-sm shadow-md bg-white items-start p-4 w-full md:w-5/6 mx-auto"
    >
      <h2 class="text-xl font-bold mb-4">Add Student</h2>

      <!-- Input Method Selection -->
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

      <!-- Key In Form -->
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
              <option value="Hostel">Boarding</option>
              <option value="Day">Day</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="form-labels"> Upload Student Image </label>
            <input type="file" @change="handleFileUpload" class="form-input" />
          </div>
        </div>

        <div class="mt-6">
          <button type="submit" class="my-button">Submit</button>
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
      </div>
    </div>

    <!-- Student List -->
    <div
      v-if="isStudentListVisible"
      class="border rounded-sm shadow-md bg-white p-4"
    >
      <h2 class="text-xl font-bold mb-4">Student List</h2>

      <!-- Search Input -->
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by Admission No, Name, or Class"
        class="search-input"
      />

      <div>
        <table class="my-table">
          <thead class="bg-gray-50">
            <tr>
              <th class="table-header">Adm No</th>
              <th class="table-header">Name</th>
              <th class="table-header">Class</th>
            </tr>
          </thead>
          <tbody class="table-bbody">
            <tr v-if="loading" class="flex justify-center items-center text-center">
              <td colspan="3" class="table-data  ">Loading students...</td>
            </tr>

            <tr v-if="error">
              <td colspan="3" class="text-center py-4 text-red-500">
                Error loading students: {{ error.message }}
              </td>
            </tr>

            <tr v-if="!loading && !error && paginatedStudents.length === 0">
              <td colspan="3" class="table-data">No students found.</td>
            </tr>

            <tr v-for="student in paginatedStudents" :key="student.id">
              <td class="table-data">
                <div class="text-sm text-gray-900">
                  {{ student.admissionNumber }}
                </div>
              </td>
              <td class="table-data">
                <div class="text-sm text-gray-900">
                  {{ student.name }}
                </div>
              </td>
              <td class="table-data">
                <div class="text-sm text-gray-900">
                  {{ student.form }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="flex justify-center items-center mt-4">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="disabled-button"
          >
            <ChevronDoubleLeftIcon class="h-4 w-4 text-white" />
          </button>
          <span class="text-sm text-gray-700 m-4">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <button
            v-if="totalPages > 0"
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="disabled-button"
          >
            <ChevronDoubleRightIcon class="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStudentsStore } from "@/stores/StudentStore";
import { storeToRefs } from "pinia";
import type { Student } from "@/model/students";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/24/outline";

const studentsStore = useStudentsStore();
const { students, loading, error } = storeToRefs(studentsStore);
const { fetchStudents, addStudent } = studentsStore;

const isStudentListVisible = ref(true);
const isAddStudentFormVisible = ref(false);
const inputMethod = ref("keyIn");
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(20);

onMounted(() => {
  fetchStudents();
});
const paginatedStudents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredStudents.value.slice(start, end);
});

const totalPages = computed(() => {
  console.log("total pages:", filteredStudents.value.length);
  return Math.ceil(filteredStudents.value.length / itemsPerPage.value);
});

// Filtered students
const filteredStudents = computed(() => {
  if (!searchQuery.value) {
    return students.value;
  }

  const query = searchQuery.value.toLowerCase();

  return students.value.filter((student) => {
    return (
      student.admissionNumber.toLowerCase().includes(query) ||
      student.name.toLowerCase().includes(query) ||
      student.form.toLowerCase().includes(query)
    );
  });
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

const showStudentList = () => {
  isStudentListVisible.value = true;
  isAddStudentFormVisible.value = false;
};

const showAddStudentForm = () => {
  isStudentListVisible.value = false;
  isAddStudentFormVisible.value = true;
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
    showStudentList();
  } catch (err) {
    console.error("Error adding student:", err);
    alert("Failed to add student.");
  }
};
</script>
