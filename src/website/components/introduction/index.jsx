import React from 'react';
import EditBaseForm from '../edit_base_form';
import Plan from 'components/plan';
import { style } from './index.scss';
import { imageFix } from 'common/conf/constant'

const StaffSay = ({ onSave, data }) => {
    return (
        <Plan
            modal={{
                content: <EditBaseForm onSave={(val) => onSave("introduction",val)} defaultData={data} />,
                title: '公司简介'
            }}
        >
            <div className={style}>
                <div className="title-container">
                    <span className="title">{data.title || ''}</span>
                </div>
                <div className="container">
                    <div className="descript">
                        <p>{data.descript}</p>
                    </div>
                    <div className="img" style={{backgroundImage: `url(${imageFix + data.image})`}}></div>
                </div>
            </div>
        </Plan>
    )
}

export default StaffSay;