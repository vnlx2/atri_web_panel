<script setup>
    import HeaderName from '../components/Header.vue';
    import DataTable from 'datatables.net-vue3';
</script>

<template>
    <HeaderName>Visual Novel's List</HeaderName>
    <div class="mt-10">
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg class="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            Add Record
        </button>
        <div class="p-6">
            <DataTable :data="data" class="display">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
            </DataTable>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>