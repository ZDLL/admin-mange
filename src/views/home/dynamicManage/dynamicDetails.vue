<template>
  <div class="dynamicDetails-page">
    <my-place :place-text='"动态详情"'></my-place>
    <div class="dynaCont">
      <div v-if='detail.info' class="dynaCont-top">
        <el-row>
          <el-col :span="8">
            <div>
              <span class="dynaPhoto">
                <img v-if='detail.info.head_portrait' :src ='detail.info.head_portrait' alt="头像" />
              </span>
              <div class="dynaContP">
                <span>{{detail.info.nickname||"--"}}</span>
                <!-- <el-tag size="small">标签一</el-tag> -->
                <p>
                  是否推荐：
                  <span class="color33"> {{detail.info.is_recommend | fileterIsRecommend}}</span>
                </p>
              </div>
            
            </div>
          </el-col>
          <el-col :span="6" class="dynaText">
            <p>
              类型：
              <span class="color33">{{detail.info.publish_type | fileType}}</span>
            </p>
            <p>
              状态：
              <span class="color33">{{detail.info.status | fileStatus}}</span>
            </p>
          </el-col>
          <el-col :span="8" class="dynaText">
            <div>
              <p>
                所属话题：
                <span class="color33">{{detail.info.topic}}</span>
              </p>
              <p>
                发布时间：
                <span class="color33">{{detail.info.create_time}}</span>
              </p>
            </div>
          </el-col>
          <el-col :span="2">
            <div style="text-align: center;margin-top: 10px;">
              <!-- <el-button type="primary" size="small" plain @click="recommendBtn">推荐</el-button> -->
              <el-button style="margin-left:0px;margin-top:10px;" plain size="small" @click="deleteBtn">删除</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <div class="dynDescribe dynaText">
            动态描述：
            <span class="color33">{{detail.info.content}}</span>
          </div>
        </el-row>
      </div>
    </div>

    <div class="imgGather">
      <el-divider content-position="left">图片集</el-divider>
      <div v-if='detail.info' class="imgLists">
        <viewer>
          <ul>
            <li class="imgList-li" v-for="(itm,index) in detail.info.picture" :key="index">
              <span class="viewerImg">
                <img :src="itm.url" />
              </span>
              <span class="tag-span" v-for='(itmc,idx) in itm.label' :key='idx'>
                <el-tag size="small">{{itmc.content}}</el-tag>
              </span>
            </li>
          </ul>
        </viewer>
      </div>
    </div>
  </div>
</template>
<script>
import place from "../../../components/place.vue";
import { setTimeout } from 'timers';
export default {
  name: "dynamicdetails",
  data() {
    return {
      id:"",
      detail:{},
    };
  },
  components: {
    "my-place": place
  },
  methods: {
    async getDetails(){
      await this.$store.dispatch("dynamicModule/getMomentsDetail",{id:this.id})
      let data = this.$store.state.dynamicModule.momentsDetail
      if(data.code != 10000){
        this.$message.error(data.msg)
        return
      }
      this.detail = data
    },
    async recommend(){
      await this.$store.dispatch("dynamicModule/getRecommend",{id:this.id});
      let data = this.$store.state.dynamicModule.momentRecommend;
      if(data.code !=10000){
        this.$message.error(data.msg);
        this.getDetails();
        return
      }
      // this.detail.info.is_recommend= data.info.is_recommend
      // this.$message.success("推荐至首页成功")
      // setTimeout(()=>{
      //   this.$router.push({
      //     path:"/dynamic"
      //   })
      // },1000)
    },
    async isDelMoment(){
      this.$store.dispatch("dynamicModule/delmoment",{id:this.id});
      let data = this.$store.state.dynamicModule.delmoment;
      if(data!=10000){
        this.$message.error(data.msg);
        return
      }
      this.$message.success("删除成功，一秒后到动态列表");
      setTimeout(()=>{
        this.$router.push({
          path:"/dynamic"
        })
      },1000)
     
    },
    recommendBtn(){
      this.recommend()
    },
    deleteBtn(){
      this.isDelMoment()
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.getDetails()
  },
  mounted() {
    //  this.$message.error('这是一条错误消息')
    //   this.$message.success("操作成功");
  },
  filters: {}
};
</script>
<style lang="scss">
.dynamicDetails-page {
  .color33 {
    color: #333;
  }
  .dynaCont {
    padding: 20px;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
    margin-top: 30px;
    .dynaPhoto {
      display: inline-block;
      vertical-align: top;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px #eee solid;
      text-align: center;
      float: left;
      clear: both;
      margin-right: 15px;
      // line-height: 100px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .dynaContP {
      margin-top: 10px;
      line-height: 3;
      float: left;
      & > span {
        display: block;
        margin-bottom: 10px;
      }
    }
    .dynaText {
      margin-top: 10px;
      line-height: 3;
      color: #666;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .dynDescribe {
      margin-top: 30px;
      margin-left: 15px;
      line-height: 1.5;
    }
  }
  .imgGather {
    padding: 20px;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
    margin-top: 25px;
    .imgLists {
      margin-top: 20px;
    }
    .imgList-li {
      display: inline-block;
      vertical-align: top;
      width: 310px;
      margin-right: 2%;
      box-sizing: border-box;
      max-height: 144px;
      padding: 10px;
      .el-tag {
        margin: 5px;
      }
    }
    .tag-span {
      display: inline-block;
      width: 130px;
    }
    .viewerImg {
      width: 120px;
      height: 120px;
      display: inline-block;
      vertical-align: top;
      border: 1px #dcdcdc solid;
      border-radius: 4px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

