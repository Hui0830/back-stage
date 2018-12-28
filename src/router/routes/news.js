import News from '../../news'

export default [{
    path: '/news',
    component: News,
    exact: true,
},{
    path: '/news/userMessage',
    component: News,
}, {
    path: '/news/sysMessage',
    component: News,
}];