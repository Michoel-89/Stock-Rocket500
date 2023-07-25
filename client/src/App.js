import './App.css';
import DisplayStocks from './componants/DisplayStocks';
import { useState, useEffect } from 'react';
import React from 'react';
export const Context = React.createContext()


function App() {
  const [stocks, setStocks] = useState(null)
  const [user, setUser] = useState(null)
  useEffect(() => {
    fetch('/stocks')
    .then(r => r.json())
    .then(r => setStocks(r))
  }, [])
  return (

    <div className="App">
      <Context.Provider value={{user, setUser, stocks, setStocks}} >
        <DisplayStocks />
      </Context.Provider>
    </div>
  );
}

export default App;
