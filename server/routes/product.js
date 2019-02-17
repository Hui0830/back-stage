const {getRouterApi} = require('../common/api_menu'),
    { responseCode } = require('../common/const'),
    {productClassModel, productModel} = require('../db/models/productModel');

export default {
    // 获取产品信息
    [getRouterApi('product')]: async (ctx) => {
        const { _id } = ctx.query;
        const result = await productModel.findById(_id);
        return result !== null ? ctx.send(result) : ctx.sendError(responseCode.UN_KNOWN, '获取失败');
    },
    // 添加产品信息
    [getRouterApi('product_add')]: async (ctx) => {
        const data = ctx.request.body;
        const result = await productModel.create({...data});
        return result !== null ? ctx.send(result) : ctx.sendError(responseCode.UN_KNOWN, '添加失败');
    },
    //更新产品信息
    [getRouterApi('product_put')]: async (ctx) => {
        const {_id, ...data} = ctx.request.body;
        const result = await productModel.updateOne({_id},{...data});
        return result !== null ? ctx.send(result) : ctx.sendError(responseCode.UN_KNOWN, '修改失败');
    },
    // 获取产品列表
    [getRouterApi('product_list')]: async (ctx) => {
        let { _id, pageSize = 10, status = 0,typeClass='all' } = ctx.query;
        let result = [],
            total = 0;
        pageSize = parseInt(pageSize,10);
        //过滤条件
        let filter = {
            status: parseInt(status), // 状态过滤@status{1: 已发布， 0: 草稿箱}默认1
        };
        (typeClass !== 'all') && (filter.typeClass = typeClass);
        await productModel.count({...filter}, (err, count) => {
            total = count;
        });
        if(_id) {
            result = await productModel.find({...filter, _id: {$lt: _id}}).limit(parseInt(pageSize,10)).sort({_id: -1,time: -1});
        } else {
            result = await productModel.find({...filter}).limit(parseInt(pageSize,10)).sort({_id: -1, time: -1});
        }
        return result !== null ? ctx.send({data: result, pageConfig: {total: total,pageSize}}) : ctx.sendError(responseCode.UN_KNOWN, '获取产品分类出错');
    },
    //获取产品类目
    [getRouterApi('product_class')]: async (ctx) => {
        const result = await productClassModel.find({});
        return result !== null ? ctx.send(result) : ctx.sendError(responseCode.UN_KNOWN, '获取产品分类出错');
    },
    //添加产品类目
    [getRouterApi('product_class_add')]: async (ctx) => {
        const { name, parentId } = ctx.request.body;
        let result = null;
        if(parentId) {
            result = await productClassModel.addLeaf({parentId, name})
        } else {
            result = await productClassModel.create({name})
        }
        return result !== null ? ctx.send(result) : ctx.sendError(responseCode.UN_KNOWN, '添加产品分类出错');
    },
    //更新产品类目
    [getRouterApi('product_class_put')]: async (ctx) => {
        const { key, name, parentId } = ctx.request.body;
        let result = null;
        if(parentId && parentId != key) {
            result = await productClassModel.updateLeaf({id: key, parentId,name})
        } else {
            result = await productClassModel.update({_id:key}, { name });
        }
        return result !== null ? ctx.send(null, '产品分类修改成功') : ctx.sendError(responseCode.UN_KNOWN, '产品分类修改失败');

    },
    // 删除产品类目
    [getRouterApi('product_class_delete')]: async (ctx) => {
        const { key, parentId } = ctx.query;
        let result;
        if(parentId && parentId != key) {
            result = await productClassModel.deleteLeaf({id: key, parentId});
        } else {
            result = await productClassModel.findOneAndDelete({_id:key},{_id: 1});
        }
        return result !== null ? ctx.send(null, '产品分类删除成功') : ctx.sendError(responseCode.UN_KNOWN, '产品分类修改失败');

    },
}