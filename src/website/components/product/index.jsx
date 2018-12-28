import React from 'react';
import {
    Link,
} from 'react-router-dom';

import Plan from 'components/plan';
import EditBaseForm from '../edit_base_form';
import Carousel from '../carousel';

import {style} from './index.scss';

const Product = ({data, onSave}) => {
    return (
        <div className={style}>
            <div className="container">
                <div className="content">
                    
                    <Plan 
                        modal={{
                            content: <EditBaseForm onSave={(val) => onSave("product",val)} defaultData={data} />,
                            config: {
                                title: '我们的产品',
                            }
                        }}
                    >
                        <div className="header">
                                
                                    <h2>{data.title}</h2>
                                    <p>{data.smallTitle}</p>
                        </div>
                        <Carousel position="top-left">
                            <div className="img-content">
                                <div className="left">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="right"></div>
                            </div>
                        </Carousel>
                    </Plan>
                </div>
                <div className="more">
                    <span className="more-btn">More</span>
                </div>
            </div>
        </div>
    )
}

export default Product