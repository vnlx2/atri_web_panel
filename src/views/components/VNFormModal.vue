<script setup>
import { onMounted, ref, reactive, onBeforeUpdate } from "vue";
import { useCookies } from "vue3-cookies";
import { VueFinalModal } from "vue-final-modal";
import { getTitle } from "../../composable/visualNovel";

const props = defineProps({
  isEditForm: {
    type: Boolean,
    default: false,
  },
  vnDetails: {
    type: Object,
    default: {},
  }
});

const isGeneralInfoValid = ref(false);
const isDownloadUrlExists = ref(false);
const cookies = useCookies().cookies;
const isVNUrlValid = ref(false);
const isVNUrlEdit = ref(false);
const editId = ref("");

// Initialized Select Items
const providerLists = ["Drive", "Terabox", "OneDrive", "Mega"];
const typeLists = ["Default", "Patch", "Fandisk"];
const langageLists = ["JP", "EN", "ID"];

// Validation Rules
const codeRule = [
  (v) => !!v || "VN Code is request",
  (v) =>
    /\d{1,7}/gm.test(v) ||
    "Invalid code format, Please using VNDB code format.",
];
const urlRule = [
  (v) => !!v || "Link is request",
  (v) =>
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(
      v
    ) || "Invalid URL Link.",
];

// Store VN Url Data Temporary
const code = ref("");
const title = ref("");
const downloadUrls = ref({});
const downloadUrlsId = ref([]);
const downloadUrl = ref({
  language: null,
  type: null,
  provider: null,
  url: "",
});

onMounted(() => {
  code.value = props.vnDetails.code;
  title.value = props.vnDetails.title;
  downloadUrls.value = (props.vnDetails.downloadUrl) ? props.vnDetails.downloadUrl : {};
  isDownloadUrlExists.value = true;
});

onBeforeUpdate(() => {
  downloadUrlsId.value = [];
});

async function fetchTitle() {
  try {
    title.value = await getTitle(code.value, cookies);
  } catch (err) {
    title.value = err.message;
  }
}

function clearVNUrlForm() {
  downloadUrl.value = {language: null, type: null, provider: null, url: null}
  editId.value = "";
}

function addToList() {
  downloadUrls.value[`${Object.keys(downloadUrls.value).length + 1}`] = { ...downloadUrl.value };
  isDownloadUrlExists.value = true;
  clearVNUrlForm();
}

function editUrl(id) {
  isVNUrlEdit.value = true;
  // Fetch data and put in form
  downloadUrl.value = { ...downloadUrls.value[id] };
  editId.value = id;
  downloadUrlsId.value[id].classList.add("bg-blue-200");
}

function updateUrl(id) {
  // Update VN URL data to Array
  downloadUrls.value[id] = {...downloadUrl.value};
  downloadUrlsId.value[id].classList.remove("bg-blue-200");
  isVNUrlEdit.value = false;
  clearVNUrlForm();
}

function deleteUrl(id) {
  delete downloadUrls.value[id];
  if (Object.keys(downloadUrls.value).length === 0) {
    isDownloadUrlExists.value = false;
  }
}
</script>

<template>
  <vue-final-modal v-slot="{ close }" v-bind="$attrs" classes="flex justify-center items-center m-5"
    content-class="relative flex flex-col 2xl:w-1/2 max-h-full mx-4 p-4 border-transparent rounded-lg dark:border-gray-800 rounded bg-white dark:bg-gray-900">
    <span class="mr-8 text-2xl font-bold">{{ !this.isEditForm ? "Add" : "Edit" }} Visual Novel</span>
    <div class="overflow-y-auto my-5">
      <v-form ref="form" v-model="isGeneralInfoValid" class="px-2" lazy-validation>
        <!-- General Information -->
        <h2 class="text-lg font-semibold mb-3">General Information</h2>
        <v-text-field v-model="code" label="VNDB Code" hint="Example: 1234" :rules="codeRule" :disabled="isEditForm" @blur="fetchTitle" required></v-text-field>
        <v-text-field v-model="title" label="Title" disabled></v-text-field>
        <!-- VN URL -->
        <v-divider class="py-2"></v-divider>
        <h2 class="text-lg font-semibold mb-3">Visual Novel URL Data</h2>
        <!-- VN URL Form -->
        <v-form v-model="isVNUrlValid">
          <v-select
            clearable
            v-model="downloadUrl['language']"
            label="Language"
            :items="langageLists"
          ></v-select>
          <v-select
            clearable
            v-model="downloadUrl['type']"
            label="Type"
            :items="typeLists"
          ></v-select>
          <v-select
            clearable
            v-model="downloadUrl['provider']"
            label="Provider"
            :items="providerLists"
            required
          ></v-select>
          <v-text-field
            v-model="downloadUrl['url']"
            label="URL"
            :rules="urlRule"
            required
          ></v-text-field>
          <button @click="isVNUrlEdit ? updateUrl(editId) : addToList()" type="button"
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 disabled:opacity-50 disabled:pointer-events-none"
            :disabled="!isVNUrlValid">
            {{ isVNUrlEdit? "Edit": "Add" }}
          </button>
        </v-form>
        <!-- VN URL Table -->
        <v-table theme="light" class="mt-2">
          <thead>
            <tr>
              <th class="text-left">Language</th>
              <th class="text-left">Type</th>
              <th class="text-left">Provider</th>
              <th class="text-left">URL</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(downloadUrl, id) in downloadUrls" :ref="el => { downloadUrlsId[id] = el }">
              <td>{{ downloadUrl.language }}</td>
              <td>{{ downloadUrl.type }}</td>
              <td>{{ downloadUrl.provider }}</td>
              <td>
                <p class="lg:max-w-[2rem] xl:max-w-[10rem] 2xl:max-w-md truncate ...">
                  {{ downloadUrl.url }}
                </p>
              </td>
              <td>
                <button type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 disabled:opacity-50 disabled:pointer-events-none"
                  @click="editUrl(id)" :disabled="isVNUrlEdit">
                  <v-icon>mdi-pencil-outline</v-icon>
                </button>
                <button
                  class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 disabled:opacity-50 disabled:pointer-events-none"
                  @click="deleteUrl(id)" :disabled="isVNUrlEdit">
                  <v-icon>mdi-trash-can-outline</v-icon>
                </button>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-form>
    </div>
    <div class="flex-shrink-0 flex justify-center items-center pt-4 space-x-4">
      <button @click="
        !this.isEditForm
          ? $emit('store', code, downloadUrls, close)
          : $emit('update', code, downloadUrls, close)
      " type="button"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 disabled:opacity-50 disabled:pointer-events-none"
        :disabled="!(isGeneralInfoValid && isDownloadUrlExists)">
        {{ !this.isEditForm ? "Save" : "Update" }}
      </button>
      <button @click="close" type="button"
        class="focus:outline-none text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Cancel
      </button>
    </div>
  </vue-final-modal>
</template>
