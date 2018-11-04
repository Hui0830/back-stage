const Koa = require('koa');
const path = require('path');
const favicon = require('koa-favicon');
const koaBody = require('koa-body');
const views = require('koa-view');
const router = require('koa-router')();
// const reqInfo = require('./middlewares/req_info');

const app = new Koa();

const REQUEST_LIMIT = '4mb';
const port = 3000;

app.use(views(path.join(__dirname, 'views'), {
    debug: true,
    map: { html: 'swig' },
    options: {
        autoescape: false,
    },
}));
app.use(favicon(path.join(__dirname, '../favicon.ico')));
app.use(koaBody({ jsonLimit: REQUEST_LIMIT, formLimit: REQUEST_LIMIT, textLimit: REQUEST_LIMIT }));

// 项目中间件
router.get('/api/reqInfo',(ctx) => {
        ctx.response.type = 'json';
        ctx.response.body= {
            serviceVersion: 3,
        }
});
router.post('/api/getSkuInfo', (ctx) => {
    const {itemId} = ctx.request.body;
    ctx.response.type = 'json';
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
app.listen(port, () => {
    console.log(`Server startup, listen at ${port}`);
});
