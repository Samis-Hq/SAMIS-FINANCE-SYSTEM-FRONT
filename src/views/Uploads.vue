<template>
  <div class="h-full">
    <div class="card-header">
      <h2 class="text-3xl text-center font-bold ml-4 mb-4">Import Data</h2>
    </div>
    <h2 class="text-xl font-bold mb-4 capitalize p-4 text-blue-500">
      Bring Your existing Data To SAMIS System
    </h2>

    <div class="flex flex-col md:flex-row gap-4 m-4 bg-white p-4">
      <!-- Student Import Button -->
      <button
          @click="openImportForm('students')"
          class="import-buttons"
      >
        <PlusIcon class="h-10 w-10 text-white font-bold"/>
        <h1 class="text-black hover:text-white">Students</h1>
      </button>

      <!-- Staff Import Button -->
      <button
          @click="openImportForm('staff')"
          class="import-buttons"
      >
        <PlusIcon class="h-10 w-10 text-white font-bold"/>
        <h1 class="text-black hover:text-white">Staff</h1>
      </button>

      <!-- Charges Import Button -->
      <button
          @click="openImportForm('charges')"
          class="import-buttons"
      >
        <PlusIcon class="h-10 w-10 text-white font-bold"/>
        <h1 class="text-black hover:text-white">Charges</h1>
      </button>

      <!-- Receipts Import Button -->
      <button
          @click="openImportForm('receipts')"
          class="import-buttons"
      >
        <PlusIcon class="h-10 w-10 text-white font-bold"/>
        <h1 class="text-black hover:text-white">Receipts</h1>
      </button>
    </div>

    <!-- Import Form (shown when importType is set) -->
    <div v-if="importType" class="m-4 p-6 bg-white rounded-lg shadow-md">
      <h3 class="text-xl font-semibold mb-4">Import {{ capitalizeFirstLetter(importType) }}</h3>

      <!-- File Upload Section with PaperClip Icon -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Upload Excel File</label>
        <div class="flex items-center">
          <!-- Hidden file input -->
          <input
              id="file-upload"
              type="file"
              ref="fileInput"
              @change="handleFileUpload"
              accept=".xlsx, .xls, .csv"
              class="hidden"
          />

          <!-- Visible PaperClip icon that triggers file input -->
          <button
              type="button"
              @click="$refs.fileInput.click()"
              class="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            <PaperClipIcon class="h-6 w-6 text-blue-600"/>
          </button>

          <!-- Show selected file name if a file is chosen -->
          <span v-if="file" class="ml-3 text-sm text-gray-700 truncate max-w-xs">
        {{ file.name }}


      </span>

          <span>({{ (file?.size / 1024).toFixed(2) }} KB)</span>
        </div>
        <p class="mt-1 text-sm text-gray-500">Supports .xlsx, .xls, and .csv files</p>
      </div>

      <!-- Preview Section -->
      <div v-if="excelData.length > 0" class="mb-6">
        <h4 class="text-lg font-medium mb-3">Data Preview (first 5 rows)</h4>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
              <th v-for="(header, index) in excelHeaders" :key="index"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ header }}
              </th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(row, rowIndex) in excelData.slice(0, 5)" :key="rowIndex">
              <td v-for="(cell, cellIndex) in row" :key="cellIndex"
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ cell }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Header Mapping Section (shown when file is loaded) -->
      <div v-if="excelHeaders.length > 0" class="mb-6">
        <h4 class="text-lg font-medium mb-3">Map Excel Columns to SAMIS Fields</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="(requiredField, index) in requiredFields[importType]" :key="index" class=" items-center">
            <label class="w-1/3 text-sm font-medium text-gray-700">
              {{ requiredField.label }}
              <span class="text-red-500">*</span>
            </label>
            <select
                v-model.trim="fieldMappings[requiredField.name]"
                class="form-input"
                required
            >
              <option value="">Select Excel column</option>
              <option v-for="(header, idx) in excelHeaders" :key="idx" :value="header">
                {{ header }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <!-- Action Buttons -->
      <div class="flex justify-end space-x-3 mt-6">
        <button
            @click="cancelImport"
            class="cancel-button"
        >
          Cancel
        </button>
        <button
            @click="submitImport"
            :disabled="!canSubmit"
            class="submit-excel-button"
        >
          Import Data
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import * as XLSX from 'xlsx';
import {PlusIcon, PaperClipIcon} from "@heroicons/vue/24/outline";

const importType = ref<string | null>(null);
const excelHeaders = ref<string[]>([]);
const excelData = ref<any[][]>([]);
const file = ref<File | null>(null);
const fieldMappings = ref<Record<string, string>>({});

// Define required fields for each import type
const requiredFields = {
  students: [
    {name: 'admno', label: 'Admission Number'},
    {name: 'name', label: 'Full Name'},
    {name: 'class', label: 'Class'},
    {name: 'stream', label: 'Stream'},
  ],
  staff: [
    {name: 'staffNo', label: 'Staff Number'},
    {name: 'name', label: 'Full Name'},
    {name: 'department', label: 'Department'},
  ],
  charges: [
    {name: 'chargeCode', label: 'Charge Code'},
    {name: 'description', label: 'Description'},
    {name: 'amount', label: 'Amount'},
  ],
  receipts: [
    {name: 'receiptNo', label: 'Receipt Number'},
    {name: 'studentAdmno', label: 'Student Admno'},
    {name: 'amount', label: 'Amount'},
  ]
};

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const openImportForm = (type: string) => {
  importType.value = type;
  // Reset previous mappings
  fieldMappings.value = {};
  excelHeaders.value = [];
  excelData.value = [];
  file.value = null;
};

const cancelImport = () => {
  importType.value = null;
};

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (!files || files.length === 0) return;

  file.value = files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, {type: 'array'});
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Convert to JSON and get headers
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});
      if (jsonData.length > 0) {
        excelHeaders.value = jsonData[0] as string[];
        excelData.value = jsonData.slice(1) as any[][];
      }
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing file. Please check the file format.');
    }
  };

  reader.readAsArrayBuffer(files[0]);
};

const canSubmit = computed(() => {
  if (!importType.value || excelHeaders.value.length === 0) return false;

  // Check if all required fields are mapped
  return requiredFields[importType.value].every(field =>
      fieldMappings.value[field.name] && fieldMappings.value[field.name].trim() !== ''
  );
});

const submitImport = () => {
  if (!canSubmit.value || !importType.value) return;

  // Process the data with the mappings
  const processedData = excelData.value.map(row => {
    const item: Record<string, any> = {};
    requiredFields[importType.value].forEach(field => {
      const excelCol = fieldMappings.value[field.name];
      const colIndex = excelHeaders.value.indexOf(excelCol);
      item[field.name] = colIndex >= 0 ? row[colIndex] : null;
    });
    return item;
  });

  console.log('Processed data:', processedData);
  // Here you would typically send the processedData to your backend API
  alert(`${processedData.length} ${importType.value} records ready for import!`);

  // Reset after submission
  importType.value = null;
};
</script>

<style scoped>
.transition-colors {
  transition: background-color 0.2s ease, color 0.2s ease;
}
</style>