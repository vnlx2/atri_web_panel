<script setup lang="ts">
useHead({
  title: "Visual Novel",
});
const vnController = useVisualNovel();
const { visualNovels } = storeToRefs(vnController);

const currentPage = ref(1);
const itemsPerPage = ref(10);
const isLoading = ref(false);
const search = ref("");
const hasDownloadUrl = ref(false);
watch([search, hasDownloadUrl], () => loadTable());

async function changePage(pageNumber: number) {
  currentPage.value = pageNumber;
  await loadTable();
}

async function drop(code: string) {
  if (
    confirm(
      `Are you sure want to delete this Visual Novel with code ${code}?`
    ) === false
  ) {
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

await useLazyAsyncData("loadVNLists", async () => await loadTable());

async function loadTable() {
  try {
    isLoading.value = true;
    console.log(hasDownloadUrl.value);
    const res = await vnController.getVisualNovels({
      page: currentPage.value,
      keyword: search.value,
      hasDownloadUrl: hasDownloadUrl.value,
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
      <button
        @click="navigateTo('visualnovel/add')"
        class="flex items-center bg-blue-600 hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 transition-colors text-white font-medium px-3 py-2 rounded-md shadow-sm"
      >
        <i class="ri-add-line text-lg font-bold mr-2"></i>
        <p>Add New</p>
      </button>
      <div class="flex flex-row gap-x-5">
        <div class="inline-flex items-center">
          <label
            htmlFor="auto-update"
            class="mt-px mb-0 mr-3 font-light text-gray-700 cursor-pointer select-none"
          >
            Downloadable
          </label>
          <div
            class="relative inline-block w-8 h-4 rounded-full cursor-pointer"
          >
            <input
              v-model="hasDownloadUrl"
              id="auto-update"
              type="checkbox"
              class="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-blue-900 peer-checked:border-blue-900 peer-checked:before:bg-blue-900"
            />
            <label
              htmlFor="auto-update"
              class="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-blue-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-blue-900 peer-checked:before:bg-blue-900"
            >
              <div
                class="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                data-ripple-dark="true"
              ></div>
            </label>
          </div>
        </div>
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
    </div>
    <div v-if="isLoading" class="py-3">
      <table class="table-auto animate-pulse w-full">
        <tbody>
          <tr class="border-gray-300" v-for="items in 5">
            <td class="py-2 text-left pl-5 w-1/4">
              <div class="bg-gray-300 text-transparent rounded-lg">s</div>
            </td>
            <td class="py-2 text-left pl-5 w-2/4">
              <div class="bg-gray-300 text-transparent rounded-lg">a</div>
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
          <tr
            v-for="visualNovel in visualNovels"
            class="border-y border-gray-300"
          >
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
                @click="
                  navigateTo(`/admin/visualnovel/edit?code=${visualNovel.code}`)
                "
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
