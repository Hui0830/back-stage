const qiniu = require('qiniu');
const qiniuConfig = require('../config/qiniu_config');

class Qiniu {
    constructor(secretKey, accessKey, scope) {
        this.accessKey = accessKey;
        this.secretKey= secretKey;
        this.mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        this.scope = scope;
        const config = new qiniu.conf.Config();
        config.zone = qiniu.zone.Zone_z2
        this.config = config;
    };

    // 获取存储对象
    getBucket() {
        const bucketManager = new qiniu.rs.BucketManager(this.mac, this.config);
        return bucketManager;
    };
    // 上传
    putFile(localFile, key, bucket) {
        const options = {
            scope: bucket || this.scope // 七牛存储对象
        };
        const putPolicy = new qiniu.rs.PutPolicy(options);
        const uploadToken = putPolicy.uploadToken(this.mac);
        const formUploader = new qiniu.form_up.FormUploader(this.config);
        const putExtra = new qiniu.form_up.PutExtra();
        // 文件上传
        return new Promise((resolved, reject) => {
            formUploader.putFile(uploadToken, key, localFile, putExtra,(respErr, respBody, respInfo) => {
                console.log(respErr, respBody, respInfo)
                if (respErr) {
                    reject(respErr)
                }
                if (respInfo.statusCode == 200) {
                    resolved({...respBody, url: respBody.key})
                } else {
                    resolved(respBody)
                }
            })
        })
    }
    //删除
    deleteFile(key, bucket = this.scope) {
        const bucketManager = this.getBucket();
        return new Promise((resolved, reject) => {
            bucketManager.delete(bucket, key, function(err, respBody, respInfo) {
                if (err) {
                    reject(err)
                } else {
                    console.log(respInfo.statusCode);
                    console.log(respBody);
                    resolved(respBody)
                }
            });
        })

    }
}

module.exports = new Qiniu(qiniuConfig.secretKey,qiniuConfig.accessKey, qiniuConfig.scope)
