import React from 'react';
import PropTypes from 'prop-types';

import Plan from 'components/plan';
import About from './about';
import EditBaseForm from '../edit_base_form';

const AboutPlan = ({aboutData, onSave}) => {
    return (
        <Plan
            modal={{
                content: <EditBaseForm defaultData={aboutData} onSave={(val) =>onSave('about', val)}/>,
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