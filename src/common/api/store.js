import axios from './interceptors';
import {
    message
} from 'antd';

// 添加一个请求拦截器


// 获取网站数据
export const getWebPreviewInfo = () => {
    return axios.get('/api/webPreviewInfo');
}

export const signIn = (pramer) => {
    return axios.post('/api/login',{...pramer}).then(res => {
        console.log(res);
        return res.data;
    })
}

export default {getWebPreviewInfo,signIn}