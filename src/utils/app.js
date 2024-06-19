import axios from 'axios';

const pokemonAPI = axios.create(
    {
        baseURL: 'https://pokeapi.co/api/v2/'
    }
);

export const fetchPokemonData = (pokemonName) =>
{
    return pokemonAPI.get(`pokemon/${pokemonName}`)
        .then((response) =>
        {
            return response.data;
        });
};