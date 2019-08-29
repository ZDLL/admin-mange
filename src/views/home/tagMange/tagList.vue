<template>
   <div class='tag-page'>

        <myPlace :place-text='tagPlace'></myPlace>
       <div class="tag-page-cont">
           <el-divider content-position="left">标签列表</el-divider>
           <div class="addTge">
                <el-button type="primary" @click='addTagClick'>添加标签</el-button>
           </div>
           <div class="tag-list-table">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column
                        v-for="(itm,index) in tableHead"
                        :key="index"
                        :prop="itm.prop"
                        :label="itm.label"
                    ></el-table-column>
                    <el-table-column fixed="right" label="操作" width="240">
                        <template slot-scope="scope">
                        <el-button type="text" @click="delCerClick(scope.row)">删除</el-button>
                       
                        </template>
                    </el-table-column>
                </el-table>
           </div>
       </div>
       <!-- 弹出层 -->
    <el-dialog title="添加标签" :visible.sync="tagDialog">
        <el-input v-model="tagTxt" show-word-limit  maxlength=30 placeholder="请输入内容"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tagDialog = false">取 消</el-button>
        <el-button type="primary" @click='cerBtn'>确 定</el-button>
      </div>
    </el-dialog>
   </div>
</template>
<script>
import myPlace from "../../../components/place.vue";
export default {
    name:"tagmange",
    data(){
        return{
            tagDialog:false,
            tagTxt:"",
            cerId:"",
            tableHead:[
                {label:"标签名",prop:"name"},
                {label:"标签ID",prop:"id" 
            }],
            tableData:[],
            tagPlace:"标签管理"
        }
    },
    components:{
        myPlace
    },
    methods:{
        async getCreList(){
            await this.$store.dispatch("tagModule/getCerListAct",{})
            let data = this.$store.state.tagModule.getCerListData;
            this.tableData = data.info
        },
        async setCre(){
            await this.$store.dispatch("tagModule/setAddCerAct",{name:this.tagTxt});
            let data = this.$store.state.tagModule.setAddCerData;
            this.$message.success("设置成功");
            this.getCreList();
            this.tagDialog = false;
        },
        async delCre(){
            await this.$store.dispatch("tagModule/delCerCerAct",{id:this.cerId})
            let data = this.$store.state.tagModule.delCerData
            this.$message.success("删除标签成功");
            this.getCreList();
        },
        confirm(txt) {//type 1删除 2 禁言
            let _this =this;
            this.$confirm(txt, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                 _this.delCre();
            })
            .catch(() => {
            this.$message({
                type: "info",
                message: "已取消操作"
            });
            });
        },
        addTagClick(){
            this.tagDialog = true
        },
        cerBtn(){
            
            if(!this.tagTxt){
                this.$message.warning("请填写标签名")
                return;
            }
            this.setCre();
        },
        delCerClick(row){
            this.cerId = row.id;
            this.confirm("是否删除该标签")
        }

    },
    created(){
        this.getCreList();
    }
}
</script>
<style lang="scss">
    .tag-page{
        .tag-page-cont{
            // background-color: #ffffff;
            // border-radius: 8px;
            // overflow: hidden;
            // padding: 20px;
             @extend %extreme;
            .tag-list-table{
                @extend %tableborder;
                // border: 1px solid #ebeef5;
                // border-radius: 8px;
                // overflow: hidden;
                // margin-top: 20px;
            }
        }
    }
</style>


