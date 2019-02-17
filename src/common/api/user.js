import axios from './interceptors';

export const loginOut = () => {
    return axios.get('/api/loginOut')
}

export const signIn = (pramer) => {
    return axios.post('/api/login',{...pramer}).then(res => {
        return res.data;
    })
}

// 获取个人信息
export const getUserInfo = () => {
    return axios.get('/api/userInfo').then(res => {
        return res.data
    })
}
