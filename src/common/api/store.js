import axios from 'axios';

// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
    // Do something with response data
    console.log(response.data)
    if(response.data.code === 20000) {
        window.location.href = '/#/login';
        return;
    }
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

export const getValidDateInfo = () => {
    return axios.get('/api/reqInfo')
}

export const getSkuInfo = (pramer) => {
    return axios.post('/api/getSkuInfo',{pramer})
}
export const signIn = (pramer) => {
    return fetch('/api/login',{
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(pramer),
    }).then(res => {
        console.log(res);
        return res.json();
    })
}

export default {getValidDateInfo, getSkuInfo,signIn}