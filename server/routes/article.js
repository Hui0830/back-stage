const {getRouterApi} = require('../common/api_menu'),
    { responseCode } = require('../common/const'),
    articleModel = require('../db/models/articleModel');


export default {
    [getRouterApi('article_list')]: async (ctx) => {
        let { page = 1, pageSize = 10, search, status = 1 } = ctx.query;
        let result = [],
            total = 0;
        pageSize = parseInt(pageSize,10);
        page = parseInt(page, 10);
        //过滤条件
        let filter = {
            status: parseInt(status), // 状态过滤@status{1: 已发布， 0: 草稿箱}默认1
        };
        const {tag, time} = JSON.parse(search);
        // 标签过滤
        if(tag && tag != 'all') {
            filter['tag.id'] =  tag;
        };
        // 时间过滤
        if(time && time != 'all') {
            filter['time'] = { $gt: new Date(time), $lt: new Date(`${time}-12-30`) }
        }
        
        await articleModel.count({...filter}, (err, count) => {
            total = count;
        });
        result = await articleModel.findArticleList({page, pageSize, filter});
        ctx.send({data: result, pageConfig: {total: total,current: page,pageSize}})
    },
    // 添加
    [getRouterApi('article_add')]: async (ctx, next) => {
        const data = ctx.request.body;
        const { status, tag, title, describe, content } = data;
        const author = {
            userId: ctx.state.user._id,
            userName: ctx.state.user.name,
        };
        const result = await articleModel.addArticle({title,describe,content,tag,status,author});
        return result !== null ? ctx.send(null, '添加成功') : ctx.sendError(responseCode.UN_KNOWN, '添加失败');
    },
    //获取
    [getRouterApi('article')]: async (ctx) => {
        const { articleId } = ctx.query;
        const result = await articleModel.findById(articleId);
        return result !== null ? ctx.send(result) : ctx.sendError(responseCode.UN_KNOWN, '获取失败');
    },
    //修改
    [getRouterApi('article_put')]: async (ctx) => {
        const data = ctx.request.body;
        const { status, tag, title, describe, content, articleId } = data;
        const author = {
            userId: ctx.state.user._id,
            userName: ctx.state.user.name,
        };
        const result = await articleModel.putArticle({title,describe,content,tag,status, articleId, author});
        return result !== null ? ctx.send(null, '修改成功') : ctx.sendError(responseCode.UN_KNOWN, '修改失败');
    },
    //删除
    [getRouterApi('article_delete')]: async (ctx) => {
        const { articleId } = ctx.query;
        let result;
        if(articleId === "status_0"){
            result = await articleModel.remove({status: 0});
        } else {
            result = await articleModel.findByIdAndRemove(articleId);
        }
        return result !== null ? ctx.send(null, '删除成功') : ctx.sendError(responseCode.UN_KNOWN, '删除失败');
    },
    // 草稿箱数据
    [getRouterApi('article_drafts')]: async (ctx) => {
        const { status = 0 } = ctx.query;
        const result = await articleModel.find({status},{author: 1,title: 1,time: 1, tag: 1},(err) => {
            if(err) {
                ctx.sendError(responseCode.DB_FIND_ERR);
            }
        });
        let data = result.map(item => {
            const { title, time, author, tag } = item;
            return {title, tag: tag.id, author: author.userName, time, _id: item._id }
        })
        return data !== null ? ctx.send(data, '成功') : ctx.sendError(responseCode.UN_KNOWN, '失败');
    }
}