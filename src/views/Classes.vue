<template>
  <div class="h-full mt-10">
    <!-- Toggle Button and Chevron Icon -->
    <div class="flex justify-between border rounded-sm shadow-md bg-white p-2 mb-4">
      <button
        @click="showClassList"
        :class="{
          'bg-blue-700': isClassListVisible,
          'bg-blue-500': !isClassListVisible,
        }"
        class="text-white px-2 py-2 rounded"
      >
        Class List
      </button>
      <div @click="toggleAddClassForm" class="cursor-pointer">
        <ChevronDoubleDownIcon
          class="h-6 w-6 text-blue-500 transform transition-transform duration-300"
          :class="{ 'rotate-180': isAddClassFormVisible }"
        />
      </div>
    </div>

    <!-- Add Class Form with Tailwind Transition -->

<div class="flex justify-center items-center">
    <Transition  name="slide-down" mode="out-in">
      <div
      v-if="isAddClassFormVisible"
      class="class-form"
      :class="{
        'opacity-100 translate-y-0': isAddClassFormVisible,
        'opacity-0 -translate-y-4': !isAddClassFormVisible,
      }"
    >
      <h2 class="text-xl font-bold mb-4">Add Class</h2>

      <!-- Key In Class Details -->
      <form v-if="inputMethod === 'keyIn'" @submit.prevent="submitForm">
        <div class="grid grid-cols-2 gap-4">
          <!-- Class Name -->
          <div class="mb-4">
            <label
              for="className"
              class="form-labels"
            >
              Class Name *
            </label>
            <input
              type="text"
              id="className"
              v-model="form.name"
              class="form-input"
              required
            />
            <p v-if="!form.name" class="text-red-500 text-sm mt-1">
              Class name is required
            </p>
          </div>

          <!-- Streams -->
          <div class="mb-4">
            <label
              for="streams"
              class="form-labels"
            >
              Streams *
            </label>
            <input
              type="text"
              id="streams"
              v-model="form.streams"
              class="form-input"
              required
            />
            <p v-if="!form.streams" class="required-text">
              Streams are required
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

    </Transition>
  </div>
    <!-- Class List -->
    <div
      v-if="isClassListVisible"
      class="border rounded-sm shadow-md bg-white p-4"
    >
      <h2 class="text-xl font-bold mb-4">Class List</h2>

      <!-- Table to Display Classes -->
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Class Name
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Streams
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Population
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="classItem in classList" :key="classItem.id">
            <td class="px-6 py-2 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ classItem.name }}</div>
            </td>
            <td class="px-6 py-2 whitespace-nowrap">
              <div class="text-sm text-gray-900">
                {{ classItem.streams.join(", ") }}
              </div>
            </td>
            <td class="px-6 py-2 whitespace-nowrap">
              <div class="text-sm text-gray-900">
                {{ classItem.population }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import type { Classes } from "@/model/Classes";
import { ChevronDoubleDownIcon } from "@heroicons/vue/24/outline";

export default {
  components: {
    ChevronDoubleDownIcon,
  },
  setup() {
    const isClassListVisible = ref(true);
    const isAddClassFormVisible = ref(false);
    const inputMethod = ref("keyIn");
    const form = ref<Classes>({
      id: "",
      name: "",
      streams: [],
      population: 0,
    });

    // Sample class list data
    const classList = ref<Classes[]>([
      {
        id: "1",
        name: "Form 1",
        streams: ["East", "West"],
        population: 50,
      },
      {
        id: "2",
        name: "Form 2",
        streams: ["North", "South"],
        population: 45,
      },
      {
        id: "3",
        name: "Form 3",
        streams: ["East", "North"],
        population: 60,
      },
      {
        id: "4",
        name: "Form 4",
        streams: ["West", "South"],
        population: 55,
      },
    ]);

    const showClassList = () => {
      isClassListVisible.value = true;
      isAddClassFormVisible.value = false;
    };

    const toggleAddClassForm = () => {
      isAddClassFormVisible.value = !isAddClassFormVisible.value;
    };

    const submitForm = () => {
      console.log("Form Submitted:", form.value);
    };

    return {
      isClassListVisible,
      isAddClassFormVisible,
      form,
      inputMethod,
      classList,
      showClassList,
      toggleAddClassForm,
      submitForm,
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
  transform: translateY(-20%);
  opacity: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>