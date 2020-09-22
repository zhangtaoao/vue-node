import axios from 'axios';

export default function (url, method, params = {}) {
  // 首先判断是get请求还是post请求
  let data = method.toLocaleLowerCase() === 'get' ? 'params' : 'data';
  return axios({
    method,
    url,
    [data]: params // 差异点在于data的值
  }).then((res) => {
    return Promise.resolve(res.data);
  }).catch((err) => {
    return Promise.reject(err);
  })
}