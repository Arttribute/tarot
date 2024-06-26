import React from 'react'
import '../game/Styles/CardStack.css';

const Card_stack = () => {
    return (

        <div className="flex flex-col card-stack justify-center items-center">

            <div className="card custom-background">
            </div>
            <div className="card custom-background"></div>
            <div className="card custom-background flex flex-col justify-center items-center">
            <div className='inside_card custom-background'>
            </div>
            </div>
        </div>

    )
}

export default Card_stack