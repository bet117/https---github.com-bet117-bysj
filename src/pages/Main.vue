<template>
  <div :style="bgStyle">
    <el-menu class="el-menu-demo" mode="horizontal" background-color="white">
      <el-menu-item index="1" class="step1">
        <el-button type="text" size="big" @click="change" v-show="!login"
          >更换背景图片</el-button
        >
      </el-menu-item>
      <el-menu-item index="2" class="step2">
        <el-button type="text" size="big" @click="conUs" v-show="!login"
          >联系我们</el-button
        >
        </el-menu-item>
    </el-menu>
    <div class="login" v-if="login">
      <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px">
        <el-form-item
          label="账户"
          prop="username"
          :rules="[
            { required: true, message: '请输入账户', trigger: 'change' },
          ]"
        >
          <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :rules="[
            { required: true, message: '请输入密码', trigger: 'change' },
          ]"
        >
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else class="login step3" style="display:block">
      <div class="link" style="text-align: left;">
        <router-link
          :to="{
            name: 'MenuFind',
          }"
        >
          拾捡归还
        </router-link>
      </div>
      <div class="link" style="text-align: right;">
        <router-link
          :to="{
            name: 'MenuLost',
          }"
        >
          失物招领
        </router-link>
      </div>
    </div>
    <el-drawer
      title="点击更换背景图片"
      :visible.sync="imgChange"
      :with-header="false"
      size="30%"
    >
      <el-row>
        <el-col>
          <el-card :body-style="{ padding: '0px' }" style="height: 200px">
            <img
              src="../static/1.jpeg"
              @click="changeImg"
            />
          </el-card>
        </el-col>
        <el-col>
          <el-card :body-style="{ padding: '0px' }" style="height: 200px">
            <img
              src="../static/2.jpeg"
              @click="changeImg"
            />
          </el-card>
        </el-col>
        <el-col>
          <el-card :body-style="{ padding: '0px' }" style="height: 200px">
            <img
              src="../static/3.jpg"
              @click="changeImg"
            />
          </el-card>
        </el-col>
        <el-col>
          <el-card :body-style="{ padding: '0px' }" style="height: 200px">
            <img
              src="../static/4.jpeg"
              @click="changeImg"
            />
          </el-card>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import axios from "axios";
import introJs from 'intro.js'
import 'intro.js/introjs.css'
import Cookies from '../api/Cookie.js'
export default {
  name: "BysjMain",
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      coverImgUrl: require("../static/1.jpeg"),
      imgChange: false,
      login: true,
    };
  },
  computed: {
    bgStyle() {
      return {
        backgroundImage: "url(" + this.coverImgUrl + ")",
        backgroundSize: "cover",
        borderRadius: "15px",
        height: "700px",
      };
    },
  },
  mounted() {
    //console.log("1111",window.location.hash.includes("/"))
  },

  methods: {
    change() {
      this.imgChange = true;
    },
    conUs(){
      window.open('https://mail.qq.com/','_blank')
    },
    changeImg(e) {
      this.coverImgUrl = e.target.src;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await axios.post("/api/login", { ...this.ruleForm });
          if (res.data.code == 200) {
            this.login = false;
            if(!Cookies.getCookies('token')){
              Cookies.setCookies('token',true,3600)
              Cookies.setCookies('user',this.ruleForm.username,3600)
              setTimeout(
              ()=>{
                this.setGuide()
              },1000)
            }  
          } else {
            this.$notify.error({
              title: res.data.msg,
              message: "用户名或密码错误！",
            });
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    setGuide() {
      introJs()
        .setOptions({
          nextLabel: '下一步',        // 下一个按钮文字
          prevLabel: '上一步',        // 上一个按钮文字
          skipLabel: '跳过',          // 跳过按钮文字
          doneLabel: '完成',          // 完成按钮文字
          hidePrev: true,             // 在第一步中是否隐藏上一个按钮
          exitOnOverlayClick: false,  // 点击叠加层时是否退出介绍
          showStepNumbers: false,     // 是否显示步骤编号
          disableInteraction: true,   // 是否禁用与突出显示的框内的元素的交互，就是禁止点击
          showBullets: true,          // 是否显示面板指示点
          steps: [
            {
              element: '.step1',
              title: '步骤1',
              intro: '这里可以更换背景',
              position: 'bottom'
            },
            {
              element: '.step2',
              title: '步骤2',
              intro: '点击这里发邮件给我们噢',
              position: 'left'
            },
            {
              element: '.step3',
              title: '步骤3',
              intro: '丢东西或者捡到东西了就点击这里',
              position: 'left'
            },
          ]
        }).start()
    }
  },
};
</script>

<style scoped lang="less">
.el-menu-demo {
  opacity: 0.8;
}
::v-deep .el-drawer .el-card img:hover {
  width: 500px;
}
::v-deep .el-drawer .el-card img{
  transition: 0.4s all linear;
  width: 75%; 
  border-radius: 20px
}
.el-menu-demo .el-button{
  animation:moveDown 0.8s;
}
@keyframes moveTo {
  0% {
    transform: translateX(-200px);
  }
  100% {
    transform: translateX(0px);
  }
}
@keyframes moveDown {
  0% {
    transform: translateY(-500px);
  }
  100% {
    transform: translateY(0px);
  }
}
.login {
  width: 400px;
  height: 400px;
  position: relative;
  display: flex;
  border-radius: 15px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 200px 200px 200px auto;
  background-color: #ffffff;
  opacity: 0.8;
  .el-form {
    margin: auto;
  }
  .link{
    width:100%;
    height: 50%;
    a{
      padding-top:10%;
      display: block;
      text-decoration:none;
      font-size: 30px;
      height:80%;
      animation:moveTo 0.8s ;
    }
  }
}
::v-deep div ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: transparent;
}
::v-deep div ::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgb(94, 88, 88);
}
</style>