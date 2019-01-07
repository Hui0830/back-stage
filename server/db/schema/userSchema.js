const mongoose = require('mongoose');
const crypto = require('crypto');
const roles = require('../models/roleModel');

const userSchema = new mongoose.Schema({
    roles: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roles'
    },
    account: {
        type: String,
        default: '',
        trim: true,
    },
    name: {
        type: String,
        default: 'admin',
    },
    email: {
        type: String,
        default: ''
    },
    password: { type: String, default: crypto.createHash('md5').update('123456').digest('hex'),trim:true },
    describe: {
        type: String,
        default: '',
    },
    time: { type: Date, default: Date.now },
})
userSchema.index({
    time: 1
});
userSchema.statics = {
    //登入验证
    userLogin: function({account, password}) {
        return this.findOne({
            account,
            password: crypto.createHash('md5').update(password).digest('hex')
        }).select({ password: 0,}).populate('roles',"roleName roleId");
    },
    // 查找单个用户
    findRoleByAccount: function (account) {
        return this.findOne({account});
    },
    // 分页查找用户列表
    findUserList: async function ({page, pageSize, search = '{"keyWord":"", "filterId": 0}'}) {
        const { keyWord, filterId} = JSON.parse(search);
        const reg = new RegExp(keyWord, 'i');
        const query=this.findFullUserList({
            $or: [
                { name: {$regex : reg} },
                { account: {$regex : reg}}
            ]
        })
            .skip((page-1)*pageSize)
            .limit(pageSize);
        if(filterId && filterId >= 0) {
            const role = await roles.findOne({roleId: parseInt(filterId, 10)}, '_id');
            query.where('roles', role._id)
        }
        return query
        // if (objectId) {
        //     return this.findFullUserList({'_id': {"$lt": objectId}})
        //         .limit(pageSize)
        //         .sort({'_id':-1})
        // }else {
        //         console.log('ddddd')
        //         return this.findFullUserList({})
        //         .limit(pageSize)
        //         .sort({'_id':-1})
        //     }
    }, 
    //查找role
    findRoleById: function(userId){
        return this
        .findById({_id:userId},'roles').populate('roles',"roleName roleId")  // 关联查询
    },
    //查找所有
    findFullUserList: function(params) {
        return this
        .find(params).select({ password: 0,}).populate('roles',"roleName roleId")  // 关联查询
    },
    findFullStaffById: function (_id) {
        return this.findById(_id).select({ password: 0,}).populate('roles',"roleName roleId")
    },
    addUser: async function(data, callback) {
        const checkUser = await this.findOne({account: data.account});
        
        const { account, name, email, describe, roleId } = data;
        const password = data.password || '123456';
        if(checkUser) {
            console.log('用户已经存在');
            return null;
        } else {
            const _roleId = await roles.findOne({roleId},'_id');
            return this.create({
                account,
                name,
                email,
                password: crypto.createHash('md5').update(password).digest('hex'),
                describe,
                roles: _roleId
            }, callback)
        }
    }
}
module.exports = userSchema;