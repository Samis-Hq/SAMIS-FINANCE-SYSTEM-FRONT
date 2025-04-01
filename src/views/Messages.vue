<template>
  <div class="h-full">
    <div class="card-header">
      <h1>Messages</h1>
    </div>

      <div class="flex shadow-sm rounded-md justify-center items-center w-full">
        <form @submit.prevent="handleSubmit" class="w-full md:w-2/5">

          <div class="mb-6 p-4 border rounded-lg bg-white">
            <label class="block text-sm font-medium text-gray-700 mb-2">Choose Recipient *</label>
            <div class="flex space-x-4">
              <div v-for="recipient in recipients" :key="recipient.id" class="flex items-center">
                <input
                    type="radio"
                    :id="`recipient-${recipient.id}`"
                    v-model="selectedRecipient"
                    :value="recipient"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    required
                    @change="selectedMessageType = null"
                >
                <label :for="`recipient-${recipient.id}`" class="ml-2 block text-sm text-gray-700">
                  {{ recipient.name }}
                </label>
              </div>
            </div>
          </div>

          <div v-if="selectedRecipient" class="mb-6 p-4 border rounded-lg bg-white">
            <label class="block text-sm font-medium text-gray-700 mb-2">Select Message Type *</label>
            <div class="flex space-x-4">
              <div v-for="type in messageType" :key="type.id" class="flex items-center">
                <input
                    type="radio"
                    :id="`type-${type.id}`"
                    v-model="selectedMessageType"
                    :value="type"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    required
                >
                <label :for="`type-${type.id}`" class="ml-2 block text-sm text-gray-700">
                  {{ type.name }}
                </label>
              </div>
            </div>
          </div>

          <div v-if="selectedMessageType" class="p-4 border rounded-lg bg-white">
            <div class="text-blue-400 m-4 text-center"><h1>Compose message</h1></div>
            <div class="mb-4">
              <label for="subject" class="block text-sm font-medium text-gray-700">Subject *</label>
              <input
                  id="subject"
                  type="text"
                  v-model="subject"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
              />
            </div>

            <div class="mb-4">
              <label for="message" class="block text-sm font-medium text-gray-700">Message *</label>
              <textarea
                  id="message"
                  v-model="messageContent"
                  rows="4"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
              ></textarea>
            </div>

            <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>




  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const recipients = ref([
  { id: 1, name: "Parents" },
  { id: 2, name: "Teachers" },
  { id: 3, name: "Students" },
  { id: 4, name: "BOM" },
]);

const messageType = ref([

  { id: 1, name: "Normal" },
  { id: 2, name: "Students Fee" },
]);

const selectedRecipient = ref(null);
const selectedMessageType = ref(null);
const subject = ref("");
const messageContent = ref("");

const handleSubmit = () => {
  console.log({
    recipient: selectedRecipient.value,
    messageType: selectedMessageType.value,
    subject: subject.value,
    message: messageContent.value
  });
};
</script>