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
          <el-button type="primary" @click="submitForm('ruleForm')" v-if="isRegister"
            >提交</el-button
          >
          <el-button type="primary" @click="registerForm('ruleForm')" v-else
            >注册</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        <el-form-item label="注：">
          <el-button type="text" size="small">
            <span @click="()=>{this.isRegister=false}">没有账号?</span>
          </el-button>
          <el-button type="text" size="small">
            <span @click="()=>{this.isRegister=true}">返回登录?</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else class="login step3" style="display: block">
      <div class="link" style="text-align: left">
        <router-link
          :to="{
            name: 'MenuFind',
          }"
        >
          拾捡归还
        </router-link>
      </div>
      <div class="link" style="text-align: right">
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
          <div class="imgDrawer">
            <div class="card">
              <img src="../static/1.jpeg" @click="changeImg" />
            </div>
          </div>
        </el-col>
        <el-col>
          <div class="imgDrawer">
            <div class="card">
              <img src="../static/2.jpeg" @click="changeImg" />
            </div>
          </div>
        </el-col>
        <el-col>
          <div class="imgDrawer">
            <div class="card">
              <img src="../static/3.jpg" @click="changeImg" />
            </div>
          </div>
        </el-col>
        <el-col>
          <div class="imgDrawer">
            <div class="card">
              <img src="../static/4.jpeg" @click="changeImg" />
            </div>
          </div>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import {login, addUser, getUserName} from "../api/action.js";
import introJs from "intro.js";
import "intro.js/introjs.css";
import Cookies from "../api/Cookie.js";
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
      isRegister:true
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
    //更换背景图片抽屉
    change() {
      this.imgChange = true;
    },
    //联系方式（待更改）
    conUs() {
      window.open("https://mail.qq.com/", "_blank");
    },
    //更换背景图片操作
    changeImg(e) {
      this.coverImgUrl = e.target.src;
    },
    //登录
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await login({ ...this.ruleForm });
          if (res.data.code == 200) {
            this.login = false;
            if (!Cookies.getCookies("token")) {
              this.$store.commit('login',res.data.data)
              this.setGuide();
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
    //注册
    registerForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        let res1 = await getUserName({ ...this.ruleForm });
          if(res1.data.data){
            this.$notify.error({
              title: '注意',
              message: "用户名已存在！",
            });
            return ;
          }
        if (valid) {
          let res = await addUser({ ...this.ruleForm });
          if (res.data.code != 200){
            this.$notify.error({
              title: res.data.msg,
              message: "注册失败！",
            });
          }else{
            this.$notify.success({
              title: res.data.msg,
              message: "注册成功！",
            });
            this.isRegister=true
          }
        } else {
          return false;
        }
      });
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //引导动作
    setGuide() {
      introJs()
        .setOptions({
          nextLabel: "下一步", // 下一个按钮文字
          prevLabel: "上一步", // 上一个按钮文字
          skipLabel: "跳过", // 跳过按钮文字
          doneLabel: "完成", // 完成按钮文字
          hidePrev: true, // 在第一步中是否隐藏上一个按钮
          exitOnOverlayClick: false, // 点击叠加层时是否退出介绍
          showStepNumbers: false, // 是否显示步骤编号
          disableInteraction: true, // 是否禁用与突出显示的框内的元素的交互，就是禁止点击
          showBullets: true, // 是否显示面板指示点
          steps: [
            {
              element: ".step1",
              title: "步骤1",
              intro: "这里可以更换背景",
              position: "bottom",
            },
            {
              element: ".step2",
              title: "步骤2",
              intro: "点击这里联系我们噢",
              position: "left",
            },
            {
              element: ".step3",
              title: "步骤3",
              intro: "丢东西或者捡到东西了就点击这里",
              position: "left",
            },
          ],
        })
        .start();
    },
  },
};
</script>

<style scoped lang="less">
.el-menu-demo {
  opacity: 0.8;
}
::v-deep .el-drawer .imgDrawer {
  border-radius: 10px;
  background-size: cover;
  height: 200px;
  .card {
    img {
      transition: 0.4s all linear;
      height: 180px;
      margin-left:80px;
      border-radius: 10px;
      clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
      &:hover {
        height: 200px;
        margin-left:40px;
        clip-path: polygon(
          30% 0%,
          70% 0%,
          100% 30%,
          100% 70%,
          70% 100%,
          30% 100%,
          0% 70%,
          0% 30%
        );
      }
    }
  }
}
.el-menu-demo .el-button {
  animation: moveDown 0.8s;
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
  .link {
    width: 100%;
    height: 50%;
    a {
      padding-top: 10%;
      display: block;
      text-decoration: none;
      font-size: 30px;
      height: 80%;
      animation: moveTo 0.8s;
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