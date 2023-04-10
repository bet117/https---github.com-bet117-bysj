<template>
  <div>
    <el-container>
      <el-aside width="300px">
        <BysjAsideMenu></BysjAsideMenu>
      </el-aside>
      <el-container class="container">
        <el-header>
          <BysjTopMenu :title="found"></BysjTopMenu>
        </el-header>
        <div style="overflow-y: scroll">
          <el-steps :active="active" finish-status="success">
            <el-step title="提交物品信息"></el-step>
            <el-step title="确认物品问题"></el-step>
          </el-steps>
          <el-form
            ref="form"
            :model="form"
            label-width="80px"
            style="margin-top: 20px; height: 500px"
            v-if="active == 0"
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
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.date"
                  style="width: 50%"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="联系方式" prop="phone">
              <el-input v-model="form.phone" style="width:300px"></el-input>
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
            <el-form-item label="招领/挂失" prop="lostOrFound">
              <el-radio-group v-model="lostOrFound">
                <el-radio label="find">招领</el-radio>
                <el-radio label="lose">挂失</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="照片" prop="imge">
              <el-upload
                class="upload-demo"
                ref="upload"
                action="http://10.18.191.174:8081/api/pictures"
                :on-remove="handleRemove"
                :file-list="fileList"
                list-type="picture"
                :http-request="uploadFile"
                name="upload"
                :limit="1"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
            </el-form-item>
          </el-form>
          <el-form
            :model="questionForm"
            ref="questionForm"
            label-width="80px"
            style="margin-top: 20px; height: 470px"
            v-if="active == 1"
          >
            <el-form-item label="相关物品验证问题 （注：回答不能相同！）" prop="question">
              <el-input
                type="textarea"
                v-model="questionForm.question"
              ></el-input>
            </el-form-item>
            <el-form-item label="正确回答" prop="answerright">
              <el-input
                type="textarea"
                v-model="questionForm.answerright"
              ></el-input>
            </el-form-item>
            <el-form-item label="干扰项1" prop="answerwrong1">
              <el-input
                type="textarea"
                v-model="questionForm.answerwrong1"
              ></el-input>
            </el-form-item>
            <el-form-item label="干扰项2" prop="answerwrong2">
              <el-input
                type="textarea"
                v-model="questionForm.answerwrong2"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-form
            ref="resForm"
            label-width="80px"
            style="margin-top: 20px; height: 470px"
            v-if="active == 2"
          >
            <el-form-item>成功了</el-form-item>
          </el-form>
          <el-form ref="btnForm" label-width="80px" style="margin-top: 20px">
            <el-form-item>
              <el-button type="primary" @click="submitForm" :disabled="isEnd">下一步·</el-button>
              <el-button type="primary" @click="cancelUpload" v-if="active == 0"
                >取消</el-button
              >
              <el-button @click="resetForm" v-if="active != 2">重置</el-button>
            </el-form-item>
          </el-form>
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
import axios from "axios";
import { delThings, addThings, addQuestion} from "../api/action.js";
import BysjTopMenu from "@/components/topMenu.vue";
import BysjAsideMenu from "@/components/asideMenu.vue";
export default {
  name: "SendFind",
  components: { BysjTopMenu, BysjAsideMenu },
  data() {
    return {
      found: "去失物招领",
      form: {
        area: "",
        date: "",
        type: "",
        returnmethod: "",
        imge: "",
        phone:""
      },
      lostOrFound: "",
      questionForm: {
        question: "",
        answerright: "",
        answerwrong1: "",
        answerwrong2: "",
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
      fileList: [],
      imgId: "",
      thingsId: "",
      active: 0,
      isEnd:false
    };
  },
  created() {
    sessionStorage.setItem("Person", JSON.stringify("find"));
    JSON.parse(sessionStorage.getItem("Person"));
  },
  mounted() {},

  methods: {
    async submitForm() {
      let steps = this.active;
      switch (steps) {
        case 0:
          if (!this.imgId) {
            this.$notify({
              title: "警告",
              message: "物品信息不完整",
              type: "warning",
            });
            return false;
          }
          this.addThings();
          break;
        case 1:
          this.addQuestions();
          break;
        case 2:
          break;
      }
      if (this.active++ > 1) this.active = 0;
      console.log(">>>>>>>>",this.active)
    },
    resetForm() {
      this.$refs["form"].resetFields();
      this.$refs["questionForm"].resetFields();
    },
    handleRemove() {
      this.cancelUpload();
    },
    async uploadFile(data) {
      let myFile = data.file;
      let fd = new FormData();
      fd.append("file", myFile);
      let res = await axios({
        url: "/api/things/pictures",
        method: "POST",
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        data: fd,
      });
      if (res.data.code == 200) {
        this.imgId = res.data.data;
      } else {
        this.$notify.error({
          title: res.data.msg,
          message: "上传图片失败！",
        });
      }
    },
    async cancelUpload() {
      if (!this.imgId) return;
      let res = await delThings({ id: this.imgId });
      if (res.data.code == 200) {
        this.fileList = [];
      } else {
        this.$notify.error({
          title: res.data.msg,
          message: "取消上传失败！",
        });
      }
    },
    async addThings() {
      this.lostOrFound=="find"?this.form.find=localStorage.getItem("userId"):this.form.lose=localStorage.getItem("userId");
      this.$refs["form"].validate(async (valid) => {
      if (valid) {
        let res = await addThings({ ...this.form, id: this.imgId });
        if (res.data.code == 200) {
          this.thingsId = res.data.data;
        } else {
          this.$notify.error({
            title: res.data.msg,
            message: "物品信息上传失败！",
          });
        }
      }})
    },
    async addQuestions() {
      this.$refs["questionForm"].validate(async (valid) => {
      if (valid) {
        let res = await addQuestion({ ...this.questionForm, thingsid: this.thingsId });
        if (res.data.code == 200) {
          this.isEnd=true
          console.log("问卷上传成功")
        } else {
          this.$notify.error({
            title: res.data.msg,
            message: "问卷上传失败！",
          });
        }
      }})
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