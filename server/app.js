const Koa = require('koa'),
    path = require('path'),
    favicon = require('koa-favicon'),
    koaBody = require('koa-body'),
    views = require('koa-view'),
    koaStatic = require("koa-static"),
    koaSession = require("koa-session"),
    koaJwt = require('koa-jwt'); //路由权限控制


const db = require('./db/db.js'),
    errorHandle = require('./middlewares/errorHandle.js'),
    sendHandle = require('./middlewares/sendHandle.js');

import router from './routes';
import { session_config } from './config/session';
import { cookieSecret,jwtSecret } from './config/.auth-const.js';

const app = new Koa();

const REQUEST_LIMIT = '4mb';
const port = 3000;

app.use(views(path.join(__dirname, '../dist/'), {
    debug: true,
    map: { html: 'ejs' },
    options: {
        autoescape: true,
    },
}));
// 使用网站图标
app.use(favicon(path.join(__dirname, '../dist/favicon.ico')));
// koa响应设置
app.use(koaBody({
    jsonLimit: REQUEST_LIMIT,
    formLimit: REQUEST_LIMIT,
    textLimit: REQUEST_LIMIT,
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}));
// 静态资源设置
app.use(koaStatic(path.resolve(__dirname, "../dist")));
app.keys = [cookieSecret];
app.use(koaSession(session_config, app));

app.use(sendHandle());
app.use(errorHandle);

const whiteUrl = ['/api/login']
// jwt验证
app.use(koaJwt({
    secret: jwtSecret
}).unless({
    path: [...whiteUrl]
}))
// session验证
app.use(async (ctx,next)=> {
    if(!ctx.session.user && !whiteUrl.includes(ctx.request.url)) {
        console.log(ctx.session.user)
        ctx.throw(401,'登入状态失效，请重新登入！');
    }
    await next();
});

app.use(router.routes());
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});
app.listen(port, () => {
    console.log(`Server startup, listen at ${port}`);
});
