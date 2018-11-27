
import Staff from '../../staff';

export default [{
    path: '/staff',
    component: Staff,
    exact: true,
},{
    path: '/staff/:id',
    component: Staff,
}, {
    path: '/staff/edit/:id',
    component: Staff,
}];
