
const router = require('koa-router')();
const listData = [];
for (let i = 1; i < 30; i++) {
    listData.push({
        id: i,
        type: (i%2 == 0) ? 0 : 1,
        title: `2018 年会放假通知${i}`,
        time: '2018-12-' + i,
        name: `李文辉${i}`,
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

// 获取文章列表
export const articleList = (ctx, next) => {
    console.log(ctx);
    ctx.response.body = listData;
}

// 文章详情
const articleItem = (ctx) => {
    const { articleId } = ctx.params;
    const item = listData.filter(v => v.id == articleId)[0];
    ctx.response.body = item;
}

// 删除文章
const articleDelete = (ctx) => {
    const { articleId } = ctx.params;
}

const articleAdd = (ctx) => {

}
router.get('/api/article/list',articleList);


