<template>
  <el-menu v-if='navList'  :default-active='$route.path | navActive' class="el-menu-vertical-demo" :router="true">
    <el-menu-item v-for="(itm,index) in navList" :index="itm.url" :key="index">
      {{itm.text}}
      <el-badge v-if='itm.badge' is-dot class="item"></el-badge>
    </el-menu-item>
  </el-menu>
</template>
<script>
import { constants } from 'crypto';
import { sidebarConfig } from '../config/objConfig.js';
export default {
  name: "mynav",
  data() {
    return {
      navList:[],
      dymBadge:false
    };
  },
  filters:{
    navActive(val){
      let newRou = val.replace("/","")
      for(let i =0;i<sidebarConfig.length;i++){
        if(newRou.indexOf(sidebarConfig[i].url.replace("/",""))>-1){
          return sidebarConfig[i].url
        }
      }
    }
  },
  methods:{
      async getlist(callback){
        await this.$store.dispatch("dynamicModule/getMomentsList",{status:3})
        let momentsData = this.$store.state.dynamicModule.momentsData
        if(momentsData.info.result.length>0){
          callback(true)
        }else{
          callback(false)
        }
      },
    rewriteNav(){
      let _this = this;
      for(let i=0;i<sidebarConfig.length;i++){
          sidebarConfig[i].badge = false;
        if(sidebarConfig[i].url.indexOf('dynamic')>-1){
          _this.getlist(function(data){
              sidebarConfig[i].badge = data;
          });
        }
      }
      this.navList = sidebarConfig
    }
  },
  created(){
    this.rewriteNav();
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
  .el-menu-item, .el-submenu__title{
    height: 50px;
    line-height: 50px;
  }
}
</style>


