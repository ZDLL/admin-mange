import apiUrl from '../../config/api.js'
import untill from '../../comm/until.js'
import qs from "qs";
const state = {
    addCloumData:{},
    categoryList:{},
    categoryDetail:{},
    editCategory:{},
    delCategory:{}
}

// getters
const getters = {//同步

}
// actions
const actions = {//异步
    async addCategoryAct(context,parame){//添加
        context.commit("addCategoryMut", await untill.getData(apiUrl.addcategory,qs.stringify(parame)))
    },
    async getCategoryListAct(context,parame){//获取列表
        context.commit("getCategoryListMut",await untill.getData(apiUrl.getcategorylist,qs.stringify(parame)))
    },
    async getCategoryDetailAct(context,parame){//获取详情
        context.commit("getCategoryDetailMuc",await untill.getData(apiUrl.getcategorydetail,qs.stringify(parame)))
    },
    async editCategoryAct(context,parame){//编辑
        context.commit("editCategoryMuc", await untill.getData(apiUrl.editcategory, qs.stringify(parame)))
    },
    async delCategoryAct(context,parame){//删除
        context.commit("delCategoryMuc",await untill.getData(apiUrl.delcategory,qs.stringify(parame)))
    }

  
}
// mutations
const mutations = {//同步
    addCategoryMut(state,data){
        state.addCloumData=data.data
    },
    getCategoryListMut(state,data){
        state.categoryList=  data.data
    },
    getCategoryDetailMuc(state,data){
        state.categoryDetail =data.data
    },
    editCategoryMuc(state,data){
        state.editCategory =data.data
    },
    delCategoryMuc(state,data){
        state.delCategory =data.data
    }
}

export default {
  namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
  state,
  getters,
  actions,
  mutations
}
