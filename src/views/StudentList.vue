<template>
  <div class="h-full">
    <!-- Header Buttons -->
    <div class="card-header">
      <h1
        @click="showStudentList"
        :class="{
          'bg-blue-700 text-white': isStudentListVisible,
          'bg-blue-300':
            !isStudentListVisible && loading && isAddStudentFormVisible,
        }"
        class="text-black px-4 py-2 mr-2 cursor-pointer"
      >
        Student List
      </h1>

      <h1
        @click="fetchStudents"
        v-if="isStudentListVisible"
        :class="{
          'bg-blue-700 text-white': loading,
          'bg-blue-300': !loading,
        }"
        class="text-black px-4 mr-2 py-2 cursor-pointer"
      >
        Reload Students
      </h1>

      <button
        @click="openAddStudentForm"
        :class="{
          'bg-blue-300': isStudentListVisible,
          'bg-blue-700 text-white': isAddStudentFormVisible,
        }"
        class="text-black px-4 py-2 cursor-pointer"
      >
        Add Student
      </button>
    </div>

    <!-- Student List -->
    <div
      v-if="isStudentListVisible"
      class="border rounded-sm shadow-md bg-white p-4 m-4"
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
              <th class="table-header">##</th>
              <th class="table-header">Adm No</th>
              <th class="table-header">Name</th>
              <th class="table-header">Class</th>
            </tr>
          </thead>
          <tbody class="table-bbody">
            <tr
              v-if="loading"
              class="flex justify-center items-center text-center"
            >
              <td colspan="3" class="table-data">Loading students...</td>
            </tr>

            <tr v-if="error">
              <td colspan="3" class="text-center py-4 text-red-500">
                Error loading students: {{ error.message }}
              </td>
            </tr>

            <tr v-if="!loading && !error && paginatedStudents.length === 0">
              <td colspan="3" class="table-data">No students found.</td>
            </tr>

            <tr v-for="(student, index) in paginatedStudents" :key="student.id">
              <td class="table-data">
                <div class="text-sm text-gray-900">
                  {{ (currentPage - 1) * itemsPerPage + index + 1 }}
                </div>
              </td>
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

    <Transition name="slide-down" mode="out-in">
      <AddStudentForm
        v-if="showAddStudentForm"
        @close="closeStudentForm"
        @save="submitForm"
      />
    </Transition>
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
import AddStudentForm from "./AddStudentForm.vue";

const studentsStore = useStudentsStore();
const { students, loading, error } = storeToRefs(studentsStore);
const { fetchStudents, addStudent } = studentsStore;

const isStudentListVisible = ref(true);
const isAddStudentFormVisible = ref(false);
const inputMethod = ref("keyIn");
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(20);

const showAddStudentForm = ref(false);

const openAddStudentForm = () => {
  showAddStudentForm.value = true;
  console.log("clicked to open student form");
};

const closeStudentForm = () => {
  showAddStudentForm.value = false;
};

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

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.5s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
