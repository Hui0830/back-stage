export default [{
    path: '/website',
    loader: () => import('pages/website'),
    exact: true,
},{
    path: '/website/decorate',
    loader: () => import('pages/website'),
}, {
    path: '/website/seo',
    loader: () => import('pages/website/seo'),
}];