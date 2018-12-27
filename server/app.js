const Koa = require('koa');
const path = require('path');
const favicon = require('koa-favicon');
const koaBody = require('koa-body');
const views = require('koa-view');
const router = require('koa-router')();
const  koaStatic = require("koa-static");
const koaSession = require("koa-session");

const readFile = require('./utils/read_file_promise');
import {articleList} from  './middlewares/article';
import { session_config } from './const';

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
app.use(koaBody({ jsonLimit: REQUEST_LIMIT, formLimit: REQUEST_LIMIT, textLimit: REQUEST_LIMIT }));

// 静态资源设置
app.use(koaStatic(path.resolve(__dirname, "../dist")));
app.keys = ['xing ying mei'];
app.use(koaSession(session_config, app));


app.use(async (ctx,next) => {
    var err = ctx.session.error,          //主要代码，防止页面刷新表单重复提交
        msg = ctx.session.success;
    delete ctx.session.error;
    delete ctx.session.success;
    ctx.message = '';
    if (err) ctx.message = '<p class="msg error">' + err + '</p>';
    if (msg) ctx.message = '<p class="msg success">' + msg + '</p>';
    next();
})

router.post('/api/login',async (ctx) => {
    ctx.response.type = 'json';
    const { userName,password,remember } = ctx.request.body;
    let resData = {};
    if(userName === '15727785909' && password === '123456') {
        ctx.session.userId = userName;
        resData = {userName, remember,code: 10000};
    } else {
        resData = {
            message: '账号或密码错误',
            code: 10001,
        }
    }
    ctx.response.body= resData;
});
router.get('/api/article/list',articleList);
router.use(async (ctx,next)=> {
    console.log('session',ctx.session.userId,ctx.cookies.get(session_config.key), ctx.session.userId);
    if(ctx.session.userId) {
        console.log('session',ctx.session.userId);
        next();
    }else {
        console.log("url",ctx.request.url);
        ctx.response.type = 'json';
        ctx.response.body = {
            code: 20000
        }
        // next()
    }
});
router.get('/api/reqInfo',async (ctx) => {
        ctx.response.type = 'json';
        ctx.response.body= {
            serviceVersion: 3,
        }
});
router.post('/api/getSkuInfo', (ctx) => {
    const {itemId} = ctx.request.body;
    let data = {
        price: '5000$',
        name: 'koa靓旗店（基础版）',
    }
    if(itemId == 224){
        data = {
            price: '8000$',
            name: 'koa靓旗店(专业版)', 
        }
    }
    ctx.response.body = data;
});

app.use(router.routes());
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});
app.listen(port, () => {
    console.log(`Server startup, listen at ${port}`);
});
