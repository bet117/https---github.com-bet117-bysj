<template>
  <div class="block">
  <el-timeline>
    <el-timeline-item :timestamp="item.time" placement="top" v-for="(item,index) in dataList" :key='index'>
      <el-card>
        <el-table :data="item.list" border>
            <el-table-column v-for="(item,index) in item.dictList" :prop="item.indexCode" :key="index" :label="item.label"></el-table-column>
        </el-table>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</div>
</template>

<script>
export default {
  name: "TimeLine",

  data() {
    return {
        dataList:[
            {
                time:"2022/2/12",
                dictList:[
                    {
                        label:'用户名',
                        indexCode:'name'
                    },
                    {
                        label:'类别',
                        indexCode:'type'
                    },
                ],
                list:[
                    {
                    name:'小明',
                    type:'证件',
                    }
                ]
            },
        ]
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>