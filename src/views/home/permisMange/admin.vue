<template>
  <div class="admin-page">
    <el-button class="mt20" type="primary" @click="addAdminClick">添加管理员</el-button>
    <div class="perminsList-box mt20">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          v-for="(itm,index) in tableHeadAdmin"
          :key="index"
          :prop="itm.prop"
          :label="itm.label"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="240">
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="toEditorClick(scope.row)">编辑</el-button> -->
            <el-button type="text" @click="changePwdClick(scope.row)">修改密码</el-button>
            <el-button type="text" @click="toDeleteClick(scope.row)">删除</el-button>
            <el-button type="text" @click="toEditorClick(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
        
    </div>
    <myPackge v-if='total' :key='total' :pageTotal='total' @handleCurrent='handleCurrentFunc'></myPackge>
    <el-dialog :title='typeTxt' :visible.sync="dialogAdmin" width="50%">
      <div class>
        <el-row>
          <span><span class='my-span-notice'>*</span>用 户 名 ：</span>
          <span class="input-span">
            <el-input placeholder="请输入用户名" v-model="postData.username" clearable></el-input>
          </span>
        </el-row>
        <el-row v-show='type=="add"'>
          <span><span class='my-span-notice'>*</span>登录密码：</span>
          <span class="input-span">
            <el-input placeholder="请输入密码" v-model="postData.password" show-password></el-input>
          </span>
        </el-row>
        <el-row>
          <span><span class='my-span-notice'>*</span>真实姓名：</span>
          <span class="input-span">
            <el-input placeholder="请输入真实姓名" v-model="postData.real_name" clearable></el-input>
          </span>
        </el-row>

        <el-row>
          <span><span class='my-span-notice'>*</span>手 机 号 ：</span>
          <span class="input-span">
            <el-input placeholder="请输入手机号" type='number' v-model="postData.phone" clearable></el-input>
          </span>
        </el-row>
        <el-row>
          <span><span class='my-span-notice'>*</span>选择权限组：</span>
          <span class="input-span">
            <el-select v-model="postData.permission_group" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.group_name"
              :value="item.id">
            </el-option>
          </el-select>
          </span>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAdmin = false">取 消</el-button>
        <el-button type="primary" @click='addAdminBtn'>确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改密码" :visible.sync="changePwd" width="50%">
      <div class>
        <el-row>
          <span class="input-span">
            <el-input placeholder="请输入新密码" v-model="changePwdTxt" show-password></el-input>
          </span>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changePwd = false">取 消</el-button>
        <el-button type="primary" @click='changePwdBtn'>确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { truncate } from 'fs';
import myPackge from '../../../components/package.vue';
import until from '../../../comm/until.js';
export default {
  name: "admin",
  data() {
    return {
      dialogAdmin: false,
      changePwd:false,
      changePwdTxt:"",
      adminId:"",
      type:"add",
      postData: {
        username: "",
        password: "",
        real_name: "",
        phone: "",
        permission_group: ""
      },
      options:[],
      role:"",
      total:0,
      tableHeadAdmin: [
        { prop: "user_id", label: "管理员ID" },
        { prop: "create_time", label: "添加时间" },
        { prop: "username", label: "用户名" },
        { prop: "phone", label: "电话" },
        { prop: "real_name", label: "真实姓名" },
        { prop: "permission_group", label: "所属管理组" },
        { prop: "last_login_time", label: "最后登录时间" }
      ],
      tableData: []
    };
  },
  components:{
    myPackge
  },
  methods: {
     async getGropList() {
      await this.$store.dispatch("permisModule/getGropListAct", {});
      let data = this.$store.state.permisModule.getGropListData;
      this.options = data.info
    },
    async getAdminList(objData) {
      await this.$store.dispatch("permisModule/getAdminListAct", objData);
      let data = this.$store.state.permisModule.adminListData;
      this.tableData = data.info.result
      this.total =parseInt(data.info.total)
    },
    async setAddAdmin(postData) {
      await this.$store.dispatch("permisModule/getAddadminAct", postData);
      let data = this.$store.state.permisModule.AddadminData;
      this.$message.success("添加管理员成功");
      this.getAdminList({});
       this.dialogAdmin = false;
    },
    async editPasswor(postData) {
      await this.$store.dispatch("permisModule/editPasswordAct", postData);
      let data = this.$store.state.permisModule.editPassword;
      this.$message.success("密码修改成功");
      this.getAdminList({});
       this.changePwd = false;
    },
    async delAdmin(postData) {
      await this.$store.dispatch("permisModule/delAdminAct", postData);
      let data = this.$store.state.permisModule.delAdminData;
      this.$message.success("删除该管理员成功");
      this.getAdminList({});
    },
    async getAdmindetail(postData){
       await this.$store.dispatch("permisModule/adminGetdetailArt", postData);
       let data = this.$store.state.permisModule.adminGetdetail;
       this.postData = data.info;
       this.dialogAdmin =true;
    },
    async editorAdmin(postData){
       await this.$store.dispatch("permisModule/editoperatorArt", postData);
       let data = this.$store.state.permisModule.editoperator;
      //  this.postData = data.info;
       this.$message.success("编辑权限成功")
       this.dialogAdmin =false;
       this.getAdminList();
    },
    changePwdClick(row) {
      this.adminId =row.user_id;
      this.changePwd = true;
    },
    changePwdBtn(){
      this.editPasswor({user_id:this.adminId,password:this.changePwd})
    },
    toDeleteClick(row) {
        let _this = this;
        until.myConfirm(_this, `是否删除该管理员？`,function(val){
             _this.delAdmin({user_id:row.user_id})
        })
      // this.confirm("是否删除该管理员？",row.user_id)
    },
    toEditorClick(row){
      this.type = 'editor'
      this.adminId = row.user_id;
      this.getAdmindetail({user_id:row.user_id});
    },
    addAdminClick() {
      this.adminId ="";
      this.type= 'add'
      this.postData= {
        username: "",
        password: "",
        real_name: "",
        phone: "",
        permission_group: ""
      };
      this.dialogAdmin = true;
    },
    addAdminBtn(){
      if(!this.postData.username){
        this.$message.warning("请填写用户名");
        return;
      }
      if(!this.postData.password && this.type=='add'){
        this.$message.warning("请填写登录密码");
        return;
      }
      if(!this.postData.real_name){
        this.$message.warning("请填写真实姓名");
        return;
      }
      if(!this.postData.phone){
        this.$message.warning("请填写手机号");
        return;
      }
      if(!this.postData.permission_group){
        this.$message.warning("请选择权限组");
        return;
      }
      if(!this.adminId){
        this.setAddAdmin(this.postData)
      }else{
        this.user_id = this.adminId;
        this.editorAdmin(this.postData)
      }
      
    },
    handleCurrentFunc(val){
         this.getAdminList({current_page:val,page_size:10});
    }
  },
  computed:{
    typeTxt:function(){
      return this.type == "add"?"新增管理员":"编辑管理员"
    }
  },
  created(){
    this.getGropList();
    this.getAdminList({});
  }
};
</script>
<style lang="scss">
.input-span {
  display: inline-block;
  width: 70%;
  margin-left: 10px;
  margin-top: 20px;
}
</style>


