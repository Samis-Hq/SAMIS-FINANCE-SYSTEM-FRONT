<template>
  <div class="modal-overlay">
    <div class="bg-gray-100 p-6 rounded-lg shadow-lg w-2/3 md:w-1/3">
      <h2 class="text-xl font-bold mb-4">Add Client</h2>
      <form @submit.prevent="saveClient">
        <div class="mb-4">
          <label class="form-labels">Name</label>
          <input v-model.trim="newClient.name" class="form-input" required />
          <p v-if="!newClient.address" class="text-red-500 text-sm mt-1">
            Address is required
          </p>
        </div>
        <div class="mb-4">
          <label class="form-labels">Phone</label>
          <input v-model="newClient.phone" class="form-input" required />
       
        </div>
        <div class="mb-4">
          <label class="form-labels">Address</label>
          <input v-model="newClient.address" class="form-input" required />
          <p v-if="!newClient.address" class="text-red-500 text-sm mt-1">
            Address is required
          </p>
        </div>

        <div class="flex justify-end">
          <button
            type="button"
            @click="close"
            class="mr-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Cancel
          </button>
          <button type="submit" class="my-button">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Clients } from "@/model/Clients";


const emit = defineEmits(["close", "save"]);


const newClient = ref<Clients>({
  id: "",
  name: "",
  phone: "",
  address: "",
});


const saveClient = () => {
  if (!newClient.value.name || !newClient.value.phone) return;
  newClient.value.id = Date.now().toString();
  
  emit("save", { ...newClient.value }); 
  
  
  Object.assign(newClient.value, { id: "", name: "", phone: "", address: "" });

  emit("close");
};

const close = () => {
  emit("close");
};

</script>

