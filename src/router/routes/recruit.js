import Recruit from 'pages/recruit'

export default [{
    path: '/recruit',
    loader: Recruit,
    exact: true,
    async: true
},{
    path: '/recruit/list',
    loader: Recruit,
    async: true
}, {
    path: '/recruit/add',
    loader: Recruit,
    async: true
}];