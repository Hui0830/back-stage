const { responseCode, responseCodeMap } = require('../common/const')
const sendHandle = () => {
    // 处理请求成功方法
    const render = ctx => {
        return (data, msg = '请求成功') => {
            ctx.set('Content-Type', 'application/json');
            ctx.body = {
                code: responseCode.SUCCESS,
                data,
                msg
            }
        }
    }
    
    // 处理请求失败方法
    const renderError = ctx => {
        return (code = responseCode.UN_KNOWN, msg) => {
            ctx.set('Content-Type', 'application/json');
            ctx.status = code;
            ctx.body = {
                code,
                data: null,
                msg: msg || responseCodeMap[code] || '请求失败！'
            }
        }
    }

    return async (ctx, next) => {
        ctx.send = render(ctx);
        ctx.sendError = renderError(ctx);
        await next();
    }
}

module.exports = sendHandle;