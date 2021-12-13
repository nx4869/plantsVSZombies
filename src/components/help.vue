<template>
  <div id="main">
    <div class="content"></div>
    <div class="btn" @click="getBack">
      主菜单
      <div class="shadow"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "help",
  methods: {
    getBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
#main {
  width: 100%;
  height: 100%;
  background: url("../assets/jspvz/images/interface/background1.jpg") 40% 40%;
  background-size: 200% 200%;
  position: relative;
}

.content {
  width: 70%;
  height: 70%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);
  background: url("../assets/jspvz/images/interface/Help.png") no-repeat;
  background-size: 100% 100%;
}

.btn {
  width: 155px;
  height: 40px;
  background-color: rgb(143, 67, 27);
  position: absolute;
  left: 50%;
  top: 90%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 40px;
  color: rgb(213, 159, 43);
  font-weight: bolder;
  font-size: 12px;
  border-radius: 4px;
  box-shadow: 3px 3px 3px rgb(38, 45, 9);
}

.shadow {
  display: none;
  width: 90%;
  height: 80%;
  background-color: rgb(252, 158, 82);
  position: absolute;
  left: 5%;
  top: 10%;
  opacity: 0.3;
  border-radius: 30px;
  box-shadow: 0 0 100px rgb(252, 158, 82);
}

.btn:hover .shadow {
  display: block;
}
</style>
