<template>
  <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :router="true">
    <el-menu-item v-for="(itm,index) in navList" :index="itm.url" :key="index">{{itm.text}}</el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: "mynav",
  data() {
    return {
      navList: [
        {
          url: "/user",
          text: "用户管理"
        },
        {
          url: "/tag",
          text: "标签管理"
        },
        {
          url: "/dynamic",
          text: "动态管理"
        },
        {
          url: "/topic",
          text: "话题管理"
        },
        {
          url: "/column",
          text: "专栏管理"
        },
        {
          url: "/article",
          text: "文章管理"
        },
        {
          url: "/banner",
          text: "广告位管理"
        },
        {
          url: "/permis",
          text: "权限管理"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.el-menu {
  border: none;
  a {
    color: #333;
    text-decoration: none;
  }
  .is-active {
    background-color: #fffae9;
    color: #4a4a4a;
    font-weight: 600;
    border-left: 3px solid #ffc000;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>


