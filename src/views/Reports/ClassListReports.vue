<template>
  <div class="h-full">
    <div class="card-header mb-6">
      <h1 class="text-2xl font-bold">Class List Reports</h1>
    </div>
    <div class="flex gap-6 m-4">
      <div class="w-1/4 bg-white p-4 rounded-md shadow-md ">
        <h2 class="text-lg font-semibold mb-4">Filter Students</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Form</label>
            <select
                v-model="selectedForm"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Forms</option>
              <option v-for="form in forms" :key="form" :value="form">
                Form {{ form }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Stream</label>
            <select
                v-model="selectedStream"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Streams</option>
              <option v-for="stream in streams" :key="stream" :value="stream">
                {{ stream }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Students Table -->
      <div class="flex-1 bg-white p-4 rounded-md shadow-md">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Students List</h2>
          <div class="text-sm text-gray-500">
            Showing {{ filteredStudents.length }} students
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="my-table">
            <thead class="bg-gray-50">
            <tr>
              <th class="table-header">Adm No.</th>
              <th class="table-header">Name</th>
              <th class="table-header">Form</th>
              <th class="table-header">Stream</th>
              <th class="table-header">Actions</th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="student in filteredStudents" :key="student.admNo">
              <td class="table-data">{{ student.admNo }}</td>
              <td class="table-data">{{ student.name }} {{ student.name }}</td>
              <td class="table-data">Form{{ student.form }}</td>
              <td class="table-data">{{ student.stream }}</td>
              <td class="table-data">
                <button class="text-blue-600 hover:text-blue-900">View</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Sample data
const forms = [1, 2, 3, 4];
const streams = ['North', 'South', 'East', 'West'];

const students = [
  { admNo: '001', name: 'John Doe', form: 1, stream: 'North' },
  { admNo: '002', name: 'Jane Smith', form: 1, stream: 'South' },
  { admNo: '003', name: 'Mike Johnson', form: 2, stream: 'East' },
  { admNo: '004', name: 'Sarah Williams', form: 2, stream: 'West' },
  { admNo: '005', name: 'David Brown', form: 3, stream: 'North' },
  { admNo: '006', name: 'Emily Davis', form: 4, stream: 'South' },
];

// Filter controls
const selectedForm = ref('');
const selectedStream = ref('');

// Filtered students list
const filteredStudents = computed(() => {
  return students.filter(student => {
    const formMatch = !selectedForm.value || student.form === parseInt(selectedForm.value);
    const streamMatch = !selectedStream.value || student.stream === selectedStream.value;
    return formMatch && streamMatch;
  });
});
</script>

<style scoped>

</style>