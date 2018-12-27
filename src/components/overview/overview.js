import React from 'react'
import './overview.scss'

export default ({children, style, className}) => {
    return (
        <div className={`overview-container ${className ? className : ''}`} style={style}>
            {children}
        </div>
    )
}