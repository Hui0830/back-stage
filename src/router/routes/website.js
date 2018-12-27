import Website from '../../website'
import SeoEdit from '../../website/seo';

export default [{
    path: '/website',
    component: Website,
    exact: true,
},{
    path: '/website/decorate',
    component: Website,
}, {
    path: '/website/seo',
    component: SeoEdit,
}];