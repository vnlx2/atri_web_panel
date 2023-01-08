<script setup>
import { VueFinalModal } from "vue-final-modal";
</script>

<template>
  <vue-final-modal
    v-slot="{ close }"
    v-bind="$attrs"
    classes="flex justify-center items-center m-5"
    content-class="relative flex flex-col 2xl:w-1/2 max-h-full mx-4 p-4 border-transparent rounded-lg dark:border-gray-800 rounded bg-white dark:bg-gray-900"
  >
    <span class="mr-8 text-2xl font-bold">Add Visual Novel</span>
    <div class="overflow-y-auto my-5">
      <v-form
        ref="form"
        v-model="isGeneralInfoValid"
        class="px-2"
        lazy-validation
      >
        <!-- General Information -->
        <h2 class="text-lg font-semibold mb-3">General Information</h2>
        <v-text-field
          v-model="code"
          label="VNDB Code"
          hint="Example: v1234"
          :rules="codeRule"
          :disabled="isEditForm"
          required
        ></v-text-field>
        <v-text-field v-model="title" label="Title" disabled></v-text-field>
        <!-- VN URL -->
        <v-divider class="py-2"></v-divider>
        <h2 class="text-lg font-semibold mb-3">Visual Novel URL Data</h2>
        <!-- VN URL Form -->
        <v-form v-model="isVNUrlValid">
          <v-select
            clearable
            v-model="vn.language"
            label="Language"
            :items="langageLists"
          ></v-select>
          <v-select
            clearable
            v-model="vn.type"
            label="Type"
            :items="typeLists"
          ></v-select>
          <v-select
            clearable
            v-model="vn.provider"
            label="Provider"
            :items="providerLists"
            required
          ></v-select>
          <v-text-field
            v-model="vn.url"
            label="URL"
            :rules="urlRule"
            required
          ></v-text-field>
          <button
            @click="isVNUrlEdit ? updateUrl(editId) : addToList()"
            type="button"
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 disabled:opacity-50 disabled:pointer-events-none"
            :disabled="!isVNUrlValid"
          >
            {{ isVNUrlEdit ? "Edit" : "Add" }}
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
            <tr
              v-for="(vnLink, id) in vnDataUrls"
              :key="id"
              :ref="id"
              class="test"
            >
              <td>{{ vnLink.language }}</td>
              <td>{{ vnLink.type }}</td>
              <td>{{ vnLink.provider }}</td>
              <td>
                <p
                  class="lg:max-w-[2rem] xl:max-w-[10rem] 2xl:max-w-md truncate ..."
                >
                  {{ vnLink.url }}
                </p>
              </td>
              <td>
                <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 disabled:opacity-50 disabled:pointer-events-none"
                  @click="editUrl(id)"
                  :disabled="isVNUrlEdit"
                >
                  <v-icon>mdi-pencil-outline</v-icon>
                </button>
                <button
                  class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 disabled:opacity-50 disabled:pointer-events-none"
                  @click="deleteUrl(id)"
                  :disabled="isVNUrlEdit"
                >
                  <v-icon>mdi-trash-can-outline</v-icon>
                </button>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-form>
    </div>
    <div class="flex-shrink-0 flex justify-center items-center pt-4 space-x-4">
      <button
        @click="
          !this.isEditForm
            ? $emit('store', code, vnDataUrls, close)
            : $emit('update', code, vnDataUrls, close)
        "
        type="button"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 disabled:opacity-50 disabled:pointer-events-none"
        :disabled="!isGeneralInfoValid"
      >
        {{ !this.isEditForm ? "Save" : "Update" }}
      </button>
      <button
        @click="close"
        type="button"
        class="focus:outline-none text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Cancel
      </button>
    </div>
  </vue-final-modal>
</template>

<script>
export default {
  props: {
    isEditForm: {
      type: Boolean,
      default: false,
    },
    vnDetails: {
      type: Object,
      default: {},
    },
  },
  mounted() {
    this.code = this.vnDetails.code;
    this.title = this.vnDetails.title;
    this.vnDataUrls = (this.vnDetails.vnDataUrls) ? this.vnDetails.vnDataUrls : {};
  },
  data() {
    return {
      isGeneralInfoValid: false,
      isVNUrlValid: false,
      isVNUrlEdit: false,
      editId: "",

      // Initialized Select Items
      providerLists: ["Drive", "Terabox", "OneDrive", "Mega"],
      typeLists: ["Default", "Patch", "Fandisk"],
      langageLists: ["JP", "EN", "ID"],

      // Validation Rules
      codeRule: [
        (v) => !!v || "VN Code is request",
        (v) =>
          /v\d{1,7}/gm.test(v) ||
          "Invalid code format, Please using VNDB code format.",
      ],
      urlRule: [
        (v) => !!v || "Link is request",
        (v) =>
          /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(
            v
          ) || "Invalid URL Link.",
      ],

      // Store VN Url Data Temporary
      code: "",
      title: "Dummy title",
      vnDataUrls: {},
      vn: {
        language: null,
        type: null,
        provider: null,
        url: "",
      },
    };
  },
  methods: {
    addToList() {
      this.vnDataUrls[`${Object.keys(this.vnDataUrls).length + 1}`] = {
        language: this.vn.language,
        type: this.vn.type,
        provider: this.vn.provider,
        url: this.vn.url,
      };
      this.clearVNUrlForm();
    },
    editUrl(id) {
      this.isVNUrlEdit = true;
      // Fetch data and put in form
      this.vn.language = this.vnDataUrls[id].language;
      this.vn.type = this.vnDataUrls[id].type;
      this.vn.provider = this.vnDataUrls[id].provider;
      this.vn.url = this.vnDataUrls[id].url;
      this.editId = id;
      this.$refs[id][0].classList.add("bg-blue-200");
    },
    updateUrl(id) {
      // Update VN URL data to Array
      this.vnDataUrls[id].language = this.vn.language;
      this.vnDataUrls[id].type = this.vn.type;
      this.vnDataUrls[id].provider = this.vn.provider;
      this.vnDataUrls[id].url = this.vn.url;
      this.$refs[id][0].classList.remove("bg-blue-200");
      this.isVNUrlEdit = false;
      this.clearVNUrlForm();
    },
    deleteUrl(id) {
      delete this.vnDataUrls[id];
    },
    clearVNUrlForm() {
      this.vn.language = null;
      this.vn.type = null;
      this.vn.provider = null;
      this.vn.url = null;
      this.editId = "";
    },
  },
};
</script>
