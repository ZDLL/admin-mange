<template>
  <input style="display:none" type="file" @change="inputFile" ref="contentUpload" id="uploader" />
</template>
<script>
import { constants } from 'crypto';
export default {
  name: "myupload",
  data() {
    return {
      file: ""
    };
  },
  props: {},
  methods: {
   async inputFile() {
      let inputDom = this.$refs.contentUpload;
      let file = inputDom.files[0];//获取到inpt 中的file 文件
      const isJPG = file.type === "image/jpeg/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error("请上传正确格式的图片如(jpeg,png)");
      // }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      let formData = new FormData();
      formData.append("file",file)
      await this.$store.dispatch("comModule/getUploadAct",formData)
      let data = this.$store.state.comModule.url;
      this.$emit("getFile", data);
    }
  },
  components: {},
  created() {},
  mounted() {}
};
</script>

