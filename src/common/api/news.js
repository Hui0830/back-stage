import axios from './interceptors';

// 创建消息
export const createNews = (params) => {
    return axios.post('/api/createNews',params).then(res => res.data)
};

//获取消息
export const getNews = ({pageSize, _id='',timeSort = 0}) => {
    return axios.get('/api/getNews', {
        params: {
            _id,
            pageSize,
            timeSort
        }
    }).then(res => res.data)
}

// 删除信息
export const deleteNews = (_id) => {
    return axios.delete('/api/deleteNews', {
        params: {
            _id,
        }
    }).then(res => res.data)
}