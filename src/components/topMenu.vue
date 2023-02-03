<template>
  <div>
    <el-menu
      default-active="1"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">{{title}}</el-menu-item>
      <el-menu-item index="2">退出登录</el-menu-item>
      <el-menu-item index="3">简介</el-menu-item>
      <el-menu-item index="4">发布招领信息</el-menu-item>
      <el-menu-item index="5">
        主题更换<el-switch v-model="styleType"></el-switch>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
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
      styleType:false
    };
  },
  created(){},
  watch:{
    styleType:{
      handler(newVal){
        newVal==true?document.documentElement.setAttribute('data-theme', 'theme1'):document.documentElement.setAttribute('data-theme', 'theme2')
      }
    }
  },
  methods: {
    handleSelect(key) {
      switch (key){
        case '1':
          window.location.hash.includes("/menuFind")?this.$router.push('/menuLost'):this.$router.push('/menuFind')
          break;
        case '2':
          this.$router.push('/')
          break;
        case '3':
          break;
        case '4':
          window.location.hash.includes("/sendFind")?'':this.$router.push('/sendFind')
          break;
        case '5':
      }
    },
    changeColor(){
        this.activeIndex
    }
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