<template>
  <div>
    <el-container class="container">
      <el-aside width="200px">
        <BysjAsideMenu></BysjAsideMenu>
      </el-aside>
      <el-container>
        <el-header>
          <BysjTopMenu :title="'去失物招领'"></BysjTopMenu>
        </el-header>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="用户名">
                  <span>{{ props.row.username }}</span>
                </el-form-item>
                <el-form-item label="密码">
                  <span>{{ props.row.password }}</span>
                </el-form-item>
                <el-form-item label="回答正确次数">
                  <span>{{ props.row.righta }}</span>
                </el-form-item>
                <el-form-item label="回答错误次数">
                  <span>{{ props.row.wrong }}</span>
                </el-form-item>
                <el-form-item label="账号权限">
                  <span>{{
                    props.row.ismanager == 1 ? "用户" : "管理员"
                  }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="ID" prop="id"> </el-table-column>
          <el-table-column label="用户名" prop="username"> </el-table-column>
          <el-table-column label="操作" width="300" align="center">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" type="text" size="big"
                >编辑</el-button
              >
              <el-button @click="del(scope.row)" type="text" size="big"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-footer>
          <i class="el-icon-s-help"></i>
          失物招领网站欢迎您
        </el-footer>
      </el-container>
    </el-container>
    <el-dialog
      title="修改"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <el-form label-position="top" label-width="80px" :model="form" ref="formChange">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'change' }]">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="用户权限" prop="ismanager">
          <el-select v-model="form.ismanager">
            <el-option label="管理员" value="0"></el-option>
            <el-option label="用户" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, updateUsers, delUsers} from "../api/action.js";
import BysjTopMenu from "@/components/topMenu.vue";
import BysjAsideMenu from "@/components/asideMenu.vue";
export default {
  name: "BysjUserList",
  components: { BysjTopMenu, BysjAsideMenu },
  async created() {
    this.getAll();
  },
  data() {
    return {
      tableData: [],
      rowData: {},
      centerDialogVisible: false,
      form: {
        username: "",
        password: "",
        ismanager: "",
      },
    };
  },

  mounted() {},

  methods: {
    async getAll() {
      let res = await getUserList();
      if (res.data.code == 200) {
        this.tableData = res.data.data;
      } else {
        this.$notify.error({
          title: "警告",
          message: res.data.msg,
        });
      }
    },
    edit(row) {
      this.rowData = row;
      this.centerDialogVisible = true;
      this.form.username = row.username;
    },
    editHandle() {
      this.$refs["formChange"].validate(async (valid) => {
        if (valid) {
          let res = await updateUsers(this.form);
          if (res.data.code == 200) {
            this.$notify.success({
              title: "成功",
              message: "修改成功",
            });
            this.centerDialogVisible = false;
            this.getAll();
          } else {
            this.$notify.error({
              title: "警告",
              message: res.data.msg,
            });
          }
        }})
    },
    async del(row) {
      let res=await delUsers({id:row.id})
      if (res.data.code == 200) {
            this.$notify.success({
              title: "成功",
              message: "删除成功",
            });
          } else {
            this.$notify.error({
              title: "警告",
              message: res.data.msg,
            });
          }
          this.getAll();
    },
  },
};
</script>

<style lang="scss" scoped>
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
}
</style>