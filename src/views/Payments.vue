<template>
  <div class="h-full">

    <div class="card-header">
      <div class="flex gap-x-10 md:justify-around">
        <h1
          @click="showInvoicesList"
          :class="{
            'bg-blue-700': isInvoicesListVisible,
            'bg-blue-500': !isInvoicesListVisible,
          }"
          class="text-white px-4 py-2 rounded"
        >
          Payment Vouchers
        </h1>
        <button @click="openAddCashPaymentForm" class="my-button">
          Make Cash Payments
        </button>

        <button @click="openAccountTransferForm" class="my-button">
          Account Transfer
        </button>
      </div>
    </div>

    <div
      v-if="isInvoicesListVisible"
      class="flex flex-col md:flex-row gap-4 m-4 p-4"
    >
      <div class="rounded-sm shadow-md bg-white p-4">
        <h2 class="text-xl font-bold mb-4">Pay Invoice</h2>
        <form @submit.prevent="submitInvoiceForm">
          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label for="account" class="form-labels">School Account *</label>
              <select
                id="account"
                v-model="invoice.account"
                class="form-input"
                required
              >
                <option value="School Fund" disabled>Select Account</option>
                <option value="SchoolFund">School Fund</option>
                <option value="Operation">Operation</option>
                <option value="tuition">Tuition</option>
              </select>
            </div>

            <div class="mb-4">
              <label for="client" class="form-labels">Client Name *</label>
              <select
                id="client"
                v-model="invoice.clientName"
                class="form-input"
                required
              >
                <option value="" disabled>Select Client</option>
                <option
                  v-for="client in clients"
                  :key="client.id"
                  :value="client.name"
                >
                  {{ client.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label for="date" class="form-labels">Payment Date *</label>
              <input
                type="date"
                id="date"
                v-model="invoice.date"
                class="form-input"
                required
              />
            </div>

            <div class="mb-4">
              <label for="date" class="form-labels">Payment Mode *</label>
              <input
                type="amount"
                id="amount"
                v-model="invoice.amount"
                class="form-input"
                required
              />
            </div>

            <div class="mb-4">
              <label for="date" class="form-labels">Balance Due*</label>
              <input
                type="amount"
                id="amount"
                v-model="invoice.amount"
                class="form-input"
                required
              />
            </div>

            <div class="mb-4">
              <label for="date" class="form-labels">Voucher No *</label>
              <input
                type="amount"
                id="amount"
                v-model="invoice.amount"
                class="form-input"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label for="vote" class="form-labels">Select Terms *</label>
              <select
                id="terms"
                v-model="invoice.terms"
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
              <label for="date" class="form-labels">Invoice Amount *</label>
              <input
                type="amount"
                id="amount"
                v-model="invoice.amount"
                class="form-input"
                required
              />
            </div>
          </div>

          <div class="mb-4">
            <label for="date" class="form-labels">Particulars *</label>
            <textarea
              type="text"
              id="particulars"
              placeholder="Being Payment for"
              v-model="invoice.particulars"
              class="form-input"
              required
            />
          </div>

          <div class="mt-6">
            <button type="submit" class="my-button">Generate Voucher</button>
          </div>
        </form>
      </div>

      <div class="rounded-sm shadow-md bg-white p-4 flex-1">
        <h2 class="text-xl font-bold mb-4">Invoices List</h2>
        <table class="my-table">
          <thead class="bg-gray-50">
            <tr>
              <th class="table-header">##</th>
              <th class="table-header">Invoice Number</th>
              <th class="table-header">Supplier Name</th>
              <th class="table-header">Invoiced Amount</th>
              <th class="table-header">Paid</th>
              <th class="table-header">Balance</th>
            </tr>
          </thead>
          <tbody class="table-body">
            <tr v-for="(invoice, index) in invoices" :key="invoice.id">
              <td class="table-data">{{ index + 1 }}</td>
              <td class="table-data">{{ invoice.invoiceNumber }}</td>
              <td class="table-data">{{ invoice.clientName }}</td>
              <td class="table-data">{{ invoice.amount }}</td>
              <td class="table-data">{{ invoice.amount }}</td>
              <td class="table-data">{{ invoice.amount - invoice.amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Transition name="slide-down" mode="out-in">
      <CashPayments
        v-if="showCashPaymentPopUp"
        @close="closeCashPaymentForm"
        @save="handleSaveCashVoucher"
      />
    </Transition>

    <Transition name="slide-down" mode="out-in">
      <AccountTransfer
        v-if="showAccountTransferForm"
        @close="closeAccountTransferPopUP"
        @save="handleSaveAccountTransfer"
      />
    </Transition>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

import type { Invoice } from "@/model/Invoices";
import type { Clients } from "@/model/Clients";
import CashPayments from "./CashPayments.vue";
import AccountTransfer from "./AccountTransfer.vue";
const isInvoicesListVisible = ref(true);
const isLpoListVisible = ref(false);
const isLsoFormVisible = ref(false);
const showCashPaymentPopUp = ref(false);
const showAccountTransferForm = ref(false);
const showInvoicesList = () => {
  isInvoicesListVisible.value = true;
  isLpoListVisible.value = false;
  isLsoFormVisible.value = false;
};
const openAddCashPaymentForm = () => {showCashPaymentPopUp.value = true;};
const closeCashPaymentForm = () => {showCashPaymentPopUp.value = false;};
const openAccountTransferForm = () => (showAccountTransferForm.value = true);
const handleSaveCashVoucher = () => {closeCashPaymentForm();};
const closeAccountTransferPopUP = () => {showAccountTransferForm.value = false;};
const handleSaveAccountTransfer = () => {closeCashPaymentForm();};
const invoices = ref<Invoice[]>([]);
const clients = ref<Clients[]>([]);
const invoice = ref<Invoice>({
  id: "",
  clientName: "keneth korir",
  account: "School Fund",
  amount: 10000,
  particulars: "",
  date: "03-03-2025",
  invoiceNumber: 100,
  terms: "2025/1",
  vote: "Lunch Programme",
});

const client = ref<Clients>({
  id: "",
  name: "kk",
  phone: "0700000000",
  address: "28, Lagos Street",
});

const submitInvoiceForm = () => {};
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
