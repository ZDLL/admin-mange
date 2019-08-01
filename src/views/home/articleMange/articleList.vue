<template>
  <div class="articleList-page">
    <my-place :place-text="tit"></my-place>
    <div class="articleList-top">
      <el-row>
        <el-col :span="8">
          <div class="data-box">
            <span>总共文章数</span>
            <strong>{{num.total_history || "查询中..."}}</strong>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="data-box">
            <span>今日文章数</span>
            <strong>{{num.total_today || "查询中..."}}</strong>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="data-box">
            <span>待审核文章数</span>
            <strong>......</strong>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="articleList-cont">
      <el-divider content-position="left">文章列表</el-divider>
      <div class="filtrate">
        <!-- <el-button-group>
          <el-button type="primary" plain size="medium">文字</el-button>
          <el-button type="primary" plain size="medium">图片</el-button>
        </el-button-group> -->
        <search :holderTxt='holder' @searchVal='searchFun'></search>
        <el-button-group style="float:right">
          <el-button type="primary" size="medium" @click="addArticle">发布文章</el-button>
        </el-button-group>
      </div>
      <div class="article-table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column label="封面">
            <template slot-scope="scope">
              <!-- <img v-if='scope.row.picture' :src='scope.row.picture' alt="封面"/> -->
              <el-image v-if="scope.row.picture" :src="scope.row.picture" lazy></el-image>
            </template>
          </el-table-column>
          <el-table-column
            v-for="(itm,index) in tableHead"
            :key="index"
            :prop="itm.prop"
            :label="itm.label"
          ></el-table-column>
          <el-table-column label="文章统计" width="140">
              <template  slot-scope='scope'>
                <span>喜欢 : {{scope.row.praise}}</span> <span style="margin-left:10px;">转发 : {{scope.row.forward}}</span>
                <br>
                <span>浏览 : {{scope.row.view_times}}</span> <span style="margin-left:10px;">评论 : {{scope.row.comment}}</span>
               
              </template>
          </el-table-column>

           <el-table-column label="投放精选">
              <template  slot-scope='scope'>
               <span>{{scope.row.is_select | fileterYesOrNo}}</span>
              </template>
          </el-table-column>
          <el-table-column label="投放发现">
              <template  slot-scope='scope'>
                <span> <span>{{scope.row.is_recommend | fileterYesOrNo}}</span></span>
              </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="240">
            <template slot-scope="scope">
              <el-button type="text" @click="articEditor(scope.row)">编辑</el-button>
              <el-button type="text" @click="delArticBtn(scope.row) ">删除</el-button>
              <el-button type="text" @click="setSelectBtn(scope.row)">{{scope.row.is_select |select}}</el-button>
              <el-button type="text" @click="setIscoverBtn(scope.row)">{{scope.row.is_recommend |iscover }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <MyPackage v-if='packTotal' :key='packTotal' :pageTotal='packTotal' @handleCurrent="handleCurrentFunc"></MyPackage>
    </div>
  </div>
</template>
<script>
import place from "../../../components/place.vue";
import search from "../../../components/search.vue";
import MyPackage from "../../../components/package.vue";
import MyDatePicker from "../../../components/datepicker.vue";
export default {
  name: "articlelist",
  data() {
    return {
      tit: "文章管理",
      holder:"输入标题",
      tableHead: [
        // { prop: "picture", label: "封面" },
        { prop: "title", label: "标题" },
        { prop: "nickname", label: "作者" },
        { prop: "category", label: "所属专栏" },
        { prop: "create_time", label: "发布时间" },
        // { prop: "is_recommend", label: "投放发布" },
        // { prop: "is_select", label: "投放精选" }
      ],
      tableData: [],
      postData: {
        title: "",
        start_time: "",
        end_time: "",
        page_size: "10",
        current_page: 1
      },
      num:{},
      packTotal:0
    };
  },
  computed:{
  },
  components: {
    "my-place": place,
    search,
    MyPackage,
    MyDatePicker
  },
  computed: {},
  methods: {
    async getArticList() {
      await this.$store.dispatch("articleModule/arcticleGetListAct", this.postData);
      let data = this.$store.state.articleModule.articleList;
      this.tableData = data.info.result;
      this.num = data.info.num;
      this.packTotal = parseInt(data.info.total)
    },
    async setSelect(prameData) {
      await this.$store.dispatch("articleModule/addselectAct", prameData);
      let data = this.$store.state.articleModule.addselect;
      if (data.info.is_select == 1) {
        this.$message.success("设置成功推荐成功");
      } else if (data.info.is_select == 2) {
        this.$message.success("取消推荐成功");
      }
      this.getArticList();
    },
    async setIscover(prameData) {
      await this.$store.dispatch("articleModule/adddiscoverAct", prameData);
      let data = this.$store.state.articleModule.adddiscover;
      if (data.info.is_recommend == 1) {
        this.$message.success("设置发现成功");
      } else if (data.info.is_recommend == 2) {
        this.$message.success("取消发现成功");
      }
      this.getArticList();
    },
    async delArticle(prameData){
        await this.$store.dispatch("articleModule/arcticleDelAct",prameData)
        let data = this.$store.state.articleModule.delArticle;
        this.$message.success("删除成功");
        this.getArticList();
    },
    articEditor(row) {
      this.$router.push({
        path: "/addarticle",
        query: {
          editor: 1,
          id: row.id
        }
      });
    },
    addArticle() {
      this.$router.push({
        path: "/addarticle"
      });
    },
    handleCurrentFunc(val) {
      this.postData = {};
      this.postData.current_page = val;
      this.postData.page_size = 10;
      this.getArticList()
    },
    setSelectBtn(row) {
      let postData = {
        id: row.id
      };
      this.setSelect(postData);
    },
    setIscoverBtn(row) {
      let postData = {
        id: row.id
      };
      this.setIscover(postData);
    },
    delArticBtn(row){
        this.delArticle({id:row.id})
    },
    searchFun(val){
         this.postData={};
         this.postData={
            title: val,
            start_time: "",
            end_time: "",
            page_size: "10",
            current_page: 1
         }
         this.getArticList(this.postData)
    }
  },
  created() {
    this.getArticList();
  },
  mounted() {},
  filters: {
      select(val){
          if(val == 1){
                return "撤回精选"
            }else if(val == 2){
                return "投放精选"
            }else{
                return "投放精选"
            }
      },
      iscover(val){
             if(val==1){
                return "撤回发现"
            }else if(val == 2){
                return "投放发现"
            }
      }
  }
};
</script>
<style lang="scss">
@import "@/style/topbox.scss";
.articleList-page {
  .articleList-top,
  .articleList-cont {
    padding: 20px;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
  }
   .articleList-top{
      padding: 3% 10px;
   }
  .articleList-cont {
    margin-top: 20px;
    .article-table {
      border: 1px solid #ebeef5;
      border-radius: 8px;
      overflow: hidden;
      margin-top: 20px;
      .el-table__row {
        img {
          max-width: 80px;
          // height: 60px;
        }
      }
    }
  }
  .el-button-group .el-button--primary:last-child {
    border-left-color: #b3d8ff;
  }
}
</style>

