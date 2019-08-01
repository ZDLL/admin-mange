import Vue from 'vue'
import Vuex from 'vuex'
import loginModule from './module/loginModule.js'
import dynamicModule from './module/dynamicModule.js'
import colunModule from './module/columModule'
import comModule from './module/commModule.js'
import articleModule from './module/articleModule.js'
import topicModule from './module/topicModule.js'
import userModule from './module/userModule.js'
import tagModule from './module/tagModule.js'
import permisModule from './module/permisModule.js'
import bannerModule from './module/bannerModule.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    comModule,
    loginModule,
    dynamicModule,
    colunModule,
    articleModule,
    topicModule,
    userModule,
    tagModule,
    permisModule,
    bannerModule
  }
})
