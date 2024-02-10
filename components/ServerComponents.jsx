import React from 'react'
import { TodoButton } from './Clients'

export const TodoItem = ({ title, description, id, completed }) => {
    return (
        <div className='todo'>
            <div>
                <h4 style={{ color: 'black', fontWeight: 'bold' }}>{title}</h4>
                <p style={{ color: 'black' }}>{description}</p>
            </div>

            <div>
                <TodoButton id={id} completed={completed} />
            </div>
        </div>
    )
}