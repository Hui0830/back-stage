const {getRouterApi} = require('../common/api_menu');

export default {
    [getRouterApi('web')]: async (ctx, next) => {
        ctx.response.body = {
            pvNum: 2000,
            uvNum: 3000,
            ipNum: 3094,
            averageTime: 9,
            serverDay: 399,
            domainDay: 988,
            cdnDay: 99
        }
        await next()
    }
}