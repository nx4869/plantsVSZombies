<template>
  <div id="main">
    <router-link class="btn" :to="{name:'index'}"></router-link>
  </div>
</template>

<script>
export default {
  name: "login"
}
</script>

<style scoped>
#main {
  width: 100%;
  height: 100%;
  background-image: url("../assets/jspvz/images/interface/Logo.jpg");
  background-position: 100% 100%;
  background-repeat: no-repeat;
  background-size: 100%;
}

.btn {
  width: 156px;
  height: 95px;
  position: absolute;
  top: 300px;
  left: 275px;
  cursor: pointer;
}
</style>
