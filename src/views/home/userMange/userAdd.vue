<template>
  <div class="addUser">
    <my-place :place-text='"添加用户"'></my-place>
    <div class="addUserCont">
      <div class="addPhoto">
        <p>上传用户头像 :</p>
        <span class="avatar-uploader" @click="beforeAvatarUpload">
          <i class="el-icon-plus avatar-uploader-icon"></i>
          <img v-if="imageUrl" :src="imageUrl" alt="头像" />
        </span>
        <my-upload @getFile="fileUrlFun"></my-upload>
      </div>
      <div class="mt20">
        用户昵称 :
        <el-input v-model="inptText.name" class="wid40 mgl10" type="text" placeholder="用户昵称"></el-input>
      </div>
      <div class="mt20">
        用户标签 :
        <el-input v-model="inptText.tag" class="wid40 mgl10" type="text" placeholder="用户标签"></el-input>
      </div>
      <div class="mt20">
        登录账号 :
        <el-input
          v-model="inptText.userCont"
          class="wid40 mgl10"
          maxlength="11"
          show-word-limit
          placeholder="登录账号"
        ></el-input>
      </div>
      <div class="mt20">
        是否推荐 :
        <div class="wid40 inlineBlock mgl10">
          <el-radio v-model="inptText.best" label="1" @change="bestChange">推荐</el-radio>
          <el-radio v-model="inptText.best" label="2" @change="bestChange">不推荐</el-radio>
        </div>
      </div>
      <div class="mt20">
        推荐顺序:
        <el-input class="wid40 mgl10" v-model="inptText.order" type="text" placeholder="推荐顺序"></el-input>
        <span style="margin-left:10px;font-size:14px;color:#999;">注：推荐顺序为大于0的数字，越小排位越高</span>
      </div>

      <el-row class="mt20">
        <el-button style="width:200px;margin-top:10px;margin-left: 90px;" type="primary">确认添加</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
import place from "../../../components/place.vue";
import upload from "../../../components/upload";
import { constants } from "crypto";
export default {
  name: "adduser",
  data() {
    return {
      imageUrl: "",
      inptText: {
        name: "",
        tag: "",
        userCont: "",
        order: 1,
        best: "2"
      }
    };
  },
  components: {
    "my-upload": upload,
    "my-place": place
  },
  methods: {
    beforeAvatarUpload() {
      document.querySelector("#uploader").click();
    },
    fileUrlFun(file) {
      let windowURL = window.URL || window.webkitURL;
      this.imageUrl = windowURL.createObjectURL(file);
    },
    bestChange(val) {
      this.inptText.best = val;
    }
  },
  created() {},
  mounted() {},
  filters: {}
};
</script>
<style lang="scss">
@import '@/style/avatar-uploader.scss';
.addUserCont {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  overflow: hidden;
  min-height: 650px;
}
.wid40 {
  width: 40%;
}
.mt20 {
  margin-top: 30px;
}
.inlineBlock {
  display: inline-block;
}
.addPhoto {
  color: #666;
  margin-left: 90px;
  p {
    margin-bottom: 20px;
  }
}
.mgl10 {
  margin-left: 10px;
}
</style>

