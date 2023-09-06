import { useState, useEffect } from "react"

import weatherService from '../services/Weather'

const CountryDetails = ({ country }) => {
    const [weather, setWeather] = useState(null);
    
    useEffect(() => {
        weatherService.getWeather(country.latlng[0], country.latlng[1])
            .then(weather => {
                console.log('useEffect', weather, weather.main.temp)
                setWeather(weather)
            })
      }, []);
    
    return (
        <div>
            <h1>{ country.name.common }</h1>
            
            <p>Capital: { country.capital.map((cap, i) => <span key={i}>{ cap }</span>) }</p>
            <p>Area: { country.area }</p>
    
            <h4>languages:</h4>
            <ul>
                { Object.values(country.languages).map((language, i) => <li key={i}>{ language }</li>) }
            </ul>
    
            <img src={country.flags.png} alt="Flag" />
    
            {
                weather && 
                    <>
                        <h3>Weather in { country.capital[0] }</h3>
                        <p>
                            Temperature: { weather.main.temp }<br />
                            <img src={ `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` } />
                        </p>
                        <p>Wind: { weather.wind.speed } m/s</p>
                    </>
            }
        </div>
    )
}

const CountryLine = ({ country, setCountrySearched }) => (
    <div>
        <span>{ country.name.common }</span>
        <button onClick={() => setCountrySearched(country.name.common)}>Show</button>
        <br />
    </div>
)

const CountriesList = ({ countries, setCountrySearched }) => (
    <div>
        { countries.map((country, i) => 
            <CountryLine country={country} key={i} setCountrySearched={setCountrySearched}/>) }
    </div>
)

const CountriesDisplay = ({ countriesFiltered, setCountrySearched }) => {
    if (countriesFiltered === undefined || countriesFiltered.length === 0) return;
    
    if (countriesFiltered.length === 1) {
        return  <CountryDetails country={countriesFiltered[0]} />
    } else if (countriesFiltered.length <= 10) {
        return <CountriesList countries={countriesFiltered} setCountrySearched={setCountrySearched} />
    } else {
        return <div>Too many matches, specify another filter</div>
    }  
}

export { CountriesDisplay, CountryDetails };