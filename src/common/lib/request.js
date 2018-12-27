import req from './req';
import store from '../store';

const methods = ['get', 'post', 'put', 'delete'];
let ajax = {};  // eslint-disable-line

class Ajax {
    constructor(m, url, needDeptId = true) {
        this.m = m;
        this.url = url;
        this.params = {};
        this.needDeptId = needDeptId;
    }

    json(params, needDeptId = true) {
        this.params = params || {};
        this.needDeptId = needDeptId;
        return this;
    }

    query(json, needDeptId = true) {
        this.params = JSON.parse(json.json);
        this.needDeptId = needDeptId;
        return this;
    }

    send(json, needDeptId = true) {
        this.params = JSON.parse(json.json);
        this.needDeptId = needDeptId;
        return this;
    }

    // 不会组件json字段
    raw(params) {
        this.params = params || {};
        this.isRaw = true;
        return this;
    }

    then(fun) {
        const q = req[this.m](this.url);
        let sendData;
        if (this.m == 'get') {
            sendData = q.query;
        }
        if (this.m == 'post') {
            sendData = q.send;
        }
        let data;
        if (this.isRaw) {
            data = this.params;
        } else {
            // 参数增加deptId、kdtId
            this.params.kdtId = store.state.kdtId;
            if (!this.params.deptId && this.needDeptId) {
                this.params.deptId = store.state.deptId || 1;
            }
            data = { json: JSON.stringify(this.params) };
        }
        return sendData.call(q, data).then(fun);
    }
}


methods.forEach((m) => {
    ajax[m] = (url, needDeptId = true) => new Ajax(m, url, needDeptId);
});

export default ajax;
