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
          <el-table-column label="ID" prop="id"> </el-table-column>
          <el-table-column label="用户名" prop="username"> </el-table-column>
          <el-table-column label="密码" prop="password">
            <template slot-scope="scope">
              <el-button type="text" size="big" @click="changePassword(scope.row)">
                {{ scope.row.password}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="正确回答次数" prop="righta">
          </el-table-column>
          <el-table-column label="错误回答次数" prop="wrong"> </el-table-column>
          <el-table-column label="用户权限" prop="ismanager">
            <template slot-scope="scope">
              <span>{{ scope.row.ismanager == 1 ? "用户" : "管理员" }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-table :data="findData" style="width: 100%">
          <el-table-column label="ID" prop="id"> </el-table-column>
          <el-table-column label="失物类别" prop="type"> </el-table-column>
          <el-table-column label="所属地区" prop="area"> </el-table-column>
          <el-table-column label="联系方式" prop="phone"> </el-table-column>
          <el-table-column label="操作" width="300" align="center">
            <template slot-scope="scope">
              <el-button @click="details(scope.row)" type="text" size="big" :disabled="scope.row.find==null"
                >招领信息修改</el-button
              >
              <el-button @click="details(scope.row)" type="text" size="big" :disabled="scope.row.lose==null"
                >挂失信息修改</el-button
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
      :destroy-on-close="true"
    >
      <el-form label-position="top" label-width="80px" :model="form" ref="formChange">
        <el-form-item label="原密码" prop="passwordOld" >
          <el-input v-model="form.passwordOld" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="passwordNew" :rules="[{ required: true, message: '请输入新的密码', trigger: 'change' }]">
          <el-input v-model="form.passwordNew"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="editHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { selectUser, updateUsers, selectThings} from "../api/action.js";
import BysjTopMenu from "@/components/topMenu.vue";
import BysjAsideMenu from "@/components/asideMenu.vue";
export default {
  name: "BysjUserList",
  components: { BysjTopMenu, BysjAsideMenu },
  async created() {
    this.initData()
  },
  data() {
    return {
      tableData: [],
      findData:[],
      loseData:[],
      centerDialogVisible:false,
      form:{
        passwordOld:null,
        passwordNew:null,
      },
      rowData:{}
    };
  },

  mounted() {},

  methods: {
    async initData(){
      let res = await selectUser({id:localStorage.getItem("userId")});
      let res1 = await selectThings();
      this.tableData = [res.data.data];
      this.findData = res1.data.data;
    },
    changePassword(row){
      this.rowData=row
      this.form.passwordOld=row.password
      this.centerDialogVisible=true
    },
    editHandle(){
      this.$refs['formChange'].validate(async (valid) => {
          if (valid) {
            let res=await updateUsers(
              {
                username: this.rowData.username,
                password: this.form.passwordNew,
              })
            if(res.data.code==200){
              this.centerDialogVisible=false
              this.initData()
            }else{
              this.$notify.error({
              title: "警告",
              message: res.data.msg,
            });
            }
          } else {
            return false;
          }
        });
    },
    close(){
      this.centerDialogVisible = false
    },
    details(){

    }
  },
};
</script>

<style lang="scss" scoped>
* {
  .container {
    height: 735px;
    .el-table{
      height: 500px;
      overflow: auto;
    }
    .el-table::before {
    z-index: inherit; // 规定应该从父元素继承 z-index 属性的值。
    }
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