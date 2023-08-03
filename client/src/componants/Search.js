import { useState } from "react"

function Search({ handleSearch, search, handleClearBtnClick}) {
    const [revealSearch, setRevealSearch] = useState(false)
    return <div style={searchDiv}>
        {revealSearch && <>
        <button 
        onClick={handleClearBtnClick}
        style={clearBtn}
        >Clear</button> 
        <input 
            name="search" 
            onChange={(e) => handleSearch(e.target.value)} 
            value={search}
            style={inputStyle}
            placeholder="Search by company name"
            autoComplete="off"
        /></>}
        {!revealSearch ? <button 
        style={searchBtn} 
        onClick={() => setRevealSearch(true)}
        >Search</button> : 
        <button 
        style={closeBtn}
        onClick={() => setRevealSearch(false)}
        >Close</button>}
    </div>
}

const clearBtn = {
    border: 'none',
    outline: 'none', 
    cursor: 'pointer', 
}

const closeBtn = {
    border: 'none',
    outline: 'none', 
    cursor: 'pointer', 
    padding: '7px',
}

const searchBtn = {
    border: 'none',
    cursor: 'pointer',
    padding: '7px'
}

const inputStyle = {
    borderRadius: '5px',
    width: '15.5%',
    border: 'none',
    outline: 'none',
    fontSize: 'medium'
}

const searchDiv = {
    display: 'flex',
    flexDirection: 'row-reverse',
    backgroundColor: 'rgb(240, 240, 240)',
    padding: '7px'
}

export default Search