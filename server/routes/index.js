const router = require('koa-router')();
const auth = require('../middlewares/auth');


import user from './user';
import webInfo from './web_info';
import staff from './staff';
import article from './article';
import uploade from './uploade';
import webDecorate from './web_decorate';

const routes = {
    ...user,
    ...webInfo,
    ...staff,
    ...article,
    ...uploade,
    ...webDecorate
}

router.use('/api/*', auth);
Object.keys(routes).forEach(key => {
    let {method, url} = JSON.parse(key);
    router[method.toLowerCase()](`/api/${url}`, routes[key]);

})
export default router;