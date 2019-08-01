import apiUrl from '../../config/api.js'
import untill from '../../comm/until.js'
const state = {
  url:"",
  quillImg:""
}
// getters
const getters = {//同步

}
// actions
const actions = {//异步
  async getUploadAct(context,parame){
    context.commit("getUploadUrlMut", await untill.getData(apiUrl.upload,parame))
  },
  async getFileImge(context,parame){
    context.commit("getQullImgeMut", await untill.getData(apiUrl.upload,parame))
  }
}
// mutations
const mutations = {//同步
    getUploadUrlMut(state,data){
        state.url= data.data.info.path
    },
    getQullImgeMut(state,data){
      state.quillImg= data.data.info.path
    }
}

export default {
  namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
  state,
  getters,
  actions,
  mutations
}