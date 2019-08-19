<template>
  <div class="userDetails-page">
    <my-place :place-text='"用户详情"'></my-place>

    <div class="userInfo">
      <el-row>
        <el-col :span="3">
          <span class="userAvatar">
            <img :src="userDetail.head_portrait" alt="头像" />
          </span>
        </el-col>

        <el-col :span="5">
          <div class="userInfoBox">
            <!-- <el-tooltip class="item" effect="dark" content="" placement="top-start">
              <p>昵称：{{userDetail.nickname}}</p>
            </el-tooltip> -->
            <p>昵称：{{userDetail.nickname || '--'}}</p>
            <p>性别：{{userDetail.gender==1?"男":'女' || '--'}}</p>
            <p>生日：{{userDetail.birthday || '--'}}</p>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="userInfoBox">
            <p>签名：{{userDetail.personal_sign || '--'}}</p>
            <p>标签：{{userDetail.cert || '--'}}</p>
            <p>所在地：{{userDetail.area || '--'}}</p>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="userInfoBox">
            <p>是否推荐：{{userDetail.is_recommend | fileterYesOrNo}}</p>
            <p>推荐顺序：{{userDetail.is_recommend == 1? userDetail.sort_recommend || "--" :'未推荐'}}</p>
            <p>是否禁言：{{userDetail.is_forbidden | fileterYesOrNo}}</p>
          </div>
        </el-col>

        <el-col :span="2">
          <div class="userInfo-right" style="text-align: center;">
            <h2>动态数</h2>
            <h3>{{userDetail.publish_moments}}</h3>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="userInfo-right" style="text-align: center;">
            <h2>粉丝数</h2>
            <h3>{{userDetail.fans_num}}</h3>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="userInfo-right" style="text-align: center;">
            <h2>专题数</h2>
            <h3>{{userDetail.publish_subject}}</h3>
          </div>
        </el-col>
     </el-row>
      <div class='official'><el-button type="primary" plain size="medium" @click="systemUserClick">{{userDetail.is_system==1?"取消官方账号":"设置官方账号"}}</el-button></div>
    </div>
    <div class="userDetailsCont">
      <el-divider content-position="left">动态列表</el-divider>
      <div class="release_table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            v-for="(itm,index) in tableHead"
            :key="index"
            :prop="itm.prop"
            :label="itm.label"
          ></el-table-column>

           <!-- <el-table-column label="状态">
             <template slot-scope="scope">
               {{scope.row.status | fileStatus}}
             </template>
           </el-table-column> -->
            <el-table-column label="类型">
             <template slot-scope="scope">
               {{scope.row.publish_type | fileType}}
             </template>
           </el-table-column>


          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <!-- <el-button type="text" @click="toFreezeClick(scope.row)" >冻结</el-button>
              <el-button type="text" @click="toEditorClick(scope.row)">编辑</el-button>-->
              <el-button type="text" @click='toDeleteClick(scope.row)'>删除</el-button>
              <el-button type="text" @click='toViewClick(scope.row)'>查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <myPackge v-if='total' :key='total' :pageTotal='total' @handleCurrent='handleCurrentFunc'></myPackge>
    </div>
  </div>
</template>
<script>
import place from "../../../components/place.vue";
import myPackge from '../../../components/package.vue';
import until from '../../../comm/until.js';
import { setTimeout } from 'timers';
export default {
  name: "userdetails",
  data() {
    return {
      user_id:"",
      userDetail:{},
      size:"",
      tableHead: [
         { prop: "id", label: "动态ID" },
        { prop: "create_time", label: "日期" },
        { prop: "nickname", label: "昵称" },
        { prop: "cert", label: "角色标签" },
        { prop: "topic", label: "专题" },
       
        // { prop: "publish_type", label: "类型" }
      ],
      tableData: [],
      total:0
    };
  },
  components: {
    "my-place": place,
     myPackge
  },
  methods: {
     async getUserList(){
      await this.$store.dispatch("userModule/getUserListAct",{user_id:this.user_id})
      let data = this.$store.state.userModule.userListData;
      this.userDetail =  data.info.result[0];
     
    },
    async getDnylist(objData){
      await this.$store.dispatch("dynamicModule/getMomentsList",objData)
      let momentsData = this.$store.state.dynamicModule.momentsData
      if(momentsData.code !=10000 ){
        this.$message.error(momentsData.msg)
        return
      }
      this.tableData = momentsData.info.result;
      this.total= parseInt(momentsData.info.total)
      // this.momentsNum = momentsData.info.num;
      // this.total = parseInt(momentsData.info.total)
    },
    async isDelMoment(postData){
      this.$store.dispatch("dynamicModule/delmoment",postData);
      let data = this.$store.state.dynamicModule.delmoment;
      this.$message.success("删除成功");
      this.getDnylist({user_id:this.user_id})
    },
    async addSystemUser(){
      await this.$store.dispatch("userModule/addSystemUserAct",{user_id:this.user_id})
      let data = this.$store.state.userModule.systemUser;
      this.$message.success("设置成官方账号成功");
      this.getUserList();
    },
    toViewClick(row) {
       this.$router.push({
        path: "/dynamicdetail",
        query:{
          id:row.id
        }
      });
    },
    toDeleteClick(row) {
      let _this = this;
      until.myConfirm(_this, `是否删除该权限组？`,function(val){
            _this.isDelMoment({id:row.id});
      })
      // this.confirm("是否删除该动态",row.id)
    },
    handleCurrentFunc(val){
      this.getDnylist({user_id:this.user_id,page_size:10,current_page:val})
    },
    systemUserClick(){
       let _this = this;
        until.myConfirm(_this, `是否进行${_this.userDetail.is_system==1?"取消官方账号":"设置官方账号"}的操作？`,function(val){
              _this.addSystemUser()
        })
      
    }
  },
  created() {
    this.user_id = this.$route.query.id
    this.getUserList();
    this.getDnylist({user_id:this.user_id});
  },
  mounted() {},
  filters: {}
};
</script>
<style lang="scss">
.userDetails-page {
  .mt20 {
    margin-top: 20px;
  }
  .userDetailsCont {
    // padding: 20px;
    // background-color: #fff;
    // border-radius: 8px;
    // overflow: hidden;
    // // min-height: 650px;
     @extend %extreme;
    .el-divider__text {
      font-size: 16px;
    }
    .release_table {
      // margin-top: 40px;
      // border-radius: 8px;
      // overflow: hidden;
      // border: 1px solid #ebeef5;
       @extend %tableborder;
      .el-table--border {
        border: none;
      }
    }
  }
  .userInfo {
    // background-color: #fff;
    // padding: 20px;
    // border-radius: 8px;
    // overflow: hidden;
    // margin-bottom: 20px;
      @extend %extreme;
    .userAvatar {
      width: 100px;
      height: 100px;
      display: inline-block;
      vertical-align: top;
      border-radius: 50%;
      border: 1px solid #d9d9d9;
      text-align: center;
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .userInfoBox {
      line-height: 2;
      margin-top: 10px;
      padding: 0 10px;
      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .userInfo-right {
      font-size: 16px;
      color: #666;
      margin-top: 10px;
      h3 {
        margin-top: 20px;
        font-size: 30px;
        color: #333;
      }
    }
    .official{
      margin-top: 20px;
    }
  }
}
</style>
