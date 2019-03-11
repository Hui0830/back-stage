import React from 'react';
import StaffEdit from 'pages/staff/edit';

const StaffAdd  = () => <StaffEdit isEdit={false} />
export default [{
    path: '/staff',
    loader: () => import('pages/staff'),
    exact: true,
},{
    path: '/staff/list',
    loader: () => import('pages/staff'),
    exact: true,
},{
    path: '/staff/add',
    loader: StaffAdd,
    exact: true,
    async: true
}, {
    path: '/staff/edit/:id',
    loader: StaffEdit,
    async: true
    
},{
    path: '/staff/user/:id',
    loader: () => import('pages/staff/staff_info'),
}];
