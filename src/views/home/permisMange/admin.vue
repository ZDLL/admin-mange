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
          </template>
        </el-table-column>
      </el-table>
        
    </div>
    <myPackge v-if='total' :key='total' :pageTotal='total' @handleCurrent='handleCurrentFunc'></myPackge>
    <el-dialog title="新增管理员" :visible.sync="dialogAdmin" width="50%">
      <div class>
        <el-row>
          <span>用 户 名 ：</span>
          <span class="input-span">
            <el-input placeholder="请输入内容" v-model="postData.username" clearable></el-input>
          </span>
        </el-row>
        <el-row>
          <span>登录密码：</span>
          <span class="input-span">
            <el-input placeholder="请输入内容" v-model="postData.password" clearable></el-input>
          </span>
        </el-row>
        <el-row>
          <span>真实姓名：</span>
          <span class="input-span">
            <el-input placeholder="请输入内容" v-model="postData.real_name" clearable></el-input>
          </span>
        </el-row>

        <el-row>
          <span>手 机 号 ：</span>
          <span class="input-span">
            <el-input placeholder="请输入内容" v-model="postData.phone" clearable></el-input>
          </span>
        </el-row>
        <el-row>
          <span>选择权限组：</span>
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
            <el-input placeholder="请输入新密码" v-model="changePwdTxt" clearable></el-input>
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
export default {
  name: "admin",
  data() {
    return {
      dialogAdmin: false,
      changePwd:false,
      changePwdTxt:"",
      adminId:"",
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
    
    changePwdClick(row) {
      this.adminId =row.user_id;
      this.changePwd = true;
    },
    changePwdBtn(){
      this.editPasswor({user_id:this.adminId,password:this.changePwd})
    },
    toDeleteClick(row) {
      this.delAdmin({user_id:row.user_id})
    },
    addAdminClick() {
      this.adminId ="";
      this.dialogAdmin = true;
    },
    addAdminBtn(){
      if(!this.adminId){
        this.setAddAdmin(this.postData)
      }
      
    },
    handleCurrentFunc(val){
         this.getAdminList({current_page:val,page_size:10});
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


