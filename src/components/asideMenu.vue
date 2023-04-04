<template>
  <div>
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
        >
          <el-menu-item index="1">
            <template slot="title">
              <h1>搜索条件</h1>
            </template>
            </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <span>归还形式</span>
            </template>
            <el-menu-item index="2-1" @click="payArrived">
              邮寄到付
            </el-menu-item>
            <el-menu-item index="2-2">
              线下归还
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span>招领</span>
            <el-menu-item-group>
              <template slot="title">支持领取方式</template>
              <el-menu-item index="3-1">邮寄</el-menu-item>
              <el-menu-item index="3-2">本地</el-menu-item>
            </el-menu-item-group>
          </el-menu-item>
          <el-menu-item index="4" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
        </el-menu>
      </el-col></el-row
    >
  </div>
</template>

<script>
export default {
  name: "BysjAsideMenu",

  data() {
    return {};
  },
  props:{
    selectThing:{
      type:Function
    }
  },
  mounted() {},

  methods: {
    payArrived(){
      console.log("111")
    },
  },
};
</script>

<style lang="less" scoped>
*{
  overflow: hidden;
  .el-col{
    width: 100% !important;
}
}
</style>