<template>
  <div class="userList-page">
    <my-place :place-text='"用户管理"'></my-place>
    <div class="userList-page-top">
      <div class="top-box">
        <h2>普通用户</h2>
        <div class="top-box-left">
          <span>用户量</span>
          <br />
          <strong class="strong">{{num.total_user || "查询中..."}}</strong>
        </div>
        <div class="top-box-right">
          <span>今日新增</span>
          <br />
          <strong class="strong">{{num.today_register || "查询中..."}}</strong>
        </div>
      </div>
      
    </div>

    <div class="userlist-box">
      <el-divider content-position="left">用户列表</el-divider>
      <!-- <el-button type="primary" plain @click="viewBastUser">查看推荐用户</el-button> -->
      <el-button-group>
        <el-button type="primary" plain @click="viewBastUser(2)">全部</el-button>
        <el-button type="primary" plain @click="viewBastUser(1)">推荐用户</el-button>
        <el-button type="primary" plain @click="viewBastUser(3)">官方账号</el-button>
        <el-button type="primary" plain @click="viewBastUser(4)">冻结账号</el-button>
       
      </el-button-group>
       <mySearch style="margin-left:20px" :holder-txt='placehover' @searchVal='getSearchVal'/>
      <div class="userlist-table">
        
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            v-for="(itm,index) in tableHead"
            :key="index"
            :prop="itm.prop"
            :label="itm.label"
          ></el-table-column>
          <el-table-column  label="是否推荐">
            <template slot-scope="scope">
              {{scope.row.is_recommend | fileterYesOrNo}}
            </template>
          </el-table-column>
            <el-table-column  label="推荐顺序">
            <template slot-scope="scope">
              {{ scope.row.is_recommend ==1?scope.row.sort_recommend :'未推荐'}}
            </template>
          </el-table-column>
          <el-table-column  label="是否禁言">
            <template slot-scope="scope">
                {{scope.row.is_forbidden | fileterYesOrNo}}
            </template>
          </el-table-column>
           <el-table-column  label="官方账号">
            <template slot-scope="scope">
                {{scope.row.is_system | fileterYesOrNo}}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="240">
            <template slot-scope="scope">
              <el-button type="text" @click="toFreezeClick(scope.row)">{{scope.row.is_forbidden | forbidden}}</el-button>
              <el-button type="text" @click="toEditorClick(scope.row)">标签设置</el-button>
              <el-button type="text" @click="recommendClick(scope.row)">推荐设置</el-button>
              <el-button type="text" @click="toViewClick(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
       <myPackge v-if='total' :key='total' :pageTotal='total' @handleCurrent='handleCurrentFunc'></myPackge>
    </div>
    <!-- 弹出层 -->
    <el-dialog title="标签设置" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="设置标签">
          <!-- <el-input v-model="tag" autocomplete="off"></el-input> -->
          <el-select v-model="select" placeholder="请选择">
          <el-option
            v-for="item in cerOptions"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="cerBtn">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 弹出层 -->
    <el-dialog title="推荐设置" :visible.sync="recDialog">
      <el-form>
         <el-form-item label="是否推荐">
            <el-radio v-model="radio" label="1">推荐</el-radio>
            <el-radio v-model="radio" label="2">不推荐</el-radio>
        </el-form-item>
        <el-form-item v-show='radio==1' label="设置推荐顺序">
            <el-input v-model='recSort' type="number" placeholder="设置推荐顺序"></el-input>
            <p style="color:#999;font-size:12px">注：请输入1以上的数字，数字越小，越靠前</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="recDialog = false">取 消</el-button>
        <el-button type="primary" @click='recDialogBtn'>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import place from "../../../components/place.vue";
import mySearch from "../../../components/search.vue";
import myPackge from '../../../components/package.vue';
import { constants } from 'crypto';
import until from '../../../comm/until.js';
import { open } from 'fs';
export default {
  name: "userlist",
  data() {
    return {
      s:"123456",
      dialogFormVisible: false,
      recDialog:false,
      tag: "",
      user_id:"",
      num:{},
      radio:"2",
      cerOptions:[],
      select:"",
      placehover:"用户昵称",
      seachData:{
        page_size:10,
        current_page:1,
        nickname:'',
        user_id:"",
        is_recommend:""
      },
      recSort:1,
      tableHead: [
        { prop: "user_id", label: "用户ID" },
        { prop: "nickname", label: "昵称" },
        { prop: "create_time", label: "创建时间" },
        { prop: "publish_moments", label: "动态" },
        { prop: "cert", label: "角色标签" },
        // { prop: "is_recommend", label: "是否推荐" },
        // { prop: "is_forbidden", label: "是否禁言" }
      ],
      tableData: [],
      total:0
    };
  },
  components: {
    "my-place": place,
      mySearch,
      myPackge
  },
  methods: {
    async getUserList(obj){
      await this.$store.dispatch("userModule/getUserListAct",obj)
      let data = this.$store.state.userModule.userListData;
      this.tableData = data.info.result;
      this.num = data.info.num
      this.total = parseInt(data.info.total)
    },
    async setForbidden(){
      await this.$store.dispatch("userModule/setForbiddenAct",{user_id:this.user_id});
      let data  = this.$store.state.userModule.forbiddenData;
      if(data.info.is_forbidden == 1){
        this.$message.success("禁言成功");
      }else{
         this.$message.success("解封成功");
      }
      this.getUserList(this.seachData);
    },
    async setRecommendUser(obj){
      await this.$store.dispatch("userModule/setRecommendUserAct",obj);
      let data = this.$store.state.userModule.recommendUser;
      if(data.info.is_recommend =='1'){
        this.$message.success("设置推荐成功")
      }else if(data.info.is_recommend =='2'){
        this.$message.success("取消推荐成功")
      }
      this.recDialog = false;
      this.getUserList(this.seachData)
    },
    async getUserCertList(){
      await this.$store.dispatch("userModule/getUserCertListAct",{});
      let data = this.$store.state.userModule.userCertList;
      this.cerOptions = data.info
    },
    async setAddCerttoUser(obj){
      await this.$store.dispatch("userModule/setAddCerttoUserAct",{user_id:obj.user_id,cert:obj.cert})
      let data = this.$store.state.userModule.addCerttoUser;
      this.$message.success("设置用户标签成功");
      this.getUserList(this.seachData);
      this.dialogFormVisible = false;
     
    },
    toFreezeClick(row) {
      this.user_id = row.user_id;
      let txt=''
      if(row.is_forbidden == 1){
         txt='是否将此用户解封'
      }else {
        txt = "是否要将此用户冻结?冻结后用户将不可评论，发帖。"
      }
      // this.confirm(txt, "2");
      let _this = this;
      until.myConfirm(_this,txt ,function(val){
          // _this.isDelMoment({id:row.id});
           _this.setForbidden();
      })

    },
    toEditorClick(row) {
      this.user_id = row.user_id;
      // this.select = row.cert;
      this.dialogFormVisible = true;
    },
    recommendClick(row) {
      this.user_id = row.user_id;
      this.recDialog = true;
      this.radio = row.is_recommend;
      this.recSort = row.is_recommend ==1?row.sort_recommend :""

    },
    cerBtn(){
      this.setAddCerttoUser({user_id:this.user_id,cert:this.select})
    },
    recDialogBtn(){
       this.setRecommendUser({user_id:this.user_id,sort: this.radio==1?this.recSort:''})
    },
    addUserBtn() {
      this.$router.push({
        path: "/adduser"
      });
    },
    toViewClick(row) {
      this.$router.push({
        path: "/detailuser",
        query:{
          id:row.user_id
        }
      });
    },
    viewBastUser(type){
      this.seachData.nickname ='';
      this.seachData={};
      this.seachData.current_page=1;
      if(type ==1){
         this.seachData.is_recommend =1;
         this.seachData.is_forbidden ="";
      }else if(type ==2){
        this.seachData.is_system="";
        this.seachData.is_recommend ="";
         this.seachData.is_forbidden ="";
      }else if(type ==3){
        this.seachData.is_system =1;
         this.seachData.is_forbidden ="";
      }else if(type ==4){
         this.seachData.is_system ="";
         this.seachData.is_forbidden =1;
      }
      this.getUserList(this.seachData);
    },
    getSearchVal(val){
      this.seachData.nickname =val
      let serchData={
        nickname:val,
        current_page:1,
        page_size:10
      }
      this.getUserList(serchData)
    },
    handleCurrentFunc(val){
      this.seachData.current_page = val
      // let packageData={
      //    page_size:10,
      //    current_page:val,
      // }
      this.getUserList(this.seachData)
    }
  },
  created() {
    this.getUserList({});
    this.getUserCertList();
  },
  mounted() {},
  filters: {
    forbidden(val){
      switch(parseInt(val)){
        case 1:
          return "解封"
        case 2:
          return "冻结"
      }
    },
    recommend(val){
       switch(parseInt(val)){
        case 1:
          // return "取消推荐"
          return "推荐"
        case 2:
          return "推荐"
      }
    }
  }
};
</script>
<style lang="scss">
// @import '@/style/topbox.scss';
.userList-page-top,
.userlist-box{
   @extend %extreme;
   .el-button-group>.el-button:not(:last-child){
          margin-right: 0px;
    }
  .el-button-group .el-button--primary:first-child{
    border-right-color: #b3d8ff;
  }
  .el-button-group .el-button--primary:not(:first-child):not(:last-child){
    border-right-color: #b3d8ff;
  }
}
.top-box {
  // width: 300px;
  // overflow: hidden;
  // background: #fff;
  text-align: center;
  padding: 3% 10px;
  // border-radius: 8px;
  // overflow: hidden;

  h2 {
    color: #666;
    margin-bottom: 20px;
    font-size: 16px;
  }
  .top-box-left,
  .top-box-right {
    display: inline-block;
    vertical-align: top;
    width: 50%;
    color: #999;
    line-height: 1.8;
  }
  .strong {
    font-weight: 600;
    font-size: 30px;
    color: #333;
  }
}
// .userlist-box {
//   background-color: #fff;
//   margin-top: 20px;
//   padding: 20px;
// }
.userlist-table {
  // border-top: 1px solid #ebeef5;
  // border-left: 1px solid #ebeef5;
  // border-radius: 8px;
  // overflow: hidden;
  // margin-top: 20px;
   @extend %tableborder;
}
</style>


