<template>
  <div class="h-full ">
    <div class="flex justify-around  bg-blue-200 p-2 mb-4">

      <h1 class=" text-center">Manage Classes</h1>
      <div
        @click="toggleAddClassForm"
        class="cursor-pointer flex items-center gap-2 group"
      >
        <span class="hover-button"> Add Class </span>

        <ChevronDoubleDownIcon
          class="h-6 w-6 text-blue-500 transform transition-transform duration-300"
          :class="{ 'rotate-180': isAddClassFormVisible }"
        />
      </div>
    </div>

    <div class="flex justify-center items-center m-4">
      <Transition name="slide-down" mode="out-in">
        <div
          v-if="isAddClassFormVisible"
          class="class-form"
          :class="{
            'opacity-100 translate-y-0': isAddClassFormVisible,
            'opacity-0 -translate-y-4': !isAddClassFormVisible,
          }"
        >
          <div class="flex items-center mb-6">
            <label class="flex items-center mr-6">
              <input
                type="radio"
                v-model="inputMethod"
                value="keyIn"
                class="form-radio h-4 w-4 text-blue-600"
              />
              <span class="ml-2">Add Class/Form</span>
            </label>
            <label class="flex items-center">
              <input
                type="radio"
                v-model="inputMethod"
                value="streams"
                class="form-radio h-4 w-4 text-blue-600"
              />
              <span class="ml-2">Add Class/Forms Streams</span>
            </label>
          </div>

          <!-- Key In Class Details -->
          <form v-if="inputMethod === 'keyIn'" @submit.prevent="submitForm">
            <div class="grid grid-cols-2 gap-4">
              <!-- Class Name -->
              <div class="mb-4">
                <label for="className" class="form-labels">
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
            </div>

            <!-- Submit Button -->
            <div class="mt-6">
              <button
                type="submit"
                class="my-button"
              >
                Submit
              </button>
            </div>
          </form>

          <form v-if="inputMethod === 'streams'" @submit.prevent="submitForm">
            <div class="grid grid-cols-2 gap-4">
              <!-- Class Name -->
              <div class="mb-4">
                <label for="className" class="form-labels">
                  Class Name *
                </label>
                <select
                  id="account"
                  v-model="form.name"
                  class="form-input"
                  required
                >
                  <option value="" disabled>Select Class</option>
                  <option value="Form 1">Form 1</option>
                  <option value="Form 2">Form 2</option>
                  <option value="Form 3">Form 3</option>
                  <option value="Form 4">Form 4</option>
                </select>
                <p v-if="!form.name" class="text-red-500 text-sm mt-1">
                  Class name is required
                </p>
              </div>

              <!-- Streams -->
              <div class="mb-4">
                <label for="streams" class="form-labels"> Streams * </label>
                <input
                  type="text"
                  id="streams"
                  v-model="form.streams"
                  class="form-input"
                  placeholder="South,West,East,North"
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
      class="border rounded-sm shadow-md bg-white p-4 m-4"
    >
      <h2 class="text-xl font-bold mb-4">Class List</h2>

      <!-- Table to Display Classes -->
      <table class="my-table">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="table-header"
            >
              ##
            </th>
            <th
              scope="col"
              class="table-header"
            >
              Class Name
            </th>
            <th
              scope="col"
              class="table-header"
            >
              Streams
            </th>
            <th
              scope="col"
              class="table-header"
            >
              Population
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(classItem ,index) in classList" :key="classItem.id">

            <td class="px-6 py-2 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ index + 1 }}</div>
            </td>
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

<script setup lang="ts">
import { ref } from "vue";
import type { Classes } from "@/model/Classes";
import { ChevronDoubleDownIcon } from "@heroicons/vue/24/outline";

const isClassListVisible = ref(true);
const isAddClassFormVisible = ref(false);
const inputMethod = ref("keyIn");

const form = ref<Classes>({
  id: "",
  name: "",
  streams: [],
  population: 0,
});

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
