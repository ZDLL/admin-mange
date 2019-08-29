<template>
    <div class="select-page">
        <myPlace :place-text='t'></myPlace>
        <div class="select-cont">
            <el-divider content-position="left">每日精选列表</el-divider>
           <div class="block">
                <el-date-picker
                v-model="postData.date"
                type="date"
                value-format="yyyy-MM-dd"
                @change="getTime"
                placeholder="选择日期">
                </el-date-picker>
                <el-button style="float:right" @click="addSelectBtn" type="primary">添加精选</el-button>
            </div> 
           
            <div class="select-table">
                 <el-table :data="tableData" border style="width: 100%">
                    <el-table-column label="时间" property="date"></el-table-column> 
                    <el-table-column label="标题" property="title"></el-table-column> 
                    <el-table-column label="ID" property="id"></el-table-column> 
                    <!-- <el-table-column label="标题" property="name"></el-table-column>   -->
                    <el-table-column label="封面">
                        <template slot-scope="scope">
                        <img v-if='scope.row.picture' :src='scope.row.picture' alt="封面图片"/>
                        <!-- <el-image v-if='scope.row.picture' :src='scope.row.picture' lazy></el-image> -->
                        <span v-else>无图片</span>
                            <!-- <img v-if='scope.row.picture' :src='scope.row.picture'/> -->
                        </template>
                    </el-table-column>  
                    <el-table-column fixed="right" label="操作" width="200">
                        <template slot-scope="scope">
                        <el-button type="text" @click="withdraw(scope.row)" >撤回</el-button>
                        <!-- <el-button type="text" >编辑</el-button> -->
                        <!-- <el-button type="text" >查看</el-button> -->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
             <MyPackage :page-total='total' :key='total' @handleCurrent='handleCurrentFun'></MyPackage>
        </div>
        <!-- 添加精选 -->
        <div v-if ='dialogVisible' class='addSecDia'>
            <el-dialog
            title="添加每日精选"
            :visible.sync="dialogVisible"
            width="50%"
           >
           <div>
                <el-row  style="margin-bottom:20px;">
                    <el-col :span="4"><span class="my-span-notice">*</span>输 入 ID：</el-col>
                    <el-col :span="8">
                        <el-input v-model="sId" placeholder="请输入内容"></el-input>
                        <p style="color: rgb(153, 153, 153); font-size: 12px;">注：多个ID请用英文逗号隔开</p>
                    </el-col>
                </el-row>
                <el-row  style="margin-bottom:20px;">
                    <el-col :span="4"><span class="my-span-notice">*</span>选择时间：</el-col>
                    <el-col :span="10">
                        <el-date-picker
                            v-model="addData.date"
                            type="date"
                            value-format="yyyy-MM-dd"
                            @change="getAddTime"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-col>
                </el-row>
                
                <el-row>
                    <el-col :span="4"><span class="my-span-notice">*</span>已添加ID：</el-col>
                    <el-col :span="8">
                        <div class='addSc-warp'>
                            <span class='addSe' v-for='(itm,index) in disIdArr' :key='index' @click="delSec(index)"><i class='el-icon-circle-close closeIcon'></i> {{itm}}</span>
                        </div>
                    </el-col>
                </el-row>
           </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSelectClick">确 定</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import myPlace from "../../../components/place.vue";
import MyPackage from "../../../components/package.vue";
import MyDatePicker from "../../../components/datepicker.vue";
import until from "../../../comm/until.js";
export default {
    name:"selec",
    data(){
        return{
            t:'每日精选',
            time:'',
            tableData:[],
            total:0,
            sId:"",
            dialogVisible:false,
            addTime:"",
            disIdArr:[],
            postData:{
                current_page:1,
                page_size:3,
                date:''
            },
            addData:{
                ids:'',
                date:''
            }
        }
    },
    components:{
        myPlace,
        MyPackage,
        MyDatePicker
    },
    methods:{
        async getlist (){
            await this.$store.dispatch("selsectModule/getselectlistAct",this.postData)
            let data = this.$store.state.selsectModule.getselectlist
            this.tableData = data.info.result
            this.total = parseInt(data.info.result.length)
        },
        async getDetail (postData){
            this.disIdArr=[];
            await this.$store.dispatch("selsectModule/getselectdetailAct",postData)
            let data = this.$store.state.selsectModule.getselectdetail;
            this.disIdArr = data.info.ids.split(',')
        },
        async addSelect (postData){
            await this.$store.dispatch("selsectModule/addselectAct",postData)
            let data = this.$store.state.selsectModule.addselect;
            this.$message.success("添加成功")
            this.getlist();
            this.dialogVisible = false;
        },
        async delselect (postData){
            await this.$store.dispatch("selsectModule/delselectsubjectAct",postData)
            let data = this.$store.state.selsectModule.delselectsubject;
            this.$message.success("删除成功")
            this.getlist();
        },
        handleCurrentFun(val){
            this.postData.current_page=val;
            this.getlist();
        },
        getTime(time){
            this.postData.date = time;
            this.getlist();
        },
        getAddTime(time){
            this.getDetail({date:time})
        },
        addSelectBtn(){
            this.dialogVisible = true;
        },
        addSelectClick(){
            let addIdLen= this.sId.indexOf(",")>-1?this.sId.split(',').length:1
            if(this.sId.indexOf("，")>-1){
                this.$message.warning("请查看是否输入中文逗号")
                return
            }
            if(addIdLen>1){
                for(let i=0;i<this.sId.split(',').length;i++){
                    this.disIdArr.push(this.sId.split(',')[i])
                }
            }else if(addIdLen=1){
                this.disIdArr.push(this.sId)
            }
            if(!this.addData.date){
                this.$message.warning("请选择时间")
                return
            }
          
            if(this.disIdArr.length + parseInt(addIdLen) >10){
                this.$message.warning("每天的精选不能超过10条")
                return
            }
            this.addData.ids= this.disIdArr.join(',')
            this.addSelect(this.addData)
        },
        delSec(index){
            this.disIdArr.splice(index,1)
        },
        withdraw(row){
            let _this= this;
            until.myConfirm(_this,`是否撤回该精选？`,function(val){
                 _this.delselect({date:row.date,subject_id:row.id})
            })
           
        }
    },
    created(){
        this.getlist()
    }
}
</script>
<style lang="scss">
    .select-page{

        .select-cont{
               @extend %extreme;
            .select-table{
                 @extend %tableborder;
                 img{
                    max-width: 100px;
                    max-height: auto;
                 }
            }
        }
        .addSecDia{
            .addSc-warp{
                border:1px #dcdcdc solid;
                padding:8px 10px;
                height: 200px;
                border-radius: 2px;
                overflow: hidden;
            }
            .addSe{
                display: inline-block;
                vertical-align: top;
                padding: 5px 10px;
                border:1px #dcdcdc solid;
                border-radius: 4px;
                // overflow: hidden;
                margin:8px 8px;
                color: #666;
                position: relative;
                .closeIcon{
                    position: absolute;
                    right: -5px;
                    top:-10px;
                    background-color: #fff;
                    z-index: 2;
                    font-size: 14px;
                }
            }
        }
    }
</style>