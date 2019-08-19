import apiUrl from '../../config/api.js'
import qs from "qs";
import util from '../../comm/until'
import until from '../../comm/until';
const state = {
 topicListData:{},
 topicDetailData:{},
 topicAddData:{},
 topicEditData:{},
 changeTopicData:{},
 topicDelData:{},
 topipcMomtListData:{},
 topicRecData:{}
}

// getters
const getters = {//同步

}
// actions
const actions = {//异步
  async topicListaAct(context,param){//话题列表
        context.commit("topicListMut", await until.getData(apiUrl.topicList,qs.stringify(param)))
  },
  async topicDetailAct(context,param){//话题详情
      context.commit("topicDetailMut",await until.getData(apiUrl.topicDetail,qs.stringify(param)))
  },
  async topicAddAct(context,param){//添加话题
      context.commit("topicAddMut",await until.getData(apiUrl.topicAdd,qs.stringify(param)))
  },
  async topicEditAct(context,param){//编辑话题
      context.commit('topicEditMut',await until.getData(apiUrl.topicEdit,qs.stringify(param)))
  },
  async changeTopicAct(context,param){//上架下架操作
      context.commit("changeTopicMut",await until.getData(apiUrl.changeTopic,qs.stringify(param)))
  },
  async topicDelAct (context,param){//删除话题
      context.commit("topicDelMut",await until.getData(apiUrl.topicDel,qs.stringify(param)))
  },
  async topicMomtList(context,param){
    context.commit("topipcMomtList",await until.getData(apiUrl.gettopicmoments,qs.stringify(param)))
  },
  async topicRecAct(context,param){
      context.commit("topicRecMut",await until.getData(apiUrl.topicRec,qs.stringify(param)))
  }
}
// mutations
const mutations = {//同步
    topicListMut(state,data){
        state.topicListData = data.data
    },
    topicDetailMut(state,data){
        state.topicDetailData = data.data
    },
    topicAddMut(state,data){
        state.topicAddData = data.data
    },
    topicEditMut(state,data){
        state.topicEditData = data.data
    },
    changeTopicMut(state,data){
        state.changeTopicData = data.data
    },
    topicDelMut(state,data){
        state.topicDelData = data.data
    },
    topipcMomtList(state,data){
        state.topipcMomtListData = data.data
    },
    topicRecMut(state,data){
        state.topicRecData = data.data
    }
}

export default {
  namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
  state,
  getters,
  actions,
  mutations
}
