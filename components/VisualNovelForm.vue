<script setup lang="ts">
import type { IValidationError } from "~/types";

// Data Props
const vnController = useVisualNovel();
const { visualNovelForm } = storeToRefs(vnController);
const props = defineProps({
  isEdit: Boolean
});
// Form Props
const codeInput = ref();
const titleInput = ref();
const aliasesInput = ref();
const descriptionInput = ref();
const ratingInput = ref();
const imageInput = ref();

nextTick(() => codeInput.value.focus());

const formChanged = ref(false);
watch(visualNovelForm, () => (formChanged.value = true));

const editedRow = {
  index: ref(0),
  isEdited: ref(false),
  isAdded: ref(false),
};

const vnUrlForm = {
  language: "jp",
  type: "-",
  provider: "drive",
  platform: "windows",
  url: ref(""),
};

const errorMessage = {
  code: {
    status: ref(false),
    message: ref("Dummy Error").value,
  },
  title: {
    status: ref(false),
    message: ref("Dummy Error").value,
  },
  aliases: {
    status: ref(false),
    message: ref("Dummy Error").value,
  },
  rating: {
    status: ref(false),
    message: ref("Dummy Error").value,
  },
  description: {
    status: ref(false),
    message: ref("Dummy Error").value,
  },
  image: {
    status: ref(false),
    message: ref("Dummy Error").value,
  },
};

function setAltImage(e: any) {
  e.target.src = "/assets/img/not_found_img.jpg";
}

// Download List Methods
function addUrl() {
  if (
    editedRow.index.value === visualNovelForm.value.downloadUrl.length - 1 &&
    editedRow.isAdded.value
  ) {
    storeUrl(visualNovelForm.value.downloadUrl.length - 1);
  }
  visualNovelForm.value.downloadUrl.push({
    language: vnUrlForm.language,
    type: vnUrlForm.type,
    provider: vnUrlForm.provider,
    platform: vnUrlForm.platform,
    url: vnUrlForm.url.value,
  });
  editedRow.index.value = visualNovelForm.value.downloadUrl.length - 1;
  editedRow.isEdited.value = true;
  editedRow.isAdded.value = true;
}

function storeUrl(index: number) {
  if (index === visualNovelForm.value.downloadUrl.length - 1) {
    visualNovelForm.value.downloadUrl.pop();
  }
  visualNovelForm.value.downloadUrl.push({
    language: vnUrlForm.language,
    type: vnUrlForm.type,
    provider: vnUrlForm.provider,
    platform: vnUrlForm.platform,
    url: vnUrlForm.url.value,
  });
  cleanUrlForm();
}

function removeUrl(index: number) {
  visualNovelForm.value.downloadUrl.splice(index, 1);
}

function editUrl(index: number) {
  if (
    editedRow.isEdited.value &&
    editedRow.index.value === visualNovelForm.value.downloadUrl.length - 1
  ) {
    removeUrl(visualNovelForm.value.downloadUrl.length - 1);
  }
  vnUrlForm.language = visualNovelForm.value.downloadUrl[index][
    "language"
  ] as string;
  vnUrlForm.provider = visualNovelForm.value.downloadUrl[index]["provider"];
  vnUrlForm.type = visualNovelForm.value.downloadUrl[index]["type"];
  vnUrlForm.url.value = visualNovelForm.value.downloadUrl[index]["url"];

  editedRow.index.value = index;
  editedRow.isEdited.value = true;
}

function cancelEdit(index: number) {
  if (editedRow.isAdded.value) {
    removeUrl(index);
  }
  cleanUrlForm();
}

function cleanUrlForm() {
  vnUrlForm.language = "jp";
  vnUrlForm.type = "-";
  vnUrlForm.provider = "drive";
  vnUrlForm.url.value = "";

  editedRow.isEdited.value = false;
  editedRow.isAdded.value = false;
  editedRow.index.value = 0;
}

// Form Methods
function onlyNumber(event: any) {
  if (!/\d/.test(event.key) && event.key !== ".") return event.preventDefault();
}

function setErrorMessage(field: string, message: string) {
  switch (field) {
    case "code":
      errorMessage.code.status.value = true;
      errorMessage.code.message = message;
      nextTick(() => codeInput.value.focus());
      break;
    case "title":
      errorMessage.title.status.value = true;
      errorMessage.title.message = message;
      nextTick(() => titleInput.value.focus());
      break;
    case "aliases":
      errorMessage.aliases.status.value = true;
      errorMessage.aliases.message = message;
      nextTick(() => aliasesInput.value.focus());
      break;
    case "rating":
      errorMessage.rating.status.value = true;
      errorMessage.rating.message = message;
      nextTick(() => ratingInput.value.focus());
      break;
    case "description":
      errorMessage.description.status.value = true;
      errorMessage.description.message = message;
      nextTick(() => descriptionInput.value.focus());
      break;
    case "imageUrl":
      errorMessage.image.status.value = true;
      errorMessage.image.message = message;
      nextTick(() => imageInput.value.focus());
      break;
  }
}

async function save() {
  try {
    const response = (!props.isEdit) ? 
      await vnController.createVisualNovel(visualNovelForm.value)
      : await vnController.updateVisualNovel(visualNovelForm.value);
    if (!(response?.status.value === "success")) {
      const errors: IValidationError[] | any =
        response?.error.value?.data.errors;
      for (const error of errors) {
        setErrorMessage(error.field, error.message);
      }
    } else {
      alert("Success");
      navigateTo("/admin/visualnovel");
    }
  } catch (error) {
    console.error(error);
  }
}

function cancel() {
  if (formChanged.value) {
    if (confirm("Are you sure?") === false) {
      return;
    }
  }
  navigateTo("/admin/visualnovel");
}
</script>

<template>
  <div>
    <form @submit.prevent="save">
      <div class="bg-white rounded-lg shadow-md px-10 py-5">
        <!-- General Data -->
        <h3 class="font-sans font-medium text-2xl rounded-lg pb-5">General Information</h3>
        <div class="flex">
          <!-- Left Side -->
          <div class="w-1/2 pr-5 ">
            <!-- Code -->
            <div class="w-full py-2">
              <div class="relative h-10">
                <input
                  ref="codeInput"
                  @keydown=""
                  :class="[
                    errorMessage.code.status.value
                      ? 'focus:border-red-500'
                      : 'focus:border-blue-500',
                  ]"
                  class="peer h-full w-full rounded-[7px] border border-gray-200 border-t-transparent bg-transparent pl-3 focus:pl-8 pr-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-red-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-gray-50"
                  v-model="visualNovelForm.code" required
                />
                <div
                  class="absolute hidden peer-focus:grid peer-focus:after:grid w-5 h-5 place-items-center text-gray-500 top-2/4 left-3 -translate-y-2/4"
                >
                  <span class="text-sm font-normal text-gray-700">v</span>
                </div>
                <label
                  :class="[
                    errorMessage.code.status.value
                      ? 'peer-focus:text-pink-500 peer-focus:before:border-pink-500 peer-focus:after:border-pink-500'
                      : 'peer-focus:text-blue-500 peer-focus:before:border-blue-500 peer-focus:after:border-blue-500',
                  ]"
                  class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-gray-500"
                >
                  Code
                </label>
              </div>
              <span
                :class="{ hidden: !errorMessage.code.status.value }"
                class="font-medium tracking-wide text-red-500 text-xs"
                id="error-code"
                >{{ errorMessage.code.message }}</span
              >
            </div>
            <!-- Title -->
            <div class="w-full py-2">
              <div class="relative h-10">
                <input
                  ref="titleInput"
                  @keydown=""
                  :class="[
                    errorMessage.title.status.value
                      ? 'focus:border-red-500'
                      : 'focus:border-blue-500',
                  ]"
                  class="peer h-full w-full rounded-[7px] border border-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-gray-50"
                  placeholder=" "
                  v-model="visualNovelForm.title" required
                />
                <label
                  :class="[
                    errorMessage.title.status.value
                      ? 'peer-focus:text-pink-500 peer-focus:before:border-pink-500 peer-focus:after:border-pink-500'
                      : 'peer-focus:text-blue-500 peer-focus:before:border-blue-500 peer-focus:after:border-blue-500',
                  ]"
                  class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-gray-500"
                >
                  Title
                </label>
              </div>
              <span
                :class="{ hidden: !errorMessage.title.status.value }"
                class="font-medium tracking-wide text-red-500 text-xs"
                id="error-title"
                >{{ errorMessage.title.message }}</span
              >
            </div>
            <!-- Aliases -->
            <div class="w-full py-2">
              <div class="relative h-10">
                <input
                  @keydown=""
                  :class="[
                    errorMessage.aliases.status.value
                      ? 'focus:border-red-500'
                      : 'focus:border-blue-500',
                  ]"
                  class="peer h-full w-full rounded-[7px] border border-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-gray-50"
                  placeholder=" "
                  v-model="visualNovelForm.aliases"
                />
                <label
                  :class="[
                    errorMessage.aliases.status.value
                      ? 'peer-focus:text-pink-500 peer-focus:before:border-pink-500 peer-focus:after:border-pink-500'
                      : 'peer-focus:text-blue-500 peer-focus:before:border-blue-500 peer-focus:after:border-blue-500',
                  ]"
                  class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-gray-500"
                >
                  Aliases
                </label>
              </div>
              <span
                :class="{ hidden: !errorMessage.aliases.status.value }"
                class="font-medium tracking-wide text-red-500 text-xs"
                id="error-aliases"
                >{{ errorMessage.aliases.message }}</span
              >
            </div>
            <div class="grid grid-cols-2 gap-5 w-full py-2">
              <!-- Length -->
              <div class="relative h-10">
                <select
                  class="peer h-full w-full rounded-[7px] border border-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-gray-50" v-model="visualNovelForm.length" required
                >
                  <option value="1">Very Short</option>
                  <option value="2">Short</option>
                  <option value="3">Medium</option>
                  <option value="4">Long</option>
                  <option value="5">Very Long</option>
                </select>
                <label
                  class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-gray-500"
                >
                  Length
                </label>
              </div>
  
              <!-- Rating -->
              <div>
                <div class="relative h-10">
                  <input
                    ref="ratingInput"
                    @keydown=""
                    :class="[
                      errorMessage.rating.status.value
                        ? 'focus:border-red-500'
                        : 'focus:border-blue-500',
                    ]"
                    class="peer h-full w-full rounded-[7px] border border-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-gray-50"
                    placeholder=" " v-model="visualNovelForm.rating" @keypress="onlyNumber" required
                  />
                  <label
                    :class="[
                      errorMessage.rating.status.value
                        ? 'peer-focus:text-pink-500 peer-focus:before:border-pink-500 peer-focus:after:border-pink-500'
                        : 'peer-focus:text-blue-500 peer-focus:before:border-blue-500 peer-focus:after:border-blue-500',
                    ]"
                    class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-gray-500"
                  >
                    Rating
                  </label>
                </div>
                <span
                  :class="{ hidden: !errorMessage.rating.status.value }"
                  class="font-medium tracking-wide text-red-500 text-xs"
                  id="error-rating"
                  >{{ errorMessage.rating.message }}</span
                >
              </div>
            </div>
            <!-- Description -->
            <div class="w-full py-2">
              <div class="relative w-full min-w-[200px]">
                <textarea
                  :class="[
                    errorMessage.description.status.value
                      ? 'focus:border-red-500'
                      : 'focus:border-blue-500',
                  ]"
                  
                  class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-gray-50"
                  placeholder=" " v-model="visualNovelForm.description"
                ></textarea>
                <label
                  :class="[
                    errorMessage.description.status.value
                      ? 'after:border-red-500 peer-focus:before:border-red-500 peer-focus:after:border-red-500 peer-focus:text-red-500'
                      : 'after:border-blue-500 peer-focus:before:border-blue-500 peer-focus:after:border-blue-500 peer-focus:text-blue-500',
                  ]"
                  class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-gray-500"
                >
                  Description
                </label>
              </div>
              <span
                :class="{ hidden: !errorMessage.description.status.value }"
                class="font-medium tracking-wide text-red-500 text-xs"
                id="error-description"
                >{{ errorMessage.description.message }}</span
              >
            </div>
          </div>
          <!-- Right Side -->
          <div class="w-1/2 px-5 space-y-5">
            <!-- Image URL -->
            <div class="w-full py-2">
              <div class="relative h-10">
                <input
                  ref="imageInput"
                  @keydown=""
                  :class="[
                    errorMessage.image.status.value
                      ? 'focus:border-red-500'
                      : 'focus:border-blue-500',
                  ]"
                  class="peer h-full w-full rounded-[7px] border border-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-gray-50"
                  placeholder=" " v-model="visualNovelForm.image" required
                />
                <label
                  :class="[
                    errorMessage.image.status.value
                      ? 'peer-focus:text-pink-500 peer-focus:before:border-pink-500 peer-focus:after:border-pink-500'
                      : 'peer-focus:text-blue-500 peer-focus:before:border-blue-500 peer-focus:after:border-blue-500',
                  ]"
                  class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-gray-500"
                >
                  Image URL
                </label>
              </div>
              <span
                :class="{ hidden: !errorMessage.image.status.value }"
                class="font-medium tracking-wide text-red-500 text-xs"
                id="error-image"
                >{{ errorMessage.image.message }}</span
              >
            </div>
            <div class="max-w-xs mx-auto">
              <img 
                class="mx-auto"
                @error="setAltImage"
                :src="(!/^https?:\/\//i.test(visualNovelForm.image)) ? `https://${visualNovelForm.image}` : visualNovelForm.image">
            </div>
          </div>
        </div>
      </div>
      <!-- Download URL Data -->
      <div class="bg-white rounded-lg shadow-md px-10 mt-10 py-5">
        <h3 class="font-sans font-medium text-2xl rounded-lg pb-5">Download List</h3>
        <table :class="['w-full min-w-max table-auto text-left']">
          <thead>
            <tr>
              <th class="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <p>Language</p>
              </th>
              <th class="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <p>Type</p>
              </th>
              <th class="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <p>Provider</p>
              </th>
              <th class="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <p>URL</p>
              </th>
              <th class="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <p>Action</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(vnDl, index) in visualNovelForm.downloadUrl" :key="index">
              <td class="p-4 border-b border-blue-gray-50">
                <select
                  class="h-full w-full rounded-[7px] border border-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-gray-50" v-if="editedRow.index.value === index && editedRow.isEdited.value" v-model="vnUrlForm.language"
                >
                  <option value="jp">Japan</option>
                  <option value="en">English</option>
                  <option value="id">Indonesia</option>
                </select>
                <p v-else>{{ vnDl.language }}</p>
              </td>
              <td class="p-4 border-b border-blue-gray-50">
                <select
                  class="h-full w-full rounded-[7px] border border-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-gray-50" v-if="editedRow.index.value === index && editedRow.isEdited.value" v-model="vnUrlForm.type"
                >
                  <option value="-">Default/Original</option>
                  <option value="patch">Patch</option>
                  <option value="fandisk">Fandisk</option>
                </select>
                <p v-else>{{ vnDl.type }}</p>
              </td>
              <td class="p-4 border-b border-blue-gray-50">
                <select
                  class="h-full w-full rounded-[7px] border border-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-gray-50" v-if="editedRow.index.value === index && editedRow.isEdited.value" v-model="vnUrlForm.provider"
                >
                  <option value="drive">Google Drive</option>
                  <option value="onedrive">OneDrive</option>
                  <option value="terabox">Terabox</option>
                </select>
                <p v-else>{{ vnDl.provider }}</p>
              </td>
              <td class="p-4 border-b border-blue-gray-50">
                <div class="relative w-full min-w-[200px] h-10" v-if="editedRow.index.value === index && editedRow.isEdited.value">
                  <input
                    class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder="URL" v-model="vnUrlForm.url.value" />
                </div>
                <p v-else>{{ vnDl.url }}</p>
              </td>
              <td class="p-4 border-b border-blue-gray-50">
                <div v-if="editedRow.index.value === index && editedRow.isEdited.value">
                  <button
                    class="bg-green-500 hover:bg-green-400 focus:ring-3 focus:ring-green-200 disabled:opacity-30 transition-colors text-white font-medium rounded-md shadow-sm px-2.5 mx-1 py-1" @click="storeUrl(index)" :disabled="vnUrlForm.url.value === ''"
                  >
                    <i class="ri-check-line"></i>
                  </button>
                  <button
                    class="bg-red-500 hover:bg-red-400 focus:ring-3 focus:ring-red-200 transition-colors text-white font-medium rounded-md shadow-sm px-2.5 mx-1 py-1" @click="cancelEdit(index)"
                  >
                    <i class="ri-close-line"></i>
                  </button>
                </div>
                <div v-else>
                  <button
                    class="bg-yellow-500 hover:bg-yellow-400 focus:ring-3 focus:ring-yellow-200 transition-colors text-white font-medium rounded-md shadow-sm px-2.5 mx-1 py-1" @click="editUrl(index)"
                  >
                    <i class="ri-pencil-line"></i>
                  </button>
                  <button
                    class="bg-red-500 hover:bg-red-400 focus:ring-3 focus:ring-red-200 transition-colors text-white font-medium rounded-md shadow-sm px-2.5 mx-1 py-1" @click="removeUrl(index)"
                  >
                    <i class="ri-delete-bin-line"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="button" @click="addUrl"
          class="bg-blue-600 hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 transition-colors text-white font-medium p-2 rounded-md shadow-sm mt-5 px-3"
        >
          <p>Add Link</p>
        </button>
      </div>
      <div class="my-5 flex flex-row space-x-5">
        <button type="submit" class="bg-green-600 hover:bg-green-400 focus:ring-4 focus:ring-green-300 disabled:opacity-30 transition-colors text-white font-medium p-2 rounded-md shadow-sm mt-5 px-5" :disabled="editedRow.isEdited.value">
          <p>{{ !props.isEdit ? 'Save' : 'Update' }}</p>
        </button>
        <button type="button" @click="cancel"
          class="bg-transparent hover:bg-slate-400 hover:text-white focus:ring-4 focus:ring-blue-300 transition-colors font-medium p-2 rounded-md shadow-sm mt-5 px-3"
        >
          <p>Cancel</p>
        </button>
      </div>
    </form>
  </div>
</template>
