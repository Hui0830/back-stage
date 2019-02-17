const {getRouterApi} = require('../common/api_menu'),
    { responseCode } = require('../common/const'),
    newsModel = require('../db/schema/new_schema');

export default {
    [getRouterApi('create_news')]: async (ctx) => {
        const { firstName,lastName,type,content,mail,tel } = ctx.request.body;
        const result = await newsModel.create({
            firstName,
            lastName,
            type,
            content,
            mail,
            tel,
        });
        return result !== null ? ctx.send(result) : ctx.sendError(responseCode.UN_KNOWN, '添加失败');
    },
    [getRouterApi('delete_news')]: async (ctx) => {
        const { _id } = ctx.query;
        const result = await newsModel.findByIdAndDelete(_id)
        return result !== null ? ctx.send(null, '删除成功') : ctx.sendError(responseCode.UN_KNOWN, '删除异常')
    },
    [getRouterApi('get_list_news')]: async (ctx) => {
        const { pageSize, _id,time } = ctx.query;
        let total = 0, result = null;
        await newsModel.count({}, (err, count) => {
            total = count;
        });
        if(_id) {
            result = await newsModel.find({_id: {$lt: _id}}).limit(parseInt(pageSize,10)).sort({_id: -1,time});
        } else {
            result = await newsModel.find({}).limit(parseInt(pageSize,10)).sort({_id: -1, time});
        }
        return result !== null ? ctx.send({list: result, pageSize,total}) : ctx.sendError(responseCode.UN_KNOWN, '消息列表获取失败');

    }
}