<template>
    <div class="addMsg-page">
        <myPlace :place-text="t"></myPlace>
        <div class="addMsg-con">
            <div v-if="hasQuill" style="margin-bottom:20px">
                <quillEditor v-if="quillCont" :parentEditorCont="quillCont" @quillEditorFun="getcont"></quillEditor>
            </div>
            <div v-else style="margin-bottom:20px">
                <quillEditor :parentEditorCont='""' @quillEditorFun="getcont"></quillEditor>
            </div>
            <el-row style="margin-bottom:20px">
                <el-col :span="3"><span class='my-span-notice'>*</span>消息标题：</el-col>
                <el-col :span="8">
                    <el-input
                    type="text"
                    placeholder="请输入内容"
                    v-model="sendData.title"
                    maxlength="30"
                    show-word-limit
                    >
                    </el-input>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px">
                <el-col :span="3"><span class='my-span-notice'>*</span>消息简介：</el-col>
                <el-col :span="8">
                    <el-input
                    type="text"
                    placeholder="请输入内容"
                    v-model="sendData.content"
                    maxlength="100"
                    show-word-limit
                    >
                    </el-input>
                </el-col>
            </el-row>
            <el-button  type="primary" style="width:200px;margin-top:10px;margin-left:8.5%" @click="msgSureClick">确认提交</el-button>
        </div>
    </div>
</template>
<script>
import myPlace from "../../../components/place.vue";
import until from "../../../comm/until.js";
import quillEditor from "../../../components/quillEditor.vue";
export default {
    name:"addmsg",
    data(){
        return{
            t:"添加消息",
            quillCont:"",
            hasQuill:false,
            id:"",
            sendData:{
                title:"",
                content:"",
                content_detail:""
            }
        }
    },
    components:{
        myPlace,
        quillEditor
    },
    methods:{
        async addMsg(postData){
            await this.$store.dispatch("msgModule/addsysmessageAct",postData);
            let data = this.$store.state.msgModule.addsysmessageData;
            // console.log(data)
            this.$message.success("添加消息成功");
            this.$router.push({
                path:"/message"
            })
        },
        async getMsgDetail(postData){
            await this.$store.dispatch('msgModule/mesgGetDetailArt',postData);
            let data = this.$store.state.msgModule.mesgGetDetailData;
            console.log("打印info----")
            console.log(data.info)
            this.sendData.title  = data.info.title;
            this.sendData.content  = data.info.content;
            this.sendData.content_detail  = data.info.content_detail;
            this.quillCont =  this.sendData.content_detail;
        },
        async editorMsg(postData){
            await this.$store.dispatch("msgModule/editsysmessageArt",postData);
            let data = this.$store.state.msgModule.editsysmessageData;
            this.$message.success("编辑消息成功");
            this.$router.push({
                path:"/message"
            })
        },
        getcont(cont){
            this.sendData.content_detail = cont
        },
        msgSureClick(){
            if(!this.sendData.content_detail){
                this.$message.warning("请填写消息详情")
                return
            }
            if(!this.sendData.title){
                this.$message.warning("请填写消息标题")
                return
            }
            if(!this.sendData.content){
                 this.$message.warning("请填写消息简介")
                return
            }
           
            if(this.id){
                this.sendData.id= this.id
                this.editorMsg(this.sendData)
            }else{
                this.addMsg(this.sendData)
            }
            
        }
    },
    filters:{},
    created(){
        this.id = this.$route.query.id
        if(this.id){
            this.getMsgDetail({id:this.id})
            this.hasQuill = true
        }
    },
    mounted(){}
}
</script>
<style lang="scss">
        .addMsg-page{
            .addMsg-con{
                 @extend %extreme;
            }
        }
</style>