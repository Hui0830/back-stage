import Stuff from '../../stuff';
import StuffVideo from '../../stuff/video';

export default [{
    path: '/stuff',
    component: Stuff,
    exact: true,
},{
    path: '/stuff/img',
    component: Stuff,
}, {
    path: '/stuff/video',
    component: StuffVideo,
}];