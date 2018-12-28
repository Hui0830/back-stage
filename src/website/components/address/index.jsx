import React from 'react';
import {
    Icon
} from 'antd'

import EditBaseForm from '../edit_base_form';
import Plan from 'components/plan';


import { style } from './index.scss';

const Address = ({data, onSave}) => {
    return (
        <Plan
            modal={{
                content: <EditBaseForm onSave={(val) => onSave("contact",val)} defaultData={data} />,
                config: {
                    title: '编辑',
                }
            }}
        >
            <div className={style}>
                <div className="phone">
                    <Icon type="mobile" />
                    <div>
                        {
                            data.phone.map(item => <span key={item.tel}>{item.tel} {item.name}</span>)
                        }
                    </div>
                </div>
                <div className="email">
                    <Icon type="mail" />
                    <span>{data.email}</span>
                </div>
                <div className="address">
                    <Icon type="environment" />
                    <span>{data.address}</span>
                </div>
            </div>
        </Plan>
    )
}

export default Address;