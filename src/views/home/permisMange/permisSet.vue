<template>
  <div>
    <el-button class="mt20" type="primary" @click="showAdd">添加权限组</el-button>
    <!-- 权限设置 -->
    <div class="perminsList-box mt20">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          v-for="(itm,index) in tableHeadRole"
          :key="index"
          :prop="itm.prop"
          :label="itm.label"
        ></el-table-column>

        <el-table-column fixed="right" label="操作" width="240">
          <template slot-scope="scope">
            <el-button type="text" @click="toEditorClick(scope.row)">编辑</el-button>
            <el-button type="text" @click="toDeleteClick(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="提示" :visible.sync="dialogRole" width="50%">
      <div class>
        <h3>新增权限组</h3>
      </div>
      <div class="addRoleList">
        <el-input v-model="name" placeholder="请输入内容"></el-input>
        <div v-if='gropLis.length>0' class="checkBox">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="grop" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="itm in gropLis" :label="itm.id" :key="itm.id">{{itm.function_name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRole = false">取 消</el-button>
        <el-button type="primary" @click="gropOkBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { constants } from "crypto";
import until from '../../../comm/until.js';
export default {
  name: "permis",
  data() {
    return {
      dialogRole: false,
      name: "",
      tableHeadRole: [
        { prop: "group_name", label: "权限名" },
        { prop: "id", label: "权限ID" }
      ],
      tableData: [],
      searchData: {},
      checkAll: false,
      grop: [],
      gropLis: [],
      isIndeterminate: true,
      roleId:''
    };
  },
  methods: {
    async getGropList() {
      await this.$store.dispatch("permisModule/getGropListAct", {});
      let data = this.$store.state.permisModule.getGropListData;
      this.tableData = data.info;
    },
    async getPermissionList() {
      await this.$store.dispatch("permisModule/getPermissionListAct", {});
      let data = this.$store.state.permisModule.getPermissionList;
      this.gropLis = data.info;
    },
    async addGrop(postData) {
      await this.$store.dispatch("permisModule/setAddGroupAct", postData);
      let data = this.$store.state.permisModule.setAddGroupData;
      this.$message.success("添加权限组成功");
      this.getGropList({});
      this.dialogRole = false;
    },
    async getGroupDetail(postData) {
      await this.$store.dispatch("permisModule/getGroupDetailAct",postData);
      let data = this.$store.state.permisModule.getGroupDetailData;
      this.name = data.info.name;
      let _this = this;
      _this.grop=[];
      data.info.permission.forEach((val,key)=>{
          _this.grop.push(val.id)
      });
    },
    async setEditGroup(postData){
        await this.$store.dispatch("permisModule/setEditGroupAct",postData)
        let data = this.$store.state.permisModule.setEditGroupData;
        this.$message.success("编辑权限组成功");
        this.getGropList({});
        this.dialogRole = false;
    },
    async delGroup(postId){
        await this.$store.dispatch("permisModule/delGroupAct",{id:postId});
        let data = this.$store.state.permisModule.delGroupData;
        this.$message.success("删除改权限成功");
        this.getGropList();
    },
    toEditorClick(row) {
        this.dialogRole = true;
        this.roleId =row.id;
        
        this.getGroupDetail({id:row.id})
    },
    showAdd() {
      this.dialogRole = true;
      this.name ='';
      this.grop=[];
      this.roleId =''
    },
    toDeleteClick(row) {
      let _this = this;
        until.myConfirm(_this, `是否删除该权限组？`,function(val){
           _this.delGroup(row.id)
        })
      // this.confirm("是否删除该权限组？",row.id)
       
    },
    handleCheckAllChange(val) {
      if (val) {
        this.grop = [];
        this.gropLis.forEach((val, key) => {
          this.grop.push(val.id);
        });
      } else {
        this.grop = [];
      }
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.gropLis.length;
      this.isIndeterminate =checkedCount > 0 && checkedCount < this.gropLis.length;
    },
    gropOkBtn() {
        if(this.roleId){
            this.setEditGroup({id:this.roleId,name:this.name,permission:this.grop.join(",")})
        }else{
             this.addGrop({ name: this.name, permission: this.grop.join(",") });
        }
    }
  },
  created() {
    this.getPermissionList();
    this.getGropList(this.searchData);
  }
};
</script>
<style lang="scss">
    .addRoleList{
        margin-top: 20px;
    }
    .checkBox{
        margin-top: 20px;
    }
</style>


