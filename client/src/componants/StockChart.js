import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import './styling/StockChart.css'
function StockChart() {
  const [chartData, setChartData] = useState(null);
  const [stockData, setStockData] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    fetch(`/stock/year/${id}`)
      .then((r) => {
        if (r.status === 200) {
          return r.json()
        } else {
          throw Error('error')
        }
      })
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
  }, []);

  if (!chartData) {
    return <h2>loading...</h2>
  }
  
  function handleDaysClick() {
    fetch(`/stock/days/${id}`)
    .then((r) => {
      if (r.ok) {
        return r.json()
      } else {
        throw Error('error')
      }
    })
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
    })
  }

  function handle3MoClick() {
    fetch(`/stock/3mo/${id}`)
    .then((r) => {
      if (r.ok) {
        return r.json()
      } else {
        throw Error('error')
      }
    })
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
    })
  }

  function handle6MoClick() {
    fetch(`/stock/6mo/${id}`)
    .then((r) => {
      if (r.ok) {
        return r.json()
      } else {
        throw Error('error')
      }
    })
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
    })
  }

  function handleYearClick() {
    fetch(`/stock/year/${id}`)
    .then((r) => {
      if (r.ok) {
        return r.json()
      } else {
        throw Error('error')
      }
    })
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
    })
  }

  return (
    <div className="chart">
      {chartData.map((d, index) => {
          const todaysDate = chartData[0]['Open'][chartData[0]['Open'].length -1]['date']
          const oneYearOldDate = chartData[0]['Open'][0]['date']
          const livePrice = chartData[0]['Open'][chartData[0]['Open'].length -1]['price']
          const oneYearOldPrice = chartData[0]['Open'][0]['price']
          const shortenedPrice = Number(livePrice).toFixed(2)
          return <div key={index} >
            <h2 style={{marginTop: '0', paddingTop: '2%', marginLeft: '5%'}}>{`Ticker: ${stockData.ticker}`}</h2>
            <h2 style={{marginBottom: '0', marginLeft: '5%'}}>{`Live price: ${shortenedPrice}`}</h2>
            <h2 style={livePrice > oneYearOldPrice ? {color: '#90EE90', marginLeft: '5%'} : {color: 'red', marginLeft: '4%'}}>{`${livePrice > oneYearOldPrice ? '+' : ''}${Number(livePrice - oneYearOldPrice).toFixed(2)} (${livePrice > oneYearOldPrice ? '+' : ''}${Number(((livePrice - oneYearOldPrice) / oneYearOldPrice) *100).toFixed(2)}%)`}</h2>
            <div style={{backgroundColor: 'rgb(26, 17, 16)', color: 'white', margin: '0 25.3% 0 30%', borderBottom: 'none', paddingBottom: '.5%' }}>
              <button onClick={() => handleDaysClick()} className="btn1">5 days</button>
              <button onClick={() => handle3MoClick()} className="btn2" >3 months</button>
              <button onClick={() => handle6MoClick()} className="btn3" >6 months</button>
              <button onClick={() => handleYearClick()} className="btn4" >1 year</button>
            </div>
            <div style={{backgroundColor: 'rgb(26, 17, 16)', color: 'white', margin: '0 25.3% 0 30%',}} >
            <p style={{display: 'inline', paddingRight: '35%'}}>Start date: {oneYearOldDate}</p>
            <p style={{display: 'inline'}}>End date: {todaysDate}</p>
            </div>
            <div className="chartStyle">
              <ResponsiveContainer width={'44.5%'} height={300} >
                <LineChart width={300} height={200} data={d[Object.keys(d)[0]]}>
                  <CartesianGrid/>
                  <XAxis hide dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone"  dataKey="price" stroke={livePrice > oneYearOldPrice ? '#90EE90' : 'red'} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div style={{margin: '0 25.3% 2% 30%', backgroundColor: 'rgb(26, 17, 16)', padding: '1% 0'}} >
            </div>
          </div>
        })}
    </div>
  );
}

export default StockChart;
