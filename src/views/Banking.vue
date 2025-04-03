<template>
  <div class="modal-overlay z-50">
    <div class="bg-gray-100 p-6 rounded-lg shadow-lg w-2/3 md:w-1/3">
      <h2 class="text-xl font-bold mb-4">Banking</h2>
      <form @submit.prevent="submitCashForm">
        <!-- Single grid container for the entire form -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- School Account -->
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
            <label for="transactionType" class="form-labels"
              >Transaction Type *</label
            >
            <select
              id="transactionType"
              v-model="voucher.description"
              class="form-input"
              required
            >
              <option value="" disabled>Transaction Type</option>
              <option value="DEPOSIT TO BANK">DEPOSIT TO BANK</option>
              <option value="WITHDRAW FROM BANK">WITHDRAW FROM BANK</option>
            </select>
          </div>

          <div class="mb-4">
            <label for="bankAccount" class="form-labels">Bank Account *</label>
            <select
              id="bankAccount"
              v-model="voucher.chequeNo"
              class="form-input"
              required
            >
              <option value="" disabled>Select Bank Account</option>
              <option value="samis sample one">samis sample one</option>
              <option value="samis test account">samis test account</option>
            </select>
          </div>

          <!-- Date -->
          <div class="mb-4">
            <label for="date" class="form-labels">Date *</label>
            <input
              type="date"
              id="date"
              v-model="voucher.date"
              class="form-input"
              required
            />
          </div>

          <!-- Transaction Number -->
          <div class="mb-4">
            <label for="transactionNumber" class="form-labels"
              >Transaction Number *</label
            >
            <input
              id="transactionNumber"
              v-model="voucher.invoiceNumber"
              class="form-input"
              required
            />
          </div>

          <!-- Amount -->
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

          <div class="mb-4 md:col-span-2">
            <label for="description" class="form-labels">Description *</label>
            <input
              type="text"
              id="description"
              v-model="voucher.description"
              class="form-input "
              required
            />
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            class="px-4 bg-red-500 rounded-sm p-2 text-white"
            @click="close"
          >
            Cancel
          </button>
          <button type="submit" class="my-button">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import type { Vouchers } from "@/model/Vouchers";
import type { Clients } from "@/model/Clients";

const emit = defineEmits(["close", "save"]);

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

const saveClient = () => {
  console.log("saving client");

  emit("close");
};

const close = () => {
  emit("close");
};
const submitCashForm = () => {};
</script>
