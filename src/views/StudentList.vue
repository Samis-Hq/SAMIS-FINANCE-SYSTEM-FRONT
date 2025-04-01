<template>
  <div class="h-full">
    <div class="card-header">
      <h1
          @click="showStudentList"
          :class="{
          'bg-blue-700 text-white': isStudentListVisible,
          'bg-blue-300': !isStudentListVisible && loading && isAddStudentFormVisible,
        }"
          class="text-black px-4 py-2 mr-2 cursor-pointer">
        Student List
      </h1>
      <button
          @click="openAddStudentForm"
          :class="{
    'bg-blue-300': isStudentListVisible,
    'bg-blue-700 text-white': isAddStudentFormVisible,
  }" class="flex items-center gap-2 text-black px-4 py-2 cursor-pointer">
        <UserPlusIcon class="button-icon w-10 h-10 text-white"/>
        <span>Add Student</span>
      </button>
      <router-link to="/class" class="ml-4 my-button flex items-center gap-2 text-black px-4 py-2 cursor-pointer">
        <AcademicCapIcon class="button-icon w-10 h-10 text-white"/>
        <span> Manage Classes</span></router-link>
    </div>
    <div v-if="isStudentListVisible" class="border rounded-sm shadow-md bg-white p-4 m-4">
      <h2 class="text-xl font-bold mb-4">Student List</h2>
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
        <input
            type="text"
            v-model="searchQuery"
            placeholder="Search by Admission No, Name, or Class"
            class="search-input flex-grow sm:flex-grow-0"

        />

        <div class="w-full flex justify-end">
          <DataExporterView
              :data="filteredStudents"
              :columns="['admissionNumber', 'name', 'stream', 'contacts', 'kcpe']"
              title="Students Lists"
              :schoolDetails="{
                      name: 'SAMIS SAMPLE SECONDARY SCHOOL-NAKURU',
                      address: 'P.O. BOX 237-30705, Nakuru',
                      phone: '0711111111',
                      email: 'K@gmail.com' }"
              :classDetails="{
                           name: 'Form 3',
                           year: '2025',
                           teacher: 'KENETH'}"
              logoUrl=""
              fileName="Students_list"
          />

        </div>
      </div>
      <div>
        <table class="my-table">
          <thead class="bg-gray-50">
          <tr>
            <th class="table-header">##</th>
            <th class="table-header">Adm No</th>
            <th class="table-header">Name</th>
            <th class="table-header">Class</th>
            <th class="table-header">Actions</th>
          </tr>
          </thead>
          <tbody class="table-body">
          <tr v-if="loading" class="flex justify-center items-center text-center">
            <td colspan="5" class="table-data">Loading students...</td>
          </tr>

          <tr v-if="error">
            <td colspan="5" class="text-center py-4 text-red-500">
              Error loading students: {{ error.message }}
            </td>
          </tr>

          <tr v-if="!loading && !error && paginatedStudents.length === 0">
            <td colspan="5" class="table-data">No students found.</td>
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
            <td class="table-data">
              <button @click="viewStudent(student)" class="action-btn">
                <EyeIcon class="h-4 w-4"/>
              </button>
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
            <ChevronDoubleLeftIcon class="h-4 w-4 text-white"/>
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
            <ChevronDoubleRightIcon class="h-4 w-4 text-white"/>
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
import {computed, onMounted, ref} from "vue";
import {useStudentsStore} from "@/stores/StudentStore";
import {storeToRefs} from "pinia";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  EyeIcon, UserPlusIcon,
  PrinterIcon, PlusIcon, AcademicCapIcon
} from "@heroicons/vue/24/outline";
import AddStudentForm from "./AddStudentForm.vue";
import DataExporterView from "@/views/DataExporterView.vue";

const studentsStore = useStudentsStore();
const {students, loading, error} = storeToRefs(studentsStore);
const {fetchStudents, addStudent} = studentsStore;

const isStudentListVisible = ref(true);
const isAddStudentFormVisible = ref(false);
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(20);
const showAddStudentForm = ref(false);

const openAddStudentForm = () => {
  showAddStudentForm.value = true;
  isStudentListVisible.value = false;
  isAddStudentFormVisible.value = true;
};

const closeStudentForm = () => {
  showAddStudentForm.value = false;
  isStudentListVisible.value = true;
  isAddStudentFormVisible.value = false;
};

const showStudentList = () => {
  isStudentListVisible.value = true;
  isAddStudentFormVisible.value = false;
  showAddStudentForm.value = false;
};

onMounted(() => {
  fetchStudents();
});

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

const paginatedStudents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredStudents.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredStudents.value.length / itemsPerPage.value);
});

const form = ref({
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

const viewStudent = (student: any) => {
  console.log("View student:", student);
};

const printPDF = () => {
  window.print();
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
    showStudentList();
  } catch (err) {
    console.error("Error adding student:", err);
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

.card-header {
  display: flex;
  padding: 1rem;
  background-color: #f3f4f6;
  align-items: center;
}

.search-input {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  width: 100%;
}

.my-table {
  width: 100%;
  border-collapse: collapse;
}

.table-header {
  padding: 0.75rem;
  text-align: left;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  font-size: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.table-data {
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.table-body tr:hover {
  background-color: #f9fafb;
}

.disabled-button {
  background-color: #3b82f6;
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  margin: 0 0.25rem;
}

.disabled-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn {
  padding: 0.25rem;
  margin: 0 0.25rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.action-btn:hover {
  background-color: #e5e7eb;
}

.export-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.25rem;
  margin-left: 0.5rem;
}

.button-icon {
  width: 1rem;
  height: 1rem;
}

.my-button {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.25rem;
  text-decoration: none;
}
</style>