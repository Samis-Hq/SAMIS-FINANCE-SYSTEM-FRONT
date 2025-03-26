<template>
  <div class="modal-overlay z-50">
    <div class="bg-white p-6 rounded-md shadow-md w-2/3 md:w-full">
      <div class="flex items-center mb-6">
        <label class="flex items-center mr-6">
          <input
              type="radio"
              v-model="inputMethod"
              value="keyIn"
              class="form-radio h-4 w-4 text-blue-600"
          />
          <span class="ml-2">Save Bursary</span>
        </label>
        <label class="flex items-center">
          <input
              type="radio"
              v-model="inputMethod"
              value="distribute"
              class="form-radio h-4 w-4 text-blue-600"
          />
          <span class="ml-2">Distribute Bursary</span>
        </label>
      </div>
      <div v-if="inputMethod === 'keyIn'" class="bg-white p-6 rounded-sm shadow-sm w-2/3 md:w-full">
        <h2 class="text-xl font-bold mb-4">Receive Bursary</h2>
        <form @submit.prevent="submitCashForm">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="mb-4">
              <label for="account" class="form-labels">Select Clients *</label>
              <select
                  id="account"
                  v-model="voucher.account"
                  class="form-input"
                  required
              >
                <option value="School Fund" disabled>Select Clients</option>
                <option value="keneth">keneth</option>
                <option value="Operation">Operation</option>
                <option value="tuition">Tuition</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="client" class="form-labels">Address *</label>
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

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="mb-4">
              <label for="date" class="form-labels">Bursary Amount *</label>
              <input
                  type="amount"
                  id="amount"
                  v-model="voucher.date"
                  class="form-input"
                  required
              />
            </div>
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
                  type="date"
                  id="date"
                  v-model.trim="voucher.paymentMode"
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
            <button type="submit" class="my-button">Add Bursary</button>
          </div>
        </form>
      </div>
      <div v-if="inputMethod === 'distribute'" class="bg-white p-6  w-2/3 md:w-full">
        <div class="flex flex-col md:flex-row gap-6">
          <!-- Table Section -->
          <div class=" shadow-sm rounded-sm w-full md:w-1/2">
            <h2 class="text-xl font-bold mb-4">Bursary Receipts</h2>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                <tr>
                  <th class="table-header">Donor</th>
                  <th class="table-header">Receipt No</th>
                  <th class="table-header">Cheque</th>
                  <th class="table-header">Students</th>
                  <th class="table-header">Amount</th>
                  <th class="table-header">Receipted</th>
                </tr>
                </thead>
                <tbody class="table-body">
                <tr>
                  <td class="table-data">NAKURU COUNT GOV'T</td>
                  <td class="table-data">2000</td>
                  <td class="table-data">00023</td>
                  <td class="table-data">20</td>
                  <td class="table-data">AMOUNT</td>
                  <td class="table-data">RECEIPTED</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Form Section -->
          <div class=" shadow-sm w-full md:w-1/2">
            <h2 class="text-xl font-bold mb-4">Distribute Bursary</h2>
            <h2 class="text-xl font-bold mb-4">Unspent Amount: 1,000,000 Kshs</h2>
            <form @submit.prevent="submitCashForm">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="mb-4">
                  <label for="account" class="form-labels">Student Admno *</label>
                  <input
                      id="account"
                      v-model="voucher.account"
                      class="form-input"
                      required
                  >
                </div>
                <div class="mb-4">
                  <label for="client" class="form-labels">Student Name *</label>
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
                <div class="mb-4">
                  <label for="date" class="form-labels">Class *</label>
                  <input
                      type="amount"
                      id="amount"
                      v-model="voucher.date"
                      class="form-input"
                      required
                  />
                </div>
                <div class="mb-4">
                  <label for="date" class="form-labels">Amount.*</label>
                  <input
                      type="amount"
                      id="amount"
                      v-model="voucher.chequeNo"
                      class="form-input"
                      required
                  />
                </div>
                <div class="mb-4">
                  <label for="date" class="form-labels">Date *</label>
                  <input
                      type="date"
                      id="date"
                      v-model.trim="voucher.paymentMode"
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
                <button type="submit" class="my-button">Add Bursary</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

import type {Vouchers} from "@/model/Vouchers";
import type {Clients} from "@/model/Clients";

const emit = defineEmits(["close", "save"]);
const inputMethod = ref("keyIn");
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

const client = ref<Clients>({
  id: "",
  name: "kk",
  phone: "0700000000",
  address: "28, Lagos Street",
});

const saveClient = () => {
  console.log("saving client");

  emit("close");
};

const close = () => {
  emit("close");
};
const submitCashForm = () => {
};
</script>
