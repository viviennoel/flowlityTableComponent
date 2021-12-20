<template>
  <div class="header d-md-flex text-center justify-content-around">
    <div class="row w-100">
      <!--Logo to send back to the homepage-->
      <div class="col-12 col-md-6 text-md-left m-auto px">
          <router-link to="/" id="logo"><img src="https://res.cloudinary.com/viviennoel07/image/upload/c_scale,w_150/v1639738451/logoFlowlity_u4smws.png" alt="Flowlity's logo" /></router-link>
      </div>

      <!--Navigation in the website-->
      <div id="nav" class="col-12 col-md-6 pt-2 p-md-4 text-md-right">
          <router-link to="/" id="dashboard">Dashboard</router-link> |
          <router-link to="/warehouse" id="warehouse">Warehouse</router-link>
          <!-- A page 404 needs to be added for other routes -->
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'HeaderNav'
  }
</script>