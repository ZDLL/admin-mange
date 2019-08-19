import apiUrl from '../../config/api.js'
import untill from '../../comm/until.js'
import qs from 'qs'

const state={
    addRaftData:{},
    getRaftListData:{},
    getRafDetailData:{},
    deleteRafl:{}
}
const getters={}
const actions={
    async addRafAct(context,parm){
        context.commit("addRaftMut",await untill.getData(apiUrl.adddraft,qs.stringify(parm)))
    },
    async getRaftListAct(context,parm){
        context.commit("getRaftListMut",await untill.getData(apiUrl.getdraftlist,qs.stringify(parm)))
    },
    async getRafDetailfAct(context,parm){
        context.commit("getRafDetailMut",await untill.getData(apiUrl.getdraftdetail,qs.stringify(parm)))
    },
    async deleteRaflAct(context,parm){
        context.commit("deleteRaflMut",await untill.getData(apiUrl.deldraft,qs.stringify(parm)))
    },
}
const mutations={
    addRaftMut(state,data){
        state.addRaftData= data.data
    },
    getRaftListMut(state,data){
        console.log(data.data)
        state.getRaftListData= data.data
    },
    getRafDetailMut(state,data){
        state.getRafDetailData= data.data
    },
    deleteRaflMut(state,data){
        state.deleteRafl= data.data
    },
}

export default {
    namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
    state,
    getters,
    actions,
    mutations,
    strict: true
  }