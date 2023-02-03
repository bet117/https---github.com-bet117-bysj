<template>
  <div>
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1">
            <template slot="title">
              <h1>菜单导航</h1>
            </template>
            </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>失物</span>
            </template>
            <el-submenu index="2-1">
              <template slot="title">证件类</template>
              <el-menu-item index="2-1-1">身份证件类</el-menu-item>
              <el-menu-item index="2-1-2">其他</el-menu-item>
            </el-submenu>
            <el-submenu index="2-2">
              <template slot="title">选项3</template>
              <el-menu-item index="2-2-1">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="2-3">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
            </el-submenu>
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
          <el-menu-item index="5">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
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

  mounted() {},

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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