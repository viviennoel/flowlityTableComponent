<template>
  <div>
    <headerComponent/>
    <router-view/>
  </div>
</template>

<script setup>
  import headerComponent from "@/components/Header.vue";
</script>

<style lang="scss">
  @import "assets/style/designSystemFlowlity/v1.0/style.scss";
  @import "assets/style/bootstrap/css/bootstrap.min.css";
</style>
