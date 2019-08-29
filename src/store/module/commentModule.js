import apiUrl from '../../config/api.js'
import untill from '../../comm/until.js'
import qs from 'qs'
const state = {
    getCommentList:{},
    delCommentList:{}
}
// getters
const getters = {//同步

}
// actions
const actions = {//异步
    async getCommentListAct(context,parame){
        context.commit("getCommentListMut",await untill.getData(apiUrl.commentGetList,qs.stringify(parame)))
    },
    async delCommentListAct(context,parame){
        context.commit("delCommentListMut",await untill.getData(apiUrl.delcomment,qs.stringify(parame)))
    },

}
// mutations
const mutations = {//同步
    getCommentListMut(state,data){
        state.getCommentList = data.data
    },
    delCommentListMut(state,data){
        state.delCommentList = data.data
    }
}

export default {
  namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
  state,
  getters,
  actions,
  mutations
}