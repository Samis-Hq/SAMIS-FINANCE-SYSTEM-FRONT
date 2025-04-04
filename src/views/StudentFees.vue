<template>
  <div class="h-full">
    <!-- Header -->
    <div class="card-header">
      <button class="my-button mr-3 ml-2" @click="openOtherReceipts">Other Receipts</button>
      <button class="my-button mr-3" @click="openAddBursary">Bursary</button>
      <button class="my-button mr-3" @click="openBAnking">Banking</button>
      <button class="my-button mr-3" @click="openBalanceBf">Bal Bf</button>
      <button class="my-button mr-3" @click="openDiscount">Discount</button>
    </div>

    <div class="p-4 mx-auto">
      <h1 class="text-blue-600 font-bold">Student Fees Collection</h1>
    </div>

    <!-- Main Content -->
    <div class="flex flex-col md:flex-row gap-4 bg-white p-4">
      <!-- Fees Form -->
      <div class="flex rounded-sm shadow-md bg-white p-6">
        <form
          @submit.prevent="handleSaveFees"
          class="grid grid-cols-2 gap-6 w-full"
        >
          <!-- Left Column -->
          <div>
            <div class="mb-4">
              <label for="studentName" class="form-labels">Student Name:</label>
              <input
                v-model="fees.studentName"
                id="studentName"
                type="text"
                disabled
                class="form-input disabled:bg-blue-200"
              />
            </div>
            <div class="mb-4">
              <label for="amount" class="form-labels">Balance Bf:</label>
              <input
                v-model="fees.balanceBf"
                id="amount"
                type="number"
                disabled
                class="form-input disabled:bg-blue-200"

              />
            </div>

            <div class="mb-4">
              <label for="date" class="form-labels">Balance:</label>
              <input
                v-model="fees.Balance"
                id="balancebf"
                type="text"
                disabled
                class="form-input disabled:bg-blue-200"
              />
            </div>
            <div class="mb-4">
              <label for="receiptMode" class="form-labels">Receipt Mode:</label>
              <input
                v-model="fees.receiptMode"
                id="receiptMode"
                type="text"
                class="form-input"
              />
            </div>

            <div class="mb-4">
              <label for="bankName" class="form-labels">Bank Name:</label>
              <input
                v-model="fees.bankName"
                id="bankName"
                type="text"
                class="form-input w-full"
              />
            </div>
          </div>

          <div>
            <div class="mb-4">
              <label for="myClass" class="form-labels">Class:</label>
              <input
                v-model="fees.myClass"
                id="myClass"
                disabled
                class="form-input disabled:bg-blue-200"
              />
            </div>
            <div class="mb-4">
              <label for="Balance" class="form-labels">New Balance:</label>
              <input
                v-model="fees.NewBalance"
                id="Balance"
                type="number"
                disabled
                class="form-input disabled:bg-blue-200"
              />
            </div>
            <div class="mb-4">
              <label for="NewBalance" class="form-labels">Date:</label>
              <input
                v-model="fees.date"
                id="date"
                type="date"
                class="form-input disabled:bg-blue-200"
              />
            </div>
            <div class="mb-4">
              <label for="balanceBf" class="form-labels">Receipt No:</label>
              <input
                v-model="fees.receiptNo"
                id="balanceBf"
                type="number"
                class="form-input w-full"
              />
            </div>
            <div class="mb-4">
              <label for="receiptNo" class="form-labels">Amount To Pay:</label>
              <input
                v-model="fees.amount"
                id="receiptNo"
                type="number"
                class="form-input w-full"
              />
            </div>
          </div>

          <div class="mb-4 flex justify-end">
            <button type="submit" class="my-button">Save Fees</button>
          </div>
        </form>
      </div>

      <!-- Students List -->
      <div class="flex-1 rounded-sm shadow-md bg-white p-4">
        <h2 class="text-xl font-bold mb-4">Students List</h2>
        <div class="flex items-center justify-center">
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search by Adm No or Name"
            class="search-input"
          />
        </div>
        <table class="my-table">
          <thead class="bg-gray-50">
            <tr>
              <th class="table-header">Adm</th>
              <th class="table-header">Name</th>
              <th class="table-header">Class</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="table-body">200</td>
              <td class="table-body">Sharon</td>
              <td class="table-body">4EAST</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Transition name="slide-down" mode="out-in">
      <AddBursary
        v-if="showAddBursaryPopup"
        @close="closeBursary"
        @save="handleSaveFees"
      />
    </Transition>

    <Transition name="slide-down" mode="out-in">
      <OtherReceipts
        v-if="showOtherReceiptsPopup"
        @close="closeReceiptsPopUP"
        @save="handleSaveFees"
      />
    </Transition>

    <Transition name="slide-down" mode="out-in">
      <Banking
        v-if="showBAnkingPopup"
        @close="closeBanking"
        @save="handleSaveFees"
      />
    </Transition>

    <Transition name="slide-down" mode="out-in">
      <Discount
        v-if="showDiscountPopup"
        @close="closeDiscount"
        @save="handleSaveFees"
      />
    </Transition>

    <Transition name="slide-down" mode="out-in">
      <BalanceBf
        v-if="showBalanceBfPopup"
        @close="closeBAlBf"
        @save="handleSaveFees"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Fees } from "@/model/fees";
import Bursary from "./Bursary.vue";
import OtherReceipts from "./OtherReceipts.vue";
import Banking from "./Banking.vue";
import Discount from "./Discount.vue";
import BalanceBf from "./BalanceBf.vue";
import AddBursary from "@/views/AddBursary.vue";
const searchQuery = ref("Sharon");
const showAddBursaryPopup = ref(false);
const showOtherReceiptsPopup = ref(false);
const showBalanceBfPopup = ref(false);
const showDiscountPopup = ref(false);
const showBAnkingPopup = ref(false);
const fees = ref<Fees>({
  id: "",
  studentName: "Sharon",
  amount: 500,
  receiptMode: "M-pesa",
  date: "2025-03-03",
  bankName: "Nakuru Equity Bank",
  receiptNo: 255,
  myClass: "4east",
  Balance: 500,
  NewBalance: 1000,
  balanceBf: 2000,
  totalPaid: 4000,
});

const openAddBursary = () => {
  showAddBursaryPopup.value = true;
};
const openOtherReceipts = () => {
  showOtherReceiptsPopup.value = true;
};
const openBalanceBf = () => {
  showBalanceBfPopup.value = true;
};

const openDiscount=()=>{
  showDiscountPopup.value=true
}


const openBAnking=()=>{
  showBAnkingPopup.value=true
}
const closeReceiptsPopUP=()=>{
  showOtherReceiptsPopup.value=false
}
const closeBursary=()=>{
  showAddBursaryPopup.value=false
}
const closeBAlBf=()=>{
  showBalanceBfPopup.value=false
}
const closeBanking=()=>{
  showBAnkingPopup.value=false
}

const closeDiscount=()=>{
  showDiscountPopup.value=false
}


const handleSaveFees = () => {
  console.log("Fees", fees.value);
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
