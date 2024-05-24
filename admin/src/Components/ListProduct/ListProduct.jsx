import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from "../../assets/cross_icon.png"
 
const ListProduct = () => {

    const [allProducts, setAllProducts] = useState([])

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/allproducts')
        .then((res) => res.json())
        .then((data) => {setAllProducts(data)});
    }

    useEffect(() => {
        fetchInfo();
    },[])

    const reoveProduct = async (id)=> {
        await fetch("http://localhost:4000/removeproduct", {
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({id: id}),
        })
        await fetchInfo();
    }

    return (
        <div  className='listproduct' >
            <h1>All Product List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allProducts.map((product, index) => {
                    return(
                        <>
                            <div key={index} className="listproduct-format-main listproduct-format">
                                <img className="listproduct-product-icon" src={product.image} alt="" />
                                <p>{product.name}</p>
                                <p>Ksh. {product.old_price}</p>
                                <p>Ksh. {product.new_price}</p>
                                <p>{product.category}</p>
                                <img onClick={() => reoveProduct(product.id)} className='listproduct-remove-icon' src={cross_icon} alt="" />
                            </div>
                            <hr />
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default ListProduct
