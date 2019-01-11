// 错误码返回意义
/**
 * {
 *      code: '',
 *      data: [],
 *      msg: "", 
 * }
 */
const responseCode = {
    SUCCESS: '100000', //成功
    NO_LOGIN: '000001', //未登录
    NO_AUTH: '000002',  //没有权限
    PARAM_ERROR: '000003', //参数错误
    UN_KNOWN: '000004', //未知错误
    USER_EXIST: '000005', //用户已存在
    PWD_ERROE: '000006', //账号或密码错误
    DB_FIND_ERR: '000007', //数据库操作出错
}
exports.responseCode = responseCode;
exports.responseCodeMap = {
    [responseCode.NO_LOGIN]: '用户未登录，或登入信息失效，请重新登入！',
    [responseCode.NO_AUTH]: '亲，您尚未拥有该操作的权限哦！',
    [responseCode.PARAM_ERROR]: '请求参数出错，请查看参数是否正确！',
    [responseCode.UN_KNOWN]: '哎呀！我也不知道出啥问题了，可上报给管理员哦。',
    [responseCode.USER_EXIST]: '亲，您创建的用户账号已经存在哦',
    [responseCode.PWD_ERROE]: '哎呀，主人，您是不是忘记账号或密码啦!):',
    [responseCode.DB_FIND_ERR]: '真抱歉，数据库查询好像出问题了！'
}

exports.ROLE = {
    CREATE: 0, // 网站创建者
    SUPER_ADMIN: 1, // 高级管理员
    ADMIN: 2, // 管理员
    WEB_EDITOR: 3, // 店长
}
