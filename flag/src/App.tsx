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
  const [isDark, setIsDark] = useState<boolean>(true)

  const filtering = (()=>{
      let list: CountryInterface[] = [];
      let searchText:string = document.getElementsByTagName('input')[0].value.toLowerCase()
      let regionFilter:string = document.getElementsByTagName('select')[0].value
      countries.map((country)=>{
        if (country.region==regionFilter||regionFilter=="All") {
          if (country.name?.toLowerCase().includes(searchText)) {
            list.push(country)
          }
          else if (country.capital?.toLowerCase().includes(searchText)) {
            list.push(country)
          }
          else if (country.subregion?.toLowerCase().includes(searchText)) {
            list.push(country)
          }
        }

      })
      setCountriesFiltered(list)
  
    }
  )

  const changeTheme = (()=>{
    if (!isDark) {
      document.documentElement.style.setProperty('--primary-color', '#202D36');
      document.documentElement.style.setProperty('--secondary-color', '#2B3743');
      document.documentElement.style.setProperty('--text-color', 'white');
      document.documentElement.style.setProperty('--contrast', '100%');

      setIsDark(true)
      console.log(isDark)
    }else{
      document.documentElement.style.setProperty('--primary-color', '#DADADA');
      document.documentElement.style.setProperty('--secondary-color', '#FFFFFF');
      document.documentElement.style.setProperty('--text-color', 'black');
      document.documentElement.style.setProperty('--contrast', '0%');
      setIsDark(false)
      console.log(isDark)
    }
  })

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
    <nav>
      <h1>Where in the world?</h1>
      <div id='themeDiv' onClick={changeTheme}>
        <img id='themeIcon' src={isDark?"moon.png":"sun.png"} alt=""/>
        <span>{isDark?"Dark mode":"Light mode"}</span>
      </div>
    </nav>
  <div id='filterLine'>
    <div id='searchbarDiv'>
      <img src="zoom-lens.png" alt="" />
      <input id='searchBar' onChange={filtering} placeholder='Search for a country...' type="text"/>
    </div>
    <div id='regionFilter'>
        <select onChange={filtering}>
            <option value="All">All</option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
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
