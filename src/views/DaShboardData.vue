<script setup lang="ts">
import {ref, onMounted, computed, onUnmounted} from "vue";

import PieChart from "./PieChart.vue";

import BarChart from "./BarChart.vue";
import {
  PlusCircleIcon,
  BriefcaseIcon,
  CogIcon,
  BookOpenIcon,
  AcademicCapIcon,
  UserGroupIcon,
  CurrencyBangladeshiIcon,MapIcon,
  PlusIcon
} from "@heroicons/vue/24/outline";

const shortcuts = ref([
  { name: "Students", link: "/students", icon: PlusCircleIcon },
  { name: "Classes", link: "/dashboard", icon: AcademicCapIcon },

  { name: "Fee Structure", link: "/structure", icon: BookOpenIcon },
  { name: "Invoices", link: "/teachers", icon: CurrencyBangladeshiIcon },
  { name: " Fee Statements", link: "/statements", icon: MapIcon },
  { name: "Reports", link: "/library", icon: BriefcaseIcon },
  { name: "Settings", link: "/settings", icon: CogIcon },
  { name: "Import Excels", link: "/uploads", icon: PlusIcon },
]);
// State
const selectedSection = ref("gettingStarted");
const isGetStartedClosed = ref(false);
const isOverviewClosed = ref(false);

const currentTime = ref("");

const hour = computed(() => new Date().getHours());
const greetings = computed(() => {
  if (hour.value >= 5 && hour.value < 12) return "Good morning";
  if (hour.value >= 12 && hour.value < 17) return "Good afternoon";
  if (hour.value >= 17 && hour.value < 21) return "Good evening";
  return "Good night";
});

function updateTime() {
  currentTime.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

onMounted(() => {
  updateTime();
  const timer = setInterval(updateTime, 1000);
  onUnmounted(() => clearInterval(timer));
});

const openGetStarted = () => {
  selectedSection.value = "gettingStarted";
  isGetStartedClosed.value = false;
  isOverviewClosed.value = true;
};

const openBusinessOverView = () => {
  selectedSection.value = "businessOverview";
  isOverviewClosed.value = false;
  isGetStartedClosed.value = true;
};
</script>

<template>
  <div class="container  mx-auto p-4">
    <div class="flex justify-start items-center">
      <h1 class="text-blue-400 text-xl font-bold">
        {{ greetings }}.
      </h1>
    </div>

    <!-- Tabs -->
    <div class="flex flex-row space-x-4 border-b border-gray-300 rounded-sm shadow-sm pb-2">

      <div
        @click="openGetStarted"
        :class="[
          'cursor-pointer px-4 py-2 relative',
          selectedSection === 'gettingStarted'
            ? 'text-blue-600 font-bold after:absolute' +
             ' after:bottom-0 after:left-0 after:w-full after:h-[3px] ' +
              'after:bg-blue-600 after:rounded-md'
            : 'text-gray-600',
        ]"
      >
        <h1>Getting Started</h1>
      </div>

      <div
        @click="openBusinessOverView"
        :class="[
          'cursor-pointer px-4 py-2 relative',
          selectedSection === 'businessOverview'
            ? 'text-blue-600 font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-blue-600 after:rounded-md'
            : 'text-gray-600',
        ]"
      >
        <h1>School Overview</h1>
      </div>
    </div>
    <div class="mt-4 p-4">
      <div v-if="selectedSection === 'gettingStarted'">
        <h2 class="text-xl font-semibold">Quick Shortcuts </h2>
        <p>Navigate through this application  easily......</p>
        <div class="flex flex-col   ">
        <div class="grid grid-cols-2 w-full  md:w-3/5 sm:grid-cols-3 lg:grid-cols-3 gap-4 py-2">
          <RouterLink
            v-for="item in shortcuts"
            :key="item.name"
            :to="item.link"
            class="flex flex-col bg-blue-300 items-center mt-10 rounded-sm hover:bg-blue-500 transition hover:text-white"
          >
            <component :is="item.icon" class="h-16 w-16 text-white" />
            <p class="m-2 text-sm font-medium">{{ item.name }}</p>
          </RouterLink>
        </div>
      </div>
      </div>

      <div v-if="selectedSection === 'businessOverview'">
        <h2 class="text-xl font-semibold">School Statistics</h2>
        <p>School financial Statistics at a glance....</p>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 py-2"
        >
          <div class="flex flex-col border rounded-sm shadow-md bg-white p-4">
            <h3 class="text-lg text-center justify-center font-semibold mb-4">
              School Population
            </h3>
            <!-- Students Section -->
            <div class="mb-8 flex items-center">
              <div
                class="flex items-center justify-center h-12 w-12 rounded-sm bg-blue-200 text-blue-500"
              >
                <UserGroupIcon class="h-10 w-10 text-blue-500" />
              </div>
              <div class="ml-4 text-start flex-1">
                <h1 class="text-xl text-blue-500 font-bold">Students</h1>
                <p class="text-bold text-xl">1500</p>
              </div>
            </div>

            <!-- Classes Section -->
            <div class="flex items-center">
              <div
                class="flex items-center justify-center h-12 w-12 rounded-sm bg-blue-200 text-blue-500"
              >
                <AcademicCapIcon class="h-20 w-20 text-blue-500" />
              </div>
              <div class="ml-4 text-start flex-1">
                <h1 class="text-xl text-blue-500 font-bold">Classes</h1>
                <p class="text-bold text-xl">50</p>
              </div>
            </div>
          </div>

          <div
            class="flex flex-col items-center border rounded-sm shadow-md bg-white p-4"
          >
            <h3 class="text-lg font-semibold mb-4">Financial Distribution</h3>
            <div class="w-full h-60">
              <PieChart />
            </div>
          </div>

          <div
            class="flex flex-col items-center border rounded-sm shadow-md bg-white p-4"
          >
            <h3 class="text-lg font-semibold mb-4">Accounts Distribution</h3>
            <div class="w-full h-60">
              <BarChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cursor-pointer {
  transition: color 0.3s ease;
}
</style>
