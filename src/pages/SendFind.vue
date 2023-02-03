<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <BysjAsideMenu></BysjAsideMenu>
      </el-aside>
      <el-container class="container">
        <el-header>
          <BysjTopMenu :title="found"></BysjTopMenu>
        </el-header>
        <div style="overflow-y: scroll">
          <el-form
            ref="form"
            :model="form"
            label-width="80px"
            style="margin-top: 20px"
          >
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="区域" prop="region">
              <el-select v-model="form.region" placeholder="请选择发现物品区域">
                <el-option
                  v-for="(a, index) in area"
                  :label="a"
                  :value="a"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="拾捡时间" prop="date1">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.date1"
                  style="width: 50%"
                ></el-date-picker>
              </el-col>
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
            <el-form-item label="归还形式" prop="desc">
              <el-checkbox-group v-model="form.desc">
                <el-checkbox-button
                  label="邮寄到付"
                  name="desc"
                ></el-checkbox-button>
                <el-checkbox-button
                  label="线下归还"
                  name="desc"
                ></el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="相关物品验证问题" prop="ques">
              <el-input type="textarea" v-model="form.ques"></el-input>
            </el-form-item>
            <el-form-item label="正确回答" prop="msg">
              <el-input type="textarea" v-model="form.answerRight"></el-input>
            </el-form-item>
            <el-form-item label="干扰项1" prop="msg">
              <el-input type="textarea" v-model="form.answerWrong1"></el-input>
            </el-form-item>
            <el-form-item label="干扰项2" prop="msg">
              <el-input type="textarea" v-model="form.answerWrong2"></el-input>
            </el-form-item>
            <el-form-item label="其他" prop="msg">
              <el-input type="textarea" v-model="form.msg"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">提交</el-button>
              <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
          </el-form>
          <router-link
            :to="{
              name: 'TimeLine',
            }"
          >
            查看时间线
          </router-link>
          <router-view></router-view>
        </div>
        <el-footer>
          <i class="el-icon-s-help"></i>
          失物招领网站欢迎您
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import axios from "axios";
import BysjTopMenu from "@/components/topMenu.vue";
import BysjAsideMenu from "@/components/asideMenu.vue";
export default {
  name: "SendFind",
  components: { BysjTopMenu, BysjAsideMenu },
  data() {
    return {
      found: "去失物招领",
      form: {
        name: "",
        region: "",
        date1: "",
        type: [],
        desc: [],
        msg: "",
        ques: "",
        answerRight: "",
        answerWrong1: "",
        answerWrong2: "",
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
  created() {
    sessionStorage.setItem("Person", JSON.stringify("find"));
    JSON.parse(sessionStorage.getItem("Person"));
  },
  mounted() {},

  methods: {
    async submitForm() {
    //   let res = await axios.post("/api/login", { ...this.form });
    //   this.$notify.error({
    //     title: res.data.msg,
    //     message: "用户名或密码错误！",
    //   });
    console.log("表格数据",this.form)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
* {
  .container {
    height: 735px;
  }
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0;
  }
  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  ::v-deep ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: transparent;
  }
  ::v-deep ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgb(94, 88, 88);
  }
}
</style>