import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react"
import { Context } from "../App"
import './styling/LoggedInNavbar.css'
function LoggedInNavbar() {
    const [hover, setHover] = useState(false)
    const context = useContext(Context)
    const navigate = useNavigate()
    function handleLogoutClick() {
        fetch('logout', {
            method: 'DELETE',
          }).then(() => {
            context.setUser(null)});
            navigate('/')
    }
    return (
      <div style={navbarStyle}>
          <div style={{ marginRight: '40%' }} >
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
          <div>
              <Link style={{ textDecoration: 'none', color: 'black', fontSize: '1.2rem',  }} to={'/profile'} >Account
              </Link>
          </div>
          {hover && (<div onMouseLeave={() => setHover(false)} >
              <button onClick={handleLogoutClick} style={logoutTextStyle} >Logout</button>
          </div>)} 
          {!hover && (<img
                onMouseEnter={() => setHover(true)}
                src="https://th.bing.com/th/id/OIP.SLvBdi3X6WCSwcP0F8cy1wHaHa?w=164&h=180&c=7&r=0&o=5&pid=1.7"
                alt="logout pic"
                style={logoutImageStyle}
                 />)}
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

  const logoutTextStyle = {
    fontSize: '1.2rem',
    color: 'black',
    fontWeight: 'normal',
    backgroundColor: 'rgb(0, 220, 255)',
    border: 'none',
    cursor: 'pointer'
  }
  const logoutImageStyle = {
    width: "30px", 
    height: "30px", 
    borderRadius: '60%'
  };
export default LoggedInNavbar