<template>
  <div>
    <el-container class="container">
      <el-aside width="200px">
        <BysjAsideMenu :selectThing="selectThing"></BysjAsideMenu>
      </el-aside>
      <el-container>
        <el-header>
          <BysjTopMenu :title="found"></BysjTopMenu>
        </el-header>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="所属地区">
                  <span>{{ props.row.area }}</span>
                </el-form-item>
                <el-form-item label="ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="物品分类">
                  <span>{{ props.row.type }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="ID" prop="id"> </el-table-column>
          <el-table-column label="失物类别" prop="type"> </el-table-column>
          <el-table-column label="操作" width="300" align="center">
            <template slot-scope="scope">
              <el-button @click="details(scope.row)" type="text" size="big"
                >问题回答</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <router-view></router-view>
        <el-footer>
          <i class="el-icon-s-help"></i>
          失物招领网站欢迎您
        </el-footer>
      </el-container>
    </el-container>
    <el-drawer
      title="详情"
      :visible.sync="drawer"
      :direction="direction"
      size="50%"
    >
      <div class="demo-drawer__content">
        <el-form :model="form" v-if="isImg">
          <el-form-item label="物品类型" label-width="50%">
            <el-input
              v-model="rowData.type"
              autocomplete="off"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="物品问题" label-width="50%">
            <el-input
              v-model="form.question"
              autocomplete="off"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="物品答案" label-width="50%">
            <el-radio-group v-model="form.answerreal">
              <el-radio :label="form.answer1">{{
                form.answer1
              }}</el-radio>
              <el-radio :label="form.answer2">{{
                form.answer2
              }}</el-radio>
              <el-radio :label="form.answer3">{{
                form.answer3
              }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <el-form v-else>
          <el-form-item label="联系方式">
            <span>{{ rowData.phone }}</span>
          </el-form-item>
          <el-form-item label="物品照片" prop="img" v-if="rowData.img">
            <el-image
              style="width: 100px; height: 100px"
              :src="require(`../assets/imgs/${rowData.img}`)"
              fit="contain"
            ></el-image>
          </el-form-item>
        </el-form>
        <div
          class="demo-drawer__footer"
          style="display: flex; justify-content: center"
        >
          <el-button @click="closeDrawer">返 回</el-button>
          <el-button type="primary" @click="submitQuestion" v-show="isImg"
            >确 定</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import BysjTopMenu from "@/components/topMenu.vue";
import BysjAsideMenu from "@/components/asideMenu.vue";
import {
  selectThings,
  selectQuestionByThingsId,
  updateUsersAnswer,
  selectUser,
} from "../api/action";
export default {
  name: "MenuLost",
  components: { BysjTopMenu, BysjAsideMenu },
  data() {
    return {
      found: "去失物招领",
      drawer: false,
      direction: "rtl",
      form: {
        question: "",
        answer1:"",
        answer2:"",
        answer3:"",
        answerreal: "",
      },
      answerright:"",
      tableData: [],
      rowData: {},
      isImg: true,
      righta: 0,
      wrong: 0,
    };
  },
  async created() {
    let res = await selectThings();
    let res1 = await selectUser({ id: localStorage.getItem("userId") });
    this.wrong = Number(res1.data.data.wrong);
    this.righta = Number(res1.data.data.righta);
    this.tableData = res.data.data.filter((x) => x.find != null);
  },
  mounted() {},

  methods: {
    async details(row) {
      this.drawer = true;
      this.rowData = row;
      let res = await selectQuestionByThingsId({ id: row.id });

      let arrReal = Object.values(res.data.data).reverse()
      let arrReverse=[]
      for (let i = 0; i < 3; i++) {
        arrReverse.push(arrReal[i]);
      }
      arrReverse.sort(() => Math.random() - 0.5);
      this.answerright=res.data.data.answerright
      let dataForm=res.data.data
      dataForm.answer1=arrReverse[0]
      dataForm.answer2=arrReverse[1]
      dataForm.answer3=arrReverse[2]
      this.form = dataForm
    },
    async submitQuestion() {
      if (this.form.answerreal == this.answerright) {
        this.isImg = false;
        this.rowData.img = this.rowData.img.slice(
          this.rowData.img.lastIndexOf("/") + 1
        );
        await updateUsersAnswer({
          id: localStorage.getItem("userId"),
          righta: this.righta + 1,
          wrong: this.wrong,
        });
      } else {
        await updateUsersAnswer({
          id: localStorage.getItem("userId"),
          righta: this.righta,
          wrong: this.wrong + 1,
        });
      }
    },
    closeDrawer() {
      this.drawer = false;
      this.isImg = true;
      this.form = {};
    },
    selectThing() {},
  },
};
</script>

<style lang="less" scoped>
* {
  .container {
    height: 735px;
    .el-form-item {
      margin-left: 15px;
    }
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
  .el-container {
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .demo-drawer__content {
    margin: 20px;
  }
  ::v-deep .el-form-item__label {
    text-align: center;
  }
}
</style>