import React,{ Component } from 'react';
import {Divider,Icon,Skeleton} from 'antd';

import { style } from './index.scss';

class ActicleView extends Component {
    state = {
        fontSize: 14,
    }
    // 字体加减
    onFontUpOrDown = (type) => {
        const { fontSize } = this.state;
        if(type === 'down') {
            fontSize <= 14 || this.setState({
                fontSize: fontSize-2,
            })
        }
        if(type === 'up') {
            fontSize >= 20 || this.setState({
                fontSize: fontSize+2,
            })
        }
    }
    render() {
        const { fontSize } = this.state;
        const { articleInfo, time, loading } = this.props;
        return (
            <div className={style}>
                <Skeleton loading={loading} active>
                    <header>
                        <h1>{articleInfo.title}</h1>
                    </header>
                    <Divider>
                        {articleInfo.description}
                    </Divider>
                    <div className="setting">
                        <span>
                            <Icon type="clock-circle" />
                            <span className="time">{time}</span>
                        </span>
                        <span className="font">
                            字体大小：
                            <Icon type="plus-square" onClick={() => this.onFontUpOrDown('up')} className="font-add" style={{color: fontSize==20 && '#a5a5a5'}} />
                            <Icon type="minus-square" onClick={() => this.onFontUpOrDown('down')} className="font-down" style={{color: fontSize==14 && '#a5a5a5'}} />
                        </span>
                    </div>
                    <article style={{ fontSize: fontSize }} dangerouslySetInnerHTML={{__html:articleInfo.content}}>
                        {/* {articleInfo.content} */}
                    </article>
                </Skeleton>
            </div>
        )
    }
}

export default ActicleView;