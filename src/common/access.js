/**
 * Created by db on 2018/11/30.
 * 权限控制模块
 * @Todo: 登录用户拥有一个职位，不同职位拥有不同的权限
 */
import {ROLE} from './conf/constant';
import { intersection } from './utils/xym_lodash';

const superAdmin = ROLE.SUPER_ADMIN; // 高级管理员
const admin = ROLE.ADMIN; // 管理员
const webEditor = ROLE.web_editor; // 网站编辑员

const all = [superAdmin, admin, webEditor]; // 所有权限

const dashboardConfig = {
    dashboard: all,
    dashboard_transaction: [financeManager],
    dashboard_prepay: [financeManager],
    dashboard_deduct: [financeManager],
    dashboard_marketing: [creator, superAdmin],
    dashboard_customer: [customService],
    dashboard_service: [creator, superAdmin, shopManager, staff, technician, financeBranch, customService],
    dashboard_reserveList: [creator, superAdmin, shopManager, staff, technician, financeBranch, customService],
    dashboard_card: [creator, superAdmin, shopManager, staff, technician, financeBranch, customService],
    dashboard_charge: [creator, superAdmin, shopManager, staff, technician, financeBranch, customService],
    dashboard_member: [creator, superAdmin, shopManager, staff, technician, financeBranch, customService],
    dashboard_warn_tip: [creator, superAdmin], // 工作台警告提示
};

const moduleAccessConfig = {
    ...dashboardConfig,
    ...reserveConfig,
    ...goodsConfig,
    ...orderConfig,
    ...scrmConfig,
    ...reportConfig,
    ...assetConfig,
    ...marketingConfig,
    ...storeConfig,
    ...settingConfig,
    ...billNewConfig,
    ...layoutConfig,
};

const checkAccess = (mid) => {
    const roles = moduleAccessConfig[mid];
    // 如果没有定义该模块的权限，则认为所有人都有权限
    if (!Array.isArray(roles)) return true;
    return intersection(roles, roleIds).length > 0; // 用户拥有角色集合与权限对应角色集合交集长度大于0
};

export default checkAccess;