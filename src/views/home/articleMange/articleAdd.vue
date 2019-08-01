<template>
  <div class="arcticle-page">
    <my-place :place-text="tit"></my-place>
    <div class="article-cont">
      <div class="avatar">
        上传封面:
        <span class="avatar-uploader left10" @click="avatarUpload">
          <i class="el-icon-plus avatar-uploader-icon"></i>
          <img v-if="postData.picture" :src="postData.picture" alt="头像" />
          <!-- <el-image v-if="imageUrl" :src="imageUrl" lazy></el-image> -->
        </span>
        <my-upload @getFile="fileUrlFun"></my-upload>
      </div>
      <div class="mgt20">
        标题:
        <el-input class="with40 left10" v-model="postData.title" placeholder="请输入标题"></el-input>
      </div>
      <div class="mgt20">
        作者:
        <el-input class="with40 left10" v-model="postData.author" placeholder="请输入作者"></el-input>
      </div>
      <div class="mgt20">
        所属专栏:
        <el-select class="left10" v-model="postData.category" placeholder="请选择">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <!-- <div class='mgt20'>
          文章类型:
        <el-select class='left10' v-model="value" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
      </div>-->
      <div class="mgt20">
        是否投放到每日精选:
        <span class="left10">
          <el-radio v-model="postData.is_select" label="1">是</el-radio>
          <el-radio v-model="postData.is_select" label="2">否</el-radio>
        </span>
      </div>
      <!-- <div style="margin-top:30px">
         <el-button-group>
            <el-button type="primary" plain>文字</el-button>
            <el-button type="primary" plain>图片</el-button>
            <el-button type="primary" plain>视频</el-button>
        </el-button-group>
      </div>-->
      <div v-if="hasQuill" style="margin-top:30px">
        <my-quillEditor v-if="quillCont" :parentEditorCont="quillCont" @quillEditorFun="getcont"></my-quillEditor>
      </div>
      <div v-else style="margin-top:30px">
        <my-quillEditor :parentEditorCont='""' @quillEditorFun="getcont"></my-quillEditor>
      </div>

      <el-button style="width:120px;margin-top:30px" @click="articleSure" type="primary">确认</el-button>
    </div>
  </div>
</template>
<script>
import place from "../../../components/place.vue";
import upload from "../../../components/upload.vue";
import quillEditor from "../../../components/quillEditor.vue";
import { constants } from "crypto";
import { setTimeout } from 'timers';
export default {
  name: "addarticle",
  data() {
    return {
      tit: "添加文章",
      quillCont: "",
      id: "",
      hasQuill: false,
      options: [],
      postData: {
        author: "",
        category: "",
        title: "",
        picture: "",
        // content_picture:"",
        content: "",
        is_select: "2"
      }
    };
  },
  components: {
    "my-place": place,
    "my-upload": upload,
    "my-quillEditor": quillEditor
  },
  computed: {},
  methods: {
    async cloumListFunc() {
      await this.$store.dispatch("colunModule/getCategoryListAct", {});
      let data = this.$store.state.colunModule.categoryList;
      if (data.code == 10000) {
        this.options = data.info.result;
      }
    },
    async addArticle() {
      await this.$store.dispatch("articleModule/arcticleAddAct", this.postData);
      let data = this.$store.state.articleModule.arcticleAdd;
      if (data.code == 10000) {
        this.$message.success("添加成功");
        this.$router.push({
          path: "/article"
        });
      }
    },
    async editorArticle() {
       this.postData.id= this.id;
      await this.$store.dispatch(
        "articleModule/editArcticleAct",
        this.postData
      );
      let data = this.$store.state.articleModule.arcticleEditor;
      if(data.code == 10000){
        this.$message.success("修改成功返回到列表页面")
        setTimeout(()=>{
           this.$router.push({
            path:"/article"
          })
        },1000)
      }else {
        this.$message.error(data.msg)
      }
      // this.postData = data.info;
    },
    async detaclieArticle() {
      await this.$store.dispatch("articleModule/detaileArcticleAct", {
        id: this.id
      });
      let data = this.$store.state.articleModule.arcticleDetaile;
      this.quillCont = data.info.content;
      this.postData = {
        author: data.info.user_id,
        category: data.info.category,
        title: data.info.title,
        picture: data.info.picture,
        content: data.info.content,
        is_select: data.info.is_recommend
      };
    },
    avatarUpload() {
      document.querySelector("#uploader").click();
    },
    fileUrlFun(url) {
      this.postData.picture = url;
    },
    getcont(cont) {
      this.postData.content = cont;
    },
    articleSure() {
      if (this.id) {
        this.editorArticle();
      } else {
        if (!this.postData.picture) {
          this.$message.error("请上传封面");
        }
        this.addArticle();
      }
    }
  },
  created() {
    this.cloumListFunc();
    this.id = this.$route.query.id;
    // console.log(this.id);
    if (this.id) {
      this.detaclieArticle();
      this.hasQuill = true;
    }
  },
  mounted() {},
  fliters: {}
};
</script>
<style lang="scss">
@import "@/style/avatar-uploader.scss";
.arcticle-page {
  .with40 {
    width: 40%;
  }
  .mgt20 {
    margin-top: 30px;
  }
  .left10 {
    left: 10px;
  }
  .article-cont {
    padding: 20px;
    border-radius: 8px;
    background-color: #fff;
    overflow: hidden;
    .avatar {
      .avatar-uploader {
      }
    }
    .avatar-uploader {
      width: 300px;
    }
  }
}
</style>


