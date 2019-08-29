<template>
    <div class="addMsg-page">
        <myPlace :place-text="t"></myPlace>
        <div class="addMsg-con">
            <div style="margin-bottom:20px">
                <editor id="tinymce" v-model="sendData.content_detail" :init="init"></editor>
            </div>
            
            <!-- <div v-if="hasQuill" style="margin-bottom:20px">
                <quillEditor v-if="quillCont" :parentEditorCont="quillCont" @quillEditorFun="getcont" @quillEditorScrollTop='getEditorScrollTop'></quillEditor>
            </div>
            <div v-else style="margin-bottom:20px">
                <quillEditor :parentEditorCont='""' @quillEditorFun="getcont" @quillEditorScrollTop='getEditorScrollTop'></quillEditor>
            </div> -->
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
// import quillEditor from "../../../components/quillEditor.vue";
// import tinyEditor from '../../../components/tinymceEditor.vue'
import { setTimeout } from 'timers';

import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/plugins/image'// 插入上传图片插
import 'tinymce/plugins/lists'// 列表插件
import 'tinymce/plugins/paste'
import 'tinymce/plugins/autoresize'
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
            },
            top:"",
            cont:"",
            init:{
                language_url: '/tinymce/langs/zh_CN.js',
                language: 'zh_CN',
                skin_url: '/tinymce/skins/ui/oxide',
                // height: 800,
                plugins: 'lists image paste autoresize',
                toolbar: 'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image | removeformat paste',
                branding: false,
                autoresize_bottom_margin: 0, 
                autoresize_on_init: true,
                // autoresize_overflow_padding: 8,
                menubar: false,
                convert_urls: false ,
                image_advtab: false, //开启图片上传的高级选项功能
                images_upload_credentials:true,
                paste_as_text: true,
                paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
                images_upload_url:"/backend/common/uploadwords",
                images_reuse_filename: true,
                image_title:false,
                automatic_uploads:true,
                paste_preprocess: function(plugin, args) {
                    args.content += '';
                }
            }
        }
    },
    components:{
        myPlace,
        // quillEditor,
        Editor
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
            this.cont = cont;
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
            
        },
        handleScroll(){
            let scrollObj = document.getElementById("searchBar"); // 滚动区域
            let scrollTop = scrollObj.scrollTop; // div 到头部的距离
            let dom = document.getElementsByClassName("tox-toolbar")[0];
            if(!dom){
                return;
            }
            if(scrollTop>50){
                dom.classList.add("toolbar-fixed-top0");
            }
            if(scrollTop==0){
                dom.classList.remove("toolbar-fixed-top0");
            }
        }
    },
    filters:{},
    created(){
        this.id = this.$route.query.id
        if(this.id){
            this.getMsgDetail({id:this.id})
            this.hasQuill = true
        };
        window.removeEventListener('scroll', this.handleScroll)
    },
    mounted(){
         tinymce.init({})
        window.addEventListener('scroll', this.handleScroll,true)
    }
}
</script>
<style lang="scss">
        .addMsg-page{
            .addMsg-con{
                 @extend %extreme;
                 img{
                     width: 200px;
                 }
                // .tox-statusbar{
                //     display: none
                // }
                .tox-toolbar{
                    background-color: #fff;
                }
                .toolbar-fixed-top0{
                    position: fixed;
                    left: 240px;
                    top:22px;
                    z-index: 99;
                    border-top: 1px #ccc solid;
                    width: calc(100% - 297px);
                    border-left: 1px #ccc solid;
                    border-right: 1px #ccc solid;
                }
            }
        }
</style>