import React from 'react';
import EditBaseForm from '../edit_base_form';
import Plan from 'components/plan';

import img from '../../../images/home.jpg';
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
                    <div className="avatar" style={{backgroundImage: `url(${img})`}}></div>
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