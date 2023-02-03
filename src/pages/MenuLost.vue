<template>
  <div>
    <el-container class="container">
      <el-aside width="200px">
        <BysjAsideMenu></BysjAsideMenu>
      </el-aside>
      <el-container>
        <el-header>
          <BysjTopMenu :title="found"></BysjTopMenu>
        </el-header>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="失物标题">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="所属地区">
                  <span>{{ props.row.shop }}</span>
                </el-form-item>
                <el-form-item label="ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="物品分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="联系方式">
                  <span>{{ props.row.address }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="ID" prop="id"> </el-table-column>
          <el-table-column label="失物类别" prop="name"> </el-table-column>
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
      ref="drawer"
      :visible.sync="drawer"
      :direction="direction"
      size="30%"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="活动名称" label-width="50%">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" label-width="50%">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="()=>{}">取 消</el-button>
          <el-button
            type="primary"
            @click="$refs.drawer.closeDrawer()"
            :loading="loading"
            >{{ loading ? "提交中 ..." : "确 定" }}</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import BysjTopMenu from "@/components/topMenu.vue";
import BysjAsideMenu from "@/components/asideMenu.vue";
export default {
  name: "MenuLost",
  components: { BysjTopMenu, BysjAsideMenu },
  data() {
    return {
      found: "去拾捡归还",
      drawer: false,
      direction: "rtl",
      tableData: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
        },
        {
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
        },
        {
          id: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
        },
        {
          id: "12987126",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
        },
      ],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      loading:false
    };
  },
  created() {},
  mounted() {},

  methods: {
    details(row) {
      this.drawer = true;
      console.log("row", row);
      // this.$confirm(`确定当前用户账号吗?`, "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // })
      //   .then(() => {
      //     console.log("row", row);
      //   })
      //   .catch(() => {});
    },
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
  .demo-drawer__content{
    .el-form{
      ::v-deep .el-form-item__label{
        text-align: center;
      }
    }
    margin: 20px;
  }
  .demo-drawer__footer{
    text-align: center;
  }
}
</style>