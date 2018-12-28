import React from 'react';
import {
    withRouter
} from 'react-router-dom';
import { Icon } from 'antd';

import Plan from 'components/plan';
import LinkFrom from '../link_from';
import { style } from './index.scss';


const ProductNav = ({data, onSave, history}) => {
    const linkTo = (url) => {
        history.push(url);
    }
    return (
        <div className={style}>
            <Plan
                modal={{
                    content: <LinkFrom onSave={(val) => onSave("productNav",val)} data={data} min={3} max={4} />,
                    config: {
                        title: '编辑',
                        footer: null,
                        width: 620,
                    }
                }}
            >
                <div className="container">
                    {
                        data.map(item => (
                            <div onClick={() => linkTo(item.url)} key={item.name} className="item-a">
                                <span className="icon"><Icon type="skin" theme="twoTone" twoToneColor="#eb2f96" /></span>
                                <span className="name">{item.name}</span>
                            </div>
                            )
                        )
                    }
                </div>
            </Plan>
        </div>
    )
}

export default withRouter(ProductNav)