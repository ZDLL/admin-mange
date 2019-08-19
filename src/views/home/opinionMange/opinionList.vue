<template>
  <div class="opinion-page">
    <myPlace :place-text="t"></myPlace>
    <div class="opinion-cont">
        <el-divider content-position="left">意见列表</el-divider>
        <div class='opinion-table'>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column
                v-for="(itm,index) in tableHead"
                :key="itm.id"
                :prop="itm.prop"
                :label="itm.label"
                ></el-table-column>
                <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="delSugClick(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            
        </div>
         <MyPackage :page-total='total' :key='total' @handleCurrent='handleCurrentFun'></MyPackage>
     </div>
  </div>
</template>
<script>
import myPlace from "../../../components/place.vue";
import search from "../../../components/search.vue";
import MyPackage from "../../../components/package.vue";
import MyDatePicker from "../../../components/datepicker.vue";
import until from "../../../comm/until.js";
export default {
  name: "opinon",
  data() {
    return {
      t: "意见反馈",
      tableHead:[
        { prop: "id", label: "意见ID" },
        { prop: "nickname", label: "用户昵称" },
        { prop: "user_id", label: "用户ID" },
        { prop: "content", label: "意见内容" },
        { prop: "create_time", label: "创建时间" },
      ],
      tableData:[],
      total:0,
      currData:{
          current_page:1,
          page_size:10
      }
    };
  },
  components: {
    myPlace,
    MyPackage
  },
  methods: {
      async getList(){
        await this.$store.dispatch("opinionModule/sugGetListAct",this.currData)
        let data = this.$store.state.opinionModule.sugGetListData;
        this.tableData = data.info.result
        this.total= parseInt(data.info.total)
      },
      //delSugGetListAct
      async delSugGet(ID){
        await this.$store.dispatch("opinionModule/delSugGetAct",{id:ID})
        let data = this.$store.state.opinionModule.delSugGetData;
        this.tableData = data.info.result
        this.total= parseInt(data.info.total)
        this.$message.success("删除该建议成功")
        this.getList();
      },
      handleCurrentFun(val){
          this.currData.current_page = val
      },
      delSugClick(row){
        let _this = this;
        until.myConfirm(_this,`是否删除该建议？`,function(val){
          _this.delSugGet(row.id)
        })
       
      }
  },
  created() {
      this.getList();
  },
  mounted() {}
};
</script>

<style lang="scss">
    .opinion-cont{
        @extend %extreme;
        .opinion-table{
            @extend %tableborder;
        }
    }
    
</style>

