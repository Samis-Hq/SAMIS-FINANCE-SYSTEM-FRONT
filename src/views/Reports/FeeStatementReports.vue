<template>
  <div class="h-full">
    <div class="card-header mb-6">
      <h1 class="text-2xl font-bold">Fee Statements Reports</h1>
    </div>

    <div class="flex gap-6 m-4">
      <div class="w-1/4 bg-white p-4 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4">Filter Students Fee Statement</h2>

        <div class="space-y-4">
          <div>
            <label class="form-labels">Statement Term</label>
            <select
                v-model="selectedTerm"
                class="form-input">
              <option value="">Current Term</option>
              <option v-for="term in terms" :key="term" :value="term">
                {{ term }}
              </option>
            </select>
          </div>

          <div>
            <label class="form-labels">Enrollment</label>
            <select
                v-model="selectedEnrollment"
                class="form-input">
              <option value="">All Enrollments</option>
              <option v-for="enrollment in enrollments" :key="enrollment" :value="enrollment">
                {{ enrollment }}
              </option>
            </select>
          </div>

          <div>
            <label class="form-labels">Form</label>
            <select
                v-model="selectedForm"
                class="form-input">
              <option value="">All Forms</option>
              <option v-for="form in forms" :key="form" :value="form">
                Form {{ form }}
              </option>
            </select>
          </div>

          <div>
            <label class="form-labels">Stream</label>
            <select
                v-model="selectedStream"
                class="form-input">
              <option value="">All Streams</option>
              <option v-for="stream in streams" :key="stream" :value="stream">
                {{ stream }}
              </option>
            </select>
          </div>

          <div>
            <label class="form-labels">Filter Using</label>
            <select
                v-model="selectedFilterType"
                class="form-input">
              <option value="">Select filter</option>
              <option value="budget">Budget</option>
              <option value="paid">Paid</option>
              <option value="balance">Balance</option>
              <option value="balbf">BALBF</option>
            </select>
          </div>

          <div v-if="selectedFilterType">
            <label class="form-labels">Amount Range</label>
            <div class="flex gap-2">
              <input
                  v-model="minAmount"
                  type="number"
                  placeholder="Min"
                  class="form-input">
              <input
                  v-model="maxAmount"
                  type="number"
                  placeholder="Max"
                  class="form-input">
            </div>
          </div>

          <!--          <button-->
          <!--              @click="applyFilters"-->
          <!--              class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"-->
          <!--          >-->
          <!--            Apply Filters-->
          <!--          </button>-->
        </div>
      </div>

      <div class="flex-1 bg-white p-4 rounded-lg shadow">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Students Fee Statements</h2>
          <div class="flex items-center gap-4">
            <div class="text-sm text-gray-500">
              Showing {{ filteredStudents.length }} students
            </div>
            <DataExporterView
                :data="filteredStudents"
                :columns="['admNo', 'name', 'form', 'stream', 'budget', 'paid', 'balance', 'balbf']"
                :title="`Fee Statement - ${selectedForm}`"
                :fileName="`fee_statement_${selectedForm}`"
                :headers="{
                        admNo: 'ADM',
                        name: 'Name',
                        form: 'Form',
                        stream: 'Stream',
                        budget: 'Budget (KES)',
                       paid: 'Paid (KES)',
                       balance: 'Balance (KES)',
                       balbf: 'BALBF (KES)'
                }"
                :footerData="[{
                              admNo: 'TOTALS',
                              name: '',
                              form: '',
                              stream: '',
                              budget: totals.budget,
                              paid: totals.paid,
                              balance: totals.balance,
                              balbf: totals.balbf
                               }]"/>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
              <th class="table-header">Adm No</th>
              <th class="table-header">Name</th>
              <th class="table-header">Form</th>
              <th class="table-header">Stream</th>
              <th class="table-header">Budget (KES)</th>
              <th class="table-header">Paid (KES)</th>
              <th class="table-header">Balance (KES)</th>
              <th class=table-header>BALBF (KES)</th>
              <th class="table-header">Actions</th>
            </tr>
            </thead>
            <tbody class="table-body">
            <tr v-for="student in filteredStudents" :key="student.admNo">
              <td class="table-data">{{ student.admNo }}</td>
              <td class="table-data">{{ student.name }}</td>
              <td class="table-data">{{ student.form }}{{ student.stream }}</td>
              <td class="table-data">{{ student.stream }}</td>
              <td class="table-data">{{ student.budget }}</td>
              <td class="table-data">{{ student.paid }}</td>
              <td class="table-data">{{ student.balance }}</td>
              <td class="table-data">{{ student.balbf }}</td>
              <td class="table-data">
                <button class="text-blue-600 hover:text-blue-900">View</button>
              </td>
            </tr>
            </tbody>
            <tfoot class="bg-blue-300 text-black font-bold">
            <tr>
              <td colspan="4" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Totals
              </td>
              <td class="px-6 py-3  text-xs font-medium text-gray-500 text-right">
                {{ formatCurrency(totals.budget) }}
              </td>
              <td class="px-6 py-3  text-xs font-medium text-gray-500 text-right">
                {{ formatCurrency(totals.paid) }}
              </td>
              <td class="px-6 py-3  text-xs font-medium text-gray-500 text-right">
                {{ formatCurrency(totals.balance) }}
              </td>
              <td class="px-6 py-3  text-xs font-medium text-gray-500 text-right">
                {{ formatCurrency(totals.balbf) }}
              </td>
              <td></td>
            </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import DataExporterView from "@/views/DataExporterView.vue";

const forms = [1, 2, 3, 4];
const terms = ['2025/1', '2025/2', '2025/3'];
const streams = ['North', 'South', 'East', 'West'];
const enrollments = ['DAY', 'BOARDING'];

const students = [
  {
    admNo: '001',
    name: 'John Doe',
    form: 1,
    stream: 'North',
    enrollment: 'DAY',
    budget: 50000,
    paid: 30000,
    balance: 20000,
    balbf: 10000
  },
  {
    admNo: '002',
    name: 'Jane Smith',
    form: 1,
    stream: 'South',
    enrollment: 'DAY',
    budget: 50000,
    paid: 40000,
    balance: 10000,
    balbf: 5000
  },
  {
    admNo: '003',
    name: 'Mike Johnson',
    form: 2,
    stream: 'East',
    enrollment: 'DAY',
    budget: 60000,
    paid: 45000,
    balance: 15000,
    balbf: 7500
  },
  {
    admNo: '004',
    name: 'Sarah Williams',
    form: 2,
    stream: 'West',
    enrollment: 'BOARDING',
    budget: 60000,
    paid: 60000,
    balance: 0,
    balbf: 0
  },
  {
    admNo: '005',
    name: 'David Brown',
    form: 3,
    stream: 'North',
    enrollment: 'BOARDING',
    budget: 70000,
    paid: 20000,
    balance: 50000,
    balbf: 25000
  },
  {
    admNo: '006',
    name: 'Emily Davis',
    form: 4,
    stream: 'South',
    enrollment: 'BOARDING',
    budget: 80000,
    paid: 70000,
    balance: 10000,
    balbf: 5000
  },
];

const footerData = computed(() => {
  return [{
    admNo: 'Totals',
    name: '',
    form: '',
    stream: '',
    budget: totals.value.budget,
    paid: totals.value.paid,
    balance: totals.value.balance,
    balbf: totals.value.balbf
  }];
});

const selectedTerm = ref('2025/1');
const selectedEnrollment = ref('');
const selectedForm = ref('');
const selectedStream = ref('');
const selectedFilterType = ref('');
const minAmount = ref(null);
const maxAmount = ref(null);

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'KES'}).format(amount);
};

const filteredStudents = computed(() => {
  return students.filter(student => {
    const enrollmentMatch = !selectedEnrollment.value || student.enrollment === selectedEnrollment.value;
    const formMatch = !selectedForm.value || student.form === parseInt(selectedForm.value);
    const streamMatch = !selectedStream.value || student.stream === selectedStream.value;

    let amountMatch = true;
    if (selectedFilterType.value && (minAmount.value !== null || maxAmount.value !== null)) {
      const amount = student[selectedFilterType.value];
      if (minAmount.value !== null && amount < minAmount.value) amountMatch = false;
      if (maxAmount.value !== null && amount > maxAmount.value) amountMatch = false;
    }

    return enrollmentMatch && formMatch && streamMatch && amountMatch;
  });
});

const totals = computed(() => {
  return filteredStudents.value.reduce((acc, student) => {
    acc.budget += student.budget;
    acc.paid += student.paid;
    acc.balance += student.balance;
    acc.balbf += student.balbf;
    return acc;
  }, {budget: 0, paid: 0, balance: 0, balbf: 0});
});

function applyFilters() {
  console.log('Filters applied:', {
    enrollment: selectedEnrollment.value,
    form: selectedForm.value,
    stream: selectedStream.value,
    filterType: selectedFilterType.value,
    minAmount: minAmount.value,
    maxAmount: maxAmount.value
  });
}
</script>

<style scoped>
.card-header {
  @apply border-b pb-4 mb-6;
}
</style>