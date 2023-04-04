 import axios from 'axios';
 import { Notification } from "element-ui";

//  import qs from 'qs';
 const instance = axios.create({
   timeout: 3600000,
   withCredentials: true, // 跨域请求时是否需要使用凭证
  //  paramsSerializer: (params) => {
  //    // 序列化 GET 请求参数 -> a: [1, 2] => a=1&a=2
  //    return qs.stringify(params, {
  //      arrayFormat: 'repeat'
  //    });
  //  },
 });
 // 响应拦截
 instance.interceptors.response.use(
   (response) => {
     let {
       data
     } = response;
     if (data.data && data.data.data) {
       data = data.data;
     }
     if (data.code !== 200) {
       if (data.code == 400) {
         Notification.error({
           title: '提示信息',
           message: data.msg,
         });
       } else {
         Notification.warning({
           title: '提示信息',
           message: data.msg,
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

 export default instance