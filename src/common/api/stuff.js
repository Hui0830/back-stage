import axios from './interceptors';

// 获取图片分类
export const getImgClasses = () => {
    return axios.get('/api/imgClasses').then(res => {
        return res.data;
    })
}
// 添加图片分类
export const addImgClasses = (params) => {
    return axios.post('/api/imgClasses', params).then(res => {
        return res.data;
    })
}
// 编辑 图片分类
export const putImgClasses = (params) => {
    return axios.put('/api/imgClasses', params).then(res => {
        return res.data;
    })
}
// 删除图片分类
export const deleteImgClass = (params) => {
    return axios.delete('/api/imgClasses', {params}).then(res => {
        return res.data
    })
}
//上传图片 

// 获取图片列表
export const getImgList = (params) => {
    return axios.get('/api/imgList',{params}).then(res => {
        return res.data
    })
}
//获取图片信息
export const getImgInfo = (_id) => {
    return axios.get('/api/imgInfo', {
        params: {
            _id
        }
    }).then(res => res.data)
}
//修改图片信息
export const putImgInfo = (params) => {
    return axios.put('/api/putImg',params).then(res => res.data)
}
//删除图片
export const deleteImg = (_id) => {
    return axios.delete('/api/deleteImg',{
        params: {
            _id
        }
    }).then(res => res.data)
}