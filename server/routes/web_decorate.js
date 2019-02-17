const {getRouterApi} = require('../common/api_menu'),
    { responseCode } = require('../common/const'),
    webDecorateModel = require('../db/models/web_decorate_model');

export default {
    [getRouterApi('get_decorate')]: async (ctx) => {
        const { type, id } = ctx.query;
        let result = null;
        if(type && type === '1') {
            result = await webDecorateModel.findOne({type});
        } else {
            result = await webDecorateModel.findById(id);
        }
        return result !== null ? ctx.send(result) : ctx.sendError(responseCode.UN_KNOWN, '获取失败');
    },
    [getRouterApi('put_decorate')]: async (ctx) => {
        const { type,data,_id } = ctx.request.body;
        let result = null;
        result = await webDecorateModel.updateOne({_id},{[type]: data});
        return result !== null ? ctx.send(result) : ctx.sendError(responseCode.UN_KNOWN, '更新失败');
    },
    [getRouterApi('create_decorate')]: async (ctx) => {
        const data = ctx.request.body;
        const { name,nav,type,about,purpose,contact,introduction,address,staff,carousel,product,productNav } = data;
        const result = await webDecorateModel.create({
            name,
            type,
            nav,
            about,
            purpose,
            introduction,
            staff,
            carousel,
            product,
            contact,
            address,
            productNav
        });
        return result !== null ? ctx.send(result) : ctx.sendError(responseCode.UN_KNOWN, '创建失败');
    }
}