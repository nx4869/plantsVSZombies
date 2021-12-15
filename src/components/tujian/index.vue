<template>
  <div class="main">
    <div class="title"><span>大图鉴 一 目录</span></div>
    <dl class="botany">
      <dt></dt>
      <dd>查看植物</dd>
    </dl>
    <dl class="zombie">
      <dt></dt>
      <dd>查看僵尸</dd>
    </dl>
    <div class="close" @click="getBack">
      <span>关闭</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "tujian",
  methods: {
    getBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.main {
  width: 900px;
  height: 600px;
  background: url("../../assets/jspvz/images/interface/Almanac_IndexBack.jpg") no-repeat;
  background-size: 100% 100%;
}

/*标题*/
.title {
  width: 688px;
  height: 60px;
  /*background-color: sandybrown;*/
  position: absolute;
  top: 20px;
  left: 106px;
  text-align: center;
  line-height: 55px;
  font-size: 28px;
  font-weight: bolder;
  color: rgb(220, 220, 220);
}

.title span {
  text-shadow: 0 0 6px black;
}

/*植物*/
.botany {
  width: 380px;
  height: 215px;
  /*background-color: sandybrown;*/
  position: absolute;
  top: 188px;
  left: 44px;
}

.botany dt {
  position: absolute;
  top: 50px;
  left: 158px;
  width: 73px;
  height: 74px;
  background: url("../../assets/jspvz/images/Plants/SunFlower/SunFlower1.gif")
}

.botany dd {
  width: 156px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: url("../../assets/jspvz/images/interface/btn.png") no-repeat;
  color: #d59f2b;
  font-size: 14px;
  font-weight: bold;
  text-shadow: 0 0 4px black;
  position: absolute;
  top: 160px;
  left: 112px;
}

.botany dd:hover {
  text-shadow: 0 0 100px black;
}

.zombie {
  width: 380px;
  height: 215px;
  /*background-color: sandybrown;*/
  position: absolute;
  top: 188px;
  right: 44px;
}

.zombie dt {
  position: absolute;
  top: 11px;
  left: 145px;
  width: 100px;
  height: 144px;
  background: url("../../assets/jspvz/images/Zombies/Zombie/1-1.gif") -70px 0 no-repeat;
}

.zombie dd {
  width: 156px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: url("../../assets/jspvz/images/interface/Button.png") no-repeat;
  background-size: 100% 100%;
  color: #d59f2b;
  font-size: 14px;
  font-weight: bold;
  text-shadow: 0 0 4px black;
  position: absolute;
  top: 160px;
  left: 112px;
}

.zombie dd:hover {
  color: #00FF00;
}

/*关闭*/
.close {
  width: 89px;
  height: 26px;
  background: url("../../assets/jspvz/images/interface/Almanac_CloseButton.png") no-repeat;
  position: absolute;
  right: 40px;
  bottom: 8px;
}

.close:hover {
  background: url("../../assets/jspvz/images/interface/Almanac_CloseButton.png") 0 -26px no-repeat;
}

.close span {
  display: block;
  width: 80%;
  height: 100%;
  line-height: 26px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  font-family: 幼圆;
}
</style>
