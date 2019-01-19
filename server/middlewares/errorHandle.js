const { responseCode } = require('../common/const');
const errorHandle = (ctx, next) => {
    return next().catch((err) => {
        const { message, status } = err;
        switch (status) {
            case 403 :
                return ctx.sendError(responseCode.NO_AUTH, message || '亲没有权限哦，访问被拒绝！');
            case 401 :
                return ctx.sendError(responseCode.NO_LOGIN, message || '未登入！');
            case 408 :
                return ctx.sendError(responseCode.TIME_OUT, message || '请求超时，请检查网络是否正常！');
            default:
                throw err;
        }
    })
}

module.exports = errorHandle;