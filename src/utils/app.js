import axios from 'axios';

const pokemonAPI = axios.create(
    {
        baseURL: 'https://pokeapi.co/api/v2/'
    }
);

export const fetchPokemonData = (pokemonName) =>
{
    const pokemon = pokemonName.toLowerCase() === 'mimikyu' ? 'mimikyu-disguised' : pokemonName.toLowerCase();
    return pokemonAPI.get(`pokemon/${pokemon}`)
        .then((response) =>
        {
            return response.data;
        });
};