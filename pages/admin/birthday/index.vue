<script setup lang="ts">
import Swal from 'sweetalert2';
import { type IErrorResponse } from '~/types';

useHead({
  title: "Birthday",
});
const birthdayController = useBirthday();
const { birthdays, birthdayTotal } = storeToRefs(birthdayController);
const isLoading = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(10);

async function drop(id: string) {
  // Swal.fire({
  //   title: 'Are you sure?',
  //   text: "You won't be able to revert this user!",
  //   icon: 'warning',
  //   animation: false,
  //   showCancelButton: true,
  //   reverseButtons: true,
  // }).then(async (res) => {
  //   if (res.isConfirmed) {
  //     try {
  //       await userController.delete(id);
  //       Swal.fire({
  //         title: "Deleted!",
  //         text: "User has been deleted.",
  //         icon: 'success',
  //         animation: false,
  //       });
  //       loadTable();
  //     } catch (error: IErrorResponse | any) {
  //       generalErrorAlert(error);
  //     }
  //   }
  // });
}

await useLazyAsyncData("loadBirthdayLists", async () => await loadTable());

async function loadTable() {
  try {
    isLoading.value = true;
    await birthdayController.getBirthdays(currentPage.value);
    isLoading.value = false;
  } catch (error) {
    generalErrorAlert(error);
  }
}

async function changePage(pageNumber: number) {
  currentPage.value = pageNumber;
  await loadTable();
}
</script>

<template>
  <h1 class="font-sans font-medium text-3xl my-5 rounded-lg">Birthday</h1>
  <div class="bg-white rounded-lg shadow-md px-5">
    <div class="flex justify-between py-6">
      <button
        @click="navigateTo('user/add')"
        class="flex items-center bg-blue-600 hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 transition-colors text-white font-medium px-3 py-2 rounded-md shadow-sm"
      >
        <i class="ri-add-line text-lg font-bold mr-2"></i>
        <p>Add New</p>
      </button>
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
            <th class="py-2 text-left pl-5">User Id</th>
            <th class="py-2 text-left pl-5">Name</th>
            <th class="py-2 text-left pl-5">Birthday Date</th>
            <th class="py-2 text-left pl-5">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="birthday in birthdays"
            class="border-y border-gray-300"
          >
            <td class="py-2 pl-5">{{ birthday.id }}</td>
            <td class="py-2 pl-5">{{ birthday.username }}</td>
            <td class="py-2 pl-5">{{ birthday.date }}</td>
            <td class="py-2 pl-5">
              <button
                @click="
                  navigateTo(`/admin/user/edit?code=${birthday.id}`)
                "
                class="bg-yellow-500 hover:bg-yellow-400 focus:ring-3 focus:ring-yellow-200 transition-colors text-white font-medium rounded-md shadow-sm px-2.5 mx-1 py-1"
              >
                <i class="ri-pencil-line"></i>
              </button>
              <button
                @click="drop(birthday.id)"
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
      :itemsCount="birthdayTotal ?? 1"
      :itemsPerPage="itemsPerPage"
      :currentPage="currentPage"
      @changePage="changePage"
    />
  </div>
</template>
