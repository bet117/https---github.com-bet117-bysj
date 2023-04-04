<template>
  <div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">{{title}}</el-menu-item>
      <el-menu-item index="2">退出登录</el-menu-item>
      <el-menu-item index="3">简介</el-menu-item>
      <el-menu-item index="4">发布招领/挂失信息</el-menu-item>
      <el-menu-item index="5" v-if="isManerger">
        用户列表
      </el-menu-item>
      <el-menu-item index="6">
        我的
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import Cookies from "../api/Cookie.js";
export default {
  name: "BysjTopMenu",
  props:{
    title:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      isManerger:localStorage.getItem("isManerger")==0,
    };
  },
  // handleSelectChange:{
  //       1:this.$options.methods.pageChangL("/menuFind",'/menuLost','/menuFind'),
  //       2:this.remove(true,'/'),
  //       3:()=>{},
  //       4:this.pageChangL("/sendFind",'','/sendFind'),
  //       5:this.remove(false,'/userList'),
  //     },
  created(){
  },
  watch:{
  },
  methods: {
    try(){
      console.log("这是尝试")
    },
    pageChangL(url,gotoUrl1,gotoUrl2){
      window.location.hash.includes(url)?this.$router.push(gotoUrl1):this.$router.push(gotoUrl2)
    },
    remove(isRemove,url){
      isRemove?Cookies.removeCookies("token"):''
      this.$router.push(url)
    },
    handleSelect(key) {
      switch (key){
        case '1':
          window.location.hash.includes("/menuFind")?this.$router.push('/menuLost'):this.$router.push('/menuFind')
          break;
        case '2':
          this.$store.commit('logout')
          this.$router.push('/')
          break;
        case '3':
          break;
        case '4':
          window.location.hash.includes("/sendFind")?'':this.$router.push('/sendFind')
          break;
        case '5':
          this.$router.push('/userList')
          break;
        case '6':
          this.$router.push('/mineMsg')
          break;
      }
      // this.$options.handleSelectChange[key]
    },
  },
};
</script>

<style lang="scss" scoped>
.el-menu-demo{
    position: relative;
    display: block;
    float: right;
}
</style>