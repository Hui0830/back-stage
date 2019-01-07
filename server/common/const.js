// 错误码返回意义
/**
 * {
 *      code: '',
 *      data: [],
 *      msg: "", 
 * }
 */
exports.responseCode = {
    SUCCESS: '100000', //成功
    NO_LOGIN: '000001', //未登录
    NO_AUTH: '000002',  //没有权限
    PARAM_ERROR: '000003', //参数错误
    UN_KNOWN: '000004', //未知错误
    USER_EXIST: '000005' //用户已存在
}

exports.ROLE = {
    CREATE: 0, // 网站创建者
    SUPER_ADMIN: 1, // 高级管理员
    ADMIN: 2, // 管理员
    WEB_EDITOR: 3, // 店长
}
