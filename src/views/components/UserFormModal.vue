<script setup>
import { onMounted, ref, reactive, onBeforeUpdate } from "vue";
import { useCookies } from "vue3-cookies";
import { VueFinalModal } from "vue-final-modal";
import { checkUsernameExists } from "../../composable/user.js";

const props = defineProps({
	isEditForm: {
		type: Boolean,
		default: false,
	},
	userDetail: {
		type: Object,
		default: {}
	}
});

const isGeneralInfoValid = ref(true);
const cookies = useCookies().cookies;
const editId = ref("");
const username = ref();
const password = ref();
const confirmPassword = ref();
const showPassword = ref(false);
const showConfirmPassword = ref(false);

onMounted(() => {
	editId.value = props.userDetail._id;
	username.value = props.userDetail.username;
	password.value = "";
	confirmPassword.value = "";
	isGeneralInfoValid.value = true;
});
console.log(isGeneralInfoValid)

// Validation Rules
const usernameValidation = [
	async (v) => (await checkUsernameExists(v, cookies) || (Object.keys(props.userDetail).length != 0 && props.userDetail.username === username.value)) || "Username exists",
	(v) => !!v || "Username required",
];

const passwordValidation = [
	(v) => (!!v || editId.value != "") || "Password required",
	(v) => (v.length >= 8 || editId.value != "") || "The password must have minimum 8 digits!" 
];

const confirmPasswordValidation = [
	(v) => (!!v || editId.value != "") || "Password required",
	(v) => (v.length >= 8 || editId.value != "") || "The password must have minimum 8 digits!" ,
	(v) => password.value === v || "The confirm password not same with password!"
];
</script>

<template>
	<vue-final-modal v-slot="{ close }" v-bind="$attrs" classes="flex justify-center items-center m-5"
		content-class="relative flex flex-col 2xl:w-1/2 max-h-full mx-4 p-4 border-transparent rounded-lg dark:border-gray-800 rounded bg-white dark:bg-gray-900">
		<span class="mr-8 text-2xl font-bold">{{ !isEditForm ? "Add" : "Edit" }} User</span>
		<div class="overflow-y-auto my-5">
			<v-form ref="form" v-model="isGeneralInfoValid" class="px-2" lazy-validation>
				<!-- User Information -->
				<v-text-field v-model="username" label="Username" hint="Example: Atri" :rules="usernameValidation"
					clearable required></v-text-field>
				<v-text-field v-model="password" clearable :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					:type="showPassword ? 'text' : 'password'" label="Password" hint="Minimum 8 characters"
					@click:append-inner="showPassword = !showPassword" :rules="passwordValidation" />
				<v-text-field v-model="confirmPassword" clearable
					:append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
					:type="showConfirmPassword ? 'text' : 'password'" label="Confirm Password"
					@click:append-inner="showConfirmPassword = !showConfirmPassword" :rules="confirmPasswordValidation" />
			</v-form>
		</div>
		<div class="flex-shrink-0 flex justify-center items-center pt-4 space-x-4">
			<button @click="
				!isEditForm
					? $emit('store', username, password, close)
					: $emit('update', username, password, close)
			" type="button"
				class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 disabled:opacity-50 disabled:pointer-events-none"
				:disabled="!isGeneralInfoValid">
				{{ !isEditForm ? "Save" : "Update" }}
			</button>
			<button @click="close" type="button"
				class="focus:outline-none text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
				Cancel
			</button>
		</div>
	</vue-final-modal>
</template>
