<template>
  <div class="perminsList-page">
    <my-place :place-text='"权限管理"'></my-place>
    <div class="perminsListCont">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">权限设置</el-menu-item>
        <el-menu-item index="2">管理员设置</el-menu-item>

      </el-menu>
      <component :is='comp'></component>
    </div>
  </div>
</template>
<script>
import place from "../../../components/place.vue";
import adminComp from './admin.vue'
import permisComp from './permisSet.vue'
export default {
  name: "promis",
  data() {
    return {
      activeIndex: "1",
      btnText: "添加权限",
      dialogVisibleAdmin: false,
      comp:"permisComp",
    };
  },
  components: {
    "my-place": place,
    permisComp,
    adminComp
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key;
      this.comp = key==1?"permisComp":"adminComp"
    }
  },
  created() {},
  mounted() {},
  filters: {}
};
</script>
<style lang="scss">
.perminsListCont {
  // background-color: #fff;
  // border-radius: 8px;
  // overflow: hidden;
  // padding: 20px;
   @extend %extreme;
  .mt20 {
    margin-top: 30px;
  }
  .el-menu-item {
    margin-right: 20px;
  }
  .perminsList-box {
    border: solid 1px #e6e6e6;
    border-radius: 8px;
    overflow: hidden;
  }
}
</style>


