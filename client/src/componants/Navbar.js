import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
    const [hover, setHover] = useState(false)

  return (
    <div style={navbarStyle}>
        <div style={{ marginRight: '50%' }} >
            <h2 >StockRocket500</h2>
        </div>
        <div>
            <Link style={{ textDecoration: 'none', color: 'black', fontSize: '1.2rem',  }} to={'/'} >Home
            </Link>
        </div>
        <div >
            <Link style={{ textDecoration: 'none' }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} to="/login">
                {hover ? <h2 style={loginTextStyle}>Login</h2> : <img
                src="https://th.bing.com/th/id/OIP.gtKWNv4V0X-EQyMmtJX7WwAAAA?w=151&h=151&c=7&r=0&o=5&pid=1.7"
                alt="login pic"
                style={loginImageStyle}
            />}
            </Link>
        </div>
    </div>
  );
}
const navbarStyle = {
    
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "gray", 
    padding: '0'
  };

  const loginImageStyle = {
    width: "30px", 
    height: "30px", 
    borderRadius: '60%'
  };
  const loginTextStyle = {
    fontSize: '1.2rem',
    color: 'black',
    fontWeight: 'normal'
  }

export default Navbar;

