<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="失物名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="拾取地点">
        <el-select v-model="form.region" placeholder="请选择拾取地点">
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="拾取时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker
            placeholder="选择时间"
            v-model="form.date2"
            style="width: 100%"
          ></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="拾取物品类型">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="电子产品" name="type"></el-checkbox>
          <el-checkbox label="衣物饰品" name="type"></el-checkbox>
          <el-checkbox label="证件" name="type"></el-checkbox>
          <el-checkbox label="贵重物品" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="领取途径">
        <el-select v-model="form.ways" placeholder="请选择支持的领取方式">
          <el-option label="邮寄" value="send"></el-option>
          <el-option label="线下" value="online"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "BysjLostForm",

  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        type: [],
        ways:''
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>