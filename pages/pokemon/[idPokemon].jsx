import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'




const PokemonDetail = () => {
    const [pokeDetail, setPokeDetail] = useState({})
    const router = useRouter()
    console.log(router.query)
    const { url = '' } = router.query

    

    useEffect(() => {
        const getPokemon = async(url) => {
            if (url) {
                try {
                    const res = await fetch(url);
                    const data = await res.json();
                    console.log(data)
                    setPokeDetail(data) 
                } catch (error) {
                    console.log(error)
                } 
            }
        }

        getPokemon()
    }, [url])
    
    console.log(pokeDetail)

    
  return (
    <>
        
        <div>
            <img src={pokeDetail.sprites.front_default} /> 
            <p>{pokeDetail.name}</p>
        </div>
        <div>
            <span>Habilidades:</span>
            <ul>
                {
                    pokeDetail.abilities.map( pokemon => (
                        <li key={pokemon.id}>
                            { pokemon.ability.name }
                        </li>
                    ))
                }
            </ul>
        </div>
    </>
    
  )
}

export function getServerSideProps ({ params }) {
    const { idPokemon } = params
    return { props: { idPokemon } }
}

export default PokemonDetail


