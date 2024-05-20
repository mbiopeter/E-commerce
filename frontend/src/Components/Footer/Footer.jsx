import React from 'react'
import './Footer.css'
import footer_logo from "../Assets/logo_big.png"
import instergrame_icon from "../Assets/instagram_icon.png"
import pintester_icon from "../Assets/pintester_icon.png"
import whatsapp_icon from "../Assets/whatsapp_icon.png"
const footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <img src={footer_logo} alt="footer_logo" />
                <p>SHOPPER</p>
            </div>
            <ul className="footer-links">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>Abaut</li>
                <li>Contact</li>
            </ul>
            <div className="footer-social-icons">
                <div className="footer-icons-container">
                    <img src={instergrame_icon} alt="instergrame_icon" />
                </div>
                <div className="footer-icons-container">
                    <img src={pintester_icon} alt="pintester_icon" />
                </div>
                <div className="footer-icons-container">
                    <img src={whatsapp_icon} alt="whatsapp_icon" />
                </div>
            </div>
            <div className="footer-copywrite">
                <hr />
                <p>Copywrite @ 2024 - All Rights Reserved</p>
            </div>
        </div>
    )
}

export default footer
