
export default [{
    path: '/stuff',
    loader: () => import('pages/stuff'),
    exact: true,
},{
    path: '/stuff/img',
    loader: () => import('pages/stuff'),
}, {
    path: '/stuff/video',
    loader: () => import('pages/stuff/video'),
}];