import { useContext, useState } from "react";
import { Context } from "../App";
import { Link } from "react-router-dom";

function Profile() {
  const context = useContext(Context);
  const [username, setUsername] = useState(context.user.username);
  const [editMode, setEditMode] = useState(false);
  const [sellShares, setSellShares] = useState(null)
  const [hover, setHover] = useState(false)
  const [shares, setShares] = useState('')

  function handleMouseEnter(id) {
    setSellShares(id)
    setShares('')
  }

  function handleSharesChange(sharesToSell, currentShares) {
    if (sharesToSell >= currentShares) {
      alert("you don't own enough shares")
    }
    else{
      setShares(sharesToSell)
    }
  }

  function editUsername() {
    fetch(`/user/${context.user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    })
      .then((r) => r.json())
      .then((r) => setUsername(r.username));

    setEditMode(false); // Exit edit mode after submitting changes
  }

  function handleDelete(id, currentShares) {
    if (shares === '') {
      alert('Please specify the amount of shares')
    }
    const updatedShares = Number(currentShares - shares)
    fetch(`/user_stocks/${id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        shares: updatedShares
      })
  })
  .then(r => r.json())
  .then(r => {
    const updatedStocks = context.user.my_stocks.map((stock) => {
      if (stock.id === r.id) {
        return r
      } else {
        return stock
      }
    })
    context.setUser({
      ...context.user, my_stocks: updatedStocks
    })
    alert(`${shares} shares sold`)
  })
    setShares('')
  }

  function handleDeleteAll(id) {
    fetch(`/user_stocks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(r => r)
    .then(r => {
        if(r.ok) {
               const updatedStocks = context.user.my_stocks.filter((stock) => stock.id !== id)
               context.setUser({...context.user, my_stocks: updatedStocks})
            }
        else{
            return console.error("stock doesn't exist");
        }
    })
  }

  return (
    <>
      <div style={usernameDiv}>
        {!editMode && (
          <div
            style={labelStyle}
            onClick={() => setEditMode(true)}
          > Edit username</div>
        )}
        {editMode && (
          <>
            <label onClick={() => setEditMode(false)} style={labelStyle}>Close</label>
            <input
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              style={inputStyle}
            />
            <button onClick={editUsername} style={buttonStyle}>
              Submit
            </button>
          </>
        )}
      </div>
      <h2>Hello {username}.</h2>
      <p>You own shares in these companies.</p>
      <div style={headerStyle}>
                <div style={hTickerStyle}>
                    <h3>Company:</h3>
                </div>
                <div style={hSharesStyle}>
                    <h3>Shares:</h3>
                </div>
                <div style={hPriceStyle}>
                    <h3>Price:</h3>
                </div>
                <div style={hIndustryStyle}>
                    <h3>Sector:</h3>
                </div>
                <div style={hMarketCapStyle}>
                    <h3>Market cap:</h3>
                </div>
            </div>
            {context.user.my_stocks.map((stock) => {
              return  <div key={stock.id} style={containerStyle}>
                    <div style={sellBtns}>
                        {sellShares !== stock.id && <button onMouseEnter={() => handleMouseEnter(stock.id)} onMouseLeave={() => setSellShares(null)} style={sellBtn}>Sell</button>}
                        {sellShares === stock.id && <div style={divForShares} onMouseEnter={() => handleMouseEnter(stock.id)} onMouseLeave={() => setSellShares(null)}>
                        <input style={inputForShares} onChange={(e) => handleSharesChange(e.target.value, stock.shares)} value={shares} placeholder="Shares" name="sellSharesInput"autoComplete="off"/>
                        <button style={buttonForShares} onClick={() => handleDelete(stock.id, stock.shares)}>sell</button></div>
                        }
                        <button onClick={() => handleDeleteAll(stock.id)} style={sellAllBtn}>Sell All</button>
                    </div>
                    <div style={tickerStyle}>
                        <h4>{stock.stock.ticker}</h4>
                        <p>{stock.stock.name}</p>
                        <Link to={`/stock/${stock.id}`}><button onMouseEnter={() => setHover(stock.id)} onMouseLeave={() => setHover(false)} style={hover === stock.id ? hoverInfoBtn : InfoBtn }>Stock chart</button></Link>
                    </div>
                    <div style={sharesStyle}>
                      <h4>{stock.shares}</h4>
                    </div>
                    <div style={priceStyle}>
                        <h4>{stock.stock.price}</h4>
                    </div>
                    <div style={industryStyle}>
                        <h4>{stock.stock.industry}</h4>
                    </div>
                    <div style={marketCapStyle}>
                        <h4>{stock.stock.market_cap}</h4>
                    </div>
                </div>
            })}
    </>
  );
}

const hoverInfoBtn = {
  cursor: 'pointer',
  color: 'blue',
  borderRadius: '4px',
  border: ' 1px solid black'
}

const InfoBtn = {
  borderRadius: '4px',
  border: ' 1px solid black'
}

const usernameDiv = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "end",
};

const labelStyle = {
  cursor: "pointer",
  padding: "4px 12px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  backgroundColor: "#f0f0f0",
  color: "#333",
};

const inputStyle = {
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "4px 12px",
  fontSize: 'large'
};

const buttonStyle = {
  padding: "7px 12px",
  border: "none",
  borderRadius: "4px",
  backgroundColor: "#007bff",
  color: "#fff",
  cursor: "pointer",
};
const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  border: "1px solid #ccc",
  padding: "0 10px",
  backgroundColor: "#f0f0f0", // Use a light color for the header row background
};

const hTickerStyle = {
  minWidth: "34.6%",
  paddingLeft: '7.5%',
  padding: "0 10px",
  borderRight: "1px solid #ccc", // Add right border to the ticker
};

const hSharesStyle = {
  flex: '1',
  padding: '0 10px',
  borderRight: "1px solid #ccc",
}

const hPriceStyle = {
  flex: '1',
  padding: '0 10px',
  borderRight: "1px solid #ccc",
};

const hIndustryStyle = {
  flex: '1',
  minWidth: "30.5%",
  padding: '0 10px', 
  borderRight: "1px solid #ccc", // Add right border to the industry
};

const hMarketCapStyle = {
  flex: '1',
  minWidth: "14.4%",
  padding: "0 10px", // Add padding to the left and right of the market cap
};

const containerStyle = {
    display: 'flex', // default display is row
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #ccc",
    padding: "5px 0px",
};

const sellBtns = {
  display: 'flex',
  flexDirection: 'column',
  
}

const sellBtn = {
  cursor: 'pointer',
  padding: '12px 20px',
  fontSize: 'large',
  color: 'red',
  borderRadius: '10px',
  border: ' 2px solid red'
}

const inputForShares = {
  padding: '6px 2px',
  border: "1px solid #ccc",
  borderRadius: "4px",
  width: '50%',
  margin: 'auto',
}

const buttonForShares = {
  padding: "4px 10px",
  border: "none",
  borderRadius: "4px",
  backgroundColor: "red",
  color: "#fff",
  cursor: "pointer",
}

const divForShares = {
  display: 'flex', 
  flexDirection: 'row', 
  padding: '10px'
}
  
const sellAllBtn = {
    marginTop: '5px',
    cursor: 'pointer',
    padding: '12px 8px',
    fontSize: 'large',
    color: 'red',
    borderRadius: '10px',
    border: ' 2px solid red'
}

const tickerStyle = {
    minWidth: "29%",
    padding: "0 10px",
    borderRight: "1px solid #ccc", // Add right border to the ticker
};

const sharesStyle = {
    minWidth: "5%",
    flex: '1',
    padding: '1.5% 10px',
    borderRight: "1px solid #ccc",
}
  
const priceStyle = {
    flex: '1',
    padding: '1.5% 10px',
    borderRight: "1px solid #ccc",
};
  
const industryStyle = {
    flex: '1',
    minWidth: "30%",
    padding: '1.5% 10px', 
    borderRight: "1px solid #ccc", // Add right border to the industry
};
  
const marketCapStyle = {
    flex: '1',
    minWidth: "15%",
    padding: "0 10px", // Add padding to the left and right of the market cap
};

export default Profile;
