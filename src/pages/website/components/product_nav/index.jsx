import React from 'react';
import {
    withRouter
} from 'react-router-dom';

import { imageFix } from 'common/conf/constant'
import Plan from 'components/plan';
import LinkFrom from '../link_form';
import { style } from './index.scss';


const ProductNav = ({data, onSave, history,navLinks}) => {
    const linkTo = (url) => {
        history.push(url);
    }
    return (
        <div className={style}>
            <Plan
                modal={{
                    content: <LinkFrom navLinks={navLinks} hasImage onSave={(val) => onSave("productNav",val)} data={data} min={3} max={4} />,
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
                            <div onClick={() => linkTo(item.url)} key={item.name} style={{background: `${item.bgColor}`,color: `${item.color}`}} className="item-a">
                                <span className="icon"><img src={imageFix + item.image} /></span>
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