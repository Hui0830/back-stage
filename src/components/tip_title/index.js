import React from 'react';
require('./index.scss');
const TipTitle = ({title, className}) => {
    return (
        <div className={`${className || ''} tip-title`}>
            {title}
        </div>
    )
}

export default TipTitle;