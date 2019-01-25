import axios from './interceptors';


// 获取网站数据
export const getWebPreviewInfo = () => {
    return axios.get('/api/webPreviewInfo').then(res => {
        return res.data
    });
}

export const getWebPageLink = () => {
    return axios.get('/api/webPageLink').then(res => res.data);
}

export const signIn = (pramer) => {
    return axios.post('/api/login',{...pramer}).then(res => {
        console.log(res);
        return res.data;
    })
}

export default {getWebPreviewInfo,signIn}