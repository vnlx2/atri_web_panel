<script setup lang="ts">
import { type IErrorResponse, type IValidationError } from "~/types";
import Swal from "sweetalert2";

// Data Props
const userController = useUser();
const { user } = storeToRefs(userController);
const props = defineProps({
  isEdit: Boolean,
});

if (!props.isEdit) {
  userController.resetForm();
}
// Form Props
const usernameInput = ref();
const passwordInput = ref();
const confirmPasswordInput = ref();
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);

onMounted(() => nextTick(() => usernameInput.value.focus()));

const formChanged = ref(false);
watch(user, () => (formChanged.value = true));

const errorMessage = {
  username: {
    status: ref(false),
    message: ref("Dummy Error").value,
  },
  password: {
    status: ref(false),
    message: ref("Dummy Error").value,
  },
  confirmPassword: {
    status: ref(false),
    message: ref("Dummy Error").value,
  },
};

function clearError() {
  errorMessage.username.status.value = false;
  errorMessage.password.status.value = false;
  errorMessage.confirmPassword.status.value = false;
}

function setErrorMessage(field: string, message: string) {
  switch (field) {
    case "username":
      errorMessage.username.status.value = true;
      errorMessage.username.message = message;
      nextTick(() => usernameInput.value.focus());
      break;
    case "password":
      errorMessage.password.status.value = true;
      errorMessage.password.message = message;
      nextTick(() => passwordInput.value.focus());
      break;
    case "confirm":
      errorMessage.confirmPassword.status.value = true;
      errorMessage.confirmPassword.message = message;
      nextTick(() => confirmPasswordInput.value.focus());
      break;
  }
}

async function save() {
  try {
    clearError();
    if (user.value.password !== confirmPassword.value) {
      return setErrorMessage('confirm', 'Confirm Passwords do not match!');
    }
    await userController.store(props.isEdit ?? false);
    Swal.fire({
      title: "Success",
      text: "User was saved.",
      icon: "success",
      animation: false,
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      navigateTo("/admin/visualnovel");
    });
  } catch (error: IErrorResponse | any) {
    if (error.errorCode !== 'VALIDATION_ERROR') {
      return generalErrorAlert(error);
    }
    for (const err of error['errors']) {
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
        navigateTo("/admin/user");
      }
    });
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="save">
      <div class="bg-white rounded-lg shadow-md px-10 py-5 max-w-lg">
        <!-- Username -->
        <div class="pb-2">
          <label for="usernameInput" class="px-1 text-sm text-gray-600">Username</label>
          <input
            ref="usernameInput"
            @keydown=""
            :class="[
              errorMessage.username.status.value
                ? 'focus:border-red-500'
                : 'focus:border-blue-500',
            ]"
            class="w-full rounded-[7px] border border-b-gray-400 bg-transparent px-3 py-2.5 font-sans shadow-sm text-gray-700 transition-all placeholder-shown:border placeholder-shown:border-gray-200 focus:border-2 focus:outline-0 disabled:border-0 disabled:bg-gray-50"
            v-model="user.username"
            required
          />
          <span
            :class="{ hidden: !errorMessage.username.status.value }"
            class="font-medium tracking-wide text-red-500 text-xs"
            id="error-username"
            >{{ errorMessage.username.message }}</span
          >
        </div>
        <!-- Password -->
        <div class="py-2">
          <label for="passwordInput" class="px-1 text-ms text-gray-600">Password</label>
          <div class="relative">
            <input
              :type="!showPassword ? 'password' : 'text'"
              ref="passwordInput"
              @keydown=""
              :class="[
                errorMessage.password.status.value
                  ? 'focus:border-red-500'
                  : 'focus:border-blue-500',
              ]"
              class="w-full rounded-[7px] border border-b-gray-400 bg-transparent px-3 py-2.5 font-sans shadow-sm text-gray-700 transition-all placeholder-shown:border placeholder-shown:border-gray-200 focus:border-2 focus:outline-0 disabled:border-0 disabled:bg-gray-50"
              v-model="user.password"
              required
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
              <i v-show="!showPassword" class="ri-eye-line text-lg" @click="showPassword = !showPassword"></i>
              <i v-show="showPassword" class="ri-eye-off-line text-lg" @click="showPassword = !showPassword"></i>
            </div>
          </div>
          <span
            :class="{ hidden: !errorMessage.password.status.value }"
            class="font-medium tracking-wide text-red-500 text-xs"
            id="error-password"
            >{{ errorMessage.password.message }}</span
          >
        </div>
        <!-- Confirm Password -->
        <div class="py-2">
          <label for="confirmPasswordInput" class="px-1 text-ms text-gray-600">Confirm Password</label>
          <div class="relative">
            <input
              :type="!showConfirmPassword ? 'password' : 'text'"
              ref="confirmPasswordInput"
              @keydown=""
              :class="[
                errorMessage.password.status.value
                  ? 'focus:border-red-500'
                  : 'focus:border-blue-500',
              ]"
              class="w-full rounded-[7px] border border-b-gray-400 bg-transparent px-3 py-2.5 font-sans shadow-sm text-gray-700 transition-all placeholder-shown:border placeholder-shown:border-gray-200 focus:border-2 focus:outline-0 disabled:border-0 disabled:bg-gray-50"
              v-model="confirmPassword"
              required
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
              <i v-show="!showConfirmPassword" class="ri-eye-line text-lg" @click="showConfirmPassword = !showConfirmPassword"></i>
              <i v-show="showConfirmPassword" class="ri-eye-off-line text-lg" @click="showConfirmPassword = !showConfirmPassword"></i>
            </div>
          </div>
          <span
            :class="{ hidden: !errorMessage.confirmPassword.status.value }"
            class="font-medium tracking-wide text-red-500 text-xs"
            id="error-confirm-password"
            >{{ errorMessage.confirmPassword.message }}</span
          >
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
