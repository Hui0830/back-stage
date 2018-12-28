import Recruit from '../../recruit'

export default [{
    path: '/recruit',
    component: Recruit,
    exact: true,
},{
    path: '/recruit/list',
    component: Recruit,
}, {
    path: '/recruit/add',
    component: Recruit,
}];