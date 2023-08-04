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
        <div>
            <Link style={{ textDecoration: 'none', color: 'black', fontSize: '1.2rem',  }} to={'/displayStocks'} >Browse stocks
            </Link>
        </div>
        <div >
            <Link style={{ textDecoration: 'none' }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} to="/login">
                {hover ? <h2 style={loginTextStyle}>Login</h2> : <img
                src="https://th.bing.com/th/id/R.8f185ac6c4a78763aa31acf73ee3e46b?rik=X7w93PUB4j3AXg&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_568656.png&ehk=YMUL5OvijifwVr2xWFpqoEf4STb07PZwQdnl0ispWMc%3d&risl=&pid=ImgRaw&r=0"
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
    backgroundColor: "rgb(0, 220, 255)", 
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

