import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
const Navbar = () => {
    const [menu, setMenu] = useState("shop")
    const {getTotalCartItems} = useContext(ShopContext)
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible')
        e.target.classList.toggle('open');
    }
    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="logo" />
                <p>SHOPPER</p>
            </div>
            <MdOutlineArrowDropDownCircle className="nav-dropdown" onClick={dropdown_toggle} />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => {setMenu("shop")}}><Link style={{textDecoration:'none'}} to="/">Shop</Link> {menu === "shop" ? <hr/>: <></>}</li>
                <li onClick={() => {setMenu("mens")}}><Link style={{textDecoration:'none'}} to="/mens">Men</Link>  {menu === "mens" ? <hr/>: <></>}</li>
                <li onClick={() => {setMenu("womens")}}><Link style={{textDecoration:'none'}} to="/womens">Women</Link>  {menu === "womens" ? <hr/>: <></>}</li>
                <li onClick={() => {setMenu("kids")}}><Link style={{textDecoration:'none'}} to="/kids">Kids</Link>  {menu === "kids" ? <hr/>: <></>}</li>
            </ul>
            <div className="login-nav-cart">
                {localStorage.getItem('auth-token') ? <button onClick={() => {localStorage.removeItem('auth-token'); window.location.replace('/')}}>Logout</button>:
                <Link style={{textDecoration:'none'}} to="/login"><button>Login</button></Link>}
                <Link style={{textDecoration:'none'}} to="/cart"><img src={cart_icon} alt="cart_icon" /></Link>
                <div className="login-nav-cart-counter">
                    {getTotalCartItems()}
                </div>
            </div>
        </div>
    )
}

export default Navbar
