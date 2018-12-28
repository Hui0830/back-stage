import React from 'react'

export default ({title, value, style, children, className}) => {
    if (children) {
        return (
            <div className={`overview-item ${className ? className : ''}`} style={style}>
                {children}
            </div>
        );
    }

    return (
        <div className={`overview-item ${className ? className : ''}`} style={style}>
            <div className="item-title">{title}</div>
            <div className="item-value">{value}</div>
        </div>
    )
}