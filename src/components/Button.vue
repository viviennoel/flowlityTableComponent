<template>
  <button @click="onClick" class="btn btn-primary">
    <slot>Button</slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MyButton',
});
</script>
