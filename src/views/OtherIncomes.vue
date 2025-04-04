<template>
  <div class="h-full">
    <!-- Header -->
    <div class="card-header">
      <button class="my-button mr-3" @click="openAddBursary">Bursary</button>
      <button class="my-button mr-3" @click="openBAnking">Banking</button>
    </div>

    <div class="p-4 mx-auto">
      <h1 class="text-blue-600 font-bold">School Incomes</h1>
    </div>
      <div class="bg-white p-6 rounded-sm shadow-md w-full md:w-2/3 m-4">
        <h2 class="text-xl font-bold mb-4">Other Receipts</h2>
        <form @submit.prevent="submitCashForm">
          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div class="mb-4">
              <label for="account" class="form-labels">School Account *</label>
              <select
                  id="account"
                  v-model="voucher.account"
                  class="form-input"
                  required
              >
                <option value="" disabled>Select Account</option>
                <option value="SchoolFund">School Fund</option>
                <option value="Operation">Operation</option>
                <option value="tuition">Tuition</option>
              </select>
            </div>

            <div class="mb-4">
              <label for="client" class="form-labels">Client Name *</label>
              <Multiselect
                  id="client"
                  v-model="voucher.clientName"
                  :options="clients.slice(0, 5)"
                  label="name"
                  track-by="id"
                  placeholder="Search or select a client"
                  class="multiselect-custom"
                  :searchable="true"
                  :close-on-select="true"

              />
            </div>
            <div class="mb-4">
              <label for="terms" class="form-labels">Select Terms *</label>
              <select
                  id="terms"
                  v-model="voucher.terms"
                  class="form-input"
                  required
              >
                <option value="" disabled>Select Terms</option>
                <option value="2025/1">2025/1</option>
                <option value="2025/2">2025/2</option>
                <option value="2025/3">2025/3</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div class="mb-4">
              <label for="particulars" class="form-labels">Particulars *</label>
              <input
                  type="text"
                  id="particulars"
                  placeholder="description"
                  v-model="voucher.particulars"
                  class="form-input"
                  required
              />
            </div>
            <div class="mb-4">
              <label for="vote" class="form-labels">Select Vote Head *</label>
              <select
                  id="vote"
                  v-model="voucher.vote"
                  class="form-input"
                  required
              >
                <option value="" disabled>Select VoteHead</option>
                <option value="lunch">Lunch</option>
                <option value="others">Others</option>
                <option value="tuition">Tuition</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="amount" class="form-labels">Amount *</label>
              <input
                  type="number"
                  id="amount"
                  v-model="voucher.amount"
                  class="form-input"
                  required
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div class="mb-4">
              <label for="chequeNo" class="form-labels">Slip/cheque No.*</label>
              <input
                  type="text"
                  id="chequeNo"
                  v-model="voucher.chequeNo"
                  class="form-input"
                  required
              />
            </div>
            <div class="mb-4">
              <label for="paymentMode" class="form-labels">Payment Mode *</label>
              <select
                  id="paymentMode"
                  v-model="voucher.paymentMode"
                  class="form-input"
                  required
              >
                <option value="" disabled>Select Mode</option>
                <option value="cash">Cash</option>
                <option value="cheque">Cheque</option>
                <option value="mobile">Mobile Money</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="bankName" class="form-labels">Select Bank *</label>
              <select
                  id="bankName"
                  v-model="voucher.bankName"
                  class="form-input"
                  required
              >
                <option value="" disabled>Select Bank</option>
                <option value="Equity">Equity Bank</option>
                <option value="KCB">KCB Bank</option>
                <option value="Coop">Cooperative Bank</option>
              </select>
            </div>
          </div>

          <button type="button" class="my-button">Add Item</button>
        </form>

        <div class="mt-6">
          <table class="w-full my-table">
            <thead class="bg-gray-50">
            <tr>
              <th class="table-header">VOTEHEAD</th>
              <th class="table-header">AMOUNT</th>
              <th class="table-header">DATE</th>
              <th class="table-header">ACTION</th>
            </tr>
            </thead>
            <tbody class="table-body text-xs">
            <tr v-for="(item, index) in items" :key="index">
              <td class="table-data">{{ item.vote }}</td>
              <td class="table-data">{{ item.amount }}</td>
              <td class="table-data">{{ item.date }}</td>
              <td class="table-data">
                <button class="delete-button p-1" @click="removeItem(index)">Remove</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
          <div class="mb-4">
            <label for="totalAmount" class="form-labels">Total Amount*</label>
            <input
                type="number"
                id="totalAmount"
                v-model="totalAmount"
                class="form-input"
                readonly
            />
          </div>
          <div class="mb-4">
            <label for="voucherNo" class="form-labels">Voucher No *</label>
            <input
                type="text"
                id="voucherNo"
                v-model="voucher.invoiceNumber"
                class="form-input"
                required
            />
          </div>
          <div class="mb-4">
            <label for="paymentDate" class="form-labels">Payment Date *</label>
            <input
                type="date"
                id="paymentDate"
                v-model="voucher.date"
                class="form-input"
                required
            />
          </div>
        </div>

        <div class="mt-6">
          <button type="submit" class="my-button">Save</button>
        </div>
      </div>

    <Transition name="slide-down" mode="out-in">
    <AddBursary v-if="showAddBursaryPopup" @close="closeBursary"/>
    </Transition>
      <Transition name="slide-down" mode="out-in">
    <Banking v-if="showBAnkingPopup" @close="closeBanking"/>

      </Transition>


  </div>
</template>

<script setup lang="ts">
import {ref, computed} from "vue";
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';
import type {Vouchers} from "@/model/Vouchers.ts";
import AddBursary from "@/views/AddBursary.vue";
import Banking from "./Banking.vue";

const searchQuery = ref("Sharon");
const showAddBursaryPopup = ref(false);
const showBAnkingPopup = ref(false);

const clients = ref([
  {id: 1, name: "John Doe"},
  {id: 2, name: "Jane Smith"},
  {id: 3, name: "keneth Brown"},
  {id: 3, name: "sharon Brown"},
  {id: 3, name: "kibet Brown"},
  {id: 3, name: "john Brown"},
  {id: 3, name: "doe Brown"},
  {id: 3, name: "Michael Brown"},
]);

const items = ref([
  {vote: "Lunch", amount: 20000, date: "2024-01-20"}
]);

const voucher = ref<Vouchers>({
  id: "",
  clientName: "",
  account: "",
  amount: 0,
  particulars: "",
  date: "",
  balanceDue: 100,
  vote: "",
  invoiceNumber: 80,
  terms: "",
  description: "",
  paymentMode: "",
  chequeNo: "00001",
  client: "",
  bankName: "",
});

const totalAmount = computed(() => {
  return items.value.reduce((sum, item) => sum + item.amount, 0);
});

const openAddBursary = () => {
  showAddBursaryPopup.value = true;
};

const openBAnking = () => {
  showBAnkingPopup.value = true;
};

const closeBursary = () => {
  showAddBursaryPopup.value = false;
};

const closeBanking = () => {
  showBAnkingPopup.value = false;
};

const removeItem = (index: number) => {
  items.value.splice(index, 1);
};

const submitCashForm = () => {
  console.log("Voucher data:", voucher.value);
  // Add form submission logic here
};
</script>

<style scoped>

:deep(.multiselect-custom) {
  @apply block w-full mt-2 border border-blue-200 bg-blue-100 rounded-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-blue-500 sm:text-sm;
}

:deep(.multiselect-custom .multiselect__tags) {
  @apply border-0 bg-transparent px-0 py-0 min-h-[42px];
}

:deep(.multiselect-custom .multiselect__input),
:deep(.multiselect-custom .multiselect__single) {
  @apply m-0 p-2 bg-blue-100 text-sm text-gray-800 placeholder-gray-400;
}

:deep(.multiselect-custom .multiselect__placeholder) {
  @apply m-2 text-gray-400 text-sm;
}

:deep(.multiselect-custom .multiselect__content-wrapper) {
  @apply border border-blue-200 shadow-sm rounded-sm;
}

:deep(.multiselect-custom .multiselect__option) {
  @apply px-3 py-2 text-sm;
}

:deep(.multiselect-custom .multiselect__option--highlight) {
  @apply bg-blue-100 text-blue-900;
}

:deep(.multiselect-custom .multiselect__option--selected) {
  @apply bg-blue-200 text-blue-900;
}

:deep(.multiselect-custom .multiselect__tag) {
  @apply bg-blue-200 text-blue-800 rounded-sm text-sm;
}

:deep(.multiselect-custom .multiselect__tag-icon) {
  @apply hover:bg-blue-300 text-black;
}

:deep(.multiselect-custom .multiselect__spinner) {
  @apply border-t-blue-500;
}

:deep(.multiselect-custom .multiselect__select) {
  @apply bg-blue-100;
}

:deep(.multiselect-custom .multiselect__select:before) {
  @apply border-t-blue-500;
}


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