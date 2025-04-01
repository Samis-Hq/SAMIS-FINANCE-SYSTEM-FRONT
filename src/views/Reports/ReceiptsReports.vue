<template>
  <div class="h-full">
    <div class="card-header mb-6">
      <h1 class="text-2xl font-bold">Receipts Reports</h1>
    </div>

    <div class="flex flex-col lg:flex-row gap-6 m-4">
      <!-- Filter Section -->
      <div class="w-full lg:w-1/4 bg-white p-4 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4">Filter Receipts</h2>
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row gap-2">
            <div class="flex-1">
              <label class="form-labels">Term</label>
              <select
                  v-model="filters.term"
                  class="form-input"
              >
                <option value="">All Terms</option>
                <option v-for="term in terms" :key="term" :value="term">
                  Term {{ term }}
                </option>
              </select>
            </div>

            <div class="flex-1">
              <label class="form-labels">Report Period</label>
              <select
                  v-model="filters.reportPeriod"
                  class="form-input"
              >
                <option value="">All Periods</option>
                <option v-for="period in reportPeriods" :key="period" :value="period">
                  {{ period }}
                </option>
              </select>
            </div>
          </div>

          <div class="flex-1">
            <label class="form-labels">Account</label>
            <select
                v-model="filters.account"
                class="form-input"
            >
              <option value="">All Accounts</option>
              <option v-for="account in accounts" :key="account" :value="account">
                {{ account }}
              </option>
            </select>
          </div>

          <div class="flex flex-col sm:flex-row gap-2">
            <div class="flex-1">
              <label class="form-labels">Start Date</label>
              <input
                  type="date"
                  v-model="filters.startDate"
                  class="form-input"
              >
            </div>

            <div class="flex-1">
              <label class="form-labels">End Date</label>
              <input
                  type="date"
                  v-model="filters.endDate"
                  class="form-input"
              >
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-2">
            <div class="flex-1">
              <label class="form-labels">Admission No.</label>
              <input
                  type="text"
                  v-model="filters.admNo"
                  placeholder="Enter admission number"
                  class="form-input"
              >
            </div>

            <div class="flex-1">
              <label class="form-labels">Student Name</label>
              <input
                  type="text"
                  v-model="filters.studentName"
                  placeholder="Enter student name"
                  class="form-input"
              >
            </div>
          </div>

          <div>
            <label class="form-labels">Receipt Range</label>
            <div class="flex gap-2">
              <input
                  type="text"
                  v-model="filters.receiptFrom"
                  placeholder="From"
                  class="form-input flex-1"
              >
              <input
                  type="text"
                  v-model="filters.receiptTo"
                  placeholder="To"
                  class="form-input flex-1"
              >
            </div>
          </div>

          <button
              @click="applyFilters"
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Apply Filters
          </button>
        </div>
      </div>

      <!-- Receipts Table -->
      <div class="flex-1 bg-white p-4 rounded-lg shadow">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Receipts List</h2>
          <div class="text-sm text-gray-500">
            Showing {{ filteredReceipts.length }} receipts
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
              <th class="table-header">Adm No.</th>
              <th class="table-header">Name</th>
              <th class="table-header">Receipt No.</th>
              <th class="table-header">Amount(KES)</th>
              <th class="table-header">Class</th>
              <th class="table-header">Date</th>
              <th class="table-header">Payment Mode</th>
              <th class="table-header">Actions</th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="receipt in filteredReceipts" :key="receipt.receiptNo">
              <td class="table-data">{{ receipt.admNo }}</td>
              <td class="table-data">{{ receipt.name }}</td>
              <td class="table-data">{{ receipt.receiptNo }}</td>
              <td class="table-data">{{ receipt.amount }}</td>
              <td class="table-data">{{ receipt.form }} {{ receipt.stream }}</td>
              <td class="table-data">{{ formatDate(receipt.date) }}</td>
              <td class="table-data">{{ receipt.paymentMode }}</td>
              <td class="table-data">
                <button class="text-blue-600 hover:text-blue-900 mr-2">View</button>
                <button class="text-green-600 hover:text-green-900">Print</button>
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
import {ref, computed} from 'vue';

// Sample data
const terms = [1, 2, 3];
const reportPeriods = ['2025/1', '2025/2'];
const accounts = ['Tuition', 'SchoolFund', 'Operation'];

const receipts = [
  {
    admNo: '001',
    name: 'John Doe',
    receiptNo: '001',
    amount: 15000,
    form: 1,
    stream: 'North',
    date: '2023-01-15',
    paymentMode: 'Bank'
  },
  {
    admNo: '002',
    name: 'Jane Smith',
    receiptNo: '002',
    amount: 12000,
    form: 1,
    stream: 'South',
    date: '2023-01-16',
    paymentMode: 'Cash'
  },
  {
    admNo: '003',
    name: 'Mike Johnson',
    receiptNo: '003',
    amount: 18000,
    form: 2,
    stream: 'East',
    date: '2023-02-05',
    paymentMode: 'Bank'
  },
  {
    admNo: '004',
    name: 'Sarah Williams',
    receiptNo: '004',
    amount: 13500,
    form: 2,
    stream: 'West',
    date: '2023-02-10',
    paymentMode: 'Cash'
  },
  {
    admNo: '005',
    name: 'David Brown',
    receiptNo: '005',
    amount: 16000,
    form: 3,
    stream: 'North',
    date: '2023-03-01',
    paymentMode: 'Bank'
  },
  {
    admNo: '006',
    name: 'Emily Davis',
    receiptNo: '006',
    amount: 14000,
    form: 4,
    stream: 'South',
    date: '2023-03-15',
    paymentMode: 'Cash'
  },
];

// Filter controls
const filters = ref({
  term: '',
  reportPeriod: '',
  account: '',
  startDate: '',
  endDate: '',
  admNo: '',
  studentName: '',
  receiptFrom: '',
  receiptTo: ''
});

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'KES'}).format(amount);
};

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

// Filtered receipts list
const filteredReceipts = computed(() => {
  return receipts.filter(receipt => {
    // Convert dates to timestamps for comparison
    const receiptDate = new Date(receipt.date).getTime();
    const startDate = filters.value.startDate ? new Date(filters.value.startDate).getTime() : null;
    const endDate = filters.value.endDate ? new Date(filters.value.endDate).getTime() : null;

    return (
        (!filters.value.term || true) &&
        (!filters.value.reportPeriod || true) &&
        (!filters.value.account || true) &&
        (!startDate || receiptDate >= startDate) &&
        (!endDate || receiptDate <= endDate) &&
        (!filters.value.admNo || receipt.admNo.includes(filters.value.admNo)) &&
        (!filters.value.studentName || receipt.name.toLowerCase().includes(filters.value.studentName.toLowerCase())) &&
        (!filters.value.receiptFrom || receipt.receiptNo >= filters.value.receiptFrom) &&
        (!filters.value.receiptTo || receipt.receiptNo <= filters.value.receiptTo)
    );
  });
});

function applyFilters() {
  console.log('Filters applied:', filters.value);
}
</script>

<style scoped>
.card-header {
  @apply border-b border-gray-200 pb-4;
}
</style>