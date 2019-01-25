import axios from './interceptors';

// 添加
export const createDecorate = (params) => {
    return axios.post('/api/webDecorate', params)
}

// 获取网站模版信息
export const getDecorate = (id) => {
    return axios.get('/api/webDecorate', {
        params: {
            _id: id
        }
    }).then(res => {
        return res.data
    })
}
// 获取网站首页模版信息
export const getHomeDecorate = () => {
    return axios.get('/api/webDecorate', {
        params: {
            type: '1'
        }
    }).then(res => {
        return res.data
    })
}

//更新网站模版
export const putDecorate = (params) => {
    return axios.put('/api/webDecorate', params).then(res => {
        return res.data
    })
}

//删除网站
export const deleteDecorate = (id) => {
    return axios.delete('/api/webDecorate', {
        params: {
            _id: id
        }
    }).then(res => res.data)
}
