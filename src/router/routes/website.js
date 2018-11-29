import Website from '../../website'

export default [{
    path: '/website',
    component: Website,
    exact: true,
},{
    path: '/website/decorate',
    component: Website,
}, {
    path: '/website/seo',
    component: Website,
}];