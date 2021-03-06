
// let baseUrl ='/api/'
let baseUrl ='/'
module.exports={
    "upload":baseUrl+"backend/common/upload",//上传
    "login":baseUrl+'backend/operator/login',//登录
    "logout":baseUrl+"backend/operator/logout",//退出

    'momentsGetlist':baseUrl+"backend/moments/getlist",//获取帖子列表
    'momentsGetdetail':baseUrl+'backend/moments/getdetail',//获取帖子详情
    'examine':baseUrl+"backend/moments/examine",//审核帖子
    'recommend':baseUrl+"backend/moments/recommend",//推荐或取消推荐帖子
    'delmoment':baseUrl+"backend/moments/delmoment",//删除帖子

    'getcategorylist':baseUrl+'backend/subject/getcategorylist',//专栏列表
    'getcategorydetail':baseUrl+"backend/subject/getcategorydetail",//专栏详情
    "addcategory":baseUrl+"backend/subject/addcategory",//新增专栏
    "editcategory":baseUrl+"backend/subject/editcategory",//编辑专栏
    "delcategory":baseUrl+"backend/subject/delcategory",//删除专栏

    "subjectGetList":baseUrl+"backend/subject/getlist",//文章列表
    "subjectGetDetail":baseUrl+"backend/subject/getdetail",//文章详情
    "delsubject":baseUrl+"backend/subject/delsubject",//删除文章
    "addsubject":baseUrl+"backend/subject/addsubject",//添加文章
    "editsubject":baseUrl+"backend/subject/editsubject",//编辑文章
    "addselect":baseUrl+"backend/subject/addselect",//添加到每日推荐
    "adddiscover":baseUrl+"backend/subject/adddiscover",//添加到发现或撤销

    "topicList":baseUrl+'backend/topic/getlist',//话题列表
    "topicDetail":baseUrl+"backend/topic/getdetail",//话题详情
    "topicAdd":baseUrl+"backend/topic/addtopic",//添加话题
    "topicEdit":baseUrl+"backend/topic/edittopic",//编辑话题
    "changeTopic":baseUrl+"backend/topic/changetopic",//上下架话题
    "topicDel":baseUrl+"backend/topic/deltopic",//删除话题
    "topicRec":baseUrl+"backend/topic/recommend",//话题推荐
    "gettopicmoments":baseUrl+"backend/topic/gettopicmoments",//话题详情中的动态列表

    "userList":baseUrl+"backend/users/getlist",//用户列表
    "forbidden":baseUrl+"backend/users/forbidden",//用户禁言和解除
    "userCertList":baseUrl+"backend/users/getcertlist",//标签列表
    "userAddCert":baseUrl+"backend/users/addcert",//添加标签
    "userDelCert":baseUrl+"backend/users/delcert",//删除标签
    "addcerttouser":baseUrl+"backend/users/addcerttouser",//给用户添加标签
    "recommenduser":baseUrl+"backend/users/recommenduser",//用户推荐
    "addsystemuser":baseUrl+"backend/users/addsystemuser",//添加或取消官方账号
    "getsystemuser":baseUrl+"backend/users/getsystemuser",//获取官方账号

    "getcertlist":baseUrl+"backend/users/getcertlist",//获取标签列表
    "addcert":baseUrl+"backend/users/addcert",//添加标签
    "delcert":baseUrl+"backend/users/delcert",//删除标签

    "getgrouplist":baseUrl+"backend/permission/getgrouplist",//权限组列表
    "groupdetail":baseUrl+"backend/permission/groupdetail",//权限组详情
    "addgroup":baseUrl+"backend/permission/addgroup",//添加权限组
    "editgroup":baseUrl+"backend/permission/editgroup",//编辑权限组
    "delgroup":baseUrl+"backend/permission/delgroup",//删除权限
    "permissionlist":baseUrl+"backend/permission/permissionlist",//权限列表

    "adminList":baseUrl+"backend/operator/getlist",//管理员列表
    "addAdmin":baseUrl+"backend/operator/addoperator",//添加管理员
    "delAdmin":baseUrl+"backend/operator/deloperator",//删除管理员
    "editPassword":baseUrl+"backend/operator/editpassword",//修改密码
    "adminGetdetail":baseUrl+"backend/operator/getdetail",//管理员详情
    "editoperator":baseUrl+"backend/operator/editoperator",//修改管理员

    "bannerGetList":baseUrl+"backend/banner/getlist",//获取广告位列表
    "bannerAdd":baseUrl+"backend/banner/addbanner",//添加广告位
    "bannerEdit":baseUrl+"backend/banner/editbanner",//编辑广告位
    "bannerDetail":baseUrl+"backend/banner/getdetail",//广告详情
    "bannerDel":baseUrl+"backend/banner/delbanner",//删除广告位

    "adddraft":baseUrl+"backend/subject/adddraft",//添加草稿
    "getdraftlist":baseUrl+"backend/subject/getdraftlist",//获取草稿列表
    "getdraftdetail":baseUrl+"backend/subject/getdraftdetail",//获取草稿详情
    "deldraft":baseUrl+"backend/subject/deldraft",//删除草稿

    "sugGetList":baseUrl+"backend/suggestion/getlist",//反馈列表
    "delsuggestion":baseUrl+"backend/suggestion/delsuggestion",//删除建议

    "mesgGetList":baseUrl+"backend/message/getlist", //消息列表
    "mesgGetDetail":baseUrl+"backend/message/getdetail",//消息详情
    "addsysmessage":baseUrl+"backend/message/addsysmessage",//添加系统消息
    "editsysmessage":baseUrl+"backend/message/editsysmessage",//编辑系统消息
    "delsysmessage":baseUrl+"backend/message/delsysmessage",//删除系统消息
    "pushsysmessage":baseUrl+"backend/message/pushsysmessage",//发送手机消息
    "artMesgPush":baseUrl+'backend/message/push',//文章推送
    "commentGetList":baseUrl+"backend/comment/getlist",
    "delcomment":baseUrl+'backend/comment/delcomment',

    "getselectlist":baseUrl+"backend/subject/getselectlist",//每日精选
    "getselectdetail":baseUrl+"backend/subject/getselectdetail",
    "dayaddselect":baseUrl+"backend/subject/addselect",
    "delselectsubject":baseUrl+"backend/subject/delselectsubject"
}