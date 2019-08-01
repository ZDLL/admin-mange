import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: "/login"
    },
    {
      path: '/login',
      name: 'login',
      component: ()=>import('./views/login.vue')
    },
    {
      path:'/home',
      name:"home",
      component:()=>import('./views/home/index.vue'),
      redirect:"/user",
      children:[{
        path:"/user",//用户管理
        name:"userMange",
        component:()=>import('./views/home/userMange/userList.vue'),
      },{
        path:"/adduser",//添加用户
        name:"adduser",
        component:()=>import('./views/home/userMange/userAdd.vue'),
      },,{
        path:"/detailuser",//用户详情
        name:"detailuser",
        component:()=>import('./views/home/userMange/userDetails.vue'),
      },{
        path:"/topic",//话题管理
        name:"topicManage",
        component:()=>import('./views/home/topicManage/topicList.vue'),
      },{
        path:"/topicdetail",//话题管理
        name:"topicDetail",
        component:()=>import('./views/home/topicManage/topicDetail.vue'),
      },{
        path:"/dynamic",//动态管理
        name:"dynamicManage",
        component:()=>import('./views/home/dynamicManage/dynamicList.vue'),
      },{
        path:"/dynamidetail",//动态详情
        name:"dynamidetails",
        component:()=>import('./views/home/dynamicManage/dynamicDetails.vue'),
      },{
        path:'/column',//专栏管理
        name:"columnMange",
        component:()=>import('./views/home/columnMange/columnList.vue'),
      },{
        path:'/columndetail',//专栏详情
        name:"columndetail",
        component:()=>import('./views/home/columnMange/columDetail.vue'),
      },{
        path:"/permis",//权限管理
        name:"permisMange",
        component:()=>import('./views/home/permisMange/permisList.vue'),
      },{
        path:"/article",//文章管理
        name:"articleMange",
        component:()=>import('./views/home/articleMange/articleList.vue'),
      },{
        path:"/articledetail",//文章详情
        name:"articleDetail",
        component:()=>import('./views/home/articleMange/articleDetail.vue'),
      },{
        path:"/addarticle",//添加文章
        name:"addarticle",
        component:()=>import('./views/home/articleMange/articleAdd.vue'),
      },{
        path:"/bestUser",//推荐用户
        name:"bestUser",
        component:()=>import('./views/home/bestUser/bestUserList.vue'),
      },{
        path:"/tag",
        name:"usertag",
        component:()=>import('./views/home/tagMange/tagList.vue')
      },{
        path:"/banner",
        name:"banner",
        component:()=>import('./views/home/bannerMange/bannerList.vue')
      },{
        path:"/addbanner",
        name:"addbanner",
        component:()=>import('./views/home/bannerMange/bannerAdd.vue')
      }]
    }
  ]
})
