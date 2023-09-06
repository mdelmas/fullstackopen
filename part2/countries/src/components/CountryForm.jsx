const CountryForm = ({ countrySearched, handleCountrySearchedChange }) => (
    <div>
        Find countries 
        <input value={countrySearched} onChange={handleCountrySearchedChange} />
    </div>
);

export default CountryForm;