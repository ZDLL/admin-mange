import apiUrl from '../../config/api.js'
import axios from "axios"
import qs from "qs";
import { Message} from "element-ui";
let loginGetData = function(url,payload){
  let token = window.localStorage.getItem("token");
  let loginToken = token?token:"a70bc1c23ce5a972637adba5954a5acc_api"
  return new Promise((res,rej)=>{
    axios({
      method: 'post',
      url: url,
      data:payload,
      headers: {"token":loginToken},
    }).then(data=>{
      if(data.data.code!=10000){
        Message.error(data.data.msg)
        return;
      }
       res(data)
    }).catch(err=>{
       rej(err)
    })
 })
};


const state = {
  token: "",
  loginOutData:""
}

// getters
const getters = {//同步

}
// actions
const actions = {//异步
  async loginAction(context, parame) {
    context.commit("loginMut", await loginGetData(apiUrl.login, qs.stringify(parame)))
  },
  async loginOutAct(context, parame){
    context.commit("loginOutMut", await loginGetData(apiUrl.logout, qs.stringify(parame)))
  }
}
// mutations
const mutations = {//同步
  loginMut(state, data) {
    state.token = data.data.info.token;
  },
  loginOutMut(state, data){
    state.loginOutData = data.data.info.token;
  }
}

export default {
  namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
  state,
  getters,
  actions,
  mutations
}
