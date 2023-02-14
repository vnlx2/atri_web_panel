<script setup>
import { getList, getDetail, update, drop } from "../../composable/user.js";
import { useCookies } from 'vue3-cookies';
import { $vfm } from 'vue-final-modal';
import { ref } from 'vue';
import swal from 'sweetalert2';
import UserFormModal from '../components/UserFormModal.vue';

const props = defineProps(['showForm']);
const emit = defineEmits(['showSnackbarStatus', 'reloadTable']);
const cookies = useCookies().cookies;
const userList = ref(await getList(cookies));

async function edit(id) {
	const detail = await getDetail(id, cookies);
	if (detail) {
		$vfm.show({
			component: UserFormModal,
			bind: {
				isEditForm: true,
				userDetail: detail
			},
			on: {
				async update(username, password, close) {
					try {
						const response = await update(id, username, password, cookies);
						emit('showSnackbarStatus', response);
						emit('reloadTable');
						close();
					} catch (err) {
						emit('showSnackbarStatus', err);
					}
				}
			}
		});
	}
}

async function destroy(id) {
	const confirm = await swal.fire({
		titleText: 'Are you sure?',
		text: 'Are you sure want to delete this user?',
		icon: 'warning',
		showConfirmButton: true,
		showCancelButton: true,
		reverseButtons: true,
		confirmButtonText: 'Delete'
	});
	if (confirm.isConfirmed) {
		try {
			const response = await drop(id, cookies);
			if (response && response.status == 200) {
				emit('showSnackbarStatus', response.data);
				emit('reloadTable');
			}
		} catch (err) {
			emit('showSnackbarStatus', err);
		}
	}
}
</script>

<template #default>
	<tr v-for="item in userList">
		<td>{{ item.username }}</td>
		<td>{{ item.role }}</td>
		<td>
			<button type="button"
				class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				@click="edit(item._id)">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z">
					</path>
				</svg>
				<span class="sr-only">Edit</span>
			</button>
			<button type="button"
				class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800  disabled:opacity-50 disabled:pointer-events-none"
				@click="destroy(item._id)" :disabled="(item.role === 'Super Admin')">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
					</path>
				</svg>
				<span class="sr-only">Delete</span>
			</button>
		</td>
	</tr>
</template>