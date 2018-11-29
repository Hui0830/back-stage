import Article from '../../article'

export default [{
    path: '/article',
    component: Article,
    exact: true,
},{
    path: '/article/list',
    component: Article,
}, {
    path: '/article/add',
    component: Article,
}, {
    path: '/article/drafts',
    component: Article,
}];