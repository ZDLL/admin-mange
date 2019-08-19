<template>
    <div class="mesage-page">
          <myPlace :place-text="t"></myPlace>
          <div class="mesage-cont">
                <el-divider content-position="left">消息列表</el-divider>
                 <el-button type="primary" @click="addMsgClick" size="medium">添加消息</el-button>
                 <div class='mesage-table'>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column
                            v-for="(itm,index) in tableHead"
                            :key="itm.id"
                            :prop="itm.prop"
                            :label="itm.label"
                            >
                        </el-table-column>
                         <el-table-column label="状态">
                             <template slot-scope="scope">
                                 {{scope.row.status | msgStatus}}
                             </template>
                        </el-table-column>


                        <el-table-column fixed="right" label="操作" width="200px">
                            <template slot-scope="scope">
                                <el-button type="text" @click="delMsgClick(scope.row)">删除</el-button>
                                <el-button type="text" @click="editorMsgClick(scope.row)">编辑</el-button>
                                <el-button type="text" @click="pushMsgClick(scope.row)">推送系统</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    
                </div>
                <MyPackage :page-total='total' :key='total' @handleCurrent='handleCurrentFun'></MyPackage>
          </div>
    </div>
</template>
<script>
import myPlace from "../../../components/place.vue";
import search from "../../../components/search.vue";
import MyPackage from "../../../components/package.vue";
import MyDatePicker from "../../../components/datepicker.vue";
import until from "../../../comm/until.js";
export default {
    name:"messagelist",
    data(){
        return{
            t:"系统消息管理",
            total:0,
            tableData:[],
            tableHead:[
                { prop: "id", label: "消息ID" },
                { prop: "title", label: "消息标题" },
                { prop: "content", label: "消息内容" },
                { prop: "create_time", label: "创建时间" },
            ],
            searchData:{
                page_size:10,
                current_page:1
            }
        }
    },
    methods:{
        async getMsgList(postData){
            await this.$store.dispatch("msgModule/msgListAct",postData);
            let data = this.$store.state.msgModule.msgListData;
            this.tableData = data.info.result;
            // console.log(data)
        },
        async delMsg(postData){
            await this.$store.dispatch("msgModule/delsysmessageArt",postData);
            let data = this.$store.state.msgModule.delsysmessageData;
            this.$message.success("删除消息成功");
            this.getMsgList(this.searchData)
        },
        async pushMsg(postData){
            await this.$store.dispatch("msgModule/pushsysmessageArt",postData);
            let data = this.$store.state.msgModule.pushsysmessageData;
            this.$message.success("推送系统消息成功");
            this.getMsgList(this.searchData)
        },
        handleCurrentFun(val){
            this.searchData.current_page = val;
            this.getMsgList(this.searchData);
        },
        editorMsgClick(row){
             this.$router.push({
                path:"/addmessage",
                query:{
                    id:row.id
                }
            })
        },
        addMsgClick(){
            this.$router.push({
                path:"/addmessage"
            })
        },
        delMsgClick(row){
            let _this = this;
            until.myConfirm(_this,"删除该消息？",function(val){
                _this.delMsg({id:row.id})
            })
        },
        pushMsgClick(row){
            let _this = this;
            until.myConfirm(_this,"是否推送系统消息，推送后将不可撤回",function(val){
                _this.pushMsg({id:row.id})
            })
        }
    },
    components:{
        myPlace,
        MyPackage
    },
    filters:{
        msgStatus(val){
            if(!val){
            return
            }
            switch(parseInt(val)){
            case 1:
                return "已推送"
            case 2:
                return "未推送"
            }
        }
    },
    created(){
        this.getMsgList(this.searchData);
    },
    mounted(){}
}
</script>
<style lang="scss">
.mesage-cont{
     @extend %extreme;
     .mesage-table{
         @extend %tableborder;
     }
}
     
</style>
