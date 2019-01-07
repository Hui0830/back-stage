const {getRouterApi} = require('../common/api_menu'),
    articleModel = require('../db/models/articleModel');


export default {
    [getRouterApi('article_list')]: async (ctx) => {
        let { page = 1, pageSize = 10, search } = ctx.query;
        let result = [],
            total = 0;
        pageSize = parseInt(pageSize,10);
        page = parseInt(page, 10);
        await articleModel.count({}, (err, count) => {
            total = count;
        });
        result = await articleModel.findArticleList({page, pageSize, search});
        console.log(result);
        ctx.send({data: result, pageConfig: {total: total,current: page,pageSize}})
    },
    // 添加
    [getRouterApi('article_add')]: async (ctx, next) => {
        const data = ctx.request.body;
        const { status, tag, title, describe, content } = data;
        const author = {
            userId: ctx.state.user._id,
        };
        const result = await articleModel.addArticle({title,describe,content,tag,status,author});
        return result !== null ? ctx.send(null, '添加成功') : ctx.sendError(responseCode.UN_KNOWN, '添加失败');
    },
    //获取
    [getRouterApi('article')]: async (ctx) => {
        const { id } = ctx.query;
        const result = await articleModel.findById(id);
        return result !== null ? ctx.send(result) : ctx.sendError(responseCode.UN_KNOWN, '获取失败');
    }
}