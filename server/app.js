const Koa = require('koa'),
    path = require('path'),
    favicon = require('koa-favicon'),
    koaBody = require('koa-body'),
    views = require('koa-view'),
    koaStatic = require("koa-static");

//配置、常量

const app = new Koa();

const REQUEST_LIMIT = '4mb';
const port = 8080;

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

app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});
app.listen(port, () => {
    console.log(`Server startup, listen at ${port}`);
});
