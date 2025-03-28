<template>
  <div class="h-full ">
    <!-- Button Container -->
    <div
      class="card-header"
    >
      <div class="flex gap-x-10 md:justify-around">
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
         
          @click="showAddLsoForm"
          :class="{
            'bg-blue-700': isLsoFormVisible,
            'bg-blue-500': !isLsoFormVisible,
          }"
          class="text-white px-4 py-2 rounded-sm mr-4"
        >
          Add lso
        </button>

       
      </div>

      <router-link to="/clients" class="my-button"> Add Client </router-link>
    </div>

    <div
      v-if="isInvoicesListVisible"
      class="flex flex-col md:flex-row gap-4 m-4 bg-white p-4"
    >
      <div class="rounded-sm shadow-md bg-white p-4 ">
        <h2 class="text-xl font-bold mb-4">Generate Invoice</h2>
        <form @submit.prevent="submitInvoiceForm">
          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label
                for="account"
                class="form-labels"
                >School Account *</label
              >
              <select
                id="account"
                v-model="invoice.account"
                class="form-input"
                required
              
              >
                <option value="School Fund" disabled>Select Votehead</option>
                <option value="SchoolFund">School Fund</option>
                <option value="Operation">Operation</option>
                <option value="tuition">Tuition</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="client" class="form-labels">Client Name *</label>
              <input
                  list="clientOptions"
                  id="client"
                  v-model="invoice.clientName"
                  class="form-input"
                  placeholder="Type to search clients..."
                  required
              />
              <datalist id="clientOptions">
                <option v-for="client in clients" :key="client.id" :value="client.name">
                  {{ client.name }}
                </option>
              </datalist>
            </div>

          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label for="vote" class="form-labels"
                >Select Votehead *</label
              >
              <select
                id="vote"
                v-model="invoice.vote"
                class="form-input"
                required
              >
                <option value="" disabled>Select Votehead</option>
                <option value="lunch">Lunch</option>
                <option value="others">Others</option>
                <option value="tuition">Tuition</option>
              </select>
            </div>

            <div class="mb-4">
              <label for="date" class="form-labels"
                >Invoice Date *</label
              >
              <input
                type="date"
                id="date"
                v-model="invoice.date"
                class="form-input"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label for="vote" class="form-labels"
                >Select Terms *</label
              >
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
              <label for="date" class="form-labels"
                >Invoice Amount *</label
              >
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
            <label for="date" class="form-labels"
              >Particulars *</label
            >
            <textarea
              type="text"
              id="particulars"
              placeholder="Enter Particulars  description"
              v-model="invoice.particulars"
              class="form-input"
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

      <div class="rounded-sm shadow-md bg-white p-4 flex-1">
        <h2 class="text-xl font-bold mb-4">Invoices List</h2>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="table-header">Invoice Number</th>
              <th class="table-header">Client</th>
              <th class="table-header">Amount</th>
            </tr>
          </thead>
          <tbody class="table-body">
            <tr v-for="invoice in invoices" :key="invoice.id">
              <td class="table-data">
                {{ invoice.invoiceNumber }}
              </td>
              <td class="table-data">
                {{ invoice.clientName }}
              </td>
              <td class="table-data">{{ invoice.amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-if="isLpoListVisible"
      class="flex flex-col md:flex-row gap-4 m-4 bg-white p-4"
    >
      <div class="rounded-sm shadow-md bg-white p-4">
        <h2 class="text-xl font-bold mb-4">Generate LPO</h2>
        <form @submit.prevent="submitClientForm">
          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label
                for="account"
                class="form-labels"
                >School Account *</label
              >
              <select
                id="account"
                v-model="lpo.account"
                class="form-input"
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
                class="form-labels"
                >Client Name *</label
              >
              <select
                id="client"
                v-model="lpo.clientName"
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
              <label for="vote" class="form-labels"
                >Select Votehead *</label
              >
              <select
                id="vote"
                v-model="lpo.vote"
                class="form-input"
                required
              >
                <option value="" disabled>Select Votehead</option>
                <option value="lunch">Lunch</option>
                <option value="others">Others</option>
                <option value="tuition">Tuition</option>
              </select>
            </div>

            <div class="mb-4">
              <label for="date" class="form-labels"
                >Invoice Date *</label
              >
              <input
                type="date"
                id="date"
                v-model="lpo.date"
                class="form-input"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label for="terms" class="form-labels"
                >Select Terms *</label
              >
              <select
                id="terms"
                v-model="lpo.terms"
                class="form-input"
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
                class="form-labels"
                >Invoice Amount *</label
              >
              <input
                type="number"
                id="amount"
                v-model="lpo.amount"
                class="form-input"
                required
              />
            </div>
          </div>

          <div class="mb-4">
            <label
              for="particulars"
              class="form-labels"
              >Particulars *</label
            >
            <textarea
              id="particulars"
              placeholder="Enter Particulars description"
              v-model="lpo.particulars"
              class="form-input"
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

      <div class="rounded-sm shadow-md bg-white p-4 flex-1">
        <h2 class="text-xl font-bold mb-4">lPO List</h2>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="table-header"
              >
                Invoice Number
              </th>
              <th
                class="table-header"
              >
                Client
              </th>
              <th
                class="table-header"
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody class="table-body">
            <tr v-for="invoice in invoices" :key="invoice.id">
              <td class="table-data">
                {{ invoice.invoiceNumber }}
              </td>
              <td class="table-data">
                {{ invoice.clientName }}
              </td>
              <td class="table-data">{{ invoice.amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      v-if="isLsoFormVisible"
      class="flex flex-col md:flex-row gap-4 m-4 bg-white p-4"
    >
      <div class="rounded-sm shadow-md bg-white p-4">
        <h2 class="text-xl font-bold mb-4">Generate LSO</h2>
        <form @submit.prevent="submitInvoiceForm">
          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label
                for="account"
                class="form-labels"
                >School Account *</label
              >
              <select
                id="account"
                v-model="invoice.account"
                class="form-input"
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
                class="form-labels"
                >Client Name *</label
              >
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
              <label for="vote" class="form-labels"
                >Select Votehead *</label
              >
              <select
                id="vote"
                v-model="invoice.vote"
                class="form-input"
                required
              >
                <option value="" disabled>Select Votehead</option>
                <option value="lunch">Lunch</option>
                <option value="others">Others</option>
                <option value="tuition">Tuition</option>
              </select>
            </div>

            <div class="mb-4">
              <label for="date" class="form-labels"
                >Invoice Date *</label
              >
              <input
                type="date"
                id="date"
                v-model="invoice.date"
                class="form-input"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label for="vote" class="form-labels"
                >Select Terms *</label
              >
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
              <label for="date" class="form-labels"
                >Invoice Amount *</label
              >
              <input
                type="date"
                id="date"
                v-model="invoice.amount"
                class="form-input"
                required
              />
            </div>
          </div>

          <div class="mb-4">
            <label for="date" class="form-labels"
              >Particulars *</label
            >
            <textarea
              type="text"
              id="particulars"
              placeholder="Enter Particulars  description"
              v-model="invoice.particulars"
              class="form-input"
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

      <div class="rounded-sm shadow-md bg-white p-4 flex-1">
        <h2 class="text-xl font-bold mb-4">LSO Lists</h2>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="table-header"
              >
                Invoice Number
              </th>
              <th
                class="table-header"
              >
                Client
              </th>
              <th
                class="table-header"
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody class="table-body">
            <tr v-for="invoice in invoices" :key="invoice.id">
              <td class="table-data">
                {{ invoice.invoiceNumber }}
              </td>
              <td class="table-data">
                {{ invoice.clientName }}
              </td>
              <td class="table-data">{{ invoice.amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

import type { Invoice } from "@/model/Invoices";
import type { Clients } from "@/model/Clients";

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
      clientName: "keneth korir",
      account: "School Fund",
      amount: 10000,
      particulars: "Payment of Food",
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

    const lpo = ref({
      id: "",
      clientName: "keneth korir",
      account: "School Fund",
      amount: 10000,
      particulars: "Payment of Food",
      date: "03-03-2025",
      lpoNumber: 100,
      terms: "2025/1",
      vote: "Lunch Programme",
    });

    const lso = ref({
      id: "",
      clientName: "keneth korir",
      account: "School Fund",
      amount: 10000,
      particulars: "Payment of Food",
      date: "03-03-2025",
      lsoNumber: 100,
      terms: "2025/1",
      vote: "Lunch Programme",
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

   
</script>
