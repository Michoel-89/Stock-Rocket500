import './styling/Dropdowns.css'
function Dropdowns({handleIndustryChange, handleSortChange}) {
    const industries = ['Electronic Technology', 'Technology Services', 'Retail Trade', 'Energy Minerals', 'Health Services', 'Commercial Services', 'Health Technology', 'Finance', 'Consumer Durables', 'Consumer Non-Durables', 'Consumer Services', 'Communications', 'Utilities', 'Process Industries', 'Transportation', 'Producer Manufacturing', 'Industrial Services', 'Distribution Services', 'Non-Energy Minerals', 'Security and Aerospace']
    return <>
        <div className='dropdownDiv'>
            <select onChange={(e) => handleIndustryChange(e)} className='dropdown'>
                <option hidden >Filter by industry</option>
                <option>All</option>
                {industries.map((industry, index) => {
                    return <option key={index}>{industry}</option>
                })}
            </select>
            <select className='dropdown' onChange={(e) => handleSortChange(e)}>
                <option hidden >Sort</option>
                <option>Highest market cap</option>
                <option>Lowest market cap</option>
            </select>
        </div>
    </>
}



export default Dropdowns