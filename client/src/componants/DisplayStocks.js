import { useContext, useState } from "react"
import { Context } from "../App"
import { Link } from "react-router-dom"
import Search from "./Search"
import Dropdowns from "./Dropdowns"
import './DisplayStocks.css'
function DisplayStocks() {
    const context = useContext(Context)
    const [buyShares, setBuyShares] = useState(null)
    const [shares, setShares] = useState('')
    const [search, setSearch] = useState('')
    const [industry, setIndustry] = useState('All')
    const [sort, setSort] = useState(null)
    const [priceChange, setPriceChange] = useState({
      price: '',
      id: ''
    })

    function handleMouseEnter(id) {
      setBuyShares(id)
      setShares('')
    }

    function handleSharesChange(e) {
      setShares(e.target.value)
    }

    function handleBuy(stockId, stockPrice) {
      const price = Number(shares) * Number(stockPrice)
      const updatedBalance = Number(context.user.account_balance) - Number(price)
      if (shares === '') {
        alert('Invalid input');
        return;
      }
      if (context.user.account_balance < price) {
        alert('Insufficient funds');
        return;
      }
      fetch(`/user/${context.user.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          account_balance: updatedBalance
        })
      })
      .then(r => r.json())
      .then(r => {
        const existingStock = context.user.my_stocks.find(stock => stockId === stock.stock.id);
        if (existingStock) {
          const updatedShares = Number(existingStock.shares) + Number(shares);
          
          fetch(`/user_stocks/${existingStock.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              shares: updatedShares
            })
          })
          .then(r => r.json())
          .then((r) => {
            const updatedStocks = context.user.my_stocks.map((stock) => {
              if (stock.id === r.id) {
                return r
              } else {
                return stock
              }
            })
            context.setUser({
              ...context.user, my_stocks: updatedStocks, account_balance: updatedBalance
            })
            alert(`${shares} shares bought`)
            setShares('');
          });
        } else {
          const newStock = {
            shares: Number(shares),
            user_id: context.user.id,
            stock_id: stockId
          };
          
          fetch('/user_stocks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newStock)
          })
          .then(r => {
            if (r.ok) {
              return r.json();
            } else {
              alert('Invalid input');
            }
          })
          .then(newStockData => {
            context.user.my_stocks.push(newStockData);
            context.setUser({
              ...context.user, account_balance: updatedBalance
            })
            alert(`${shares} shares bought`)
            setShares('');
          });
        }
      })
    }

    function handleUpdatePrice(id) {
      fetch(`/stock/update/${id}`)
      .then(r => r.json())
      .then(r => {
        const updatedStocks = context.stocks.map((stock) => {
          if (stock.id === id) {
            if (stock.price <= r['updated price']) {
              setPriceChange({style: "priceIncreased", id: id})
            } else {
              setPriceChange({style: "priceDecreased", id: id})
            } 
            stock.price = r['updated price']
            stock.market_cap = r['updated market cap']
            return stock
          }
          return stock
        })
        console.log(updatedStocks)
        context.setStocks(updatedStocks)
        setTimeout(() => {
          setPriceChange({
            price: '',
            id: ''
        })
        }, 800);
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

    function handleIndustryChange(e) {
      setIndustry(e.target.value)
    }
    
    function handleSortChange(e) {
      sortStocks(e.target.value)
      setSort(e.target.value)
    }

    function sortStocks(order) {
      if (order === null) {
        return
      }
      let sorted = context.stocks.sort((a, b) => {
        let num1 = 0, num2 = 0
        let multipliers = {
          'Trillion': 1e12,
          'Billion': 1e9,
          'Million': 1e6
        }
        num1 = parseFloat(a.market_cap) * multipliers[a.market_cap.split(' ')[1]]
        num2 = parseFloat(b.market_cap) * multipliers[b.market_cap.split(' ')[1]]
        if (order === 'Highest market cap') {
          return num2 - num1
        } 
        return num1 - num2
      })
      return sorted
    }

    if (!context.stocks) {
      return <h2>loading...</h2>
    }
    
    let filterByIndustryAndSearch = context.stocks.filter((stock) => {
      return (industry === 'All' || stock.industry.toLowerCase().includes(industry.toLowerCase())) && (search === '' || stock.ticker.toLowerCase().includes(search.toLowerCase()))
    })

    return <>
        <Search handleSearch={handleSearch} search={search} handleClearBtnClick={handleClearBtnClick} />
        <Dropdowns handleSortChange={handleSortChange} handleIndustryChange={handleIndustryChange} />
        {filterByIndustryAndSearch.map((stock) => {
            return <div key={stock.id} style={containerStyle}>
                <div >
                        {buyShares !== stock.id && context.user && <button  onMouseLeave={() => setBuyShares(null)} onMouseEnter={() => handleMouseEnter(stock.id)} style={buyBtn}>Buy</button>}
                        {buyShares === stock.id && context.user && <div style={divForShares} onMouseEnter={() => handleMouseEnter(stock.id)} onMouseLeave={() => setBuyShares(null)}>
                        <input style={inputForShares} onChange={handleSharesChange} value={shares} placeholder="Shares" name="sellSharesInput"autoComplete="off"/>
                        <button style={buttonForShares} onClick={() => handleBuy(stock.id, stock.price)}>Buy</button></div>
                        }
                </div>
                <div style={tickerStyle}>
                    <h4>{stock.ticker}</h4>
                </div>
                <div style={nameStyle}>
                  <p>{stock.name}</p>
                </div>
                <div style={priceStyle}>
                    <h4 className={priceChange.id === stock.id ? priceChange.style : ''}>{(stock.price).toLocaleString(undefined, {minimumFractionDigits: '2', maximumFractionDigits: '2'})}</h4>
                </div>
                <div style={industryStyle}>
                    <h4>{stock.industry}</h4>
                </div>
                <div style={marketCapStyle}>
                    <h4 className={priceChange.id === stock.id ? priceChange.style : ''}>Market cap: {stock.market_cap}</h4>
                </div>
                <div style={chartAndRefreshDiv}>
                    <Link to={`/stock/${stock.id}`}><button className="infoBtn">Stock chart</button></Link>
                    <button onClick={() => handleUpdatePrice(stock.id)} className="refreshBtn">Refresh</button>
                </div>
            </div>
        })}
    </>
}

const chartAndRefreshDiv = {
  display: 'flex',
  flexDirection: 'column',
}

const buyBtn = {
    cursor: 'pointer',
    padding: '12px 20px',
    fontSize: 'large',
    color: '#6495ED',
    borderRadius: '10px',
    border: ' 2px solid #6495ED'
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
  backgroundColor: "#6495ED",
  color: "#fff",
  cursor: "pointer",
  };
  
const containerStyle = {
    display: 'flex', // default display is row
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #ccc",
    flexWrap: 'wrap'
  };

const tickerStyle = {
    padding: "0 10px",
    position: 'absolute',
    left: '8%'
  };
  
const nameStyle = {
  position: 'absolute',
  left: '14%'
}

const priceStyle = {
    padding: '1.5% 10px',
    position: 'absolute',
    left: '45%',
    color: 'orange'
  };
  
const industryStyle = {
    padding: '1.5% 10px', 
    position: 'absolute',
    left: '55%'
  };
  
const marketCapStyle = {
    padding: "0 10px", // Add padding to the left and right of the market cap
    position: 'absolute',
    left: '75%'
  };
  
  export default DisplayStocks;
  
  
  
  
  
  
  
  