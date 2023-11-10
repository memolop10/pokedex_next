
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import styles from './index.module.css'


const HomePage = () => {

const [pokemons, setPokemons] = useState([])
const [selectedType, setSelectedType] = useState('all');


const router = useRouter()

useEffect(() => {
    // getPokemons().then(setPokemons)
    const getPokemons = async() => {
    try{
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`)
      const { results } = await res.json();
      
       const pokemonDetailsPromises = results.map(async (pokemon) => {
        const pokemonDetailsRes = await fetch(pokemon.url);
        const pokemonDetails = await pokemonDetailsRes.json();
        return { ...pokemon, types: pokemonDetails.types };
    });

    const pokemonsWithTypes = await Promise.all(pokemonDetailsPromises);
    setPokemons(pokemonsWithTypes);
    }
      catch(err){ console.log(err)}
    }
    getPokemons().catch(null)
},[])

const handleTypeChange = (event) => {
  setSelectedType(event.target.value);
};

const onClickPokemonDetail = ({ pokemon = {}}) => {
    router.push({ pathname:`/pokemon/${pokemon.name}`, query: {...pokemon} })
}

const filteredPokemons =
        selectedType === 'all'
            ? pokemons
            : pokemons.filter((pokemon) => {
                  return pokemon.types.some((type) => type.type.name === selectedType);
              });
  return (
    <>
      <header className={styles.header}>Pokedex Nextjs</header>
      <div className={styles.mainContainer}>
                <select value={selectedType} onChange={handleTypeChange}>
                    <option value="all">All Types</option>
                    <option value="fire">FUEGO</option>
                    <option value="water">AGUA</option>
                </select>
      {
          filteredPokemons.map( pokemon => {
              const { name='', url='', types =[] } = pokemon;
              const pokemonNumber =url.split('/').slice(-2)[0]
              return (
                  <div 
                  className={styles.cardPokemon}
                  key={`list-pokemon-${name}`} 
                  onClick={() => onClickPokemonDetail({pokemon})}
              >
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`} />
                  <span>{name}</span>
                  <div>
                                <strong>Types:</strong>
                                <ul>
                                    {types.map((type, index) => (
                                        <li key={`pokemon-type-${index}`}>{type.type.name}</li>
                                    ))}
                                </ul>
                            </div>
                  </div>  
              )
          })
      }
      </div>
    </>
  )
}

export default HomePage