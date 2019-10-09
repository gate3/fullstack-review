import React from 'react'

export default ({children, visible = false}) => (
    <div>
        {   
            visible && 
            <div className='loading-screen'>
                <h1>...Loading</h1>
            </div>
        }
        {children}
    </div>
)