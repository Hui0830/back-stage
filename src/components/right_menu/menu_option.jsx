import React from 'react';
export const MenuOption = ({onClick, text, children}) => {
    return (
        <div onClick={onClick} className="contextMenu-option">
            {children || text || ''}
        </div>
    )
}