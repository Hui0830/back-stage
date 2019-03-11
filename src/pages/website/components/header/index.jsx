import React, { Component } from 'react';

import {imageFix} from 'common/conf/constant';

import Plan from 'components/plan';
import XymCarousel from '../carousel';
import LinkFrom from '../link_form';
import CarouselFrom from '../select_img_form';
import { style } from './index.scss';
import logo from '../../../../images/favicon.png';

class WebHeader extends Component {

    render() {
        const { navData,carousel,navLinks } = this.props;
        return (
            <div className={style}>
                <div className="nav-container">
                    <div className="nav-logo"><img src={logo} alt="logo"/></div>
                    <Plan
                            modal={
                               {
                                   content: <LinkFrom data={navData} navLinks={navLinks} onSave={(val) => this.props.onSave('nav', val)} />,
                                   config: {
                                       footer: null,
                                        title: '导航栏编辑',
                                        width: 620,
                                   },
                                }
                            }
                            style={{flex: 1}}
                        >
                            <ul className="nav">
                                {
                                    navData.map(item => <li key={item.name}>{item.name}</li>)
                                }
                            </ul>
                    </Plan>
                </div>
                <Plan
                    modal={
                        {
                            content: <CarouselFrom data= {carousel} navLinks={navLinks} onSave={(val) => this.props.onSave('carousel', val)}/>
                        }
                    }
                >
                    <XymCarousel>
                    {
                        carousel.map(item => <div key={item.url} className="item"><img src={imageFix + item.image} /></div>)
                    }
                    </XymCarousel>
                </Plan>
            </div>
            
        )
    }
}

export default WebHeader;