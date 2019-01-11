import axios from './interceptors';

// 添加
export const addArticle = (params) => {
    return axios.post('/api/addArticle', params)
}

// 获取文章信息
export const getArticleInfo = (id) => {
    return axios.get('/api/articleInfo', {
        params: {
            articleId: id
        }
    }).then(res => {
        return res.data
    })
}

//更新文章
export const putArticle = (params) => {
    return axios.put('/api/putArticle', params).then(res => {
        return res.data
    })
}

//删除文章
export const deleteArticle = (id) => {
    return axios.delete('/api/deleteArticle', {
        params: {
            articleId: id
        }
    }).then(res => res.data)
}


// 获取列表
export const getArticleList = (params) => {
    return axios.get('/api/articleList',{params}).then(res => {
        const { data } = res.data
        return data
    });
}

// 获取草稿箱文章
export const getArticleDrafts = (status) => {
    return axios.get('/api/articleDrafts',{
        params: {
            status
        }
    }).then(res => {
        return res.data
    })
}