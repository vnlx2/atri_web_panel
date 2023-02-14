<script setup>
import HeaderName from '../components/Header.vue';
import { store } from "../../composable/user.js";
import { $vfm, ModalsContainer } from 'vue-final-modal';
import { useCookies } from 'vue3-cookies';
import { ref, watch } from 'vue';
import UserTable from '../components/UserTable.vue';
import UserFormModal from '../components/UserFormModal.vue';

const tableKey = ref(0);
const showForm = ref(false);
const snackbarStatus = ref({
	state: false,
	message: ''
});

function reloadTable() {
	tableKey.value++;
}

function add() {
	const cookies = useCookies().cookies;
	$vfm.show({
		component: UserFormModal,
		on: {
			async store(username, password, close) {
				try {
					const response = await store(username, password, cookies);
					if (response) {
						showSnackbarStatus(response);
						tableKey.value++;
						close();
					}
				} catch (err) {
					console.error(err);
					showSnackbarStatus(err);
				}
			},
		},
	});
}

function showSnackbarStatus(response) {
	if ('code' in response) {
		snackbarStatus.value.message = `Error: ${response.response.data.message}.\n${('detailMessage' in response.response.data) ? response.response.data.detailMessage : ''}`
	}
	else {
		snackbarStatus.value.message = response.message;
	}
	snackbarStatus.value.state = true;
}

</script>

<template>
	<HeaderName>User Management</HeaderName>
	<div class="mt-10 p-5">
		<button @click="add" type="button"
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
			<svg class="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6">
				</path>
			</svg>
			Add User
		</button>
		<div class="pt-6">
			<v-table theme="light">
				<thead>
					<tr>
						<th class="text-left">Username</th>
						<th class="text-left">Role</th>
						<th class="text-left">Action</th>
					</tr>
				</thead>
				<tbody>
					<suspense>
                        <UserTable 
						v-bind:show-form="showForm"
						v-on:showSnackbarStatus="showSnackbarStatus"
						v-on:reloadTable="reloadTable"
						:key="tableKey" />

						<template #fallback>
							<tr>
								<td colspan="3" class="text-center">Loading...</td>
							</tr>
						</template>
					</suspense>
				</tbody>
			</v-table>
		</div>
		<!-- Modal Container -->
		<modals-container></modals-container>
		<!-- Snackbar Status Container -->
		<v-snackbar v-model="snackbarStatus.state" :timeout="2000" color="blue-grey" rounded="pill">
			{{ snackbarStatus.message }}
		</v-snackbar>
	</div>
</template>