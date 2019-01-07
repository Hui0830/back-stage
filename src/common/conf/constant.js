/**
 * Created by db on 2018/11/30.
 * 全局常量定义
 */
export const ROLE = {
    CREATE: 0, // 网站创建者
    SUPER_ADMIN: 1, // 高级管理员
    ADMIN: 2, // 管理员
    web_editor: 3, // 店长
};

// 全部职位
export const ROLE_NAME = [
    { roleId: -1, roleName: '全部角色' },
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

// 文章分类
export const ARTICLE_CLASSIFY = {
    NOTES: 1, //事记
    ACTIVITY: 2, //活动
    NOTICE: 3, //通知
}
export const ARTICLE_CLASSIFY_MAP = {
    [ARTICLE_CLASSIFY.NOTES]: '事记',
    [ARTICLE_CLASSIFY.ACTIVITY]: '活动',
    [ARTICLE_CLASSIFY.NOTICE]: '通知',
}