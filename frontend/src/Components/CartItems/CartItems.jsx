import React, { useContext, useState } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png';
import axios from 'axios';
const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState(false);

    const handleCheckout = () => {
        console.log(phoneNumber);
        const totalAmount = getTotalCartAmount();
        axios.post('http://localhost/E-commerce-rest-api/mpesa/read.php', { phoneNumber, totalAmount })
            .then(response => {
                console.log('Order placed successfully:', response.data);
            })
            .catch(error => {
                console.error('Error placing order:', error);
            });
    };
    return (
        <div className="cartitems">
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />

            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div>
                            <div className="cartitems-format cartitems-format-main">
                                <img className='carticons-product-icon' src={e.image} alt="" />
                                <p>{e.name}</p>
                                <p>Ksh. {e.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>Ksh. {e.new_price * cartItems[e.id]}</p>
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="remove_icon" />
                            </div>
                            <hr />
                        </div>
                    )
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-items">
                            <p>Subtotal</p>
                            <p>Ksh. {getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-items">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-items">
                            <h3>Total</h3>
                            <h3>Ksh. {getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    {error && (
                        <div className="cartitems-middle">
                            <span>Invalid Phone Number !</span>
                        </div>
                    )}
                    <div className="cartitems-end">
                        {!checked && (
                            <>
                                <input type="text"  
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Phone Number"/>
                                <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
                            </>
                        )}
                        {checked && (
                            <button style={{background:'#00ee93'}}>Ksh. {getTotalCartAmount()} CHECKED</button>
                        )}
                    </div>
                    
                </div>
                <div className="cartitems-codes">
                    <div className="cartitems-promocode">
                        <p>If you have a promo code, Enter it here.</p>
                        <div className="cartitems-promobox">
                            <input 
                                type="text"  
                                placeholder="Promo Code"
                            />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems
