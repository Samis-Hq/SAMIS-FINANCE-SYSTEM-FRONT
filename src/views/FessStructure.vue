<template>
  <div class="h-full">
    <div class="flex justify-between border rounded-sm shadow-md bg-blue-200 p-2 mb-4">
      <h1 class="text-xl font-bold mb-2 text-black">Class Term Budget Allocation</h1>
    </div>

    <div class="container mx-auto p-4">
      <form @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="space-y-2">
            <div>
              <label class="form-labels">Select Year</label>
              <select
                  v-model="selectedYear"
                  @change="generateTerms"
                  class="form-input"
                  required
              >
                <option value="" disabled>Select year</option>
                <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
              </select>
            </div>

            <div v-if="selectedYear">
              <label class="form-labels">Select Term</label>
              <select
                  v-model="selectedTerm"
                  class="form-input"
                  required
              >
                <option value="" disabled>Select term</option>
                <option v-for="term in generatedTerms" :key="term.value" :value="term.value">{{ term.label }}</option>
              </select>
            </div>

            <div>
              <label class="form-labels">Report Period</label>
              <select
                  v-model="selectedReportPeriod"
                  class="form-input"
                  required
              >
                <option value="" disabled>Select report period</option>
                <option v-for="period in reportPeriods" :key="period" :value="period">{{ period }}</option>
              </select>
            </div>

            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2">Enrollment</label>
              <select
                  v-model="selectedEnrollment"
                  class="form-input"
                  required
              >
                <option value="" disabled>Select Class enrollment</option>
                <option v-for="enroll in enrollment" :key="enroll" :value="enroll">{{ enroll.name }}</option>
              </select>
            </div>

            <div class="pt-4">
              <label class="form-labels">
                <input type="checkbox" v-model="applyToAllClasses" class="rounded">
                <span>Apply same fees to all classes</span>
              </label>
            </div>

            <div v-if="!applyToAllClasses">
              <label class="form-labels">Select Class</label>
              <select
                  v-model="selectedClass"
                  class="form-input"
                  :required="!applyToAllClasses"
              >
                <option value="" disabled>Select a class</option>
                <option v-for="classItem in classes" :key="classItem.id" :value="classItem.id">{{ classItem.name }}</option>
              </select>
            </div>
          </div>

          <div v-if="selectedTerm && selectedYear && selectedClass || applyToAllClasses">
            <h2 class="text-lg font-semibold mb-4">Voteheads Fee Allocation</h2>
            <div class="overflow-x-auto">
              <table class="min-w-full bg-white border">
                <thead>
                <tr class="bg-gray-100">
                  <th class="py-2 px-4 border">Votehead</th>
                  <th class="py-2 px-4 border">Amount</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(votehead, index) in voteheads" :key="votehead.id">
                  <td class="py-2 px-4 border font-medium">{{ votehead.name }}</td>
                  <td class="py-2 px-4 border">
                    <input
                        v-model="votehead.amount"
                        type="number"
                        min="0"
                        class="form-input"
                    >
                  </td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="py-2 px-4 border font-bold">Total</td>
                  <td class="py-2 px-4 border font-bold">{{ formatCurrency(totalAmount) }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between mt-6">
          <button
              type="button"
              @click="resetForm"
              class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Reset
          </button>
          <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              :disabled="!selectedTerm || !selectedYear || (!applyToAllClasses && !selectedClass)"
          >
            Save Allocations
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';

const selectedYear = ref('');
const selectedTerm = ref('');
const selectedReportPeriod = ref('');
const selectedClass = ref('');
const selectedEnrollment= ref('');
const applyToAllClasses = ref(false);
const savedData = reactive({});

const availableYears = ['2023', '2024', '2025', '2026'];
const reportPeriods = ['2024/2025', '2025/2026'];
const enrollment=[
  { id: '1', name: 'DAY' },
  { id: '2', name: 'BOARDING' },
]
const classes = [
  { id: '1', name: 'Class 1' },
  { id: '2', name: 'Class 2' },
  { id: '3', name: 'Class 3' },
];

const voteheads = reactive([
  { id: '1', name: 'Tuition', amount: 0 },
  { id: '2', name: 'Activity Fee', amount: 0 },
  { id: '3', name: 'Exam Fee', amount: 0 },
  { id: '4', name: 'Sports', amount: 0 },
]);

const generatedTerms = computed(() => {
  if (!selectedYear.value) return [];
  return [
    { value: `${selectedYear.value}/1`, label: `Term 1 (${selectedYear.value})` },
    { value: `${selectedYear.value}/2`, label: `Term 2 (${selectedYear.value})` },
    { value: `${selectedYear.value}/3`, label: `Term 3 (${selectedYear.value})` },
  ];
});

const totalAmount = computed(() => {
  return voteheads.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
});

const generateTerms = () => {
  selectedTerm.value = '';
};

const submitForm = () => {
  const allocationData = {
    year: selectedYear.value,
    term: selectedTerm.value,
    reportPeriod: selectedReportPeriod.value,
    allocations: JSON.parse(JSON.stringify(voteheads))
  };

  if (applyToAllClasses.value) {
    classes.forEach(classItem => {
      const storageKey = `${selectedYear.value}-${selectedTerm.value}-${classItem.id}`;
      savedData[storageKey] = allocationData.allocations;
    });
  } else {
    const storageKey = `${selectedYear.value}-${selectedTerm.value}-${selectedClass.value}`;
    savedData[storageKey] = allocationData.allocations;
  }

  console.log('Saving data:', allocationData);
  alert('Allocations saved successfully!');
};

const resetForm = () => {
  selectedYear.value = '';
  selectedTerm.value = '';
  selectedReportPeriod.value = '';
  selectedClass.value = '';
  applyToAllClasses.value = false;
  voteheads.forEach(item => {
    item.amount = 0;
  });
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'KES'
  }).format(value);
};
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>