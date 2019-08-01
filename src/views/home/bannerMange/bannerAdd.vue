<template>
  <div class="addbanner">
    <myPlace :place-text='"添加广告位"'></myPlace>
    <div class="addbanner-cont">
      <div class="addBanner-warp">
        <span class="avatar-uploader" @click='uploadClick'>
          <i class="el-icon-plus avatar-uploader-icon"></i>
          <img v-if="postData.picture" :src="postData.picture" alt="头像" />
        </span>
        <myPload @getFile="fileUrlFun"></myPload>

        <el-row class="mt20 add-banner-inp">
          <el-col class="add-banner-left" :span="3">显示或隐藏：</el-col>
          <el-col :span="10">
            <el-radio v-model="postData.display" label="1">显示</el-radio>
            <el-radio v-model="postData.display" label="2">隐藏</el-radio>
          </el-col>
        </el-row>
        <el-row class="mt20 add-banner-inp">
          <el-col class="add-banner-left" :span="3">选择类型：</el-col>
          <el-col :span="10">
            <el-select v-model="postData.type" placeholder="请选择">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row class="mt20 add-banner-inp">
          <el-col class="add-banner-left" :span="3">广告名称：</el-col>
          <el-col :span="10">
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="postData.name"
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-col>
        </el-row>
        <el-row class="mt20 add-banner-inp">
          <el-col class="add-banner-left" :span="3">链接网址：</el-col>
          <el-col :span="10">
            <el-input type="text" placeholder="请输入内容" v-model="postData.redirect_url" clearable></el-input>
          </el-col>
        </el-row>
        <el-button class="mt20 addbannerBtn" type="primary" @click="addBannerOkClick">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import myPload from "../../../components/upload";
import myPlace from "../../../components/place.vue";
export default {
  name: "banneradd",
  data() {
    return {
        bannerTxt:"",
      options: [
        {
          id: "1",
          name: "发现"
        },
        {
          id: "2",
          name: "文章"
        }
      ],
      bannerId: "",
      postData: {
        name: "",
        picture: "",
        display: "",
        type: "",
        mode: "1",
        redirect_url: ""
      }
    };
  },
  components: {
    myPload,
    myPlace
  },
  methods: {
    async getBannerDetail(objData) {
      await this.$store.dispatch("bannerModule/getBannerDetaildAct", objData);
      let data = this.$store.state.bannerModule.bannerDetailData;
      this.postData = data.info;
      this.postData.mode = "1";
      this.postData.picture = data.info.picture_url || "";
    },
    async editorBanner(objData) {
      await this.$store.dispatch("bannerModule/setEditorBannerAct", objData);
      let data = this.$store.state.bannerModule.bannerEditData;
      this.$message.success("编辑广告位成功");
      this.$router.push({
        path: "/banner"
      });
    },
    async setAddBanner(objData) {
      await this.$store.dispatch("bannerModule/setAddBannerAct", objData);
      let data = this.$store.state.bannerModule.addBannerData;
      this.$message.success("添加广告位成功");
      this.$router.push({
        path: "/banner"
      });
    },
    addBannerOkClick() {
      if (this.bannerId) {
        this.postData.id = this.bannerId;
        this.editorBanner(this.postData);
      } else {
        this.setAddBanner(this.postData);
      }
    },
    uploadClick(){
         document.querySelector("#uploader").click();
    },
    fileUrlFun(url){
        this.postData.picture=url;
    }
  },
  created() {
    this.bannerId = this.$route.query.id || "";
    if (this.bannerId) {
      this.getBannerDetail({ id: this.bannerId });
    }
  }
};
</script>
<style lang="scss">
@import "@/style/avatar-uploader.scss";
.addbanner-cont {
  padding: 20px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  .avatar-uploader {
    width: 320px;
  }
  .mt20 {
    margin-top: 30px;
  }
  .addbannerBtn {
    margin-left: 13%;
    width: 120px;
  }
  .addBanner-warp {
    max-width: 1000px;
    margin-left: 30px;
    // min-height: px;
    // margin: 0 auto;
  }
}
</style>

