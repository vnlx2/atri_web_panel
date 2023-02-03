<script setup>
import HeaderName from '../components/Header.vue';
import VNFormModalVue from '../components/VNFormModal.vue';
import { $vfm, ModalsContainer } from 'vue-final-modal';
import { useCookies } from 'vue3-cookies';
import { ref, watch } from 'vue';

const tableKey = ref(0);
const pagination = ref({
	page: 1,
	total: 5,
});
const showForm = ref(false);
const snackbarStatus = ref({
	state: false,
	message: ''
});

</script>

<template>
	<HeaderName>Fan Translator Team</HeaderName>
	<div class="mt-10 p-5">
		<button @click="add" type="button"
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
			<svg class="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6">
				</path>
			</svg>
			Add Translator
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
                    <!-- TODO -->
					<!-- <suspense>
                        <FanTranslator />

						<template #fallback>
							<tr>
								<td colspan="3" class="text-center">Loading...</td>
							</tr>
						</template>
					</suspense> -->
				</tbody>
			</v-table>
		</div>
		<div class="pt-3">
			<v-pagination v-model="pagination.page" :length="pagination.total" rounded="circle"></v-pagination>
		</div>
		<!-- Modal Container -->
		<modals-container></modals-container>
		<!-- Snackbar Status Container -->
		<v-snackbar v-model="snackbarStatus.state" :timeout="2000" color="blue-grey" rounded="pill">
			{{ snackbarStatus.message }}
		</v-snackbar>
	</div>
</template>