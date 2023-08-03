import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

function StockChart() {
  const [chartData, setChartData] = useState(null);
  const [stockData, setStockData] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    fetch(`/stock/${id}`)
      .then((r) => r.json())
      .then((r) => {
        const d = JSON.parse(r[1]);
        const stock_data = {};
        for (const k in d) {
          const dataEntries = Object.entries(d[k]);
          const convertedData = dataEntries.map(([timestamp, price]) => {
            const date = new Date(parseInt(timestamp));
            const dateString = date.toISOString().slice(0, 10);
            return { date: dateString, price: price };
          });
          stock_data[k] = convertedData;
        }
        setChartData([stock_data])
        setStockData(r[0])
        
    })
    .catch((error) => {
      console.log(error)
      return alert("Sorry we couldn't find your stock")
    })
  }, [id]);
  return (
    <>
      {chartData &&
        chartData.map((d, index) => {
          const todaysDate = chartData[0]['Open'][chartData[0]['Open'].length -1]['date']
          const oneYearOldDate = chartData[0]['Open'][0]['date']
          const livePrice = chartData[0]['Open'][chartData[0]['Open'].length -1]['price']
          const oneYearOldPrice = chartData[0]['Open'][0]['price']
          const shortenedPrice = Number(livePrice).toFixed(2)
          return <div key={index} >
            <h2>{`Ticker: ${stockData.ticker}`}</h2>
            <h2 style={{marginBottom: '0'}}>{`Live price: ${shortenedPrice}`}</h2>
            <h2 style={livePrice > oneYearOldPrice ? {color: '#90EE90'} : {color: 'red'}}>{`Year to date: ${livePrice > oneYearOldPrice ? '+' : ''}${Number(livePrice - oneYearOldPrice).toFixed(2)} (${livePrice > oneYearOldPrice ? '+' : ''}${Number(((livePrice - oneYearOldPrice) / oneYearOldPrice) *100).toFixed(2)}%)`}</h2>
            <div style={chartStyle}>
              <ResponsiveContainer width={'50%'} height={300}>
                <LineChart width={300} height={200} data={d[Object.keys(d)[0]]}>
                  <CartesianGrid/>
                  <XAxis hide dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone"  dataKey="price" stroke={livePrice > oneYearOldPrice ? '#90EE90' : 'red'} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>

            </div>
            <div style={{margin: '0 26.8% 2% 29.5%', border: '1px solid black'}} >
            <p style={{display: 'inline', paddingRight: '35%'}}>Start date: {oneYearOldDate}</p>
            <p style={{display: 'inline'}}>End date: {todaysDate}</p>
            </div>
          </div>
        })}
    </>
  );
}

export default StockChart;

const chartStyle = {
  display: 'flex', 
  flexDirection: 'row-reverse', 
  paddingRight: '2%',
  justifyContent: 'center'
}
