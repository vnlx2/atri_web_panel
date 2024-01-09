<script setup lang="ts">
import { type IErrorResponse } from "~/types";
import Swal from "sweetalert2";

// Data Props
const birthdayController = useBirthday();
const { birthday } = storeToRefs(birthdayController);
const props = defineProps({
  isEdit: Boolean,
});
const date: Record<number, number> = {
  1: 31,
  2: 29,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
}

// Form Props
const idInput = ref();

if (!props.isEdit) {
  birthdayController.resetForm();
}

onMounted(() => nextTick(() => idInput.value.focus()));

const formChanged = ref(false);
watch(birthday, () => (formChanged.value = true));

const errorMessage = {
  id: {
    status: ref(false),
    message: ref("").value,
  },
};

function clearError() {
  errorMessage.id.status.value = false;
}

function setErrorMessage(field: string, message: string) {
  switch (field) {
    case "id":
      errorMessage.id.status.value = true;
      errorMessage.id.message = message;
      nextTick(() => idInput.value.focus());
      break;
  }
}

async function save() {
  try {
    clearError();
    await birthdayController.store(props.isEdit ?? false);
    Swal.fire({
      title: "Success",
      text: "User was saved.",
      icon: "success",
      animation: false,
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      navigateTo("/admin/birthday");
    });
  } catch (error: IErrorResponse | any) {
    if (error.errorCode !== "VALIDATION_ERROR") {
      return generalErrorAlert(error);
    }
    for (const err of error["errors"]) {
      setErrorMessage(err.field, err.message);
    }
  }
}

function cancel() {
  if (formChanged.value) {
    Swal.fire({
      title: "Are you sure?",
      text: "Your data will be lost",
      icon: "question",
      animation: false,
    }).then((res) => {
      if (res.isConfirmed) {
        navigateTo("/admin/birthday");
      }
    });
  }
  navigateTo("/admin/birthday");
}
</script>

<template>
  <div>
    <form @submit.prevent="save">
      <div class="bg-white rounded-lg shadow-md px-10 py-5 max-w-lg">
        <!-- User Id -->
        <div class="pb-2">
          <label for="idInput" class="px-1 text-sm text-gray-600"
            >User ID</label
          >
          <input
            ref="idInput"
            @keydown=""
            :class="[
              errorMessage.id.status.value
                ? 'focus:border-red-500'
                : 'focus:border-blue-500',
            ]"
            class="w-full rounded-[7px] border border-b-gray-400 bg-transparent px-3 py-2.5 font-sans shadow-sm text-gray-700 transition-all placeholder-shown:border placeholder-shown:border-gray-200 focus:border-2 focus:outline-0 disabled:border-0 disabled:bg-gray-50"
            v-model="birthday.id"
            required
            :disabled="props.isEdit"
          />
          <span
            :class="{ hidden: !errorMessage.id.status.value }"
            class="font-medium tracking-wide text-red-500 text-xs"
            id="error-username"
            >{{ errorMessage.id.message }}</span
          >
        </div>
        <div class="flex gap-x-10">
          <!-- Month -->
          <div class="pb-2">
            <label for="birthdayInput" class="px-1 text-sm text-gray-600"
              >Month</label
            >
            <select
              class="w-full rounded-[7px] border border-b-gray-400 bg-transparent px-3 py-2.5 font-sans shadow-sm text-gray-700 transition-all placeholder-shown:border placeholder-shown:border-gray-200 focus:border-2 focus:outline-0 disabled:border-0 disabled:bg-gray-50"
              v-model="birthday.month"
              required
            >
              <option v-for="index in 12" :value="index">{{ new Date(new Date().setMonth(index - 1)).toLocaleString('en-US', {month: 'long'}) }}</option>
            </select>
            <span
              :class="{ hidden: !errorMessage.id.status.value }"
              class="font-medium tracking-wide text-red-500 text-xs"
              id="error-username"
              >{{ errorMessage.id.message }}</span
            >
          </div>
          <!-- Date -->
          <div class="pb-2">
            <label for="birthdayInput" class="px-1 text-sm text-gray-600"
              >Date</label
            >
            <select
              class="w-full rounded-[7px] border border-b-gray-400 bg-transparent px-3 py-2.5 font-sans shadow-sm text-gray-700 transition-all placeholder-shown:border placeholder-shown:border-gray-200 focus:border-2 focus:outline-0 disabled:border-0 disabled:bg-gray-50"
              v-model="birthday.day"
              required
            >
              <option v-for="index in date[birthday.month]" :value="index">{{ index }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="my-5 flex flex-row space-x-5">
        <button
          type="submit"
          class="bg-green-600 hover:bg-green-400 focus:ring-4 focus:ring-green-300 disabled:opacity-30 transition-colors text-white font-medium p-2 rounded-md shadow-sm mt-5 px-5"
        >
          <p>{{ !props.isEdit ? "Save" : "Update" }}</p>
        </button>
        <button
          type="button"
          @click="cancel"
          class="bg-transparent hover:bg-slate-400 hover:text-white focus:ring-4 focus:ring-blue-300 transition-colors font-medium p-2 rounded-md shadow-sm mt-5 px-3"
        >
          <p>Cancel</p>
        </button>
      </div>
    </form>
  </div>
</template>
