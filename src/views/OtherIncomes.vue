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

    <!-- Main Content -->
    <div class="flex flex-col md:flex-row gap-4 bg-white p-4">
      <div class="bg-white p-6 rounded-sm shadow-md w-2/3 ">
        <h2 class="text-xl font-bold mb-4">Other Receipts</h2>
        <form @submit.prevent="submitCashForm">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div class="mb-4">
              <label for="account" class="form-labels">School Account *</label>
              <select
                  id="account"
                  v-model="voucher.account"
                  class="form-input"
                  required
              >
                <option value="School Fund" disabled>Select Vote Account</option>
                <option value="SchoolFund">School Fund</option>
                <option value="Operation">Operation</option>
                <option value="tuition">Tuition</option>
              </select>
            </div>

            <div class="mb-4">
              <label for="client" class="form-labels">Client Name *</label>
              <input
                  id="client"
                  v-model="voucher.clientName"
                  class="form-input"
                  required
              />
            </div>
            <div class="mb-4">
              <label for="vote" class="form-labels">Select Terms *</label>
              <select
                  id="terms"
                  v-model="voucher.terms"
                  class="form-input"
                  required
              >
                <option value="" disabled>Select Terms</option>
                <option value="lunch">2025/1</option>
                <option value="others">2025/2</option>
                <option value="tuition">2025/3</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
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
              <label for="date" class="form-labels">Amount *</label>
              <input
                  type="amount"
                  id="amount"
                  v-model="voucher.date"
                  class="form-input"
                  required
              />
            </div>

          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div class="mb-4">
              <label for="date" class="form-labels">Slip/cheque N0.*</label>
              <input
                  type="amount"
                  id="amount"
                  v-model="voucher.chequeNo"
                  class="form-input"
                  required
              />
            </div>
            <div class="mb-4">
              <label for="date" class="form-labels">Payment Mode *</label>
              <input
                  type="amount"
                  id="amount"
                  v-model.trim="voucher.paymentMode"
                  class="form-input"
                  required
              />
            </div>
            <div class="mb-4">
              <label for="vote" class="form-labels">Select Bank *</label>
              <select
                  id="terms"
                  v-model="voucher.terms"
                  class="form-input"
                  required
              >
                <option value="" disabled>Select Bank</option>
                <option value="sample Bank">sample Bank</option>
                <option value="sample Bank">sample Bank</option>
                <option value="sample Bank">sample Bank</option>
              </select>
            </div>
          </div>
          <button type="button" class="my-button">Add Item</button>
        </form>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <table class="my-table">
            <thead class="bg-gray-50">
            <tr>
              <!-- <th class="table-header">PARTICULARS</th> -->
              <th class="table-header">VOTEHEAD</th>
              <th class="table-header">AMOUNT</th>
              <th class="table-header">DATE</th>
              <th class="table-header">ACTION</th>
            </tr>
            </thead>
            <tbody class="table-body text-xs">
            <tr>
              <!-- <td class="table-data">food</td> -->
              <td class="table-data">Lunch</td>
              <td class="table-data">20000</td>
              <td class="table-data">2024-01-2024</td>
              <td class="table-data">
                <button class="delete-button p-1">Remove</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="grid grid-cols-3 gap-4 my-4">
          <div class="mb-4">
            <label for="date" class="form-labels">Total Amount*</label>
            <input
                type="amount"
                id="amount"
                v-model="voucher.amount"
                class="form-input"
                required
            />
          </div>
          <div class="mb-4">
            <label for="date" class="form-labels">Voucher No *</label>
            <input
                type="amount"
                id="amount"
                v-model="voucher.amount"
                class="form-input"
                required
            />
          </div>
          <div class="mb-4">
            <label for="date" class="form-labels">Payment Date *</label>
            <input
                type="date"
                id="amount"
                v-model="voucher.amount"
                class="form-input"
                required
            />
          </div>
        </div>

        <div class="mt-6">
          <button
              type="button"
              class="px-4 bg-red-500 mr-4 rounded-sm p-2 text-white"
              @click="close"
          >
            Cancel
          </button>
          <button type="submit" class="my-button">save</button>
        </div>
      </div>
    </div>

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
import type {Vouchers} from "@/model/Vouchers.ts";
const searchQuery = ref("Sharon");
const showAddBursaryPopup = ref(false);
const showOtherReceiptsPopup = ref(false);
const showBalanceBfPopup = ref(false);
const showDiscountPopup = ref(false);
const showBAnkingPopup = ref(false);

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


const submitCashForm = () => {
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
