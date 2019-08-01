import apiUrl from '../../config/api.js'
import untill from '../../comm/until.js'
import qs from 'qs'
const state = {
 getCerListData:{},
 setAddCerData:{},
 delCerData:{}
}
// getters
const getters = {//同步

}
// actions
const actions = {//异步
    async getCerListAct(context,pram){
        context.commit("getCerListMut",await untill.getData(apiUrl.getcertlist,qs.stringify(pram)))
    },
    async setAddCerAct(context,pram){
        context.commit("setAddCerMut",await untill.getData(apiUrl.addcert,qs.stringify(pram)))
    },
    async delCerCerAct(context,pram){
        context.commit("delCerMut",await untill.getData(apiUrl.delcert,qs.stringify(pram)))
    }
}
// mutations
const mutations = {//同步
   getCerListMut(state,data){
       state.getCerListData = data.data
   },
   setAddCerMut(state,data){
       state.setAddCerData= data.data
   },
   delCerMut(state,data){
       state.delCerData = data.data
   }
}

export default {
  namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
  state,
  getters,
  actions,
  mutations
}