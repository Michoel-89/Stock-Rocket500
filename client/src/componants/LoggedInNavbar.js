import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react"
import { Context } from "../App"
function LoggedInNavbar() {
    const user = useContext(Context)
    console.log(user)
    function handleLogoutClick() {
        fetch('logout', {
            method: 'DELETE',
          }).then(() => {
            user.setUser(null)});
    }
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
              <button onClick={handleLogoutClick} style={logoutTextStyle} >Logout</button>
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

  const logoutTextStyle = {
    fontSize: '1.2rem',
    color: 'black',
    fontWeight: 'normal',
    backgroundColor: 'grey',
    border: 'none',
    cursor: 'pointer'
  }
export default LoggedInNavbar