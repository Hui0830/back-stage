import React from 'react';

import { imageFix } from 'common/conf/constant'
import { style } from './index.scss';

const About = ({descript,title, video,image,bgColor, color}) => {
    return (
        <div className={style} style={{background: bgColor, color}}>
            <div className="content">
                <div className="left">
                    <h2 className="about-title">{title || 'About as'}</h2>
                    <span className="about-icon">/</span>
                </div>
                <div className="right">
                    {descript || ''}
                </div>
            </div>
            <div  className="video">
                <video controls preload='auto' poster={imageFix+image} src={video}></video>
            </div>
        </div>
    )
}

export default About