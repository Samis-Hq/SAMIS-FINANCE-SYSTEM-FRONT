<template>

  <div class="modal-overlay" v-if="showMessage">
    <div class="bg-white rounded-md p-6 max-w-md w-full relative">
      <XMarkIcon
          class="h-6 w-6 text-red-600 absolute top-3 right-3 cursor-pointer hover:scale-110 transition-transform"
          @click.self="dismissMessage"
      />
      <div class="text-center text-2xl p-4 text-blue-500 font-custom tracking-widest">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';

const showMessage = ref(false);
const message = ref('');
const dismissed = ref(false);
import {
  XMarkIcon,
} from "@heroicons/vue/24/outline";

const occasions = [
  {
    name: "Idd-ul-Fitr",
    // message: "SAMIS Wishes You Happy Easter Holidays!",
    message: "Eid Mubarak to our Muslim community!",
    startDate: "2023-04-21",
    endDate: "2026-04-23",
    regions: ["Mombasa", "Kwale", "Kilifi", "Lamu", "Garissa", "Wajir"]
  },
  {
    name: "Idd-ul-Adha",
    message: "Happy Feast of Sacrifice!",
    startDate: "2023-06-28",
    endDate: "2026-06-30",
    regions: ["Mombasa", "Kwale", "Kilifi", "Lamu"]
  }
];

const checkForOccasion = () => {
  // Check if user dismissed the message
  if (localStorage.getItem('dismissedRegionalMessage')) {
    dismissed.value = true;
    return;
  }

  // Get user region from localStorage
  const userRegion = localStorage.getItem('userRegion');
  if (!userRegion) return;

  // Get current date
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  // Check if today falls within any occasion
  const currentOccasion = occasions.find(occasion => {
    return today >= occasion.startDate &&
        today <= occasion.endDate &&
        occasion.regions.includes(userRegion);
  });

  if (currentOccasion) {
    message.value = currentOccasion.message;
    showMessage.value = true;
  }
};

const dismissMessage = () => {
  showMessage.value = false;
  dismissed.value = true;
  localStorage.setItem('dismissedRegionalMessage', 'true');

  // Optional: Show again after 24 hours
  setTimeout(() => {
    localStorage.removeItem('dismissedRegionalMessage');
  }, 24 * 60 * 60 * 1000);
};

onMounted(() => {
  checkForOccasion();
  console.log(occasions)
});
</script>

<style>

</style>