import { useContext, useState } from "react"
import { Context } from "../App"
import { Link } from "react-router-dom"
import Search from "./Search"
function DisplayStocks() {
    const context = useContext(Context)
    const [buyShares, setBuyShares] = useState(null)
    const [shares, setShares] = useState('')
    const [hover, setHover] = useState(false)
    const [search, setSearch] = useState('')

    function handleMouseEnter(id) {
      setBuyShares(id)
      setShares('')
    }
    function handleSharesChange(e) {
      setShares(e.target.value)
    }
    function handleBuy(stockId) {
      if (shares === '') {
        alert('Invalid input')
      }
      const newStock = {
        shares: Number(shares),
        user_id: context.user.id,
        stock_id: stockId
      }
      fetch('/user_stocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStock)
      })
      .then(r => {
        if (r.ok) {
          return r.json()
        } else {
          alert('Invalid input')
        }
      })
      .then(r => {
        context.user.my_stocks.push(r)
    })
    }

    function handleUpdatePrice(id) {
      fetch(`/stock/update/${id}`)
      .then(r => r.json())
      .then(r => {
        const updatedStocks = context.stocks.map((stock) => {
          if (stock.id === id) {
            stock.price = r['updated price']
          }
          return stock
        })
        context.setStocks(updatedStocks)
      })
      .catch((error) => {
        console.log(error)
        return alert("Sorry we couldn't find your stock")
      })
    }
    
    function handleSearch(value) {
      setSearch(value)
    }

    function handleClearBtnClick() {
      setSearch('')
    }

    if (!context.stocks) {
      return <h2>loading...</h2>
    }
    let SearchedStocks = context.stocks.filter((stock) => stock.name.toLowerCase().includes(search.toLowerCase()))

    return <>
            <Search handleSearch={handleSearch} search={search} handleClearBtnClick={handleClearBtnClick} />
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

        {SearchedStocks.map((stock) => {
            return <div key={stock.id} style={containerStyle}>
                <div >
                        {buyShares !== stock.id && context.user && <button  onMouseLeave={() => setBuyShares(null)} onMouseEnter={() => handleMouseEnter(stock.id)} style={buyBtn}>Buy</button>}
                        {buyShares === stock.id && context.user && <div style={divForShares} onMouseEnter={() => handleMouseEnter(stock.id)} onMouseLeave={() => setBuyShares(null)}>
                        <input style={inputForShares} onChange={handleSharesChange} value={shares} placeholder="Shares" name="sellSharesInput"autoComplete="off"/>
                        <button style={buttonForShares} onClick={() => handleBuy(stock.id)}>Buy</button></div>
                        }
                </div>
                <div style={!context.user ? tickerStyle : loggedInTickerStyle}>
                    <h4>{stock.ticker}</h4>
                    <p>{stock.name}</p>
                    <Link to={`/stock/${stock.id}`}><button onMouseEnter={() => setHover(stock.id)} onMouseLeave={() => setHover(false)} style={hover === stock.id ? hoverInfoBtn : InfoBtn }>Stock chart</button></Link>
                </div>
                <div style={priceStyle}>
                    <h4>{stock.price}</h4>
                    <button onMouseEnter={() => setHover(stock.name)} onMouseLeave={() => setHover(false)} onClick={() => handleUpdatePrice(stock.id)} style={hover === stock.name ? hoverRefreshBtn: refreshBtn}>Refresh</button>
                </div>
                <div style={industryStyle}>
                    <h4>{stock.industry}</h4>
                </div>
                <div style={marketCapStyle}>
                    <h4>{stock.market_cap}</h4>
                </div>
            </div>
        })}
    </>
}

const hoverRefreshBtn = {

  cursor: 'pointer',
  color: 'blue',
  borderRadius: '4px',
  border: ' 1px solid black'
  };

const refreshBtn = {
  borderRadius: '4px',
  border: ' 1px solid black'
  };

const hoverInfoBtn = {
  cursor: 'pointer',
  color: 'blue',
  borderRadius: '4px',
  border: ' 1px solid black'
  };

const InfoBtn = {
  borderRadius: '4px',
  border: ' 1px solid black'
  };

const buyBtn = {
    cursor: 'pointer',
    padding: '12px 20px',
    fontSize: 'large',
    color: 'blue',
    borderRadius: '10px',
    border: ' 2px solid blue'
  };

const divForShares = {
      display: 'flex',
      flexDirection: 'row'
  };

const inputForShares = {
  padding: '6px 2px',
  border: "1px solid #ccc",
  borderRadius: "4px",
  width: '25%',
  };

const buttonForShares = {
  padding: "6px 10px",
  border: "none",
  borderRadius: "4px",
  backgroundColor: "blue",
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

const loggedInTickerStyle = {
  minWidth: "29%",
  padding: "0 10px",
  borderRight: "1px solid #ccc",
  };

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
  
  export default DisplayStocks;
  
  
  
  
  
  
  
  