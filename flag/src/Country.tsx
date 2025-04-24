import React from 'react'
import './App.css'

type CountryProps = {
    name: string;
    flag: string;
    capital: string;
    region: string;
    population: number;
  };

const Country = ({ name, flag, capital, region, population }: CountryProps) => {


    
  return (
    <div className='countrycontainer'>
        <img className='flag' src={flag}/>
        <h2>{name}</h2>
        <p><span>Population: </span>{population}</p>
        <p><span>Region: </span>{region}</p>
        <p><span>Capital: </span>{capital}</p>

    </div>
  )
}

export default Country