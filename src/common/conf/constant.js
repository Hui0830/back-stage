/**
 * Created by db on 2018/11/30.
 * 全局常量定义
 */
/**responseCode-start */
export const responseCode = {
    SUCCESS: '100000', //成功
    NO_LOGIN: '000001', //未登录,或登入状态失效
    NO_AUTH: '000002',  //没有权限
    PARAM_ERROR: '000003', //参数错误
    UN_KNOWN: '000004', //未知错误
    USER_EXIST: '000005', //用户已存在
    PWD_ERROE: '000006', //账号或密码错误
}

export const responseCodeMap = {
    [responseCode.NO_LOGIN]: '用户未登录，或登入信息失效，请重新登入！',
    [responseCode.NO_AUTH]: '亲，您尚未拥有该操作的权限哦！',
    [responseCode.PARAM_ERROR]: '请求参数出错，请查看参数是否正确！',
    [responseCode.UN_KNOWN]: '哎呀！我也不知道出啥问题了，可上报给管理员哦。',
    [responseCode.USER_EXIST]: '亲，您创建的用户账号已经存在哦',
    [responseCode.PWD_ERROE]: '哎呀，主人，您是不是忘记账号或密码啦!):'
}
/**responseCode-end */

 /***************************   staff-start ************************** */
export const ROLE = {
    CREATE: 0, // 网站创建者
    SUPER_ADMIN: 1, // 高级管理员
    ADMIN: 2, // 管理员
    web_editor: 3, // 店长
};

// 全部职位
export const ROLE_NAME = [
    { roleId: 0, roleName: '创建者' },
    { roleId: 1, roleName: '高级管理员' },
    { roleId: 2, roleName: '管理员' },
    { roleId: 3, roleName: '网站编辑员' },
];
//  职位能力描述
export const ROLE_NAME_INFO_MAP = {
    0: '网站默认用户，具备网站系统的最高权限',
    1: '具备网站管理的所有功能查看及设置。', // 高级管理员
    2: '负责网站日常运营的综合管理工作，查看数据。', // 管理员
    3: '负责网站日常的文章发布，网站装修等基本功能。', // 网站编辑员
};
/****************************** staff-end ************************** */

/***************  文章-----start  ***************/
export const ARTICLE_TAG = {
    NOTES: 0, //事记
    ACTIVITY: 1, //活动
    NOTICE: 2, //通知
    OTHER: 3, //其他
}
export const ARTICLE_TAG_MAP = {
    [ARTICLE_TAG.NOTES]: '公司大事记',
    [ARTICLE_TAG.ACTIVITY]: '公司活动',
    [ARTICLE_TAG.NOTICE]: '内部通知',
    [ARTICLE_TAG.OTHER]: '其他',
}

export const ARTICLE_STATUS = {
    SAVE: 0,
    PUBLISH: 1
}

/***************  文章-----end  ***************/

export const imageFix = 'http://plk956cz3.bkt.clouddn.com/'