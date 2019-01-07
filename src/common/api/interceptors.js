
import axios from 'axios';
import {message} from 'antd';

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.common['Authorization'] = 'Bearer ' + token;
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    const { code, msg } = error.response.data;
    if(code && code === '000004') {
        window.location.href = '/#/login';
    }
    message.error(msg);
    return Promise.reject(error);
});
export default axios;