import React, { Component } from 'react';

import Plan from 'components/plan';
import XymCarousel from '../carousel';
import NavFrom from './nav_from';

import { style } from './index.scss';
import logo from '../../../images/favicon.png';

class WebHeader extends Component {
    state = {
    }

    render() {
        const { navData,carousel } = this.props;
        return (
            <div className={style}>
                <div className="nav-container">
                    <div className="nav-logo"><img src={logo} alt="logo"/></div>
                    <Plan
                            modal={
                               {
                                   content: <NavFrom navData={navData} onSave={(val) => this.props.onSave('nav', val)} />,
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
                <Plan>
                    <XymCarousel>
                    {
                        carousel.map(item => <div key={item.url} className="item"><img src={item.img} /></div>)
                    }
                    </XymCarousel>
                </Plan>
            </div>
            
        )
    }
}

export default WebHeader;