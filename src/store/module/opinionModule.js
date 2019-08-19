import apiUrl from '../../config/api.js'
import untill from '../../comm/until.js'
import qs from "qs";
const state = {
    sugGetListData:{},
    delSugGetData:{}
}

// getters
const getters = {//同步

}
// actions
const actions = {//异步
  
    async sugGetListAct(context,pram){
        context.commit("sugGetListMut",await untill.getData(apiUrl.sugGetList,qs.stringify(pram)))
    },
    async delSugGetAct(context,pram){
        context.commit("delSugGetMut",await untill.getData(apiUrl.delsuggestion,qs.stringify(pram)))
    }
  
}
// mutations
const mutations = {//同步
    sugGetListMut(state,data){
        state.sugGetListData = data.data
    },
    delSugGetMut(state,data){
        state.delSugGetData = data.data
    }
}

export default {
  namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
  state,
  getters,
  actions,
  mutations
}
