<script setup>
import axios from "axios";
import HeaderName from "../components/Header.vue";
import { $vfm, ModalsContainer } from "vue-final-modal";
import VNFormModalVue from "../components/VNFormModal.vue";
</script>

<template>
  <HeaderName>Visual Novel's List</HeaderName>
  <div class="mt-10 p-5">
    <button
      @click="add"
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <svg
        class="mr-2 -ml-1 w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        ></path>
      </svg>
      Add Record
    </button>
    <div class="pt-6">
      <v-table theme="light">
        <thead>
          <tr>
            <th class="text-left">Code</th>
            <th class="text-left">Title</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in vnLists">
            <td>{{ item.code }}</td>
            <td>Dummy Dulu Titlenya</td>
            <td>
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                @click="edit(item.code)"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  ></path>
                </svg>
                <span class="sr-only">Edit</span>
              </button>
              <button
                type="button"
                class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                @click="destroy(item.code)"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
                <span class="sr-only">Delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <!-- Modal Container -->
    <modals-container></modals-container>
    <!-- Snackbar Status Container -->
    <v-snackbar
      v-model="snackbarStatus.state"
      :timeout="2000"
      color="blue-grey"
      rounded="pill"
    >
      {{ snackbarStatus.message }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  mounted() {
    this.showList();
  },
  data() {
    return {
      vnLists: [],
      showForm: false,
      snackbarStatus: {
        state: false,
        message: ''
      },
    };
  },
  methods: {
    async showList() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_ADDRESS}/api/v1/visualnovel/list`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.$cookies.get("token")}`,
            },
          }
        );
        if (response && response.status == 200) {
          this.vnLists = response.data.data;
        }
      } catch (err) {
        console.error(err);
      }
    },
    add() {
      const self = this;
      $vfm.show({
        component: VNFormModalVue,
        on: {
          async store(code, vnDataUrls, close) {
            try {
              const response = await self.store({ code: code, vnDataUrls: vnDataUrls });
              if(response && response.status == 201) {       
                self.showSnackbarStatus(response.data);
                self.showList();
                close();
              }
            } catch (err) {
              self.showSnackbarStatus(err);
            }
          },
        },
      });
    }, 
    async store(body) {
      try {
        return await axios.post(
          `${import.meta.env.VITE_API_ADDRESS}/api/v1/visualnovel/store`,
          body, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.$cookies.get("token")}`,
            },
          }
        );
      } catch (err) {
        throw err.response.data;
      }
    },
    async edit(code) {
      console.log(code);
    },
    async destroy(code) {
      console.log(`Delete ${code}`);
    },
    showSnackbarStatus(response) {
      if('code' in response) {
        this.snackbarStatus.message = `Error: ${response.message}.\n${('detailMessage' in response) ? response.detailMessage : ''}`
      }
      else {
        this.snackbarStatus.message = response.message;
      }
      this.snackbarStatus.state = true;
    },
  },
};
</script>
