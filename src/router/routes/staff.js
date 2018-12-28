import React from 'react';
import Staff from '../../staff';
import StaffEdit from '../../staff/edit';
import StaffInfo from '../../staff/staff_info';

const StaffAdd  = () => <StaffEdit isEdit={false} />
export default [{
    path: '/staff',
    component: Staff,
    exact: true,
},{
    path: '/staff/list',
    component: Staff,
    exact: true,
},{
    path: '/staff/add',
    component: StaffAdd,
    exact: true,
}, {
    path: '/staff/edit/:id',
    component: StaffEdit,
    
},{
    path: '/staff/:id',
    component: StaffInfo,
}];
