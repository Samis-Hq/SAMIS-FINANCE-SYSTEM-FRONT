<template>
  <div class="h-full mt-10">
    <div
      class="flex justify-between border rounded-sm shadow-md bg-white p-2 mb-4"
    >
      <button @click="openAddClientForm" class="my-button">Add Client</button>
    </div>

    <!-- Clients List -->
    <div
      class="flex flex-col md:flex-row gap-4  bg-white p-4"
    >
      <div class="rounded-sm w-full shadow-md bg-white p-4">
      <div class="flex justify-between mb-4">
        <h2 class="text-xl font-bold mb-4 ">Clients</h2>
        <div >
          <button class="bg-blue-400 px-2 text-white mr-2 rounded-sm ">Print</button>
          <button class="bg-blue-400 px-2 text-white rounded-sm ">Download</button>
        </div>
      </div>
        <table class="my-table">
          <thead class="bg-gray-50">
            <tr>
              <th class="table-header">Name</th>
              <th class="table-header">Phone</th>
              <th class="table-header">Address</th>
            </tr>
          </thead>
          <tbody class="table-body">
            <tr v-for="client in clients" :key="client.id">
              <td class="table-data">{{ client.name }}</td>
              <td class="table-data">{{ client.phone }}</td>
              <td class="table-data">{{ client.address }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    
 



   
    <Transition name="slide-down" mode="out-in">
      <AddClient
        v-if="showAddClientPopup"
        @close="closeAddClientForm"
        @save="handleSaveClient"
      />
    </Transition>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import AddClient from "./AddClient.vue";
import type { Clients } from "@/model/Clients";

export default {
  components: {
    AddClient,
  },
  setup() {
    const showAddClientPopup = ref(false);

    const clients = ref<Clients[]>([
      {
        id: "1",
        name: "John Doe",
        phone: "123-456-7890",
        address: "123 Main St",
      },
      {
        id: "2",
        name: "Jane Smith",
        phone: "987-654-3210",
        address: "456 Elm St",
      },
    ]);

    const openAddClientForm = () => {
      showAddClientPopup.value = true;
      console.log("showing pop up to add client");
    };

    const closeAddClientForm = () => {
      showAddClientPopup.value = false;
    };

    const handleSaveClient = (newClient: Clients) => {
      clients.value.push(newClient);
      closeAddClientForm();
    };

    return {
      clients,
      showAddClientPopup,
      openAddClientForm,
      closeAddClientForm,
      handleSaveClient,
    };
  },
};
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
