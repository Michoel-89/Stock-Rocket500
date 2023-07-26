import { useContext } from "react"
import { Context } from "../App"
function DisplayStocks() {
    const con = useContext(Context)
    return <>
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

        {con.stocks !== null ? con.stocks.map((stock) => {
            return <div key={stock.id} style={containerStyle}>
                <div style={tickerStyle}>
                    <h4>{stock.ticker}</h4>
                    <p>{stock.name}</p>
                </div>
                <div style={priceStyle}>
                    <h4>{stock.price}</h4>
                </div>
                <div style={industryStyle}>
                    <h4>{stock.industry}</h4>
                </div>
                <div style={marketCapStyle}>
                    <h4>{stock.market_cap}</h4>
                </div>
            </div>
        }) : <h2>Loading stocks...</h2>}
    </>
}
const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #ccc",
    padding: "0 10px",
    backgroundColor: "#f0f0f0", // Use a light color for the header row background
  };
  const hTickerStyle = {
    minWidth: "20%",
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

const tickerStyle = {
    minWidth: "20%",
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
  
  
  
  
  
  
  
  