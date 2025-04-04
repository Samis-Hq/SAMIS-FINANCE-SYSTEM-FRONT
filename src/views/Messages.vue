<template>
  <div class="h-full">
    <div class="card-header">
      <h1>Messages</h1>
    </div>

      <div class="flex shadow-md rounded-md justify-center items-center w-3/5 m-10 bg-white ">

        <form @submit.prevent="handleSubmit" class=" w-full p-4 m-4">

          <div class="mb-6 p-4 border rounded-lg bg-white">
            <label class="form-labels mb-4">Choose Recipient </label>
            <div class="flex space-x-4">
              <div v-for="recipient in recipients" :key="recipient.id" class="flex items-center">
                <input
                    type="radio"
                    :id="`recipient-${recipient.id}`"
                    v-model="selectedRecipient"
                    :value="recipient"
                    class="h-4 w-4 me-2 text-blue-600 focus:ring-blue-500 border-gray-300"
                    required
                    @change="selectedMessageType = null"
                >
                <label :for="`recipient-${recipient.id}`" class="form-labels">
                  {{ recipient.name }}
                </label>
              </div>
            </div>
          </div>

          <div v-if="selectedRecipient" class="mb-6 p-4 border rounded-lg bg-white">
            <label class="form-labels mb-4">Select Message Type </label>
            <div class="flex space-x-4">
              <div v-for="type in messageType" :key="type.id" class="flex items-center">
                <input
                    type="radio"
                    :id="`type-${type.id}`"
                    v-model="selectedMessageType"
                    :value="type"
                    class="h-4 w-4 me-2 text-blue-600 focus:ring-blue-500 border-gray-300"
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
              <label for="subject" class="form-labels">Subject *</label>
              <input
                  id="subject"
                  type="text"
                  v-model="subject"
                  class="form-input"
                  required
              />
            </div>

            <div class="mb-4">
              <label for="message" class="form-labels">Message *</label>
              <textarea
                  id="message"
                  v-model="messageContent"
                  rows="4"
                  class="form-input"
                  required
              ></textarea>
            </div>

            <button
                type="submit"
                class="my-button"
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