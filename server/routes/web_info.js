const {getRouterApi} = require('../common/api_menu');
const webInfoModel = require('../db/models/web_info_model');
const { responseCode } = require('../common/const');

export default {
    [getRouterApi('web')]: async (ctx, next) => {
        const data = {
            pvNum: 2000,
            uvNum: 3000,
            ipNum: 3094,
            averageTime: 9,
            serverDay: 399,
            domainDay: 988,
            cdnDay: 99
        }
       ctx.send(data)
    },
    [getRouterApi('web_page_link')]: async (ctx) => {
        const data = [
            {name: '首页', url: '/index', _id: 1},
            {name: '文章', url: '/article', _id: 2},
            {name: '产品', url: '/product', _id: 3},
            {name: '公司简介', url: '/introduction', _id: 4},
            {name: '联系我们', url: '/concat', _id: 5},
        ];
        ctx.send(data)
    },
    [getRouterApi('put_web_base_set')]: async (ctx) => {
        const { id,data } = ctx.request.body;
        const select = {};
        if(id) {
            select._id = id;
        }
        const result = await webInfoModel.updateOne({...select}, {...data},{upsert: true});
        return result !== null ? ctx.send(result) : ctx.sendError(responseCode.UN_KNOWN, '修改失败');
    },
    [getRouterApi('get_web_base_set')]: async (ctx) => {
        const result = await webInfoModel.findOne({});
        return result !== null ? ctx.send(result) : ctx.sendError(responseCode.UN_KNOWN);
    }
}