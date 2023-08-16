import { useState } from "react"
import './styling/Search.css'

function Search({ handleSearch, search, handleClearBtnClick}) {
    const [revealSearch, setRevealSearch] = useState(false)
    return <div className='searchDiv'>
        {revealSearch && <>
        <button 
        onClick={handleClearBtnClick}
        className='clearBtn'
        >Clear</button> 
        <input 
            autoFocus
            name="search" 
            onChange={(e) => handleSearch(e.target.value)} 
            value={search}
            className='searchInputStyle'
            placeholder="Search by ticker"
            autoComplete="off"
        /></>}
        {!revealSearch ? <button 
        className='searchBtn' 
        onClick={() => setRevealSearch(true)}
        >Search</button> : 
        <button 
        className='closeBtn'
        onClick={() => setRevealSearch(false)}
        >Close</button>}
    </div>
}



export default Search