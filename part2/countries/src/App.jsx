import { useState, useEffect } from "react"

import countriesService from './services/Countries'

import CountryForm from './components/CountryForm'
import { CountriesDisplay, CountryDetails } from './components/CountriesDisplay'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countrySearched, setCountrySearched] = useState('');

  const handleCountrySearchedChange = (event) => setCountrySearched(event.target.value)

  useEffect(() => {
    countriesService.getAll().then(countries => {
      setCountries(countries);
    });
  }, []);

  const countriesFiltered = countries.filter(country => 
    country.name.common.toLowerCase().includes(countrySearched.toLowerCase()));

  return (
    <>
      <CountryForm 
        countrySearched={countrySearched} 
        handleCountrySearchedChange={handleCountrySearchedChange} 
      />

      <CountriesDisplay countriesFiltered={countriesFiltered} setCountrySearched={setCountrySearched} />
    </>
  )
}

export default App