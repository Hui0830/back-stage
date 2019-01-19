const timeout = async (ctx ,next) => {
    let timeOutId = null;
    const timeout = 5000;//设置超时时间
    await Promise.race([
        new Promise((resolve, reject) => {
            timeOutId = setTimeout(function() {
                const e = new Error('请求超时，请检查网络是否正常！');
                e.status = 408;
                reject(e);
            }, timeout);
        }),
        new Promise((resolve, reject) => {
            //执行next中间件
            (async function() {
                await next();
                clearTimeout(timeOutId);
                resolve();
            })();
        })
    ]);
}
module.exports = timeout