<template>
  <div class="userDetails-page">
    <my-place :place-text='"用户详情"'></my-place>

    <div class="userInfo">
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
          <p>昵称：{{userDetail.nickname}}</p>
          <p>性别：{{userDetail.gender}}</p>
          <p>生日：{{userDetail.birthday}}</p>
        </div>
      </el-col>

      <el-col :span="5">
        <div class="userInfoBox">
          <p>签名：{{userDetail.personal_sign}}</p>
          <p>标签：{{userDetail.cert}}</p>
          <p>所在地：{{userDetail.area}}</p>
        </div>
      </el-col>
       <el-col :span="5">
        <div class="userInfoBox">
          <p>是否推荐：{{userDetail.is_recommend | fileterYesOrNo}}</p>
          <p>推荐顺序：{{userDetail.sort_recommend}}</p>
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
    </div>
    <div class="userDetailsCont">
      <el-divider content-position="left">发布列表</el-divider>
      <div class="release_table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            v-for="(itm,index) in tableHead"
            :key="index"
            :prop="itm.prop"
            :label="itm.label"
          ></el-table-column>

          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <!-- <el-button type="text" @click="toFreezeClick(scope.row)" >冻结</el-button>
              <el-button type="text" @click="toEditorClick(scope.row)">编辑</el-button>-->
              <el-button type="text" @click='toDeleteClick(scope.row)'>删除</el-button>
              <el-button type="text" @click='toDeleteClick(scope.row)'>查看</el-button>
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
export default {
  name: "userdetails",
  data() {
    return {
      user_id:"",
      userDetail:{},
      size:"",
      tableHead: [
        { prop: "create_time", label: "日期" },
        { prop: "nickname", label: "昵称" },
        { prop: "cert", label: "角色标签" },
        { prop: "topic", label: "专题" },
        { prop: "status", label: "状态" },
        { prop: "publish_type", label: "类型" }
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
    toViewClick(row) {},
    toDeleteClick(row) {
       this.$router.push({
        path: "/dynamidetail",
        query:{
          id:row.id
        }
      });
    },
    handleCurrentFunc(val){
      this.getDnylist({user_id:this.user_id,page_size:10,current_page:val})
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
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    // min-height: 650px;
    .el-divider__text {
      font-size: 16px;
    }
    .release_table {
      margin-top: 40px;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #ebeef5;
      .el-table--border {
        border: none;
      }
    }
  }
  .userInfo {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
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
  }
}
</style>
