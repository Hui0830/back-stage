const Koa = require('koa');
const path = require('path');
const favicon = require('koa-favicon');
const koaBody = require('koa-body');
const views = require('koa-view');
const router = require('koa-router')();
const  koaStatic = require("koa-static");

const readFile = require('./utils/read_file_promise');

const app = new Koa();

const REQUEST_LIMIT = '4mb';
const port = 3000;

app.use(views(path.join(__dirname, '../dist'), {
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
app.use(koaStatic(path.resolve(__dirname, "../dist"),{ extensions: ['html']}));

// router.get('/',async (ctx, next) => {
//     ctx.response.header = 'text/html; charset=utf-8';
//     const html = await readFile("index.html");
//     ctx.body = html;
// })
// 项目中间件
// router.use(async (ctx,next) => {
//     await ctx.render("index");
//     next();
// })
router.get('*',async (ctx,next)=> {
    await ctx.render("index");
    next();
})
router.get('/api/reqInfo',async (ctx) => {
        ctx.response.type = 'json'
        ctx.response.body= {
            serviceVersion: 3,
        }
});
router.post('/api/getSkuInfo', (ctx) => {
    ctx.response.type = 'json'
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
// app.context.indexHtml = readFile("index.html");
app.listen(port, () => {
    console.log(`Server startup, listen at ${port}`);
});
