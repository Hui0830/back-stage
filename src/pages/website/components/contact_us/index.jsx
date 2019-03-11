import React from 'react';
import EditBaseForm from '../edit_base_form';
import Plan from 'components/plan';

import ContactForm from './contact_form';
import { style } from './index.scss';

const Contact = ({data, onSave}) => {
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
                <div className="left">
                    <p className="title">{data.title}</p>
                    <p className="small-title">{data.smallTitle}</p>
                </div>
                <div className="right">
                    <ContactForm />
                </div>
            </div>
        </Plan>
    )
}

export default Contact;