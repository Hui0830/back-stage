
import axios from 'axios';
import {message} from 'antd';
import { responseCode } from '../conf/constant';

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.common['Authorization'] = 'Bearer ' + token;
    if(/^[\/api]/gi.test(config.url)) {
      config.url = `http://localhost:3000${config.url}`
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    const { code, msg } = error.response.data;
    if(code && code === responseCode.NO_LOGIN) {
        window.location.href = '/#/login';
    }
    message.error(msg);
    return Promise.reject(error);
});
axios.defaults.withCredentials = true
export default axios;