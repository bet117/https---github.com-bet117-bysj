<template>
  <div>
    <el-form :model="form">
      <el-form-item label="联系方式" prop="phone">
        <el-input v-model="form.phone" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="归还形式" prop="returnmethod">
        <el-radio-group v-model="form.returnmethod">
          <el-radio label="邮寄到付"></el-radio>
          <el-radio label="线下归还"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "BysjThingsChange",

  data() {
    return {
      form: {
        phone: "",
        returnmethod: "",
      },
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>