import React from 'react';
import {
    Link,
} from 'react-router-dom';

import Plan from 'components/plan';
import ProductFrom from './product_from';
import Carousel from '../carousel';
import { imageFix } from 'common/conf/constant'

import {style} from './index.scss';

const CarouselItem = ({data}) => {
    const len = data.images.length;
    const { title, smallTitle, images } = data;
    return (
        <div className="img-content">
            <div className="header">
                    <h2>{title}</h2>
                    <p>{smallTitle}</p>
            </div>
            <div className="left">
                {
                    images.slice(0,3).map((item,key) => <div key={`${item._id}_${key}`}><a href={item.url}><img src={imageFix+item.image} alt={item.image} /></a></div>)
                }
            </div>
            <div className="right">
                <a href={images[len-1].url}>
                    <img src={imageFix+images[len-1].image} alt={smallTitle} />
                </a>
            </div>
        </div>
    )
}

const Product = ({data, onSave,navLinks}) => {
    console.log(data)
    return (
        <div className={style}>
            <div className="container">
                <div className="content">
                        <Carousel position="bottom-left">
                            {
                                data.map((item,key) => 
                                    <Plan 
                                        modal={{
                                            content: <ProductFrom onSave={(val) => onSave("product",val, key)} navLinks={navLinks} defaultData={item} />,
                                            config: {
                                                title: '我们的产品',
                                            }
                                        }}
                                        close={true}
                                        add={true}
                                        onClose={() => onSave("product",null, key)}
                                        onAdd={() => onSave("product",null)}
                                        key={`${item._id}_${key}`}
                                    >
                                        <CarouselItem data={item}  />
                                    </Plan>)
                            }
                        </Carousel>
                </div>
                <div className="more">
                    <span className="more-btn">More</span>
                </div>
            </div>
        </div>
    )
}

export default Product