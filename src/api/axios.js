 import axios from 'axios';
 import qs from 'qs';
//  import Cookies from 'js-cookie';
//  import store from '@/store';
 import {
   getToken
 } from '@/assets/js/auth';
//  import {
//    Notification
//  } from 'element-ui';
 import {
   getSignature,
   getSignConfig
 } from '@/utils/sign';
 import globalconfig from '@/assets/js/config';
 let isShowNotifiaction = false;
 const getConfigHeaders = (url) => {
   let requestHeader = {
     Authorization: 'Bearer ' + getToken(),
     clientId: globalconfig.client_id,
     oidcKey: globalconfig.oidcKey
   };
   if (url) {
     let signConfig = getSignConfig(url);
     let signInfo = getSignature(signConfig, globalconfig.a);
     requestHeader.timestamp = signConfig.timestamp;
     requestHeader.nonce = signConfig.nonce;
     requestHeader.sign = signInfo;
   }
   return requestHeader;
 };
 const instance = axios.create({
   timeout: 3600000,
   withCredentials: true, // 跨域请求时是否需要使用凭证
   paramsSerializer: (params) => {
     // 序列化 GET 请求参数 -> a: [1, 2] => a=1&a=2
     return qs.stringify(params, {
       arrayFormat: 'repeat'
     });
   },
 });
 let timer = new Date().getTime();
 // 请求拦截
 instance.interceptors.request.use((config) => {
   // 请求头信息，token 验证
   config.headers.Authorization = 'Bearer ' + getToken();
   config.headers.clientId = globalconfig.client_id;
   //增加oidckey，解决不同host登录问题。
   config.headers.oidcKey = globalconfig.oidcKey;
   
   let signInfo = {};
   let signConfig = {};
   if (JSON.stringify(config.params) == '{}' || !config.params) {
     signConfig = getSignConfig(config.url);
     signInfo = getSignature(signConfig, globalconfig.a);
   } else {
     if (config.url.includes('?')) {
       signConfig = getSignConfig(config.url + '&' + decodeURIComponent(qs.stringify(config.params)));
       signInfo = getSignature(signConfig, globalconfig.a);
     } else {
       signConfig = getSignConfig(config.url + '?' + decodeURIComponent(qs.stringify(config.params)));
       signInfo = getSignature(signConfig, globalconfig.a);
     }
   }
   config.headers.timestamp = signConfig.timestamp;
   config.headers.nonce = signConfig.nonce;
   config.headers.sign = signInfo;
   return config;
 });
 
 // 响应拦截
 instance.interceptors.response.use(
   (response) => {
     let {
       config,
    //    headers,
       data
     } = response;
    //  store.dispatch('app/clearBtnLoading');
     if (data.data && data.data.data) {
       data = data.data;
     }
     // 增加token失效
     if (data.returnCode === 'AUTH-OBTAIN-USER-INFO' || data.resultCode === 40105) {
       if (isShowNotifiaction) {
         return false;
       }
       isShowNotifiaction = true;
       Notification.warning({
         title: '提示信息',
         message: data.errMsg || data.cause || data.returnMessage || '系统开小差,请电话联系运营人员或服务人员!',
       });
       // window.location.reload();
       window.location.href = '/index.html#/login';
       return false;
     }
     // 判断是否为导出/下载
    //  if (config.responseType === 'blob' || config.responseType === 'arraybuffer') {
    //    return {
    //      headers,
    //      data
    //    };
    //  }
     // 超过60分钟没有调接口退出登录----不包括登录接口、获取验证码接口
     let currentTime = new Date().getTime();
     const noLimitList = [
       '/midend/auth/refreshVerification',
       '/midend/auth/authLogin',
     ]
     let isLimit = true;
     noLimitList.forEach(x=>{
       if(config.url.includes(x)) isLimit = false;
     })
     if((currentTime - timer) > 60 * 60 * 1000 && isLimit){
       Notification.error({
         title: '提示信息',
         message: '超过60分钟未操作系统请重新登录！',
       });
       sessionStorage.clear(); 
    //    Cookies.remove("token");
       window.location.href = '/index.html#/login';
       return;
     }
     timer = currentTime;//更新时间
     //如果是option请求，直接返回
     //翻译请求code
     if (data.returnCode === '0') {
       data.resultCode = 200;
     }
     if (data.code == 200) {
       data.resultCode = 200;
     }
     if (data.resultCode === 0) {
       data.resultCode = 200;
     }
     if (data.resultCode == 300) return;
     if (data.resultCode !== 200 && data.returnCode !== '0'&& data.resultCode !== 300) {
       if (data.resultCode == 500) {
         Notification.error({
           title: '提示信息',
           message: data.errMsg || data.cause || data.returnMessage || '系统开小差,请电话联系运营人员或服务人员!',
         });
       } else {
         Notification.warning({
           title: '提示信息',
           message: data.errMsg || data.cause || data.returnMessage || '系统开小差,请电话联系运营人员或服务人员!',
         });
       }
     }
 
     return data;
   },
   (error) => {
     if (error.response) {
       Notification.error(error.response.data);
     } else {
       Notification.error(error.message);
     }
   }
 );
 export {
   getConfigHeaders
 };
 export default instance
 //export default axios