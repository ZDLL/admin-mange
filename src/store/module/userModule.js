import apiUrl from '../../config/api.js'
import untill from '../../comm/until.js'
import qs from 'qs'
const state = {
    userListData:{},
    forbiddenData:{},
    userCertList:{},
    userAddCert:{},
    delUserCert:{},
    addCerttoUser:{},
    recommendUser:{},
    systemUser:{},
    getSystemUser:{}

}
// getters
const getters = {//同步

}
// actions
const actions = {//异步
    async getUserListAct(context,parm){//获取用户列表
        context.commit("getUserListMut",await untill.getData(apiUrl.userList,qs.stringify(parm)))
    },
    async setForbiddenAct(context,parm){//设置用户的禁言或解封
        context.commit("setForbiddenMut",await untill.getData(apiUrl.forbidden,qs.stringify(parm)))
    },
    async getUserCertListAct(context,parm){//获取用户标签列表
        context.commit("getUserCertListMut",await untill.getData(apiUrl.userCertList,qs.stringify(parm)))
    },
    async setUserAddCertAct(context,parm){//添加标签
        context.commit("setUserAddCertMut", await untill.getData(apiUrl.userAddCert,qs.stringify(parm)))
    },
    async delUserCertAct(context,parm){//删除标签
        context.commit("delUserCertMut",await untill.getData(apiUrl.userDelCert,qs.stringify(parm)))
    },
    async setAddCerttoUserAct(context,parm){//给用户设置标签
        context.commit("setAddCerttoUserMut",await untill.getData(apiUrl.addcerttouser,qs.stringify(parm)))
    },
    async setRecommendUserAct(context,parm){//设置用户的推荐
        context.commit("setRecommendUserMut",await untill.getData(apiUrl.recommenduser,qs.stringify(parm)))
    },
    async addSystemUserAct(context,parm){//设置用户的推荐
        context.commit("addSystemUserMut",await untill.getData(apiUrl.addsystemuser,qs.stringify(parm)))
    },
    async getSystemUserAct(context,parm){//设置用户的推荐
        context.commit("getSystemUserMut",await untill.getData(apiUrl.getsystemuser,qs.stringify(parm)))
    },
    //addsystemuser
}
// mutations
const mutations = {//同步
   getUserListMut(state,data){
    state.userListData = data.data
   },
   setForbiddenMut(state,data){
       state.forbiddenData = data.data
   },
   getUserCertListMut(state,data){
       state.userCertList = data.data
   },
   setUserAddCertMut(state,data){
        state.userAddCert = data.data
   },
   delUserCertMut(state,data){
       state.delUserCert = data.data
   },
   setAddCerttoUserMut(state,data){
       state.addCerttoUser = data.data
   },
   setRecommendUserMut(state,data){
    state.recommendUser= data.data
   },
   addSystemUserMut(state,data){
    state.systemUser= data.data
   },
   getSystemUserMut(state,data){
    state.getSystemUser= data.data
   }
}

export default {
  namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
  state,
  getters,
  actions,
  mutations
}