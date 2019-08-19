import apiUrl from '../../config/api.js'
import untill from '../../comm/until.js'
import qs from "qs";
import { async } from 'q';
const state = {
   msgListData:{},
   mesgGetDetailData:{},
   addsysmessageData:{},
   editsysmessageData:{},
   delsysmessageData:{},
   pushsysmessageData:{},
   artMesgPushData:{}

}

// getters
const getters = {//同步

}
// actions
const actions = {//异步
    async msgListAct(context,parm){
        context.commit("msgListMut" , await untill.getData(apiUrl.mesgGetList,qs.stringify(parm)))
    },
    async mesgGetDetailArt (context,parm){
        context.commit('mesgGetDetailMut',await untill.getData(apiUrl.mesgGetDetail,qs.stringify(parm)))
    },
    async addsysmessageAct(context,parm){
        context.commit('addsysmessageMut',await untill.getData(apiUrl.addsysmessage,qs.stringify(parm)))
    },
    async editsysmessageArt(context,parm){
        context.commit('editsysmessageMut',await untill.getData(apiUrl.editsysmessage,qs.stringify(parm)))
    },
    async delsysmessageArt(context,parm){
        context.commit('delsysmessageMut',await untill.getData(apiUrl.delsysmessage,qs.stringify(parm)))
    },
    async pushsysmessageArt(context,parm){
        context.commit('pushsysmessageMut',await untill.getData(apiUrl.pushsysmessage,qs.stringify(parm)))
    },
    async artMesgPushArt(context,parm){
        context.commit('artMesgPushMut',await untill.getData(apiUrl.artMesgPush,qs.stringify(parm)))
    }
}
// mutations
const mutations = {//同步
   msgListMut(state,data){
       state.msgListData = data.data
   },
   mesgGetDetailMut(state,data){
        state.mesgGetDetailData = data.data
   },
   addsysmessageMut(state,data){
        state.addsysmessageData = data.data
   },
   editsysmessageMut(state,data){
        state.editsysmessageData = data.data
   },
   delsysmessageMut(state,data){
    state.delsysmessageData = data.data
   },
   pushsysmessageMut(state,data){
    state.pushsysmessageData = data.data
   },
   artMesgPushMut(state,data){
    state.artMesgPushData = data.data
   }
}

export default {
  namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
  state,
  getters,
  actions,
  mutations
}
