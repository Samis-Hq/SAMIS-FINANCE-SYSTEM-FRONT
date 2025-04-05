<template>
  <div class="h-full">
    <div class="flex justify-around bg-blue-200 p-2 mb-4">
      <h1 class="text-center">Manage Classes</h1>
      <div @click="toggleAddClassForm" class="cursor-pointer flex items-center gap-2 group">
        <span class="hover-button">Add Class</span>
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
              <span class="ml-2">Add Class/Form/Grade</span>
            </label>
          </div>

          <form v-if="inputMethod === 'keyIn'" @submit.prevent="submitForm">
            <div class="grid grid-cols-2 gap-4">
              <div class="mb-4">
                <label for="className" class="form-labels">Class/Grade Name *</label>
                <input
                    type="text"
                    id="className"
                    v-model="form.grade"
                    class="form-input"
                    required
                />
                <p v-if="!form.grade" class="text-red-500 text-sm mt-1">
                  Class/stream name is required
                </p>
              </div>
              <div class="mb-4">
                <label for="className" class="form-labels">Stream Name *</label>
                <input
                    type="text"
                    id="className"
                    v-model="form.stream"
                    class="form-input"
                    required
                />
                <p v-if="!form.stream" class="text-red-500 text-sm mt-1">
                  stream name is required
                </p>
              </div>
            </div>
            <div class="mt-6">
              <button type="submit" class="my-button">Submit</button>
            </div>
          </form>


        </div>
      </Transition>
    </div>

    <div v-if="isClassListVisible" class="border rounded-sm shadow-md bg-white p-4 m-4">
      <div class="mb-4 flex justify-around items-center gap-2">
        <h2 class="text-xl font-bold">Class List</h2>
        <h2 class="text-xl font-bold">Total:{{ classList.length }}</h2>
      </div>

      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="table-header">#</th>
          <th scope="col" class="table-header">Class Name</th>
          <th scope="col" class="table-header">Streams</th>
          <th scope="col" class="table-header">Actions</th>
        </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
        <template v-if="sortedClasses.length > 0">
          <tr v-for="(classItem, index) in sortedClasses" :key="classItem.streamID">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ index + 1 }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ classItem.grade || 'N/A' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ classItem.stream }}
            </td>
            <td class="px-2 py-2 whitespace-nowrap text-sm text-gray-900 w-40">
              <div class="flex gap-1">
                <button @click="openEditDialog(classItem)"
                        class="bg-yellow-400 hover:bg-yellow-500 text-xs p-1 rounded">
                  Edit
                </button>
                <button @click="openDeleteDialog(classItem.streamID)"
                        class="bg-red-600 hover:bg-red-700 text-xs p-1 rounded text-white">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">
            No classes found
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showEditDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-xl w-96">
        <h3 class="text-lg font-medium mb-4">Edit Class</h3>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Grade</label>
          <input v-model="editForm.grade" class="form-input w-full">
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Stream</label>
          <input v-model="editForm.stream" class="form-input w-full">
        </div>
        <div class="flex justify-end gap-2">
          <button @click="showEditDialog = false" class="px-4 py-2 border rounded-md">Cancel</button>
          <button @click="updateClass" class="px-4 py-2 bg-blue-500 text-white rounded-md">Save</button>
        </div>
      </div>
    </div>

    <div v-if="showDeleteDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-xl w-96">
        <h3 class="text-lg  mb-2 text-red-600 font-bold">Confirm Delete</h3>
        <p class="mb-6">Are you sure you want to delete this class?</p>
        <p class="mb-6 italic text-sm">
          <span class="text-blue-700 font-bold me-2">NB:</span>
          This Action cannot be Undone !!</p>
        <div class="flex justify-end gap-2">
          <button @click="showDeleteDialog = false" class="px-4 py-2 border rounded-md">Cancel</button>
          <button @click="confirmDelete" class="px-4 py-2 bg-red-500 text-white rounded-md">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import type {ClassesRequests, ClassesResponse} from "@/model/Classes";
import {ChevronDoubleDownIcon} from "@heroicons/vue/24/outline";
import {useToast} from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-sugar.css';
import {ClassesService} from "@/services/ClassesServices.ts";

const isClassListVisible = ref(true);
const isAddClassFormVisible = ref(false);
const inputMethod = ref("keyIn");
const $toast = useToast();
const isLoading = ref(false);
const classService = ClassesService;
const form = ref<ClassesRequests>({
  grade: "",
  stream: "",
});
const classList = ref<ClassesResponse[]>([]);
const showEditDialog = ref(false);
const showDeleteDialog = ref(false);
const editForm = ref({
  streamID: "",
  grade: "",
  stream: ""
});
const classToDeleteId = ref("");

onMounted(() => {
  fetchClasses();
});

const sortedClasses = computed(() => {
  return [...classList.value].sort((a, b) => a.className.localeCompare(b.className));
});

const toggleAddClassForm = () => {
  isAddClassFormVisible.value = !isAddClassFormVisible.value;
};

const submitForm = async () => {
  if (!form.value.grade || !form.value.stream) {
    $toast.warning('Fill all required fields!', {
      position: 'top',
      type: 'warning',
      duration: 3000
    });
    return;
  }

  try {
    isLoading.value = true;
    const response = await classService.createClass({
      grade: form.value.grade.toUpperCase(),
      stream: form.value.stream.toUpperCase(),
    });

    $toast.success('Class created successfully!', {
      position: 'top',
      type: 'success',
      duration: 3000
    });
    form.value.grade = "";
    form.value.stream = "";
    await fetchClasses();
    isAddClassFormVisible.value = false;
    return response;
  } catch (error: any) {
    $toast.error(error.message || 'Failed to create class', {
      position: 'top',
      type: 'error',
      duration: 3000
    });
  } finally {
    isLoading.value = false;
  }
};

const fetchClasses = async () => {
  try {
    const response = await classService.getClasses();
    classList.value = Array.isArray(response) ? response : [response];
  } catch (error) {
    console.error("Failed to fetch classes:", error);
    $toast.error("Failed to load classes", {
      position: 'top',
      type: 'error',
      duration: 3000
    });
  }
};

const openEditDialog = (classItem: ClassesResponse) => {
  editForm.value = {
    streamID: classItem.streamID,
    grade: classItem.grade,
    stream: classItem.stream
  };
  showEditDialog.value = true;
};

const openDeleteDialog = (streamID: string) => {
  classToDeleteId.value = streamID;
  showDeleteDialog.value = true;
};

const updateClass = async () => {
  try {
    if (!editForm.value.grade || !editForm.value.stream) {
      $toast.warning('Please fill all fields');
      return;
    }

    await classService.updateClass(editForm.value.streamID, {
      grade: String(editForm.value.grade).toUpperCase(),
      stream: String(editForm.value.stream).toUpperCase()
    });

    $toast.success('Class updated successfully!');
    showEditDialog.value = false;
    await fetchClasses();
  } catch (error) {
    $toast.error('Failed to update class');
  }
};

const confirmDelete = async () => {
  try {
    await classService.deleteClass(classToDeleteId.value);
    $toast.success('Class deleted successfully!');
    showDeleteDialog.value = false;
    await fetchClasses();
  } catch (error) {
    $toast.error('Failed to delete class');
  }
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