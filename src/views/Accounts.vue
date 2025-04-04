<template>
  <div class="h-full">
    <!-- Button Container -->
    <div
      class="card-header"
    >
      <h1
        @click="showAccountList"
        :class="{
          'bg-blue-300': isAccountListVisible,
          'bg-blue-700': !isAccountListVisible,
        }"
        class="text-white px-4 py-2 rounded-sm mx-4 cursor-pointer"
      >
        Account List
      </h1>
      <h1
        @click="showAddAccountForm"
        :class="{
          'bg-blue-300': isAddAccountFormVisible,
          'bg-blue-700': !isAddAccountFormVisible,
        }"
        class="text-white px-4 py-2 rounded-sm cursor-pointer"
      >
        Add Account
      </h1>
      <router-link to="/banks" class=" ml-4 my-button"> My BAnks </router-link>
    </div>

    <!-- Add Account Form -->
    <div
      v-if="isAddAccountFormVisible"
      class="border rounded-sm shadow-md bg-white m-4 p-4 w-full md:w-1/2"
    >
      <h2 class="text-xl font-bold mb-4">Manage Accounts</h2>

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
            <label for="accountName" class="form-labels">
              Account Name *
            </label>
            <input
              type="text"
              id="accountName"
              v-model="form.name"
              class="form-input"
              required
            />
            <p v-if="!form.name" class="required-txt">
              Account name is required
            </p>
          </div>

          <label class="flex items-center">
            <input
              type="radio"
              v-model="form.fees"
              value="votes"
              class="form-radio h-8 w-8 p-4 text-blue-600"
            />
            <span class="ml-2">For fees</span>
          </label>

          <div class="mb-4">
            <label for="accountName" class="form-labels"> Note R * </label>
            <input
              type="number"
              id="accountName"
              v-model="form.noteR"
              class="form-input"
              required
            />
          </div>

          <div class="mb-4">
            <label for="accountName" class="form-labels"> Note P * </label>
            <input
              type="number"
              id="accountName"
              v-model="form.noteP"
              class="form-input"
              required
            />
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
            <label for="stream" class="form-labels"> School Account * </label>
            <select id="stream" v-model="form.name" class="form-input" required>
              <option value="" disabled >Select Account</option>
              <option value="SchoolFund">School Fund</option>
              <option value="Operation">Operation</option>
              <option value="tuition">Tuition</option>
            </select>
            <p v-if="!form.name" class="required-txt">Select account</p>
          </div>


          <div class="mb-4">
            <label for="name" class="form-labels"> Vote head * </label>
            <input
              type="text"
              id="name"
              v-model="form.votes"
              class="form-input"
              required
            />
            <p v-if="!form.votes" class="required-txt">Vote is required</p>
          </div>
          <div class="mb-4">
            <label for="name" class="form-labels"> Position(Receipt) * </label>
            <input
              type="number"
              id="name"
              v-model="form.position"
              class="form-input"
              required
            />
            <p v-if="!form.votes" class="required-txt">Vote is required</p>
          </div>
          <div class="mb-4">
            <label for="name" class="form-labels"> Priority * </label>
            <input
              type="number"
              id="name"
              v-model="form.priority"
              class="form-input"
              required
            />
            <p v-if="!form.votes" class="required-txt">Vote is required</p>
          </div>
        </div>
        <div class="mt-6 flex gap-4">
          <button
              @click="showAccountList"
              type="button"
              class="cancel-button"
          >
            <XMarkIcon class="button-icon" />
            <span>Cancel</span>
          </button>
          <button
              type="submit"
              class="submit-button"
          >
            <CheckIcon  class="button-icon" />
            <span>Save</span>
          </button>
        </div>

      </form>
    </div>

    <div
      v-if="isAccountListVisible"
      class="border rounded-sm shadow-md bg-white p-4 m-4"
    >
      <h2 class="text-xl font-bold mb-4">Account List</h2>
      <p>List of accounts will be displayed here.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Account } from "@/model/Accounts";
import { XMarkIcon, CheckIcon  } from '@heroicons/vue/24/outline';
const isAccountListVisible = ref(true);
const isAddAccountFormVisible = ref(false);
const inputMethod = ref("votes");

const form = ref<Account>({
  id: "",
  name: "",
  noteP: 3,
  noteR: 7,
  fees: true,
  votes: [],
  position: 6,
  priority: 8,
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
};
</script>
