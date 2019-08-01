<template>
  <div class="dynamicMange-page">
    <my-place :place-text='"动态管理"'></my-place>
    <div class="dynamicMangeTop">
      <el-row>
        <el-col :span="8">
          <div class="data-box">
            <span>总共动态</span>
            <strong>{{momentsNum.total_history || '...'}}</strong>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="data-box">
            <span>本月动态</span>
            <strong>{{momentsNum.total_month || '...'}}</strong>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="data-box">
            <span>今日动态</span>
            <strong>{{momentsNum.total_today || '...'}}</strong>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="dynamicMangeCont">
      <el-divider content-position="left">动态列表</el-divider>
      
      <el-button-group style="margin-top:12px;" >
        <el-button type="primary" plain size="medium" @click="statusBtn(1)">已审核</el-button>
        <el-button type="primary" plain size="medium" @click="statusBtn(3)">待审核</el-button>
      </el-button-group>
      <my-search :holder-txt='placehover' @searchVal='getSearchVal' style="margin-left:20px; margin-top:12px;"></my-search>
      <my-datepicker @datePicker='datePickerFun'></my-datepicker>
      <div class="dynamincList-table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            v-for="(itm,index) in tableHead"
            :key="index"
            :prop="itm.prop"
            :label="itm.label"
          ></el-table-column >


          <el-table-column label="类型">
            <template slot-scope="scope">
              <span>{{scope.row.publish_type | fileType}}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态">
            <template slot-scope="scope">
                <span>{{scope.row.status | fileStatus}}</span>
            </template>
          </el-table-column>
          
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" @click="remmond(scope.row,1)">通过</el-button>
              <el-button type="text" @click="remmond(scope.row,2)">拒绝</el-button>
              <el-button type="text" @click="recommendBtn(scope.row)">推荐</el-button>
              <el-button type="text" @click="dynToView(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <my-package :page-total='total' :key='total' @handleCurrent='handleCurrentFun'></my-package>
    </div>
  </div>
</template>
<script>
import place from "../../../components/place.vue";
import search from "../../../components/search.vue";
import MyPackage from "../../../components/package.vue";
import MyDatePicker from "../../../components/datepicker.vue";
export default {
  name: "dynamicmange",
  data() {
    return {
      time: "",
      placehover:"昵称",
      tableHead: [
        { prop: "nickname", label: "昵称" },
        { prop: "cert", label: "标签" },
        { prop: "create_time", label: "发布时间" },
        { prop: "topic", label: "所属话题" },
        { prop: "describe", label: "动态描述" },
        // { prop: "publish_type", label: "类型" },
        // { prop: "status", label: "状态" }
      ],
      momentsNum:{},
      total:0,
      postData:{
        nickname:'',
        status:'',
        start_time:'',
        end_time:'',
        page_size:'',
        current_page:''
      },
      tableData:[]
    };
  },
  components: {
    "my-place": place,
    'my-search':search,
    "my-package":MyPackage,
    'my-datepicker':MyDatePicker
  },
  methods: {
    async getlist(){
      await this.$store.dispatch("dynamicModule/getMomentsList",this.postData)
      let momentsData = this.$store.state.dynamicModule.momentsData
      if(momentsData.code !=10000 ){
        this.$message.error(momentsData.msg)
        return
      }
      this.tableData = momentsData.info.result;
      this.momentsNum = momentsData.info.num;
      this.total = parseInt(momentsData.info.total)
    },
    async examine(postData){
      await this.$store.dispatch('dynamicModule/getExamine',postData)
      let data = this.$store.state.dynamicModule.momentExamine;
      if(data.code != 10000){
        this.$message.error(momentsData.msg)
        return
      }
      this.$message.success("操作成功");
      this.getlist();
    },
     async recommend(objData){
      await this.$store.dispatch("dynamicModule/getRecommend",objData);
      let data = this.$store.state.dynamicModule.momentRecommend;
      if(data.code !=10000){
        this.$message.error(data.msg);
        this.getDetails();
        return
      }
    },
    dynToView(row) {
      this.$router.push({
        path: "/dynamidetail",
        query:{
          id:row.id
        }
      });
    },
    getSearchVal(val){
        this.postData ={};
        this.postData.current_page =1;
        this.postData.page_size = 10;
        this.postData.nickname = val;
        this.getlist()
    },
    statusBtn(state){
         this.postData.status = state;
         this.getlist()
    },
    handleCurrentFun(val){
      this.postData ={};
      this.postData.current_page = val;
      this.postData.page_size = 10;
      this.getlist()
    },
    datePickerFun(time){
      this.postData ={}
      this.postData.start_time =time?time[0]:'';
      this.postData.end_time = time?time[1]:'';
      this.getlist()
    },
    remmond(row,status){
      let postData ={"id":row.id,"status":status}
      this.examine(postData)
    },
    recommendBtn(row){
      this.recommend({id:this.id})
    }
  },
  created() {
    this.getlist()
  },
  mounted() {
    //  this.$message.error('这是一条错误消息')
      // this.$message.success("操作成功");
  },
  filters: {
    
  }
};
</script>


<style lang="scss">
@import "@/style/topbox.scss";
.dynamicMange-page {
  .dynamicMangeTop,
  .dynamicMangeCont {
    padding: 3% 10px;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
  }
  .dynamicMangeTop {
  }

  .dynamicMangeCont {
    margin-top: 30px;
    .dynamincList-table {
      border: 1px #ebeef5 solid;
      border-radius: 8px;
      overflow: hidden;
      margin-top: 30px;
    }
  }
}
</style>


