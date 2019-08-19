import apiUrl from '../../config/api.js'
import untill from '../../comm/until.js'
import qs from 'qs'
const state = {
    getGropListData:{},
    getGroupDetailData:{},
    setAddGroupData:{},
    setEditGroupData:{},
    delGroupData:{},
    getPermissionList:{},

    adminListData:{},
    AddadminData:{},
    delAdminData:{},
    editPassword:{},
    adminGetdetail:{},
    editoperator:{},

}
// getters
const getters = {//同步

}
// actions
const actions = {//异步
   async getGropListAct(context,parm){//获取权限组列表
        context.commit("getGropListMut",await untill.getData(apiUrl.getgrouplist,qs.stringify(parm)))
    },
    async getGroupDetailAct(context,parm){//获取权限组详情
        context.commit("getGroupDetailMut",await untill.getData(apiUrl.groupdetail,qs.stringify(parm)))
    },
    async setAddGroupAct(context,parm){//y添加权限组
        context.commit("setAddGroupMut",await untill.getData(apiUrl.addgroup,qs.stringify(parm)))
    },
    async setEditGroupAct(context,parm){//编辑权限组
        context.commit("setEditGroupMut",await untill.getData(apiUrl.editgroup,qs.stringify(parm)))
    },
    async delGroupAct(context,parm){//删除权限组
        context.commit("delGroupMut",await untill.getData(apiUrl.delgroup,qs.stringify(parm)))
    },
    async getPermissionListAct(context,parm){//权限详情
        context.commit("getPermissionListMut",await untill.getData(apiUrl.permissionlist,qs.stringify(parm)))
    },


    async getAdminListAct(context,parm){
        context.commit("getAdminListMut",await untill.getData(apiUrl.adminList,qs.stringify(parm)))
    },
    async getAddadminAct(context,parm){
        context.commit("getAddadminMut",await untill.getData(apiUrl.addAdmin,qs.stringify(parm)))
    },
    async delAdminAct(context,parm){
        context.commit("delAdminMut",await untill.getData(apiUrl.delAdmin,qs.stringify(parm)))
    },
    async editPasswordAct(context,parm){
        context.commit("editPasswordMut",await untill.getData(apiUrl.editPassword,qs.stringify(parm)))
    },
    async adminGetdetailArt(context,parm){
        context.commit("adminGetdetailMut",await untill.getData(apiUrl.adminGetdetail,qs.stringify(parm)))
    },
    async editoperatorArt(context,parm){
        context.commit("editoperatorMut",await untill.getData(apiUrl.editoperator,qs.stringify(parm)))
    }
}
// mutations
const mutations = {//同步
   getGropListMut(state,data){
        state.getGropListData =data.data
   },
   getGroupDetailMut(state,data){
        state.getGroupDetailData =data.data
    },
    setAddGroupMut(state,data){
        state.setAddGroupData =data.data
    },
    setEditGroupMut(state,data){
        state.setEditGroupData =data.data
    },
    delGroupMut(state,data){
        state.delGroupData =data.data
    },
    getPermissionListMut(state,data){
        state.getPermissionList =data.data
    },

    getAdminListMut(state,data){
        state.adminListData =data.data
    },
    getAddadminMut(state,data){
        state.AddadminData =data.data
    },
    delAdminMut(state,data){
        state.delAdminData =data.data
    },
    editPasswordMut(state,data){
        state.editPassword =data.data
    },
    adminGetdetailMut(state,data){
        state.adminGetdetail = data.data;
    },
    editoperatorMut(state,data){
        state.editoperator = data.data;
    },

}

export default {
  namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
  state,
  getters,
  actions,
  mutations
}