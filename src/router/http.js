import axios from 'axios'
import router from '@/router/router'
import { Message } from 'element-ui'

axios.defaults.timeout = 10000;
//返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500; // 默认的
};
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;

//HTTPrequest拦截
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
});
//HTTPresponse拦截
axios.interceptors.response.use(res => {
  //如果是401则跳转到登录页面
  // if (status === 401) store.dispatch('FedLogOut').then(() => router.push({ path: '/login' }));
  // 如果请求为非200否者默认统一处理
  if (status !== 200) {
    Message({
      message: message,
      type: 'error'
    })
    return Promise.reject(new Error(message))
  }
  return res;
}, error => {
  NProgress.done();
  return Promise.reject(new Error(error));
})

export default axios;
