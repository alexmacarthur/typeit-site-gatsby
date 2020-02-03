import React from 'react';

export default ({toggleMenu, menuIsOpen}) => {
    return (
        <button
            className="z-30 lg:hidden"
            aria-haspopup="true"
            aria-label="toggle menu"
            aria-expanded={menuIsOpen ? "true" : "false"}
            onClick={toggleMenu}
        >
            <ul
                className={`
                        menuIcon 
                        transition-all
                        ${menuIsOpen ? "is-open" : ""} 
                        flex 
                        flex-col 
                        justify-between
                        `}
            >
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </button>
    )
}
