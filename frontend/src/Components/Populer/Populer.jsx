import React, { useEffect, useState } from 'react';
import './Populer.css';
import Item from '../Item/Item';

const Populer = () => {
    const [populerproducts, setPopulerProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/populerinwomen")
        .then((res) => res.json())
        .then((data) => setPopulerProducts(data));
    }, [])
    return (
        <div className="populer">
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div className="populer-item">
                {populerproducts.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}  />
                })}
            </div>
        </div> 
    )
}

export default Populer
