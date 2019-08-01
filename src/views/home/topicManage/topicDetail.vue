<template>
    <div class='topicDetail-page'>
         <my-place :place-text="tit"></my-place>
        <div class='topicDetail-top'>
            <el-row>
                <el-col :span="6">
                    <div class='ticpTop-div'>
                        <el-avatar :size="100" :src="topicData.picture"></el-avatar>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class='topicTxt' style="margin-top:10px;line-height: 2;">
                        <p>名称：<span class='bold'>{{topicData.name}}</span></p>
                        <p>顺序：<span class='bold'>{{topicData.sort}}</span></p>
                        <!-- <p>时间：<span class='bold'>{{topicData}}</span></p> -->
                    </div>
                </el-col>
                <el-col :span="6">
                    <div style="margin-top:10px;line-height: 2;">
                        <p style="color:#666">动态数</p>
                        <strong style="font-size:30px;color:#333;font-weight:600">{{topicData.publish_num}}</strong>
                    </div>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <div class='dec'>描述： <span class='bold'>{{topicData.describe}}</span></div>
        </div>
        <div class='topicDetail-cont'>
             <el-divider content-position="left">动态列表</el-divider>
             <div class='dyncTable'>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column
                            v-for="(itm,index) in tableHead"
                            :key="index"
                            :prop="itm.prop"
                            :label="itm.label"
                        ></el-table-column >


                        <el-table-column label="类型">
                            <template slot-scope="scope">
                            <span>{{scope.row.publish_type | fileType}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="是否推荐">
                            <template slot-scope="scope">
                            <span>{{scope.row.is_recommend | fileterYesOrNo}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="状态">
                        <template slot-scope="scope">
                            <span>{{scope.row.status | fileStatus}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="180">
                            <template slot-scope="scope">
                            <!-- <el-button type="text">删除</el-button> -->
                            <el-button type="text" @click="dynToView(scope.row)">查看</el-button>
                            <el-button type="text" @click='recomBtn(scope.row)'>推荐</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
             </div>

              <myPackge v-if='total' :key='total' :pageTotal='total' @handleCurrent='handleCurrentFunc'></myPackge>

        </div>
    </div>
</template>
<script>
import place from "../../../components/place.vue";
import myPackge from '../../../components/package.vue';
export default {
    name:"topicdetail",
    data(){
        return{
            tit:'话题详情',
            topicData:{},
            topicId:"",
            remId:"",
            tableHead: [
                { prop: "nickname", label: "昵称" },
                // { prop: "is_recommend", label: "是否推荐" },
                { prop: "create_time", label: "发布时间" },
                // { prop: "topic", label: "所属话题" },
                { prop: "describe", label: "动态描述" }
            ],
            tableData:[],
            total:0
        }
    },
    components:{
         "my-place": place,
         myPackge
    },
    methods:{
        async getTopicDetail(){
            await this.$store.dispatch('topicModule/topicDetailAct',{id:this.topicId});
            let data = this.$store.state.topicModule.topicDetailData;
            this.topicData =  data.info;
        },
        async getlist(objData){
            await this.$store.dispatch("topicModule/topicMomtList",objData)
            let momentsData = this.$store.state.topicModule.topipcMomtListData
            this.tableData = momentsData.info.result;
            this.total = parseInt(momentsData.info.total)
        },
        async recommend(){
            await this.$store.dispatch("dynamicModule/getRecommend",{id:this.remId});
            let data = this.$store.state.dynamicModule.momentRecommend;
            this.$message.success("推荐成功")
            this.getlist({id:this.topicId});
        },
        dynToView(row){
            this.$router.push({
                path:"/dynamidetail",
                query:{
                    id:row.id
                }
            })
        },
        recomBtn(row){
            this.remId = row.id;
            this.recommend();
        },
        handleCurrentFunc(val){
            this.getDnylist({user_id:this.topicId,page_size:10,current_page:val})
        }
    },
    created(){
        this.topicId = this.$route.query.id;
        this.getTopicDetail();
        this.getlist({id:this.topicId});
        // console.log(this.topicId)
    },
    mounted(){}
}
</script>
<style lang="scss">
    .topicDetail-page{
        .topicTxt{
            color: #999;
            font-size: 14px;
        }
        .bold{
            color: #666;
            font-size: 15px;
        }
        .dec{
            margin-left: 20px;
            color: #666;
            margin-bottom: 5px;
        }
        .topicDetail-top,
        .topicDetail-cont{
            background-color:#fff;
            padding: 20px;
            border-radius: 8px;
            overflow: hidden;
        }
        .topicDetail-cont{
            margin-top: 20px;
            .dyncTable{
              border: 1px #ebeef5 solid;
                border-radius: 8px;
                overflow: hidden;
                margin-top: 40px;
            }
        }
    }
</style>

