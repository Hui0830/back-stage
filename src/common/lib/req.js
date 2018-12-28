import superagent from 'superagent';
import clientCookie from 'js-cookie';
import cookie from 'cookie';
import { tologinPage, UnloginCode, successCode } from './util';


const methods = ['get', 'post', 'put', 'delete'];
const request = {};

methods.forEach(m => request[m] = url => proxy(m, url));

function proxy(method, url) {
    let reqUrl = url;
    // 统一加上前缀
    if (match) {
        reqUrl = `/api${url}`;
    }
    return superagent(method, reqUrl).use((req) => {
        let cookies = {};
        if (!process.BROWSER) {
            const cookieArr = Object.keys(cookies).reduce((prev, name) => prev.concat(cookie.serialize(name, cookies[name])), []);
            const port = process.env.port || process.env.NODE_PORT || 8201;
            req.set('cookie', cookieArr.join(';'));

            req.url = `http://127.0.0.1:${port}${reqUrl}`;
        }
        // req.set('X-Service-Chain', '{"name": "prj3502"}');
        const mei_h5_csrf_token = process.BROWSER ? clientCookie.get('mei_h5_csrf_token') : cookies.mei_h5_csrf_token;
        const oldThen = req.then;
        req.query({ _csrf: mei_h5_csrf_token })
            .then = (resolve, reject) => oldThen.call(req, (resp) => {
                // 兼容response和success两种数据结构
                const response = (resp.body.response || resp.body);
                if (response && successCode(response.code)) {
                    return response.data;
                }
                throw response;
            }).catch((e) => {
                if (process.BROWSER && e && UnloginCode(e.code)) {
                    // 未登录状态，返回的接口错误码
                    return tologinPage(window.location.pathname + window.location.search);
                }
                e.desc = e.desc || e.message || '请求出错,请稍后重试';
                e.type = 'requestErr';
                e.reqUrl = reqUrl;
                throw e;
            }).then(resolve, reject);
    });
}

export default request;
