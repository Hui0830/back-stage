import axios from './interceptors';

// 获取产品分类
export const getProductClass = () => {
    return axios.get('/api/productClass').then(res => {
        return res.data;
    })
}
// 添加产品分类
export const addProductClass = (params) => {
    return axios.post('/api/productClass', params).then(res => {
        return res.data;
    })
}
// 编辑 产品分类
export const putProductClass = (params) => {
    return axios.put('/api/productClass', params).then(res => {
        return res.data;
    })
}
// 删除产品分类
export const deleteProductClass = (params) => {
    return axios.delete('/api/productClass', {params}).then(res => {
        return res.data
    })
}

// 获取产品列表
export const getProductList = (params) => {
    return axios.get('/api/productList',{params}).then(res => {
        return res.data
    })
}
//获取产品信息
export const getProductInfo = (_id) => {
    return axios.get('/api/productInfo', {
        params: {
            _id
        }
    }).then(res => res.data)
}
//修改产品信息
export const putProductInfo = (params) => {
    return axios.put('/api/putProduct',params).then(res => res.data)
}
//添加
export const addProduct = (params) => {
    return axios.post('/api/addProduct',params).then(res => res.data)
}
//删除产品
export const deleteProduct = (_id) => {
    return axios.delete('/api/deleteProduct',{
        params: {
            _id
        }
    }).then(res => res.data)
}