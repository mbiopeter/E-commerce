import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
const Item = (props) => {
    return (
        <div className='item'>
            <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0, 1)} src={props.image} alt="" /></Link>
            <p>{props.name}</p>
            <div className="item-prices">
                <div className="item-price-new">
                    Ksh. {props.new_price}
                </div>
                <div className="item-price-old">
                    Ksh. {props.old_price}
                </div>
            </div>
        </div>
    )
}

export default Item
