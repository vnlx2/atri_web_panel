<script setup lang="ts">
import Swal from "sweetalert2";

useHead({
  title: "Configure",
});

const configController = useConfig();
const {storageProviders} = storeToRefs(configController);
await useLazyAsyncData("loadConfigTables", async () => await loadTable());

async function loadTable() {
  try {
    await configController.getStorageProviders();
  } catch (error) {
    generalErrorAlert(error);
  }
}

// Storage provider methods
const editedProviderRow = {
  index: ref(0),
  isEdited: ref(false),
  isAdded: ref(false),
  oldData: {
    code: '',
    name: ''
  }
};

function getCurrentProvidersLength() {
  return storageProviders.value.length;
}

function addProvider() {
  const latestIndex = getCurrentProvidersLength() - 1;
  if (editedProviderRow.index.value === latestIndex
    && editedProviderRow.isAdded.value) {
      storeProvider();
  }
  storageProviders.value.push({
    code: '',
    name: ''
  });
  editedProviderRow.index.value = latestIndex + 1;
  editedProviderRow.isEdited.value = true;
  editedProviderRow.isAdded.value = true;
}

function storeProvider() {
  configController.saveStorageProviders();
  editedProviderRow.index.value = 0;
  editedProviderRow.isEdited.value = false;
}

function editProvider(index: number) {
  if (editedProviderRow.isAdded.value) {
      storageProviders.value.pop();
      editedProviderRow.isAdded.value = false;
  }
  // Store old data
  editedProviderRow.oldData = storageProviders.value[index];
  editedProviderRow.index.value = index;
  editedProviderRow.isEdited.value = true;
}

function cancelEditProvider(index: number) {
  if (editedProviderRow.isAdded.value) {
    storageProviders.value.pop();
    editedProviderRow.isAdded.value = false;
  }
  // Restore old data
  storageProviders.value[index] = editedProviderRow.oldData;
  editedProviderRow.index.value = 0;
  editedProviderRow.isEdited.value = false;
}

function deleteProvider(index: number) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Your data will be lost',
    icon: 'warning',
    animation: false,
    showCancelButton: true,
    reverseButtons: true,
  }).then((res) => {
    if (res.isConfirmed) {
      storageProviders.value.splice(index, 1);
      Swal.fire({
        title: 'Delete Provider Success',
        icon: 'success',
        animation: false,
        timer: 1500
      }).then(() => {
        loadTable();
      });
    }
  })
}

</script>

<template>
  <span class="text-sm">
    <NuxtLink class="text-link" to="/admin/visualnovel">VisualNovel</NuxtLink>
    <span> / Configure</span>
  </span>
  <h1 class="font-sans font-medium text-3xl my-5 rounded-lg">Configure</h1>
  <!-- Download Provider -->
  <div class="bg-white rounded-lg shadow-md px-10 mt-10 py-5">
    <h3 class="font-sans font-medium text-2xl rounded-lg pb-5">
      Download Provider
    </h3>
    <table :class="['w-full min-w-max table-auto text-left']">
      <thead>
        <tr>
          <th class="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            <p>Code</p>
          </th>
          <th class="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            <p>Name</p>
          </th>
          <th class="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            <p>Action</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(provider, index) in storageProviders" :key="index">
          <td class="p-4 border-b border-blue-gray-50">
            <div
              class="relative w-full min-w-[200px] h-10"
              v-if="editedProviderRow.index.value === index && editedProviderRow.isEdited.value"
            >
              <input
                class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder="URL"
                v-model="provider.code"
              />
            </div>
            <p v-else>{{ provider.code }}</p>
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <div
              class="relative w-full min-w-[200px] h-10"
              v-if="editedProviderRow.index.value === index && editedProviderRow.isEdited.value"
            >
              <input
                class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder="URL"
                v-model="provider.name"
              />
            </div>
            <p v-else>{{ provider.name }}</p>
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <div
              v-if="editedProviderRow.index.value === index && editedProviderRow.isEdited.value"
            >
              <button
                class="bg-green-500 hover:bg-green-400 focus:ring-3 focus:ring-green-200 disabled:opacity-30 transition-colors text-white font-medium rounded-md shadow-sm px-2.5 mx-1 py-1"
                @click="storeProvider"
                :disabled="provider.code === '' || provider.name === ''"
              >
                <i class="ri-check-line"></i>
              </button>
              <button
                class="bg-red-500 hover:bg-red-400 focus:ring-3 focus:ring-red-200 transition-colors text-white font-medium rounded-md shadow-sm px-2.5 mx-1 py-1"
                @click="cancelEditProvider(index)"
              >
                <i class="ri-close-line"></i>
              </button>
            </div>
            <div v-else>
              <button
                class="bg-yellow-500 hover:bg-yellow-400 focus:ring-3 focus:ring-yellow-200 transition-colors text-white font-medium rounded-md shadow-sm px-2.5 mx-1 py-1"
                @click="editProvider(index)"
              >
                <i class="ri-pencil-line"></i>
              </button>
              <button
                class="bg-red-500 hover:bg-red-400 focus:ring-3 focus:ring-red-200 transition-colors text-white font-medium rounded-md shadow-sm px-2.5 mx-1 py-1"
                @click="deleteProvider(index)"
              >
                <i class="ri-delete-bin-line"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <button
      type="button"
      @click="addProvider"
      class="bg-blue-600 hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 transition-colors text-white font-medium p-2 rounded-md shadow-sm mt-5 px-3"
    >
      <p>Add Provider</p>
    </button>
  </div>

  <div class="my-5 flex flex-row space-x-5">
    <button
      type="button"
      @click="navigateTo('/admin/visualnovel')"
      class="bg-blue-600 hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 transition-colors text-white font-medium p-2 rounded-md shadow-sm mt-5 px-3"
    >
      <p>Back</p>
    </button>
  </div>
</template>
