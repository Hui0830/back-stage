import React from 'react'
import {Tooltip, Icon} from 'antd'
export default ({title, desc, link}) => {
    return (
        <div>
            {
                link ?
                    <a href={`#/${link}`}>{title}</a> :
                    <span style={desc ? {} : {marginRight: 20}}>{title}</span>
            }
            {
                desc ?
                    <Tooltip title={desc} overlayClassName='desc-show'>
                        <span className="overview-title"><Icon type="question-circle" /></span>
                    </Tooltip> :
                    null
            }
        </div>
    )
}