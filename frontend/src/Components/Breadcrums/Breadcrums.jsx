import React from 'react'
import './Breadcrums.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'
const Breadcrum = (props) => { 
    const {product} = props;
    return (
        <div className="breadcrum">
            HOME <img src={arrow_icon} alt="arrow_icon" /> SHOP <img src={arrow_icon} alt="arrow_icon" /> {product.category} product <img src={arrow_icon} alt="arrow_icon" /> {product.name}
        </div>
    )
}

export default Breadcrum
