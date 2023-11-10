
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import styles from './index.module.css'


const HomePage = () => {

const [pokemons, setPokemons] = useState([])

const router = useRouter()

useEffect(() => {
    // getPokemons().then(setPokemons)
    const getPokemons = async() => {
    try{
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`)
      const { results } = await res.json();
      setPokemons(results)
    }
      catch(err){ console.log(err)}
    }
    getPokemons().catch(null)
},[])


const onClickPokemonDetail = ({ pokemon = {}}) => {
    router.push({ pathname:`/pokemon/${pokemon.name}/`, query: {...pokemon} })
}

  return (
    <>
      <header className={styles.header}>Pokedex Nextjs</header>
      <div className={styles.mainContainer}>
      {
          pokemons.map( pokemon => {
              const { name='', url='' } = pokemon;
              const pokemonNumber =url.split('/').slice(-2)[0]
              return (
                  <div 
                  className={styles.cardPokemon}
                  key={`list-pokemon-${name}`} 
                  onClick={() => onClickPokemonDetail({pokemon})}
              >
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`} />
                  <span>{name}</span>
                  </div>
              )
          })
      }
      </div>
    </>
  )
}

export default HomePage