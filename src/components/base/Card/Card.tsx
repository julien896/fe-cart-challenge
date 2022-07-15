import React from 'react'
import { CardProps } from './Card.types';

import './card.css'

const Card: React.FC<CardProps> = ({
    image,
    text,
    title,
    price,
    event,
    disabled
}) => {
    return(
        <div className='card-container'>
            <div className="top">
              <div className='w-3/5 flex justify-end'>
                <img src={image} alt={title} className="h-16 w-14" />
              </div>
              <span className='ml-auto justify-self-end bg-green-500 p-2 h-fit text-xs font-semibold rounded-2xl'>
                {price > 1 ? `${price} Gemas` : `${price} Gema`}
              </span>
            </div>
            <span className='title'>{title}</span>
            <span className='text'>{text}</span>
            <button disabled={disabled} className="button" onClick={event}>
                Agregar
            </button>
        </div>
    )
}

export default Card;