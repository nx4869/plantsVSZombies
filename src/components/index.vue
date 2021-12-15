<template>
  <div id="main">
    <!--    用户名-->
    <div class="userName">
      <div class="userNameTitle">
        <span>{{ userName.name }}</span>
      </div>
      <div class="userNameChange" @click="changeName"></div>
      <div class="userNameFoot"></div>
    </div>
    <!--    向日葵-->
    <div class="honoraryTitle"></div>
    <!--    图鉴-->
    <div class="illustratedHandbook" @click="openBook"></div>
    <!--    游戏模式选择-->
    <div class="gameMode">
      <!--      冒险-->
      <div class="adventureMode"></div>
      <!--      迷你-->
      <div class="miniMode"></div>
      <!--      益智-->
      <div class="puzzleMode"></div>
    </div>
    <div class="settings">
      <div class="option"></div>
      <div class="help" @click="help"></div>
      <div class="exit" @click="exit"></div>
    </div>
    <!--    修改用户名页面-->
    <div class="changeName" v-if="isChangeName">
      <div class="changeNameTop">
        <div class="top"></div>
        <div class="borderTopLeft"></div>
        <div class="borderTop">
          <span>你是谁?</span>
        </div>
        <div class="borderTopRight"></div>
      </div>
      <div class="changeNameBroadside">
        <div class="borderLeft"></div>
        <div class="nameContent">
          <ul class="nameList">
            <li v-for="(item, index) in nameList" :key="index"
                :style="{'background-color': (item.id === clickUserNameId ? 'green' : '')}"
                @click="clickName(item.id)">{{ item.title }}
            </li>
          </ul>
        </div>
        <div class="borderRight"></div>
      </div>
      <div class="changeNameFoot">
        <div class="borderFootLeft"></div>
        <div class="borderFootBottom">
          <div class="confirm" @click="confirm">确定</div>
          <div class="cancel" @click="cancel">取消</div>
        </div>
        <div class="borderFootRight"></div>
      </div>
    </div>
    <div class="setName" v-if="isSetName">
      <div class="setNameTop">
        <div class="top"></div>
        <div class="borderTopLeft"></div>
        <div class="borderTop">
          <span class="setNameTitle">新用户</span>
          <span class="subhead">请输入你的名字:</span>
        </div>
        <div class="borderTopRight"></div>
      </div>
      <div class="setNameBroadside">
        <div class="borderLeft"></div>
        <div class="nameContent">
          <div class="inputName">
            <input type="text" name="inputName" v-model="setName">
          </div>
        </div>
        <div class="borderRight"></div>
      </div>
      <div class="setNameFoot">
        <div class="borderFootLeft"></div>
        <div class="borderFootBottom">
          <div class="confirm" @click="setConfirm">确定</div>
          <div class="cancel" @click="setCancel">取消</div>
        </div>
        <div class="borderFootRight"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      userName: {
        id: '',
        name: '游客'
      },
      clickUserNameId: '',
      nameList: [],
      maxIndex: [],
      isChangeName: false,
      isSetName: false,
      setName: ''
    }
  },
  mounted() {
    let li = localStorage.getItem('nameList')
    if (li) {
      li = JSON.parse(li)
      let isLi = false
      for (let i = 0; i < li.length; i++) {
        if (li[i].id === 0) {
          isLi = true
        }
      }
      if (!isLi) {
        li.push({id: 0, title: '(创建一个新的玩家)'})
      }
      this.nameList = li
    } else {
      this.nameList.push({id: 0, title: '(创建一个新的玩家)'})
    }
    let nameId = localStorage.getItem('userNameId')
    if (li && nameId) {
      for (let i = 0; i < li.length; i++) {
        this.maxIndex.push(Number(li[i].id))
        if (li[i].id === Number(nameId)) {
          this.userName.id = li[i].id
          this.userName.name = li[i].title
        }
      }
    }
    this.clickUserNameId = this.userName.id
  },
  methods: {
    // 打开图鉴
    openBook() {
      this.$router.push('/tujian')
    },
    // 打开修改用户页面
    changeName() {
      this.isChangeName = true
    },
    // 用户点击切换
    clickName(id) {
      if (id === 0) {
        this.isSetName = true
      } else {
        this.clickUserNameId = id
      }
    },
    // 用户确定
    confirm() {
      for (let i = 0; i < this.nameList.length; i++) {
        if (this.nameList[i].id === this.clickUserNameId) {
          this.userName.id = this.nameList[i].id
          this.userName.name = this.nameList[i].title
          localStorage.setItem('userNameId', this.nameList[i].id)
          this.isChangeName = false
        }
      }
    },
    // 用户取消
    cancel() {
      this.isChangeName = false
    },
    // 创建名称
    setConfirm() {
      let id = Math.max(this.maxIndex)
      if (this.setName) {
        let _id = id + 1
        this.clickUserNameId = _id
        this.maxIndex.push(_id)
        this.nameList.unshift({id: _id, title: this.setName})
        this.nameList.sort(function (a, b) {
          if (a.id === 0 || b.id === 0) {
            return false
          }
          return a.id - b.id;
        });
        localStorage.setItem('nameList', JSON.stringify(this.nameList))
        localStorage.setItem('userNameId', _id)
        this.isSetName = false
      }
    },
    // 创建名称关闭
    setCancel() {
      this.isSetName = false
    },
    // 帮助
    help() {
      this.$router.push('/help')
    },
    // 退出
    exit() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
#main {
  width: 100%;
  height: 100%;
  background-image: url("../assets/jspvz/images/interface/Surface.png");
  background-position: 100% 100%;
  background-repeat: no-repeat;
  background-size: 100%;
}

/*用户名布局*/
.userName {
  width: 293px;
  height: 260px;
  position: absolute;
  left: 20px;
  top: 0;
}

.userNameTitle {
  width: 291px;
  height: 150px;
  background-image: url("../assets/jspvz/images/interface/SelectorScreen_WoodSign1_32.png");
  background-position: 100% 100%;
  background-repeat: no-repeat;
  background-size: 100%;
}

.userNameTitle span {
  color: #FC6;
  font-weight: bold;
  font-size: 18px;
  font-family: 微软雅黑, Verdana, Tahoma;
  display: block;
  width: 230px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  position: absolute;
  top: 93px;
  left: 35px;
}

.userNameChange {
  width: 293px;
  height: 71px;
  background: url("../assets/jspvz/images/interface/SelectorScreen_WoodSign2_32.png") 0 0 no-repeat;
  position: absolute;
  top: 140px;
}

.userNameChange:hover {
  background: url("../assets/jspvz/images/interface/SelectorScreen_WoodSign2_32.png") 0 -71px no-repeat;
}

.userNameFoot {
  width: 293px;
  height: 150px;
  background: url("../assets/jspvz/images/interface/SelectorScreen_WoodSign3_32.png");
  background-repeat: no-repeat;
  position: absolute;
  top: 205px;
}

/*向日葵*/
.honoraryTitle {
  position: absolute;
  left: 15px;
  top: 310px;
  width: 157px;
  height: 269px;
  cursor: pointer;
  /*银*/
  /*background: url("../assets/jspvz/images/interface/Sunflower_trophy32.png") 0 0 no-repeat;*/
  /*金*/
  background: url("../assets/jspvz/images/interface/Sunflower_trophy32.png") -157px 0 no-repeat;
}

/*图鉴*/
.illustratedHandbook {
  position: absolute;
  left: 369px;
  top: 427px;
  width: 99px;
  height: 99px;
  cursor: pointer;
  background: url("../assets/jspvz/images/interface/SelectorScreen_Almanac_32.png") 0 0 no-repeat;
}

.illustratedHandbook:hover {
  background: url("../assets/jspvz/images/interface/SelectorScreen_Almanac_32.png") 0 -99px no-repeat;
}

/*游戏模式选择*/
.gameMode {
  width: 332px;
  height: 347px;
  position: absolute;
  left: 476px;
  top: 75px;
}

.gameMode .adventureMode {
  position: absolute;
  top: 0;
  width: 331px;
  height: 145px;
  background: url("../assets/jspvz/images/interface/SelectorScreenStartAdventure_32.png") 0 0 no-repeat;
}

.gameMode .adventureMode:hover {
  background: url("../assets/jspvz/images/interface/SelectorScreenStartAdventure_32.png") 0 -146px no-repeat;
}

.gameMode .miniMode {
  position: absolute;
  top: 125px;
  width: 313px;
  height: 133px;
  background: url("../assets/jspvz/images/interface/SelectorScreenSurvival_32.png") 0 0 no-repeat;
}

.gameMode .miniMode:hover {
  background: url("../assets/jspvz/images/interface/SelectorScreenSurvival_32.png") 0 -134px no-repeat;
}

.gameMode .puzzleMode {
  position: absolute;
  top: 225px;
  width: 286px;
  height: 122px;
  background: url("../assets/jspvz/images/interface/SelectorScreenChallenges_32.png") 0 0 no-repeat;
}

.gameMode .puzzleMode:hover {
  background: url("../assets/jspvz/images/interface/SelectorScreenChallenges_32.png") 0 -123px no-repeat;
}

/*设置*/
.settings {
  width: 265px;
  height: 135px;
  position: absolute;
  right: 17px;
  bottom: 45px;
}

.settings .option {
  width: 95px;
  height: 100px;
  cursor: pointer;
  position: absolute;
  top: 11px;
  left: 13px;
}

.settings .help {
  width: 70px;
  height: 100px;
  cursor: pointer;
  position: absolute;
  top: 30px;
  left: 106px;
}

.settings .exit {
  width: 85px;
  height: 100px;
  cursor: pointer;
  position: absolute;
  top: 27px;
  right: 0;
}

/*修改用户名*/
.changeName {
  width: 450px;
  height: 500px;
  position: absolute;
  z-index: 9;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.changeName .changeNameTop .top {
  width: 187px;
  height: 64px;
  margin: 0 auto;
  background: url("../assets/jspvz/images/interface/dialog_header.png");
}

.changeName .changeNameTop .borderTop {
  width: calc(100% - 214px);
  height: 97px;
  position: absolute;
  top: 47px;
  left: 107px;
  z-index: 1;
  background: url("../assets/jspvz/images/interface/dialog_topmiddle.png");
}

.changeName .changeNameTop .borderTop span {
  display: block;
  text-align: center;
  margin-top: 40px;
  color: rgb(244, 187, 98);
  font-size: 26px;
  font-weight: bold;
  font-family: 新宋体;
}

.changeName .changeNameTop .borderTopLeft {
  width: 100%;
  height: 97px;
  position: absolute;
  top: 47px;
  left: 0;
  z-index: 2;
  background: url("../assets/jspvz/images/interface/dialog_topleft.png") no-repeat;
}

.changeName .changeNameTop .borderTopRight {
  width: 100%;
  height: 97px;
  position: absolute;
  top: 47px;
  left: 343px;
  z-index: 2;
  background: url("../assets/jspvz/images/interface/dialog_topright.png") no-repeat;
}

.changeName .changeNameBroadside .borderLeft {
  width: 107px;
  height: 259px;
  position: absolute;
  top: 144px;
  /*left: 343px;*/
  z-index: 2;
  background: url("../assets/jspvz/images/interface/dialog_centerleft.png");
}

.changeName .changeNameBroadside .borderRight {
  width: 107px;
  height: 259px;
  position: absolute;
  top: 144px;
  left: 343px;
  z-index: 2;
  background: url("../assets/jspvz/images/interface/dialog_centerright.png");
}

.changeName .changeNameBroadside .nameContent {
  width: calc(100% - 214px);
  height: 240px;
  position: absolute;
  top: 144px;
  left: 107px;
  z-index: 2;
  background: rgb(22, 24, 40);
  border-bottom: 19px rgb(32, 36, 52) solid;
  /*background: url("../assets/jspvz/images/interface/dialog_centermiddle.png");*/
}

.changeName .changeNameBroadside .nameContent .nameList {
  width: 100%;
  height: 100%;
  /*background-color: sandybrown;*/
}

.changeName .changeNameBroadside .nameContent .nameList li {
  width: 100%;
  height: 22px;
  text-align: center;
  font-size: 16px;
  color: rgb(232, 222, 187);
}

.changeName .changeNameBroadside .nameContent .nameList li:hover {
  color: rgb(253, 253, 253);
}

.changeName .changeNameFoot .borderFootLeft {
  width: 107px;
  height: 97px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  background: url("../assets/jspvz/images/interface/dialog_bottomleft.png");
}

.changeName .changeNameFoot .borderFootRight {
  width: 107px;
  height: 97px;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 2;
  background: url("../assets/jspvz/images/interface/dialog_bottomright.png");
}

.changeName .changeNameFoot .borderFootBottom {
  width: calc(100% - 214px);
  height: 97px;
  position: absolute;
  bottom: 0;
  left: 107px;
  z-index: 2;
  background: url("../assets/jspvz/images/interface/dialog_bottommiddle.png");
  display: flex;
}

.changeName .changeNameFoot .borderFootBottom div {
  width: 113px;
  height: 41px;
  margin-top: 32px;
  text-align: center;
  line-height: 41px;
  color: rgb(0, 196, 0);
  font-weight: bolder;
  font-size: 16px;
  font-family: 微软雅黑, Verdana, Tahoma;
  cursor: pointer;
}

.changeName .changeNameFoot .borderFootBottom .confirm {
  background: url("../assets/jspvz/images/interface/Button.png") no-repeat;
}

.changeName .changeNameFoot .borderFootBottom .cancel {
  margin-left: 10px;
  background: url("../assets/jspvz/images/interface/Button.png") no-repeat;
}

.changeName .changeNameFoot .borderFootBottom div:hover {
  color: rgb(1, 233, 1);
}

/*创建用户*/
.setName {
  width: 450px;
  height: 285px;
  position: absolute;
  z-index: 9;
  top: 25%;
  left: 50%;
  transform: translate(-50%, 0);
}

.setName .setNameTop .top {
  width: 187px;
  height: 64px;
  margin: 0 auto;
  background: url("../assets/jspvz/images/interface/dialog_header.png");
}

.setName .setNameTop .borderTop {
  width: calc(100% - 214px);
  height: 97px;
  position: absolute;
  top: 47px;
  left: 107px;
  z-index: 1;
  background: url("../assets/jspvz/images/interface/dialog_topmiddle.png");
}

.setName .setNameTop .borderTop .setNameTitle {
  display: block;
  text-align: center;
  margin-top: 40px;
  color: rgb(244, 187, 98);
  font-size: 26px;
  font-weight: bold;
  font-family: 新宋体;
}

.setName .setNameTop .borderTop .subhead {
  display: block;
  text-align: center;
  margin-top: 10px;
  color: rgb(244, 187, 98);
  font-size: 12px;
  font-weight: bold;
  font-family: 新宋体;
}

.setName .setNameTop .borderTopLeft {
  width: 100%;
  height: 97px;
  position: absolute;
  top: 47px;
  left: 0;
  z-index: 2;
  background: url("../assets/jspvz/images/interface/dialog_topleft.png") no-repeat;
}

.setName .setNameTop .borderTopRight {
  width: 100%;
  height: 97px;
  position: absolute;
  top: 47px;
  left: 343px;
  z-index: 2;
  background: url("../assets/jspvz/images/interface/dialog_topright.png") no-repeat;
}

.setName .setNameBroadside .borderLeft {
  width: 107px;
  height: 100px;
  position: absolute;
  top: 144px;
  /*left: 343px;*/
  z-index: 2;
  background: url("../assets/jspvz/images/interface/dialog_centerleft.png");
}

.setName .setNameBroadside .borderRight {
  width: 107px;
  height: 100px;
  position: absolute;
  top: 144px;
  left: 343px;
  z-index: 2;
  background: url("../assets/jspvz/images/interface/dialog_centerright.png");
}

.setName .setNameBroadside .nameContent {
  width: calc(100% - 214px);
  height: 70px;
  position: absolute;
  top: 144px;
  left: 107px;
  z-index: 2;
  background: url("../assets/jspvz/images/interface/dialog_centermiddle.png");
}

.setName .setNameBroadside .nameContent .inputName {
  width: 98%;
  height: 35px;
  margin-top: 5px;
  /*background-color: sandybrown;*/
  border: 2px solid rgb(222, 203, 107);
}

.setName .setNameBroadside .nameContent .inputName input {
  width: 96%;
  height: 100%;
  margin-left: 2%;
  color: white;
  caret-color: white;
}

.setName .setNameFoot .borderFootLeft {
  width: 107px;
  height: 97px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  background: url("../assets/jspvz/images/interface/dialog_bottomleft.png");
}

.setName .setNameFoot .borderFootRight {
  width: 107px;
  height: 97px;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 2;
  background: url("../assets/jspvz/images/interface/dialog_bottomright.png");
}

.setName .setNameFoot .borderFootBottom {
  width: calc(100% - 214px);
  height: 97px;
  position: absolute;
  bottom: 0;
  left: 107px;
  z-index: 2;
  background: url("../assets/jspvz/images/interface/dialog_bottommiddle.png");
  display: flex;
}

.setName .setNameFoot .borderFootBottom div {
  width: 113px;
  height: 41px;
  margin-top: 32px;
  text-align: center;
  line-height: 41px;
  color: rgb(0, 196, 0);
  font-weight: bolder;
  font-size: 16px;
  font-family: 微软雅黑, Verdana, Tahoma;
  cursor: pointer;
}

.setName .setNameFoot .borderFootBottom .confirm {
  background: url("../assets/jspvz/images/interface/Button.png") no-repeat;
}

.setName .setNameFoot .borderFootBottom .cancel {
  margin-left: 10px;
  background: url("../assets/jspvz/images/interface/Button.png") no-repeat;
}

.setName .setNameFoot .borderFootBottom div:hover {
  color: rgb(1, 233, 1);
}
</style>
