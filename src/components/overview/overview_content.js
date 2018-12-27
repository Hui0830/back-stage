import React from 'react';
import {Button} from 'antd';

export default ({content, btnText, btnAction, tip, desc}) => {
    return (
        <div className="contentText">
            {content != undefined && <span style={desc ? {} : {marginRight: '20px'}}>{content}</span>}
            {
                !!btnText &&
                <Button type="primary" onClick={btnAction}>
                    {btnText}
                </Button>
            }
            {!!tip && <p style={{fontSize: '12px', textAlign: 'center', color: '#888', position: 'relative', top: 10}}>{tip}</p>}
        </div>
    )
}