import { useContext } from "react"
import { Context } from "../App"
function DisplayStocks() {
    const con = useContext(Context)
    return <>
        {con.stocks.map((stock) => {
            return <div key={stock.id}>
                <h6>{stock.ticker}</h6>
                <h2>{stock.name}</h2>
                <h4>{stock.industry}</h4>
                <h5>Market Capitalization: {stock.market_cap}</h5>
            </div>
        })}
    </>
}
export default DisplayStocks