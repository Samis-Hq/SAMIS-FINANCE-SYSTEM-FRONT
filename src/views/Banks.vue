<template>
    <div class="h-full">
      <div class="card-header">
        <h1 class="card-header-text">
          Manage School Bank Accounts
        </h1>
      </div>
  
      <div class="flex flex-col md:flex-row gap-4 w-full m-4">
       
        <div class="rounded-sm shadow-md bg-white p-4 w-full md:w-1/3">
          <h2 class="text-xl font-bold mb-4">Add Bank Account</h2>
          <form @submit.prevent="addBank">
            <div class="grid grid-cols-2 gap-4">
             
              <div class="mb-4">
                <label for="account" class="form-labels">School Account *</label>
                <select
                  id="account"
                  v-model="newBank.account"
                  class="form-input"
                  required
                >
                  <option value="" disabled>Select School Account</option>
                  <option value="SchoolFund">School Fund</option>
                  <option value="Operation">Operation</option>
                  <option value="Tuition">Tuition</option>
                </select>
              </div>
  
             
              <div class="mb-4">
                <label for="bankName" class="form-labels">Bank Name *</label>
                <input
                  id="bankName"
                  v-model="newBank.bankName"
                  type="text"
                  class="form-input"
                  required
                />
              </div>
            </div>
  
            <div class="grid grid-cols-2 gap-4">
             
              <div class="mb-4">
                <label for="branch" class="form-labels">Branch *</label>
                <input
                  id="branch"
                  v-model="newBank.branch"
                  type="text"
                  class="form-input"
                  required
                />
              </div>
  
              
              <div class="mb-4">
                <label for="accountNumber" class="form-labels">Account Number *</label>
                <input
                  id="accountNumber"
                  v-model="newBank.accountNumber"
                  type="number"
                  class="form-input"
                  required
                />
              </div>
            </div>
  
            
            <div class="mb-4">
              <label for="accountName" class="form-labels">Account Name *</label>
              <input
                id="accountName"
                v-model="newBank.accountName"
                type="text"
                class="form-input"
                required
              />
            </div>
  
          
            <div class="mt-6">
              <button
                type="submit"
                class="my-button"
              >
                Add Bank
              </button>
            </div>
          </form>
        </div>
  
     
        <div class="rounded-sm shadow-md bg-white p-4">
          <h2 class="text-xl font-bold mb-4">My Bank Accounts</h2>
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="table-header">School Account</th>
                <th class="table-header">Bank Name</th>
                <th class="table-header">Branch</th>
                <th class="table-header">Account Number</th>
                <th class="table-header">Account Name</th>
                <th class="table-header">Actions</th>
              </tr>
            </thead>
            <tbody class="table-body">
              <tr v-for="bank in banks" :key="bank.id">
                <td class="table-data">{{ bank.account }}</td>
                <td class="table-data">{{ bank.bankName }}</td>
                <td class="table-data">{{ bank.branch }}</td>
                <td class="table-data">{{ bank.accountNumber }}</td>
                <td class="table-data">{{ bank.accountName }}</td>
                <td class="table-data">
                    <button class="edit-button">Edit</button>
                    <button class="delete-button">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import { ref } from "vue";
  import type { Banks } from "@/model/Banks";
  
  // Reactive object for the new bank form
  const newBank = ref<Banks>({
    id: "",
    account: "",
    bankName: "",
    branch: "",
    accountNumber: 0,
    accountName: "",
  });
  
  
  const banks = ref<Banks[]>([
    {
      id: "1",
      account: "School Fund",
      bankName: "Equity",
      branch: "Nakuru",
      accountNumber: 3435353,
      accountName: "Samis Sample School",
    },
    {
      id: "2",
      account: "Operation",
      bankName: "KCB",
      branch: "Nakuru",
      accountNumber: 1223244,
      accountName: "Samis Sample School",
    },
  ]);
  
  
  const addBank = () => {
    
    newBank.value.id = String(banks.value.length + 1);
  
    
    banks.value.push({ ...newBank.value });
  
    
    newBank.value = {
      id: "",
      account: "",
      bankName: "",
      branch: "",
      accountNumber: 0,
      accountName: "",
    };
  
    console.log("Bank added:", banks.value);
  };
  </script>