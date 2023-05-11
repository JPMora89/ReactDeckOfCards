import React from 'react';
import './Card.css';

const Card = ({ image, transX, transY, rotateDeg }) => {
    const style = {
        transform: `rotate(${rotateDeg}deg) translateY(${transY}px) translateX(${transX}px)`
    }

    return (
        <div>
            <img src={image} alt="card" style={style} />
        </div>
    )

}

export default Card;