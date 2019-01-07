const crypto = require('crypto'),
    userModel = require('../db/models/userModel.js'),
    roleModel = require('../db/models/roleModel'),
    { responseCode } = require('../common/const'),
    {getRouterApi} = require('../common/api_menu');


export default {
    // 获取用户列表
    [getRouterApi('staff_list')]: async (ctx) => {
        let { page = 1, pageSize = 10, search } = ctx.query;
        let result = [],
            total = 0;
        pageSize = parseInt(pageSize,10);
        page = parseInt(page, 10);
        await userModel.count({}, (err, count) => {
            total = count;
        });
        result = await userModel.findUserList({page, pageSize, search});
        console.log(result);
        ctx.send({data: result, pageConfig: {total: total,current: page,pageSize}})
    },
    // 查看用户信息
    [getRouterApi('staff')]: async (ctx) => {
        const { staffId } = ctx.query;
        if(!staffId){
            ctx.sendError(responseCode.PARAM_ERROR, '参数错误')
        }
        const staffInfo = await userModel.findFullStaffById(staffId);
        ctx.send(staffInfo);
    },
    // 添加用户
    [getRouterApi('staff_add')]: async (ctx, next) => {
        const data = ctx.request.body;
        const { account,password,email,describe,name,roleId } = data;
        const checkUser = await userModel.findRoleByAccount(account);
        if(checkUser !== null){
            return ctx.sendError(responseCode.USER_EXIST, '该用户名已存在');
        }
        const result = await userModel.addUser({account,password,email,describe,name,roleId});
        return result !== null ? ctx.send(null, '用户添加成功') : ctx.sendError(responseCode.UN_KNOWN, '添加失败');
    },
    // 修改用户信息
    [getRouterApi('staff_put')]: async (ctx) => {
        const data = ctx.request.body;
        const { account,password,email,describe,name,roleId,userId } = data;
        const pwd = password && crypto.createHash('md5').update(password).digest('hex');
        const roles = await roleModel.findOne({roleId});
        const result = await userModel.update({_id: userId}, {account,password: pwd,email,describe,name,roles: roles._id});
        return ctx.send(result)
    },
    // 删除用户
    [getRouterApi('staff_delete')]: async (ctx) => {
        const { userId } = ctx.query;
        if(!userId){
            ctx.sendError(responseCode.PARAM_ERROR, '参数错误')
        }
        const result = await userModel.findByIdAndRemove(userId);
        return result !== null ? ctx.send(null, '用户删除成功') : ctx.sendError(responseCode.UN_KNOWN, '删除失败，未知错误');
    }
}