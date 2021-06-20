import React, { useState } from 'react'
const TestComponent = () => {
    const [count, setCount] = useState()
    const buttonOnClick = () => {
        setCount(count + 1)
    }
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={buttonOnClick}>
                Click me
            </button>
        </div>
    )
}