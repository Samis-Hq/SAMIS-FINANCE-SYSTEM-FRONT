<template>
  <div class="h-full mt-10">
    <!-- Button Container -->
    <div
      class="flex justify-between border rounded-sm shadow-md bg-white p-2 mb-4"
    >
      <div class="flex gap-x-10">
        <button
          @click="showInvoicesList"
          :class="{
            'bg-blue-700': isInvoicesListVisible,
            'bg-blue-500': !isInvoicesListVisible,
          }"
          class="text-white px-4 py-2 rounded"
        >
          Generate Invoices
        </button>
        <button
          @click="showAddLpoForm"
          :class="{
            'bg-blue-700': isLpoListVisible,
            'bg-blue-500': !isLpoListVisible,
          }"
          class="text-white px-4 py-2 rounded gap-10"
        >
          Generate Lpo
        </button>
        <button
          v-if="!isLsoFormVisible"
          @click="showAddLsoForm"
          :class="{
            'bg-blue-700': isLsoFormVisible,
            'bg-blue-500': !isLsoFormVisible,
          }"
          class="text-white px-4 py-2 rounded"
        >
          Add lso
        </button>

        <button
          v-if="isLsoFormVisible"
          @click="showAddClientForm"
          :class="{
            'bg-red-700': isLsoFormVisible,
            'bg-red-500': !isLsoFormVisible,
          }"
          class="text-white px-4 py-2 rounded"
        >
          close lso
        </button>
      </div>

      <router-link to="/clients" class="my-button"> Add Client </router-link>
    </div>

    <div
      v-if="isInvoicesListVisible"
      class="flex flex-col md:flex-row gap-4 border rounded-sm shadow-md bg-white p-4"
    >
      <div class="rounded-sm shadow-md bg-white p-4">
        <h2 class="text-xl font-bold mb-4">Generate Invoice</h2>
        <form @submit.prevent="submitInvoiceForm">
          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label
                for="account"
                class="block text-sm font-medium text-gray-700"
                >School Account *</label
              >
              <select
                id="account"
                v-model="invoice.account"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="" disabled>Select Votehead</option>
                <option value="SchoolFund">School Fund</option>
                <option value="Operation">Operation</option>
                <option value="tuition">Tuition</option>
              </select>
            </div>

            <div class="mb-4">
              <label
                for="client"
                class="block text-sm font-medium text-gray-700"
                >Client Name *</label
              >
              <select
                id="client"
                v-model="invoice.clientName"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
              <label for="vote" class="block text-sm font-medium text-gray-700"
                >Select Votehead *</label
              >
              <select
                id="vote"
                v-model="invoice.vote"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="" disabled>Select Votehead</option>
                <option value="lunch">Lunch</option>
                <option value="others">Others</option>
                <option value="tuition">Tuition</option>
              </select>
            </div>

            <div class="mb-4">
              <label for="date" class="block text-sm font-medium text-gray-700"
                >Invoice Date *</label
              >
              <input
                type="date"
                id="date"
                v-model="invoice.date"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label for="vote" class="block text-sm font-medium text-gray-700"
                >Select Terms *</label
              >
              <select
                id="terms"
                v-model="invoice.terms"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="" disabled>Select Terms</option>
                <option value="lunch">2025/1</option>
                <option value="others">2025/2</option>
                <option value="tuition">2025/3</option>
              </select>
            </div>

            <div class="mb-4">
              <label for="date" class="block text-sm font-medium text-gray-700"
                >Invoice Amount *</label
              >
              <input
                type="date"
                id="date"
                v-model="invoice.amount"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div class="mb-4">
            <label for="date" class="block text-sm font-medium text-gray-700"
              >Particulars *</label
            >
            <textarea
              type="text"
              id="particulars"
              placeholder="Enter Particulars  description"
              v-model="invoice.particulars"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div class="mt-6">
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Generate Invoice
            </button>
          </div>
        </form>
      </div>

      <div class="rounded-sm shadow-md bg-white p-4">
        <h2 class="text-xl font-bold mb-4">Invoices List</h2>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Invoice Number
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Client
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="invoice in invoices" :key="invoice.id">
              <td class="px-6 py-2 whitespace-nowrap">
                {{ invoice.invoiceNumber }}
              </td>
              <td class="px-6 py-2 whitespace-nowrap">
                {{ invoice.clientName }}
              </td>
              <td class="px-6 py-2 whitespace-nowrap">{{ invoice.amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-if="isLpoListVisible"
      class="flex flex-col md:flex-row gap-4 border rounded-sm shadow-md bg-white p-4"
    >
      <div class="rounded-sm shadow-md bg-white p-4">
        <h2 class="text-xl font-bold mb-4">Generate LPO</h2>
        <form @submit.prevent="submitClientForm">
          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label
                for="account"
                class="block text-sm font-medium text-gray-700"
                >School Account *</label
              >
              <select
                id="account"
                v-model="invoice.account"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="" disabled>Select Votehead</option>
                <option value="SchoolFund">School Fund</option>
                <option value="Operation">Operation</option>
                <option value="tuition">Tuition</option>
              </select>
            </div>

            <div class="mb-4">
              <label
                for="client"
                class="block text-sm font-medium text-gray-700"
                >Client Name *</label
              >
              <select
                id="client"
                v-model="invoice.clientName"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
              <label for="vote" class="block text-sm font-medium text-gray-700"
                >Select Votehead *</label
              >
              <select
                id="vote"
                v-model="invoice.vote"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="" disabled>Select Votehead</option>
                <option value="lunch">Lunch</option>
                <option value="others">Others</option>
                <option value="tuition">Tuition</option>
              </select>
            </div>

            <div class="mb-4">
              <label for="date" class="block text-sm font-medium text-gray-700"
                >Invoice Date *</label
              >
              <input
                type="date"
                id="date"
                v-model="invoice.date"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label for="terms" class="block text-sm font-medium text-gray-700"
                >Select Terms *</label
              >
              <select
                id="terms"
                v-model="invoice.terms"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="" disabled>Select Terms</option>
                <option value="2025/1">2025/1</option>
                <option value="2025/2">2025/2</option>
                <option value="2025/3">2025/3</option>
              </select>
            </div>

            <div class="mb-4">
              <label
                for="amount"
                class="block text-sm font-medium text-gray-700"
                >Invoice Amount *</label
              >
              <input
                type="number"
                id="amount"
                v-model="invoice.amount"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div class="mb-4">
            <label
              for="particulars"
              class="block text-sm font-medium text-gray-700"
              >Particulars *</label
            >
            <textarea
              id="particulars"
              placeholder="Enter Particulars description"
              v-model="invoice.particulars"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>

          <div class="mt-6">
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Generate lPO
            </button>
          </div>
        </form>
      </div>

      <div class="rounded-sm shadow-md bg-white p-4">
        <h2 class="text-xl font-bold mb-4">lPO List</h2>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Invoice Number
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Client
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="invoice in invoices" :key="invoice.id">
              <td class="px-6 py-2 whitespace-nowrap">
                {{ invoice.invoiceNumber }}
              </td>
              <td class="px-6 py-2 whitespace-nowrap">
                {{ invoice.clientName }}
              </td>
              <td class="px-6 py-2 whitespace-nowrap">{{ invoice.amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      v-if="isLsoFormVisible"
      class="flex flex-col md:flex-row gap-4 border rounded-sm shadow-md bg-white p-4"
    >
      <div class="rounded-sm shadow-md bg-white p-4">
        <h2 class="text-xl font-bold mb-4">Generate LSO</h2>
        <form @submit.prevent="submitInvoiceForm">
          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label
                for="account"
                class="block text-sm font-medium text-gray-700"
                >School Account *</label
              >
              <select
                id="account"
                v-model="invoice.account"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="" disabled>Select Votehead</option>
                <option value="SchoolFund">School Fund</option>
                <option value="Operation">Operation</option>
                <option value="tuition">Tuition</option>
              </select>
            </div>

            <div class="mb-4">
              <label
                for="client"
                class="block text-sm font-medium text-gray-700"
                >Client Name *</label
              >
              <select
                id="client"
                v-model="invoice.clientName"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
              <label for="vote" class="block text-sm font-medium text-gray-700"
                >Select Votehead *</label
              >
              <select
                id="vote"
                v-model="invoice.vote"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="" disabled>Select Votehead</option>
                <option value="lunch">Lunch</option>
                <option value="others">Others</option>
                <option value="tuition">Tuition</option>
              </select>
            </div>

            <div class="mb-4">
              <label for="date" class="block text-sm font-medium text-gray-700"
                >Invoice Date *</label
              >
              <input
                type="date"
                id="date"
                v-model="invoice.date"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label for="vote" class="block text-sm font-medium text-gray-700"
                >Select Terms *</label
              >
              <select
                id="terms"
                v-model="invoice.terms"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="" disabled>Select Terms</option>
                <option value="lunch">2025/1</option>
                <option value="others">2025/2</option>
                <option value="tuition">2025/3</option>
              </select>
            </div>

            <div class="mb-4">
              <label for="date" class="block text-sm font-medium text-gray-700"
                >Invoice Amount *</label
              >
              <input
                type="date"
                id="date"
                v-model="invoice.amount"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div class="mb-4">
            <label for="date" class="block text-sm font-medium text-gray-700"
              >Particulars *</label
            >
            <textarea
              type="text"
              id="particulars"
              placeholder="Enter Particulars  description"
              v-model="invoice.particulars"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div class="mt-6">
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Generate LSO
            </button>
          </div>
        </form>
      </div>

      <div class="rounded-sm shadow-md bg-white p-4">
        <h2 class="text-xl font-bold mb-4">LSO Lists</h2>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Invoice Number
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Client
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="invoice in invoices" :key="invoice.id">
              <td class="px-6 py-2 whitespace-nowrap">
                {{ invoice.invoiceNumber }}
              </td>
              <td class="px-6 py-2 whitespace-nowrap">
                {{ invoice.clientName }}
              </td>
              <td class="px-6 py-2 whitespace-nowrap">{{ invoice.amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";

import type { Invoice } from "@/model/Invoices";
import type { Clients } from "@/model/Clients";

export default {
  setup() {
    const isInvoicesListVisible = ref(true);

    const isLpoListVisible = ref(false);
    const isLsoFormVisible = ref(false);

    const showInvoicesList = () => {
      isInvoicesListVisible.value = true;

      isLpoListVisible.value = false;
      isLsoFormVisible.value = false;
    };

    const showAddClientForm = () => {
      isInvoicesListVisible.value = false;

      isLpoListVisible.value = false;
      isLsoFormVisible.value = false;
    };

    const showAddLpoForm = () => {
      isLpoListVisible.value = true;
      isLsoFormVisible.value = false;
      isInvoicesListVisible.value = false;
    };

    const showAddLsoForm = () => {
      isLpoListVisible.value = false;
      isLsoFormVisible.value = true;
      isInvoicesListVisible.value = false;
    };

    const invoices = ref<Invoice[]>([]);
    const clients = ref<Clients[]>([]);

    const invoice = ref<Invoice>({
      id: "",
      clientName: "",
      account: "",
      amount: 0,
      particulars: "",
      date: "",
      invoiceNumber: 0,
      terms: "",
      vote: "",
    });

    const client = ref<Clients>({
      id: "",
      name: "kk",
      phone: "0700000000",
      address: "28, Lagos Street",
    });

    const lpo = ref({
      id: "",
      clientName: "",
      account: "",
      amount: 0,
      particulars: "",
      date: "",
      lpoNumber: 0,
      terms: "",
      vote: "",
    });

    const lso = ref({
      id: "",
      clientName: "",
      account: "",
      amount: 0,
      particulars: "",
      date: "",
      lsoNumber: 0,
      terms: "",
      vote: "",
    });

    const submitInvoiceForm = () => {
      invoice.value.id = "";
      invoices.value.push({ ...invoice.value });
      invoice.value = {
        id: "",
        clientName: "",
        account: "",
        amount: 0,
        particulars: "",
        date: "",
        invoiceNumber: 0,
        terms: "",
        vote: "",
      };
    };

    const submitClientForm = () => {
      client.value.id = "";
      clients.value.push({ ...client.value });
      client.value = {
        id: "",
        name: "",
        phone: "",
        address: "",
      };
    };

    const submitLpoForm = () => {
      lpo.value.id = "";

      lpo.value = {
        id: "",
        clientName: "",
        account: "",
        amount: 0,
        particulars: "",
        date: "",
        lpoNumber: 0,
        terms: "",
        vote: "",
      };
    };

    const submitLsoForm = () => {
      lso.value.id = "";

      lso.value = {
        id: "",
        clientName: "",
        account: "",
        amount: 0,
        particulars: "",
        date: "",
        lsoNumber: 0,
        terms: "",
        vote: "",
      };
    };

    return {
      isInvoicesListVisible,

      showInvoicesList,
      showAddClientForm,
      invoices,
      clients,
      invoice,
      client,
      submitInvoiceForm,
      submitClientForm,
      showAddLpoForm,
      showAddLsoForm,
      isLpoListVisible,
      isLsoFormVisible,
      lpo,
      lso,
      submitLpoForm,
      submitLsoForm,
    };
  },
};
</script>
