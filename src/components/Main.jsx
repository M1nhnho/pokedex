import { useState } from "react";
import PokemonInfo from "./PokemonInfo"
import Search from "./Search"

const Main = () =>
{
    const [pokemonSearch, setPokemonSearch] = useState('ditto');

    return (
        <main>
            <Search setPokemonSearch={setPokemonSearch} />
            <PokemonInfo pokemonSearch={pokemonSearch} />
        </main>
    );
};

export default Main;