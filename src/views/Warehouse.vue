<template>
  <div class="home p-1 p-sm-auto mt-3 mt-md-5 container">
    <h1 class="text-white text-center text-md-left pb-4">Data for the warehouse {{ warehouse }}</h1>
    <div class="home_container p-1 p-md-3">
      <h2 class="display-2 p-2">Analysis of the office supply</h2>
      <table-main :dataset="dataset" :readOnly="true" dataName="analysis"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import store from '@/store/index'; // Access store data
  import { reactive, ref, defineProps } from 'vue'; // Manipulate dynamic states
  import TableMain from '@/components/Table.vue'; // @ is an alias to /src

  // Define the props 
  const props = defineProps({
    warehouse: {
      type: String,
      required: true
    }
  });

  const warehouse = ref(props.warehouse)
  const dataset = reactive(store.state.analysis);
</script>
