import React from 'react';

import { imageFix } from 'common/conf/constant'
import EditBaseForm from '../edit_base_form';
import Plan from 'components/plan';

import { style } from './index.scss';

const StaffSay = ({ onSave, data }) => {
    return (
        <Plan
            modal={{
                content: <EditBaseForm onSave={(val) => onSave("staffSay",val)} defaultData={data} />,
            }}
        >
            <div className={style}>
                <div>
                    <div className="avatar" style={{backgroundImage: `url(${imageFix + data.image})`}}></div>
                </div>
                <div>
                    <p className="icon">“</p>
                    <p className="descript">
                        {data.descript}
                    </p>
                    <p className="title">{data.title}</p>
                </div>
            </div>
        </Plan>
    )
}

export default StaffSay;