const { ROLE,responseCode } = require('../common/const'),
    userModel = require('../db/models/userModel.js'),
    { staffApi,userApi } = require('../common/api_menu');

const { CREATE, SUPER_ADMIN, ADMIN } = ROLE;


const accessConfig ={
    [staffApi.staff_add.url]: [CREATE, SUPER_ADMIN],
    [staffApi.staff_put.url]: [CREATE, SUPER_ADMIN],
    [staffApi.staff_list.url]: [CREATE, SUPER_ADMIN, ADMIN],
}

const checkAccess = (api, userRoleId) => {
    const roles = accessConfig[api];
    if (!Array.isArray(roles)) return true;  // 如果没有定义该模块的权限，则认为所有人都有权限
    return roles.includes(userRoleId)
};

// 权限有高低之分，低权限不可对高权限用户进行操作,需要验证的路由(编辑、删除)
const diffRoleApis = [staffApi.staff_add.url, staffApi.staff_put.url, staffApi.staff_delete.url];
const shouldAuthUrl = [...diffRoleApis]

const auth = async (ctx, next) => {
    const { path } = ctx.request;
    const url = path.replace(/\/api\//, '');
    if(!shouldAuthUrl.includes(url)) {
        return next();
    }
    const userRoleId = ctx.state.user.roleId;
    // 判断是否具有相应权限
    if(!checkAccess(url, userRoleId)) {
        ctx.throw(401,'没有权限访问');
    }
    if (diffRoleApis.includes(url)) {
        let userId='',roleId='';
        switch (url) {
            case staffApi.staff_delete.url:
                userId = ctx.query.userId;
                const role = await userModel.findRoleById(userId);
                if(role.roleId <= userRoleId ) {
                    ctx.throw(401, '不可操作高级别角色信息');
                }
                break;
            case staffApi.staff_put.url:
                userId = ctx.request.body.userId;
                roleId = ctx.request.body.roleId;
                const { roles } = await userModel.findRoleById(userId);
                if(roles.roleId <= userRoleId || roleId <= userRoleId) {
                    ctx.throw(401, '不可操作高级别角色信息');
                }
                break;
            default:
                roleId = ctx.request.body.roleId;
                if(roleId <= userRoleId ) {
                    ctx.throw(401, '不可操作高级别角色信息');
                }
                break;
        }
    }
    await next() 
}

module.exports = auth;