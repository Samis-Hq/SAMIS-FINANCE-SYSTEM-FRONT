<template>
  <div class="modal-overlay z-50">
    <div class="bg-gray-100 p-6 rounded-lg shadow-lg w-2/3 md:w-1/3">
      <h2 class="text-xl font-bold mb-4">Manage Balance Bf</h2>
      <form @submit.prevent="submitCashForm">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div class="mb-4">
            <label for="account" class="form-labels">Student Adm *</label>
            <input
              id="account"
              v-model="voucher.account"
              class="form-input"
              required
            />
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
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div class="mb-4">
            <label for="particulars" class="form-labels">Class *</label>
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
            <label for="vote" class="form-labels">Financial Year *</label>
            <select
              id="vote"
              v-model="voucher.vote"
              class="form-input"
              required
            >
              <option value="" disabled>Select Financial Year</option>
              <option value="2022/2023">2022/2023</option>
              <option value="2023/2024">2023/2024</option>
              <option value="2024/2025">2024/2025</option>
            </select>
          </div>
        </div>
      </form>
      <div class="mt-6">
        <button
          type="button"
          class="px-4 bg-red-500 mr-4 rounded-sm p-2 text-white"
          @click="close"
        >
          Cancel
        </button>
        <button type="submit" class="my-button">SAVE</button>
      </div>
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
const submitCashForm = () => {};
</script>
