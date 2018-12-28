import React from 'react';
import PropTypes from 'prop-types';

import Plan from 'components/plan';
import About from './about';
import EditBaseForm from '../edit_base_form';

const videos = [
    {
        url: 'http://vali.cp31.ott.cibntv.net/69752A007BE4671C416B03974/03000A01005C2235206B44B15AC5F5A069C6E2-D7D7-419F-A52E-43ECD5B95526.mp4?ccode=0519&duration=39&expire=18000&psid=b8e03d99800f1062e74b6aa7a1b5c6ac&ups_client_netip=78e56544&ups_ts=1545812893&ups_userid=&utid=3p9tFPZVxg8CAXjlS7sd0C9I&vid=XMzk4MTYwMjI4NA&vkey=Ac4c3601367c1d2470130cbb7cf1eb3dd&s=552130be77744edea24c&sp=',
        name: '视频1'
    },
    {
        url: 'http://vali.cp31.ott.cibntv.net/youku/6773baf6b5b4371b06ef7468a/03000801005C1798F6487B61552FA5681FFC02-A6C3-4A70-9E55-99D027ABE111.mp4?sid=054581598700010001171_00_A6980397ce213e52e0f616f1cfde2ff03&sign=29255ec5b7688fa9532ff0303570db23&ctype=50',
        name: '视频2'
    },
    {
        url: 'http://ykugc.cp31.ott.cibntv.net/677449884704E71F8817D2C94/03000A01005BD926562BEA84F483ABECEFE7F0-CAF0-4E1D-B1A7-100C7F26F416.mp4?ccode=0519&duration=78&expire=18000&psid=ca23bf07056a0e8cbd8a2150ee60716b&ups_client_netip=78e56544&ups_ts=1545816318&ups_userid=&utid=3p9tFPZVxg8CAXjlS7sd0C9I&vid=XMzg5NjMyNDU2OA&vkey=Acc81417929208066b811b052be6be1e3&sp=',
        name: '视频3'
    }
]
const AboutPlan = ({aboutData, onSave}) => {
    return (
        <Plan
            modal={{
                content: <EditBaseForm defaultData={aboutData} onSave={(val) =>onSave('about', val)} selectData={videos} />,
                config: {
                    title: aboutData.title || '关于我们',
                }
            }}
        >
            <About {...aboutData} />
        </Plan>
    )
}
AboutPlan.propTypes = {
    aboutData: PropTypes.shape({
        descript: PropTypes.string,
        title: PropTypes.string,
        url: PropTypes.string,
    }),
    onSave: PropTypes.func.isRequired,
}
export default AboutPlan