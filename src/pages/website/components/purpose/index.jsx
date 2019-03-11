import React from 'react';
import EditBaseForm from '../edit_base_form';
import Plan from 'components/plan';

import { style } from './index.scss';

const Prupose = ({data, onSave}) => {
    return (
        <Plan
            modal={{
                content: <EditBaseForm onSave={(val) => onSave("purpose",val)} defaultData={data} />,
                config: {
                    title: '我们的宗旨',
                }
            }}
        >
            <div className={style}>
                <p className="title">
                    {data.title}<br />
                    <span className="small-title">{data.smallTitle}</span>
                </p>
                <p className="descript">{data.descript}</p>
            </div>
        </Plan>
    )
}

export default Prupose;