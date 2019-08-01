import apiUrl from '../../config/api.js'
import untill from '../../comm/until.js'
import qs from 'qs'
const state = {
  articleList:{},
  arcticleAdd:{},
  arcticleEditor:{},
  arcticleDetaile:{},
  artickeDel:{},
  addselect:{},
  adddiscover:{}
}
// getters
const getters = {//同步

}
// actions
const actions = {//异步
    async arcticleGetListAct(context,parem){//获取列表
        context.commit("arcticleGetListMut",await untill.getData(apiUrl.subjectGetList,qs.stringify(parem)))
    },
    async arcticleAddAct(context,parem){//添加文章
        context.commit("arcticleAddMut",await untill.getData(apiUrl.addsubject,qs.stringify(parem)))
    },
    async editArcticleAct(context,parem){//编辑文章
        context.commit("arcticleEdotorMut",await untill.getData(apiUrl.editsubject,qs.stringify(parem)))
    },
    async detaileArcticleAct(context,parem){//文章详情
        context.commit("arcticleDetailMut",await untill.getData(apiUrl.subjectGetDetail,qs.stringify(parem)))
    },
    async arcticleDelAct(context,parem){//删除文章
        context.commit("arcticleDelMut", await untill.getData(apiUrl.delsubject,qs.stringify(parem)))
    },
    async addselectAct(context,parem){//设置每日精选或撤销
        context.commit("addselectMut",await untill.getData(apiUrl.addselect,qs.stringify(parem)))
    },
    async adddiscoverAct(context,parem){//设置发布或撤销
        context.commit("adddiscoverMut",await untill.getData(apiUrl.adddiscover,qs.stringify(parem)))
    }
}
// mutations
const mutations = {//同步
    arcticleGetListMut(state,data){
        state.articleList = data.data
    },
    arcticleAddMut(state,data){
        state.arcticleAdd =data.data
    },
    arcticleEdotorMut(state,data){
        state.arcticleEditor = data.data
    },
    arcticleDetailMut(state,data){
        state.arcticleDetaile = data.data
    },
    arcticleDelMut(state,data){
        state.artickeDel= data.data;
    },
    addselectMut(state,data){
        state.addselect =data.data
    },
    adddiscoverMut(state,data){
        state.adddiscover = data.data
    }
}

export default {
  namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
  state,
  getters,
  actions,
  mutations,
  strict: true
}