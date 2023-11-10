import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import styles from '../index.module.css'


const PokemonDetail = () => {
    const [pokeDetail, setPokeDetail] = useState({})
    const router = useRouter()
    console.log(router.query)
    const { url = '' } = router.query

    

    useEffect(() => {
        if (url) {
            const getPokemon = async() => {
                try {
                    const res = await fetch(url);
                    const data = await res.json();
                    console.log(data)
                    setPokeDetail(data) 
                } catch (error) {
                    console.log(error)
                } 
            }
            getPokemon().catch(null)
        }

    }, [url])
    
    console.log(url)

    
  return (
    <main className={styles.detailContainer}>
        <div className={styles.cardDetail}>
            <div>
                <img src={pokeDetail?.sprites?.front_default} /> 
                <p><strong>Nombre:</strong> {pokeDetail.name}</p>
                <p><strong>Height:</strong> {pokeDetail.height}</p>
                <p><strong>Weight:</strong> {pokeDetail.weight}</p>
            </div>
            <div>
                <strong>TIPO:</strong>
                <ul>
                {
                    pokeDetail.types?.map( pokemon => (
                        <li key={`pokemon-type-${pokemon.id}`}>{pokemon.type.name}</li>
                    ))
                }
                </ul>
            </div>
            <div>
                <span><strong>Habilidades:</strong></span>
                <ul>
                    {
                        pokeDetail.abilities?.map( pokemon => (
                            <li key={`pokemon-ability-${pokemon.id}`}>
                                { pokemon.ability.name }
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div>
                    <p><strong>Ataque:</strong> <b>{pokeDetail.stats?.find(stat => stat.stat.name === "attack")?.base_stat || 'N/A'}</b></p>
                    <p><strong>Defensa:</strong> <b>{pokeDetail.stats?.find(stat => stat.stat.name === "defense")?.base_stat || 'N/A'}</b></p>
            </div>
        </div>
    </main>
    
  )
}

export function getServerSideProps ({ params }) {
    const { idPokemon } = params
    return { props: { idPokemon } }
}

export default PokemonDetail


