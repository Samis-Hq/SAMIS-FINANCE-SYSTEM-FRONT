<template>
  <div class="h-full mt-10">
    <!-- Header -->
    <div
      class="flex justify-between border rounded-sm shadow-md bg-white p-2 mb-4"
    >
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
              <label for="amount" class="form-labels">Blance Bf:</label>
              <input
                v-model="fees.balanceBf"
                id="amount"
                type="number"
                disabled
                class="form-input disabled:bg-blue-200"
                s
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
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Fees } from "@/model/fees";
const searchQuery = ref("Sharon");
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

// Function to handle saving fees
const handleSaveFees = () => {
  console.log("Fees", fees.value);
};
</script>
