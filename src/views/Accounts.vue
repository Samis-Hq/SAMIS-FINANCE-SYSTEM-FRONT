<template>
  <div class="h-full mt-20">
    <!-- Button Container -->
    <div
      class="flex justify-between border rounded-sm shadow-md bg-white p-2 mb-4"
    >
      <button
        @click="showAccountList"
        :class="{
          'bg-blue-700': isAccountListVisible,
          'bg-blue-500': !isAccountListVisible,
        }"
        class="text-white px-4 py-2 rounded"
      >
        Account List
      </button>
      <button
        @click="showAddAccountForm"
        :class="{
          'bg-blue-700': isAddAccountFormVisible,
          'bg-blue-500': !isAddAccountFormVisible,
        }"
        class="text-white px-4 py-2 rounded"
      >
        Add Account
      </button>
    </div>

    <!-- Add Account Form -->
    <div
      v-if="isAddAccountFormVisible"
      class="border rounded-sm shadow-md bg-white p-4"
    >
      <h2 class="text-xl font-bold mb-4"> Manage Accounts</h2>

      <!-- Radio Buttons for Input Method -->
      <div class="flex items-center mb-6">
        <label class="flex items-center mr-6">
          <input
            type="radio"
            v-model="inputMethod"
            value="keyIn"
            class="form-radio h-4 w-4 text-blue-600"
          />
          <span class="ml-2">Add Accounts</span>
        </label>
        <label class="flex items-center">
          <input
            type="radio"
            v-model="inputMethod"
            value="votes"
            class="form-radio h-4 w-4 text-blue-600"
          />
          <span class="ml-2">Add Votes for Specific Account</span>
        </label>
      </div>
      

      <!-- Key In Account Details Form -->
      <form v-if="inputMethod === 'keyIn'" @submit.prevent="submitForm">
        <div class="grid grid-cols-2 gap-4">
          <!-- Account Name -->
          <div class="mb-4">
            <label
              for="accountName"
              class="block text-sm font-medium text-gray-700"
            >
              Account Name *
            </label>
            <input
              type="text"
              id="accountName"
              v-model="form.name"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <p v-if="!form.name" class="text-red-500 text-sm mt-1">
              Account name is required
            </p>
          </div>

          <!-- Votes -->
          <div class="mb-4">
            <p>Accounts Lists</p>
            <div class="flex flex-col"></div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="mt-6">
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>

      <!-- Add Votes Form -->
      <form v-if="inputMethod === 'votes'" @submit.prevent="submitForm">
        <div class="grid grid-cols-2 gap-4">
          <!-- School Account -->
          <div class="mb-4">
            <label for="stream" class="block text-sm font-medium text-gray-700">
              School Account *
            </label>
            <select
              id="stream"
              v-model="form.name"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="" disabled>Select Votehead</option>
              <option value="SchoolFund">School Fund</option>
              <option value="Operation">Operation</option>
              <option value="tuition">Tuition</option>
            </select>
            <p v-if="!form.name" class="text-red-500 text-sm mt-1">
              Select account
            </p>
          </div>

          <!-- Votehead -->
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">
              Votehead *
            </label>
            <input
              type="text"
              id="name"
              v-model="form.votes"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <p v-if="!form.votes" class="text-red-500 text-sm mt-1">
              Vote is required
            </p>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="mt-6">
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>

    <!-- Account List -->
    <div
      v-if="isAccountListVisible"
      class="border rounded-sm shadow-md bg-white p-4"
    >
      <h2 class="text-xl font-bold mb-4">Account List</h2>
      <p>List of accounts will be displayed here.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import type { Accounts } from "@/model/Accounts";

export default {
  setup() {
    const isAccountListVisible = ref(true);
    const isAddAccountFormVisible = ref(false);
    const inputMethod = ref("votes");

    const form = ref<Accounts>({
      id: "",
      name: "",
      votes: [],
    });

    const showAccountList = () => {
      isAccountListVisible.value = true;
      isAddAccountFormVisible.value = false;
    };

    const showAddAccountForm = () => {
      isAccountListVisible.value = false;
      isAddAccountFormVisible.value = true;
    };

    const submitVotesForm = () => {
  console.log("Votes Form Submitted:", form.value);
  
};

    const submitForm = () => {
      console.log("Form Submitted:", form.value);
      // Add logic to submit the form data
    };

    return {
      isAccountListVisible,
      isAddAccountFormVisible,
      form,
      inputMethod,
      showAccountList,
      showAddAccountForm,
      submitForm,
    };
  },
};
</script>
