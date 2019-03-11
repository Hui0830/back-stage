
export default [{
    path: '/stuff',
    loader: () => import('pages/staff'),
    exact: true,
},{
    path: '/stuff/img',
    loader: () => import('pages/staff'),
}, {
    path: '/stuff/video',
    loader: () => import('pages/stuff/video'),
}];