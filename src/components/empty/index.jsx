import React from 'react';
import { Icon } from 'antd';
require('./index.scss');

const Empty = ({text,isEmpty}) => (
        isEmpty ? 
            <div className='empty'>
                <Icon  type="meh" />
                <span>{text || '已经没有更多数据啦-_-!'}</span>
            </div> : ''
)
export default Empty;