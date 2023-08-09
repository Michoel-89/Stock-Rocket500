function Dropdown({handleDropdownChange}) {
    const industries = ['Electronic Technology', 'Technology Services', 'Retail Trade', 'Energy Minerals', 'Health Services', 'Commercial Services', 'Health Technology', 'Finance', 'Consumer Durables', 'Consumer Non-Durables', 'Consumer Services', 'Communications', 'Utilities', 'Process Industries', 'Transportation', 'Producer Manufacturing', 'Industrial Services', 'Distribution Services', 'Non-Energy Minerals']
    return <>
        <div style={dropdownDiv}>
            <select onChange={(e) => handleDropdownChange(e)} style={dropdown}>
                <option hidden >Filter by industry</option>
                <option>All</option>
                {industries.map((industry, index) => {
                    return <option key={index}>{industry}</option>
                })}
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
    outline: 'none'
}

export default Dropdown