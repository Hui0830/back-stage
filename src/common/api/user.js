import axios from './interceptors';

export const loginOut = () => {
    return axios.get('/api/loginOut')
}

// 获取个人信息
export const getUserInfo = () => {
    return axios.get('/api/userInfo').then(res => {
        return res.data
    })
}