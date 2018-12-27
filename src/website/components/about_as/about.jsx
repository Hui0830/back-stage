import React from 'react';

import { style } from './index.scss';

const About = ({descript,title, url}) => {
    return (
        <div className={style}>
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
                <video controls preload='auto' src={url}></video>
            </div>
        </div>
    )
}

export default About