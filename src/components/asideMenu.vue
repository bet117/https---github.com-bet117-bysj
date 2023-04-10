<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-width="70px"
      style="margin-top: 20px; height: 500px"
    >
      <el-form-item label="区域" prop="area">
        <el-select v-model="form.area" placeholder="请选择发现物品区域">
          <el-option
            v-for="(a, index) in area"
            :label="a"
            :value="a"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="拾捡时间" prop="date">
        <el-col>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="物品类别" prop="type">
        <el-select v-model="form.type" placeholder="请选择物品类别">
          <el-option
            v-for="(a, index) in type"
            :label="a"
            :value="a"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="归还形式" prop="returnmethod">
        <el-radio-group v-model="form.returnmethod">
          <el-radio label="邮寄到付"></el-radio>
          <el-radio label="线下归还"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submitSelect">确 定</el-button>
  </div>
</template>

<script>
import { selectThings } from "@/api/action.js";
export default {
  name: "BysjAsideMenu",

  data() {
    return {
      form: {
        area: "",
        date: "",
        type: "",
        returnmethod: "",
        phone: "",
      },
      area: [
        "北京",
        "陕西",
        "内蒙古",
        "上海",
        "山东",
        "宁夏",
        "天津",
        "山西",
        "新疆",
        "重庆",
        "四川",
        "西藏",
        "河北",
        "青海",
        "广西",
        "河南",
        "安徽",
        "香港",
        "湖北",
        "海南",
        "澳门",
        "湖南",
        "广东",
        "其他",
        "江苏",
        "贵州",
        "江西",
        "浙江",
        "辽宁",
        "福建",
        "吉林",
        "台湾",
        "黑龙江",
        "甘肃",
        "公南",
      ],
      type: [
        "钱包",
        "钥匙",
        "宠物",
        "卡类",
        "数码产品",
        "手袋/挎包",
        "衣服鞋帽",
        "首饰/挂饰",
        "行李/包裹",
        "书籍/文件",
        "其他",
      ],
    };
  },
  props: {
    selectThing: {
      type: Function,
    },
  },
  mounted() {},

  methods: {
    async submitSelect() {
      let res = await selectThings(this.form);
      console.log("111", res);
    },
  },
};
</script>

<style lang="less" scoped>
* {
  overflow: hidden;
}
</style>