import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../Item/Item'
const NewCollections = () => {
    const [new_collections, setNew_Collections] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/newcollection")
        .then((res) => res.json())
        .then((data) => setNew_Collections(data));
    }, []);
    return (
        <div className="new-collections">
            <h1>NEW COLLECTIONS</h1>
            <hr/>
            <div className="collections">
                {new_collections.map((item, i) => {
                    return <Item  key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}  />
                })}
            </div>
        </div>
    )
}

export default NewCollections
