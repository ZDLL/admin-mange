import apiUrl from '../../config/api.js'
import untill from '../../comm/until.js'
import qs from 'qs'
const state = {
    getselectlist:{},
    getselectdetail:{},
    addselect:{},
    delselectsubject:{}
}
// getters
const getters = {//同步

}
// actions
const actions = {//异步
   async getselectlistAct(context,parm){
        context.commit("getselectlistMut",await untill.getData(apiUrl.getselectlist,qs.stringify(parm)))
   },
   async getselectdetailAct(context,parm){
       context.commit("getselectdetail",await untill.getData(apiUrl.getselectdetail,qs.stringify(parm)))
   },
   async addselectAct(context,parm){
       context.commit("addselectMut",await untill.getData(apiUrl.dayaddselect,qs.stringify(parm)))
   },
   async delselectsubjectAct(context,parm){
       context.commit("delselectsubjectMut",await untill.getData(apiUrl.delselectsubject,qs.stringify(parm)))
   }
}
// mutations
const mutations = {//同步
    getselectlistMut(state,data){
        state.getselectlist = data.data
    },
    getselectdetail(state,data){
        state.getselectdetail = data.data
    },
    addselectMut(state,data){
        state.addselect = data.data
    },
    delselectsubjectMut(state,data){
        state.delselectsubject = data.data
    }
}

export default {
  namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
  state,
  getters,
  actions,
  mutations
}