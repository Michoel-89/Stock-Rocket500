function Dropdowns({handleIndustryChange, handleSortChange}) {
    const industries = ['Electronic Technology', 'Technology Services', 'Retail Trade', 'Energy Minerals', 'Health Services', 'Commercial Services', 'Health Technology', 'Finance', 'Consumer Durables', 'Consumer Non-Durables', 'Consumer Services', 'Communications', 'Utilities', 'Process Industries', 'Transportation', 'Producer Manufacturing', 'Industrial Services', 'Distribution Services', 'Non-Energy Minerals']
    return <>
        <div style={dropdownDiv}>
            <select onChange={(e) => handleIndustryChange(e)} style={dropdown}>
                <option hidden >Filter by industry</option>
                <option>All</option>
                {industries.map((industry, index) => {
                    return <option key={index}>{industry}</option>
                })}
            </select>
            <select style={dropdown} onChange={(e) => handleSortChange(e)}>
                <option hidden >Sort</option>
                <option>Highest market cap</option>
                <option>Lowest market cap</option>
            </select>
        </div>
    </>
}

const dropdownDiv = {
    display: 'flex',
    flexDirection: 'row-reverse',
    backgroundColor: 'rgb(240, 240, 240)',
    padding: '7px',
    
    
}

const dropdown = {
    backgroundColor: 'rgb(240, 240, 240)',
    borderRadius: '50px',
    border: '1px solid black',
    outline: 'none',
    marginLeft: '1%'
}

export default Dropdowns