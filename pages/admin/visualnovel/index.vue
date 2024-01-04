<script setup lang="ts">
useHead({
  title: "Visual Novel"
});
const vnController = useVisualNovel();
const { visualNovels } = storeToRefs(vnController);

const currentPage = ref(1);
const itemsPerPage = ref(10);
const isLoading = ref(false);
const search = ref('');
const hasDownloadUrl = ref(false);
watch(search, () => loadTable());

async function changePage(pageNumber: number) {
  currentPage.value = pageNumber;
  await loadTable();
}

async function drop(code: string) {
  if (confirm(`Are you sure want to delete this Visual Novel with code ${code}?`) === false) {
    return;
  }
  try {
    await vnController.deleteVisualNovel(code);
    alert("Success");
    loadTable();
  } catch (error) {
    alert("Error");
  }
}

await useLazyAsyncData('loadVNLists', async() => await loadTable());

async function loadTable() {
  try {
    isLoading.value = true;
    const res = await vnController.getVisualNovels({
      page: currentPage.value,
      keyword: search.value,
      hasDownloadUrl: hasDownloadUrl.value
    });
    if (res) {
      isLoading.value = false;
    }
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
    <h1 class="font-sans font-medium text-3xl my-5 rounded-lg">Visual Novel</h1>
    <div class="bg-white rounded-lg shadow-md px-5">
      <div class="flex justify-between py-6">
        <button @click="navigateTo('visualnovel/add')"
          class="flex items-center bg-blue-600 hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 transition-colors text-white font-medium px-3 py-2 rounded-md shadow-sm"
        >
          <i class="ri-add-line text-lg font-bold mr-2"></i>
          <p>Add New</p>
        </button>
        <div class="relative flex items-center">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"
          >
            <i class="ri-search-2-line"></i>
          </div>
          <input
            v-model="search"
            type="text"
            class="border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 pl-10"
            placeholder="Search"
          />
        </div>
      </div>
      <div v-if="isLoading" class="py-3">
        <table class="table-auto animate-pulse w-full">
          <tbody>
            <tr class="border-gray-300" v-for="items in 5">
              <td class="py-2 text-left pl-5 w-1/4">
                <div class="bg-gray-300 text-transparent rounded-lg">
                  s
                </div>
              </td>
              <td class="py-2 text-left pl-5 w-2/4">
                <div class="bg-gray-300 text-transparent rounded-lg">
                  a
                </div>
              </td>
              <td class="py-2 text-left pl-5 w-1/4">
                <div class="bg-gray-300 text-transparent rounded-lg w-full">
                  a
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="py-3">
        <table class="table-auto w-full">
          <thead>
            <tr class="border-y border-gray-300">
              <th class="py-2 text-left pl-5">Code</th>
              <th class="py-2 text-left pl-5">Title</th>
              <th class="py-2 text-left pl-5">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="visualNovel in visualNovels" class="border-y border-gray-300">
              <td class="py-2 pl-5">{{ visualNovel.code }}</td>
              <td class="py-2 pl-5">{{ visualNovel.title }}</td>
              <td class="py-2 pl-5">
                <button
                  @click="navigateTo(`/admin/visualnovel/${visualNovel.code}`)"
                  class="bg-blue-500 hover:bg-blue-400 focus:ring-3 focus:ring-blue-200 transition-colors text-white font-medium rounded-md shadow-sm px-2.5 mx-1 py-1"
                >
                  <i class="ri-eye-line"></i>
                </button>
                <button
                  @click="navigateTo(`/admin/visualnovel/edit?code=${visualNovel.code}`)"
                  class="bg-yellow-500 hover:bg-yellow-400 focus:ring-3 focus:ring-yellow-200 transition-colors text-white font-medium rounded-md shadow-sm px-2.5 mx-1 py-1"
                >
                  <i class="ri-pencil-line"></i>
                </button>
                <button
                  @click="drop(visualNovel.code)"
                  class="bg-red-500 hover:bg-red-400 focus:ring-3 focus:ring-red-200 transition-colors text-white font-medium rounded-md shadow-sm px-2.5 mx-1 py-1"
                >
                  <i class="ri-delete-bin-line"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination
        v-if="!isLoading"
        :itemsCount="200"
        :itemsPerPage="itemsPerPage"
        :currentPage="currentPage"
        @changePage="changePage"
      />
    </div>
</template>
