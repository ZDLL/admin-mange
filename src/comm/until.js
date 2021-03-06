import CryptoJS from 'crypto-js'

function getAesString(data, key, iv) {
  let Aeskey = CryptoJS.enc.Utf8.parse(key);
  let Aesiv = CryptoJS.enc.Utf8.parse(iv);
  let encrypted = CryptoJS.AES.encrypt(data, Aeskey, {
    iv: Aesiv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString(); //返回的是base64格式的密文
}

function getDAesString(encrypted, key, iv) {
  let Aeskey = CryptoJS.enc.Utf8.parse(key);
  let Aesiv = CryptoJS.enc.Utf8.parse(iv);
  let decrypted = CryptoJS.AES.decrypt(encrypted, Aeskey, {
    iv: Aesiv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
/**
 * CryptoJS加密
 */
let getAES = function(data) { //加密
  let key = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'; //密钥
  let iv = '1234567812345678';
  let encrypted = getAesString(data, key, iv); //密文
  let encrypted1 = CryptoJS.enc.Utf8.parse(encrypted);
  return encrypted;
}

/**
 * CryptoJS解密
 */
let getDAes = function(data) { //解密
  let key = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'; //密钥
  let iv = '1234567812345678';
  let decryptedStr = getDAesString(data, key, iv);
  return decryptedStr;
}

/**
 * 存储localStorage
 */
let setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
let getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
let removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}

/*
  获取url上参数
*/

let getUrlParams = function(name) {
  let reg = new RegExp(name + "=([^&]*)");
  let r = window.location.href.match(reg);
  if (r != null) return unescape(r[1]);
  return null;
}
import axios from "axios"
import { Message,confirm,Loading} from "element-ui";
/*
  参数为fromdata型的axios封装
*/
let axiosFromData = function (obj){
    return new Promise((resolve,reject)=>{ //promise重新封装一个fromData格式的请求
        axios({
            url:obj.url,
            method:obj.method || "get",
            data:obj.data,
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "token":window.sessionStorage.getItem("token")
            }
        }).then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
        })
    })
}

/**
 * axios的post请求
 */
let loading

function startLoading() {    //使用Element loading-start 方法
  loading = Loading.service({
      target:document.querySelector("#searchBar"),
      lock: true,
      text: '加载中……',
      background: 'rgba(255, 255, 255, 0.7)'
  })
}
function endLoading() {    //使用Element loading-close 方法
  loading.close()
}

let needLoadingRequestCount = 0
function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}
let getData = function(url,payload){
  axios.interceptors.request.use((config)=>{
      // 在发送请求之前做些什么
      showFullScreenLoading();
      return config;
  }, function (error) {
      // 对请求错误做些什么
      Message.error("请求错误");
      return
  });

  return new Promise((res,rej)=>{
    axios({
      method: 'post',
      url: url,
      data:payload,
      headers: {"token":window.localStorage.getItem("token")},
    }).then(data=>{
        endLoading()
      if(data.data.code !=10000){
        Message.error(data.data.msg);
        if(data.data.code =='10005' || data.data.code=='10006'){
          window.location.href='/'
          return;
        }
        return false;
      }
       res(data)
    }).catch(err=>{
      endLoading()
      rej(err)
    })
 })
};


//公共的弹层提示
let  myConfirm = function(_this,txt,fn) {
  _this.$confirm(txt, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
  })
  .then((val) => {
      fn(val)
  })
  .catch(() => {
    _this.$message({
      type: "info",
      message: "已取消操作"
  });
  });
}

export default {
  getAES,
  getDAes,
  setStore,
  getStore,
  removeStore,
  getUrlParams,
  axiosFromData,
  getData,
  myConfirm
}
