<template>
    <div class="modal-overlay z-50">
      <div class="bg-gray-100 p-6 rounded-lg shadow-lg w-2/3 md:w-1/3">
        <h2 class="text-xl font-bold mb-4">Manage Students Fee Discounts</h2>
        <form @submit.prevent="submitCashForm">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div class="mb-4">
              <label for="account" class="form-labels">Term Name *</label>
              <select
                id="account"
                v-model="voucher.account"
                class="form-input"
                required
              >
                <option value="" disabled>Select Term</option>
                <option value="2025/1">2025/1</option>
                <option value="2025/2">2025/2</option>
                <option value="2025/3">2025/3</option>
              </select>
            </div>
  
            <div class="mb-4">
              <label for="date" class="form-labels">Date *</label>
              <input
              type="date"
                id="client"
                v-model="voucher.clientName"
                class="form-input"
                required
              />
            </div>
            
          </div>
  
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div class="mb-4">
              <label for="particulars" class="form-labels">Adm NO *</label>
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
              <label for="particulars" class="form-labels">Student Name *</label>
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
              <label for="date" class="form-labels">Total Amount *</label>
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
              <label for="vote" class="form-labels">Select votehead *</label>
              <select
                id="terms"
                v-model="voucher.terms"
                class="form-input"
                required
              >
                <option value="" disabled>SelectVotehead </option>
                <option value="sample ">sample </option>
                <option value="sample ">sample </option>
                <option value="sample ">sample </option>
              </select>
            </div>



            <div class="mb-4">
              <label for="date" class="form-labels">Description *</label>
              <input
                type="amount"
                id="amount"
                v-model.trim="voucher.paymentMode"
                class="form-input"
                required
              />
            </div>
            <div class="mb-4">
              <label for="vote" class="form-labels">Amount *</label>
              <input
                id="terms"
                v-model="voucher.terms"
                class="form-input"
                required
              >
              
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
                
                <th class="table-header">ACTION</th>
              </tr>
            </thead>
            <tbody class="table-body text-xs">
              <tr>
                <!-- <td class="table-data">food</td> -->
                <td class="table-data">Lunch</td>
                <td class="table-data">20000</td>
              
                <td class="table-data">
                  <button class="delete-button p-1">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
       
  
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
  