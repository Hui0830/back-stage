const { responseCode } = require('../common/const');
const errorHandle = (ctx, next) => {
    return next().catch((err) => {
        if(err.status === 401){
            ctx.status = 401;
            return ctx.sendError(responseCode.NO_AUTH, '亲没有权限哦，访问被拒绝！');
        }else{
            throw err;
        }
    })
}

module.exports = errorHandle;