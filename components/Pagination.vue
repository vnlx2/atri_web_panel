<script setup lang="ts">
  const props = defineProps({
    itemsCount: Number,
    itemsPerPage: Number,
    currentPage: Number,
  });
  const emits = defineEmits(['changePage']);
  const pageCount = computed(() =>
    Math.ceil((props.itemsCount?? 1) / (props.itemsPerPage?? 1))
  );
  const minimumNumber = computed(() => 
    (Math.ceil((props.currentPage ?? 1) / 5) * 5) - 5
  );

  function previous() {
    if (props.currentPage! > 1) {
      emits('changePage', props.currentPage! - 1);
    }
  }

  function next() {
    if (props.currentPage! < pageCount.value) {
      emits('changePage', props.currentPage! + 1);
    }
  }
</script>

<template>
  <div class="flex justify-between py-5">
    <p class="text-gray-700 text-sm">Page {{ props.currentPage }} of {{ pageCount }}</p>
    <nav aria-label="Page navigation example">
      <ul class="flex items-center -space-x-px h-8 text-sm">
        <li>
          <a :class="['flex items-center justify-center px-3 h-8 ml-0 leading-tight rounded-l-lg', currentPage === 1 ? 'text-gray-700 bg-gray-300 cursor-not-allowed' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700']" @click="previous"
          >
            <span class="sr-only">Previous</span>
            <svg
              class="w-2.5 h-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </a>
        </li>
        <li 
          v-for="index in 5" 
          @click="$emit('changePage', index + minimumNumber)" 
          :class="['flex items-center justify-center px-3 h-8 leading-tight', currentPage === (index + minimumNumber) ? 'text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700']">{{ index + minimumNumber }}</li>
        <li>
          <a
          :class="['flex items-center justify-center px-3 h-8 ml-0 leading-tight rounded-r-lg', currentPage === pageCount ? 'text-gray-700 bg-gray-300 cursor-not-allowed' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700']" @click="next"
          >
            <span class="sr-only">Next</span>
            <svg
              class="w-2.5 h-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>