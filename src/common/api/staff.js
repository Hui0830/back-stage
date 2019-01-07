import axios from './interceptors';

export const getStaff = (params) => {
    return axios.get('/api/staffList',{
        params: {
            ...params
          }
    }).then(res => {
        return res.data
    })
}

// 获取员工信息
export const getStaffInfo = (staffId) => {
    return axios.get('/api/staffInfo', {
        params: {
            staffId
          }
    }).then(res => {
        console.log("res", res);
        return res.data.data
    })
}

// 更新员工信息
export const putStaff = (params) => {
    return axios.put('/api/putStaff', params).then(res => {
        console.log("putStaff", res)
    })
}
// 添加员工
export const addStaff = (params) => {
    return axios.post('/api/addStaff', params).then(res => {
        console.log("addStaff", res)
    })
}

// 删除员工
export const deleteStaff = (staffId) => {
    return axios.delete('/api/deleteStaff', {
        params: {
            staffId
        }
    })
}