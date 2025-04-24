import { useEffect, useState } from 'react'
import './App.css'
import Country from './Country'

function App() {
  interface CountryInterface{
    name:string,
    topLevelDomain:string,
    alpha2Code:string,
    alpha3Code:string,
    capital:string,
    region:string,
    subregion:string,
    flag:string,
    population:number,
  }

  const [countries, setCountries] = useState<CountryInterface[]>([])
  const [countriesFiltered, setCountriesFiltered] = useState<CountryInterface[]>([])

  const filtering = (()=>{
      console.log('a')
      let list: CountryInterface[] = [];
      countries.map((country)=>{
        if (country.name?.toLowerCase().includes(document.getElementsByTagName('input')[0].value.toLowerCase())) {
          list.push(country)
        }
        else if (country.capital?.toLowerCase().includes(document.getElementsByTagName('input')[0].value.toLowerCase())) {
          list.push(country)
        }
        else if (country.subregion?.toLowerCase().includes(document.getElementsByTagName('input')[0].value.toLowerCase())) {
          list.push(country)
        }
      })
      setCountriesFiltered(list)
  
    }
  )

  useEffect(()=>{
    fetch("data.json")
    .then(n=>n.json())
    .then((json)=>{
      setCountries(json)
      setCountriesFiltered(json)
      console.log(json)
    
    })
  },[])

  return (
    <>
  <div id='filterLine'>
    <div id='searchbarDiv'>
      <img src="zoom-lens.png" alt="" />
      <input id='searchBar' onChange={filtering} placeholder='Search for a country...' type="text"/>
    </div>
    <div id='regionFilter'>
        <select>
            <option value="all">All</option>
            <option value="europa">Africa</option>
            <option value="africa">America</option>
            <option value="europa">Asia</option>
            <option value="africa">Europe</option>
            <option value="europa">Oceania</option>
        </select>
    </div>
  </div>


    <div id='countryGrid'>
        {countriesFiltered.map((country) => (
            <Country
              key={country.alpha3Code}
              name={country.name}
              flag={country.flag}
              capital={country.capital}
              region={country.region}
              population={country.population}
            />
          ))}
    </div>

    </>
  )
}

export default App
