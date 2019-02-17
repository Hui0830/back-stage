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

// 获取网站基本数据
export const getWebBaseInfo = () => {
    return axios.get('/api/webInfo').then(res => res.data)
}
// 更新网站基本数据
export const putWebBaseInfo = (params) => {
    return axios.put('/api/webInfo',params).then(res => res.data)
}