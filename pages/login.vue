<script setup lang="ts">
useHead({
  title: 'Login'
});

definePageMeta({
  middleware: ['auth']
});

const username = ref();
const password = ref();
const isProcess = ref(false);
const imageIndex = Math.floor(Math.random() * 3) + 1;

const loginForm = {
  username: ref("").value,
  password: ref("").value,
};

const errorMessage = {
  username: {
    status: ref(false),
    message: ref("").value,
  },
  password: {
    status: ref(false),
    message: ref("").value,
  },
};

function reset() {
  errorMessage.username.status.value = false;
  errorMessage.password.status.value = false;
  errorMessage.username.message = "";
  errorMessage.password.message = "";
}

function setErrorMessage(field: string, message: string) {
  if (field === "username") {
    errorMessage.username.status.value = true;
    errorMessage.username.message = message;
    nextTick(() => username.value.focus());
  }
  else if (field === "password") {
    errorMessage.password.status.value = true;
    errorMessage.password.message = message;
    nextTick(() => password.value.focus());
  }
  isProcess.value = false;
}

function validation() {
  if (loginForm.username === "") {
    setErrorMessage('username', 'Username must be filled!');
  } else if (loginForm.password === "") {
    setErrorMessage('password', 'Password must be filled!');
  } else {
    return true;
  }
  return false;
}

async function loginPress() {
  isProcess.value = true;
  reset();
  if (validation()) {
    try {
      const result = await login(loginForm.username, loginForm.password);
      if (!result.status) {
        switch (result.errorCode) {
          case "VALIDATION_ERROR":
            setErrorMessage(result.errors[0].field, result.errors[0].message);
            break;
          case "USER_NOT_FOUND":
            setErrorMessage('username', 'Username not found!');
            break;
          case "INVALID_PASSWORD":
            setErrorMessage('password', 'Password Missmatch!');
            break;
        }
        return;
      }
      const token = useCookie('token');
      token.value = result.data['accessToken'];
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<template class="">
  <div class="grid h-screen bg-slate-100 place-items-center">
    <div
      class="flex shadow-2xl box-content h-[45%] lg:h-[50%] w-[80%] sm:w-[50%] xl:w-[55%] 3xl:w-[50%] rounded-xl relative bg-transparent"
    >
      <div
        class="px-8 sm:px-14 md:px-16 xl:px-10 2xl:px-12 py-50 xl:py-50 w-full xl:w-[calc(50%-50px)] flex flex-col justify-center rounded-xl xl:rounded-l-xl bg-white"
      >
        <div class="text-center xl:text-left">
          <p
            class="text-gray-400 sm:text-md md:text-lg font-sans leading-loose"
          >
            Welcome to
          </p>
          <p
            class="text-2xl md:text-3xl 2xl:text-4xl font-sans font-medium text-gray-700 leading-tight"
          >
            ATRI Admin Panel
          </p>
          <p class="text-sm md:text-md text-gray-400">
            Please enter username and password
          </p>
        </div>
        <div>
          <div :class="[{'mb-10': errorMessage.username.status.value}, 'relative mt-6 h-11 min-w-[200px]']">
            <input
              ref="username"
              @keydown="reset"
              :class="[
                errorMessage.username.status.value
                  ? 'focus:border-red-500'
                  : 'focus:border-blue-500',
              ]"
              class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-300 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=""
              v-model="loginForm.username"
            />
            <label
              :class="[
                errorMessage.username.status.value
                  ? 'after:border-red-500 peer-focus:after:border-red-500 peer-focus:text-red-500'
                  : 'after:border-blue-500 peer-focus:after:border-blue-500 peer-focus:text-blue-500',
              ]"
              class="after:content[' '] text-gray-600 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[12px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-focus:text-[12px] peer-focus:leading-tight"
            >
              Username
            </label>
            <span
              :class="{ hidden: !errorMessage.username.status.value }"
              class="font-medium tracking-wide text-red-500 text-xs"
              id="error-username"
              >{{ errorMessage.username.message }}</span
            >
          </div>
          <div :class="['relative mt-5 h-11 min-w-[200px]']">
            <input
              ref="password"
              :class="[
                errorMessage.password.status.value
                  ? 'focus:border-red-500'
                  : 'focus:border-blue-500',
              ]"
              class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-300 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=""
              type="password"
              v-model="loginForm.password"
            />
            <label
              :class="[
                errorMessage.password.status.value
                  ? 'after:border-red-500 peer-focus:after:border-red-500 peer-focus:text-red-500'
                  : 'after:border-blue-500 peer-focus:after:border-blue-500 peer-focus:text-blue-500',
              ]"
              class="after:content[' '] text-gray-600 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[12px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
            >
              Password
            </label>
          </div>
          <span
            :class="{ hidden: !errorMessage.password.status.value }"
            class="font-medium tracking-wide text-red-500 text-xs"
            id="error-username"
            >{{ errorMessage.password.message }}</span
          >
          <div class="mt-5">
            <button
              :disabled="isProcess"
              class="rounded-full bg-blue-600 disabled:bg-blue-300 text-white text-xl py-1 xl:py-2 w-full"
              @click="loginPress"
            >
              <div class="flex items-center justify-center space-x-2" v-if="isProcess">
                <svg
                  aria-hidden="true"
                  class="w-6 h-6 mr-2 text-transparent animate-spin dark:text-white fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  ></path>
                </svg>
                <span class="text-white">Loading...</span>
              </div>
              <p v-if="!isProcess">Login</p>
            </button>
          </div>
        </div>
      </div>
      <div
        :style="{backgroundImage: 'url(/assets/img/login/bg' + imageIndex + '.webp)'}"
        class="flex-1 bg-cover bg-center hidden xl:block rounded-r-xl"
      >
        <img
          :src="`/assets/img/login/chara${imageIndex}.webp`"
          class="xl:max-w-md absolute bottom-0 -right-20 xl:-right-30"
        />
      </div>
    </div>
  </div>
</template>
