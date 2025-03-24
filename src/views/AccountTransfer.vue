<template>
  <div class="modal-overlay z-50">
    <div class="flex flex-col md:flex-row gap-4 m-4 bg-white p-4">
      <div class="rounded-sm shadow-md bg-white p-4">
        <h2 class="text-xl font-bold mb-4">Account transfers</h2>
        <form @submit.prevent="submitForm">
          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label for="account" class="form-labels">School Account *</label>
              <select
                id="account"
                v-model="transfers.paymentMode"
                class="form-input"
                required
              >
                <option value="" disabled>Select PaymentMode</option>
                <option value="CASH">CASH</option>
                <option value="BANK">BANK</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="date" class="form-labels">Transfer Date *</label>
              <input
                type="date"
                id="date"
                v-model="transfers"
                class="form-input"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label for="vote" class="form-labels"
                >Transfer From account*</label
              >
              <select
                id="vote"
                v-model="transfers.accountFrom"
                class="form-input"
                required
              >
                <option value="" disabled>Select Transfer From Account</option>
                <option value="SCHOOL_FUND">SCHOOL_FUND</option>
                <option value="OPERATION">OPERATION</option>
                <option value="TUITION">TUITION</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="vote" class="form-labels"
                >Transfer From voteHead*</label
              >
              <select
                id="vote"
                v-model="transfers.voteFrom"
                class="form-input"
                required
              >
                <option value="" disabled>Select TRansfer From votehead</option>
                <option value="lunch">lunch</option>
                <option value="others">Others</option>
                <option value="tuition">Tuition</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label for="vote" class="form-labels">Transfer To account*</label>
              <select
                id="vote"
                v-model="transfers.accountTo"
                class="form-input"
                required
              >
                <option value="" disabled>Select Transfer To Account</option>
                <option value="SCHOOL_FUND">SCHOOL_FUND</option>
                <option value="OPERATION">OPERATION</option>
                <option value="TUITION">TUITION</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="vote" class="form-labels"
                >Transfer To voteHead*</label
              >
              <select
                id="vote"
                v-model="transfers.voteTo"
                class="form-input"
                required
              >
                <option value="" disabled>Select Transfer From votehead</option>
                <option value="lunch">lunch</option>
                <option value="others">Others</option>
                <option value="tuition">Tuition</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label for="vote" class="form-labels">Transfer From Bank*</label>
              <select
                id="vote"
                v-model="transfers.bankAccountFrom"
                class="form-input"
                required
              >
                <option value="" disabled>Select Transfer To Account</option>
                <option value="SCHOOL_FUND">SCHOOL_FUND</option>
                <option value="OPERATION">OPERATION</option>
                <option value="TUITION">TUITION</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="vote" class="form-labels">Transfer To Bank*</label>
              <select
                id="vote"
                v-model="transfers.bankAccountTo"
                class="form-input"
                required
              >
                <option value="" disabled>Select Transfer From votehead</option>
                <option value="lunch">lunch</option>
                <option value="others">Others</option>
                <option value="tuition">Tuition</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label for="vote" class="form-labels">Amount *</label>
              <input
                id="vote"
                v-model="transfers.amount"
                class="form-input"
                required
              />
            </div>
            <div class="mb-4">
              <label for="vote" class="form-labels">Voucher No*</label>
              <input
                id="vote"
                v-model="transfers.voucherNo"
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
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Generate transfers
            </button>
          </div>
        </form>
      </div>

      <div class="rounded-sm shadow-md bg-white p-4 flex-1">
        <h2 class="text-xl font-bold mb-4">INTER-ACCOUNTS TRANSFER</h2>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="table-header">#</th>
              <th class="table-header">ACCOUNT FROM</th>
              <th class="table-header">VOTEHEAD FROM</th>
              <th class="table-header">ACCOUNT TO</th>
              <th class="table-header">VOTEHEAD TO</th>
              <th class="table-header">TRANSFER DATE</th>
              <th class="table-header">Amount</th>
              <th class="table-header">PAYMENTMODE</th>
              <th class="table-header">TERM</th>
            </tr>
          </thead>
          <tbody class="table-body">
            <tr v-for="(transfer, index) in transferss" :key="transfer.id">
              <td class="table-data">{{ index + 1 }}</td>
              <td class="table-data">{{ transfer.accountFrom }}</td>
              <td class="table-data">{{ transfer.voteFrom }}</td>
              <td class="table-data">{{ transfer.accountTo }}</td>
              <td class="table-data">{{ transfer.voteTo }}</td>
              <td class="table-data">{{ transfer.date }}</td>
              <td class="table-data">{{ transfer.amount }}</td>
              <td class="table-data">{{ transfer.paymentMode }}</td>
              <td class="table-data">{{ transfer.term }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import type { AccountTransfers } from "@/model/AccountTransfer";

const emit = defineEmits(["close", "save"]);

const transfers = ref<AccountTransfers>({
  id: "",
  paymentMode: "",
  accountTo: "",
  voteTo: "",
  accountFrom: "",
  voteFrom: "t",
  bankAccountTo: "",
  bankAccountFrom: "",
  amount: 4000,
  voucherNo: 1001,
  bankName: "",
  date: "",
  term: "",
});

const transferss = ref<AccountTransfers[]>([
  {
    id: "1",
    paymentMode: "Cash",
    accountTo: "Savings",
    voteTo: "Education",
    accountFrom: "Operation",
    voteFrom: "Rent",
    bankAccountTo: "123456",
    bankAccountFrom: "654321",
    amount: 5000,
    voucherNo: 1001,
    bankName: "ABC Bank",
    date: "2025-01-01",
    term: "2025/1",
  },
]);

const submitForm = () => {
  console.log("saving transfer");

  emit("close");
};

const close = () => {
  emit("close");
};
</script>
