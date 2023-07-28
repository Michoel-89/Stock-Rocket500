import { useContext, useState } from "react";
import { Context } from "../App";

function Profile() {
  const context = useContext(Context);
  const [username, setUsername] = useState(context.user.username);
  const [editMode, setEditMode] = useState(false);

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

  function handleDelete(id) {
    fetch(`/user_stocks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(r => r)
    .then(r => {
        if(r.ok) {
               const updatedStock = context.user.my_stocks.filter((stock) => stock.id !== id)
               context.setUser({...context.user, my_stocks: updatedStock})
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
      <p>You own shares in these companies</p>
      <div style={headerStyle}>
                <div style={hTickerStyle}>
                    <h3>Company:</h3>
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
                    <div>
                        <button onClick={() => handleDelete(stock.id)} style={sellBtn}>Sell</button>
                    </div>
                    <div style={tickerStyle}>
                        <h4>{stock.stock.ticker}</h4>
                    <p>{stock.stock.name}</p>
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

const usernameDiv = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "end",
};

const labelStyle = {
  cursor: "pointer",
  padding: "5px 12px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  marginRight: "2px",
  backgroundColor: "#f0f0f0",
  color: "#333",
};

const inputStyle = {
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "5px 12px",
  marginRight: "2px",
  fontSize: 'large'
};

const buttonStyle = {
  padding: "8px 12px",
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
  minWidth: "35%",
  paddingLeft: '7.5%',
  padding: "0 10px",
  borderRight: "1px solid #ccc", // Add right border to the ticker
};

const hPriceStyle = {
  flex: '1',
  padding: '0 10px',
  borderRight: "1px solid #ccc",
};

const hIndustryStyle = {
  flex: '1',
  minWidth: "30%",
  padding: '0 10px', 
  borderRight: "1px solid #ccc", // Add right border to the industry
};

const hMarketCapStyle = {
  flex: '1',
  minWidth: "15%",
  padding: "0 10px", // Add padding to the left and right of the market cap
};

const containerStyle = {
    display: 'flex', // default display is row
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #ccc",
    padding: "10px",
  };

const sellBtn = {
    cursor: 'pointer',
    padding: '24px 24px',
    fontSize: 'large',
}

const tickerStyle = {
    minWidth: "35%",
    padding: "0 10px",
    borderRight: "1px solid #ccc", // Add right border to the ticker
  };
  
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
