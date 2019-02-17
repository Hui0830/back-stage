/**
 * Created by db on 2018/11/30.
 * 权限控制模块
 * @Todo: 登录用户拥有一个职位，不同职位拥有不同的权限
 */
import {ROLE} from './conf/constant';
import { intersection, _get } from './utils/xym_lodash';
import jsCookie from 'js-cookie';

// const roleIds = [_get(window, "_global.userInfo.roles.roleId")]; // 为后期多权限铺垫
const roleId = parseInt(jsCookie.get('roleId'), 10);
// const userId = jsCookie.get('userId');
const roleIds = [roleId];

const creater = ROLE.CREATE;
const superAdmin = ROLE.SUPER_ADMIN; // 高级管理员(仅次于创建者的角色)
const admin = ROLE.ADMIN; // 管理员（负责网站的职位发布，留言处理，网站维护）
const webEditor = ROLE.web_editor; // 网站编辑员（负责网站的装修、文章发布，动态发布）

const all = [creater,superAdmin, admin, webEditor]; // 所有权限

const dashboardConfig = {
    dashboard: all,
    dashboard_warn_tip: [creater, superAdmin], // 工作台警告提示
};
// 员工管理
const staffConfig = {
    staff: [superAdmin, admin],
    staff_list: [superAdmin, admin],
    staff_add: [superAdmin],
    staff_delete: [superAdmin],
    staff_edit: [superAdmin],
    staff_info: [superAdmin, admin]
}
// 网站编辑管理
const websiteConfig = {
    website_decorate: [superAdmin, admin,webEditor],
    website_seo: [superAdmin, admin],
}
// 产品管理
const productConfig = {
    product_edit: [superAdmin,admin],
    product_add: [superAdmin,admin]
}
// 消息管理
const newsConfig = {
    new: [superAdmin, admin],
}
// 招聘管理
const recruitConfig = {
    recruit: [superAdmin, admin]
}

const accessConfig = {
    ...dashboardConfig,
    ...staffConfig,
    ...websiteConfig,
    ...newsConfig,
    ...recruitConfig,
    ...productConfig
};

// 是否拥有模块在、操作权限
const checkAccess = (mid) => {
    const roles = accessConfig[mid];
    if (!Array.isArray(roles)) return true;  // 如果没有定义该模块的权限，则认为所有人都有权限
    if(roleIds.includes(creater)) return true; // 店铺创建者拥有所有权限
    // console.log(intersection(roles, roleIds))
    return intersection(roles, roleIds).length > 0; // 用户拥有角色集合与权限对应角色集合交集长度大于0
};
// 限制操作更高级的角色
export const checkRoleAuth = (editRoleId) => {
    return !!(editRoleId - roleId)
}

export default checkAccess;