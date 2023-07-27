import './App.css';
import Navbar from './componants/Navbar';
import LoggedInNavbar from './componants/LoggedInNavbar'
import DisplayStocks from './componants/DisplayStocks';
import IndividualStock from './componants/IndividualStock';
import Login from './componants/Login';
import Signup from './componants/Signup';
import Profile from './componants/Profile';
import { useState, useEffect } from 'react';
import React from 'react';
import { Routes, Route } from 'react-router-dom'
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
      }, [setUser])
  return (

    <div className="App">

      <Context.Provider value={{user, setUser, stocks, setStocks}} >
        {user == null ? <Navbar />: <LoggedInNavbar />}
        <Routes>
          <Route path='/' element={<DisplayStocks />}>
            <Route path='/stock/<int:id>' element={<IndividualStock />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path="/signup" element={<Signup />}/>
          <Route path="/profile" element={<Profile />}/>
        </Routes>
      </Context.Provider>
    </div>
  );
}

export default App;
