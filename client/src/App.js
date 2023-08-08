import './App.css';
import Navbar from './componants/Navbar';
import LoggedInNavbar from './componants/LoggedInNavbar'
import DisplayStocks from './componants/DisplayStocks';
import StockChart from './componants/StockChart';
import Login from './componants/Login';
import Signup from './componants/Signup';
import Profile from './componants/Profile';
import { useState, useEffect } from 'react';
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import stockImg from '/home/michoel/final-project/client/src/componants/stock-market-graph-trading-chart-for-business-and-finance-free-vector.jpg'

export const Context = React.createContext()


function App() {
  const [stocks, setStocks] = useState(null)
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    fetch('/stocks')
    .then(r => r.json())
    .then(r => setStocks(r))
  }, [])

  useEffect(() => {
    fetch('check_session')
    .then(r => {
      if(r.ok) {
         return r.json()
      }
    })
    .then(r => {
      setUser(r)
    })
      }, [stocks])
  return (

    <div className="App">

      <Context.Provider value={{user, setUser, stocks, setStocks}} >
        {user == null ? <Navbar />: <LoggedInNavbar />}
        
        <Routes>
          <Route path='/' element={<img alt='stock graph with an arrow pointing up' src={stockImg} width={1263} height={495} />}/>
          <Route path='/displayStocks' element={<DisplayStocks />} />
          <Route path='/stock/:id' element={<StockChart />} />
          <Route path='/login' element={<Login />} />
          <Route path="/signup" element={<Signup />}/>
          <Route path="/profile" element={<Profile />}/>
        </Routes>
      </Context.Provider>
    </div>
  );
}

export default App;
