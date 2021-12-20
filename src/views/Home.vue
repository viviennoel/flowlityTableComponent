<template>
  <div class="home p-1 p-sm-auto mt-3 mt-md-5 container">
    <h1 class="text-white text-center text-md-left pb-4">Welcome to the innovative system of Flowlity</h1>
    <div class="home_container p-1 p-md-3">
      <h2 class="display-2 p-2">Your stock of office supplies</h2>
      <!-- Graph component -->
      <Graph :dataset="dataset" v-bind:is="Table"/>
      <!-- Table component -->
      <Table :dataset="dataset" :readOnly="false" dataName="data" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import store from '@/store/index'; // Access store data
  import { reactive } from 'vue'; // Manipulate dynamic states
  import Table from '@/components/Table.vue'; // @ is an alias to /src
  import Graph from '@/components/Graph.vue';

  const dataset = reactive(store.state.data);
</script>
