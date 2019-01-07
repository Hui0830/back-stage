const crypto = require('crypto'),
    jwt = require('jsonwebtoken'),
    userModel = require('../db/models/userModel.js'),
    {getRouterApi} = require('../common/api_menu');
import { jwtSecret,time } from '../config/.auth-const.js';

export default {
    // login in
    [getRouterApi('user_sign_in')]: async (ctx, next) => {
        const data = ctx.request.body;
        const { account, password, remember } = data;
        if(!account || !password){
            return ctx.sendError('000002', '参数不合法');
        }
        const result = await userModel.userLogin({
            account,
            password
        })
        if(result !== null){
            const token = jwt.sign({
                account: result.account,
                _id: result._id,
                roleId: result.roles.roleId,
            }, jwtSecret, { expiresIn: time });
            remember && (ctx.session.pwd = result.password);
            ctx.session.user = result;
            return ctx.send(token, '登录成功');
        }else{
            return ctx.sendError('000002', '用户名或密码错误');
        }
    },
    // login out
    [getRouterApi('user_sign_out')]: (ctx, next) => {
        ctx.cookies.set("account",'',{maxAge: 0});
        ctx.cookies.set("userId",'',{maxAge: 0});
        ctx.cookies.set("roleId",'',{maxAge: 0});
        ctx.send(null, '退出成功');
    },
    // get user info
    [getRouterApi('user')]: async (ctx, next) => {
        const data = ctx.state.user;
        const user = await userModel.findFullStaffById(data._id);
        console.log('<<<<<<<<<<<<<<<<<<')
        console.log("登入用户信息：",user);
        ctx.cookies.set('userId', user._id, {maxAge: time,signed: false,httpOnly: false})
        ctx.cookies.set('roleId', user.roles.roleId, {maxAge: time,signed: false,httpOnly: false})
        console.log('>>>>>>>>>>>>>>>>>')
        if(user !== null){
            return ctx.send(user);
        }else{
            return ctx.sendError('000002');
        }
    }
}