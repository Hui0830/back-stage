import axios from './interceptors';

// 添加
export const addArticle = (params) => {
    return axios.post('/api/addArticle', params)
}

// 获取文章信息
export const getArticleInfo = (id) => {
    return axios.get('/api/articleInfo', {
        params: {
            id
        }
    }).then(res => {
        return res.data
    })
}

// 获取列表
export const getArticleList = () => {
    return axios.get('/api/articleList').then(res => {
        const { data } = res.data
        return data
    });
}