import { useState, useEffect } from "react";
import { fetchPokemonData } from "../utils/app.js";
import { typeColours } from "../utils/typeColours.js";
import Expander from "./Expander.jsx";
import MoveList from "./MoveList.jsx";
import { Radar } from 'react-chartjs-2';
import
{
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const PokemonInfo = ({ pokemonSearch }) =>
{
    const [pokemonData, setPokemonData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isNormalFront, setIsNormalFront] = useState(true);
    const [isShinyFront, setIsShinyFront] = useState(true);
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() =>
    {
        setIsLoading(true);
        setErrorMessage('')
        fetchPokemonData(pokemonSearch)
            .then((pokemonData) =>
            {
                const formattedPokemonData = {};
                formattedPokemonData.id = pokemonData.id;
                formattedPokemonData.name = pokemonData.name;

                formattedPokemonData.normalSprites = [pokemonData.sprites.front_default, pokemonData.sprites.back_default || pokemonData.sprites.front_default];
                formattedPokemonData.shinySprites = [pokemonData.sprites.front_shiny, pokemonData.sprites.back_shiny || pokemonData.sprites.front_shiny];

                formattedPokemonData.types = pokemonData.types.map((typeObj) => typeObj.type.name);
                formattedPokemonData.height = pokemonData.height;
                formattedPokemonData.weight = pokemonData.weight;

                const levelUpMoves = [];
                const machineMoves = [];
                formattedPokemonData.moves = pokemonData.moves.map((moveObj) =>
                {   
                    const formattedMoveObj = {name: moveObj.move.name};
                    const method = moveObj.version_group_details[0].move_learn_method.name;
                    formattedMoveObj.method = method;
                    if (method === 'level-up')
                    {
                        levelUpMoves.push({ name: moveObj.move.name, level: moveObj.version_group_details[0].level_learned_at });
                    }
                    else if (method === 'machine')
                    {
                        machineMoves.push({ name: moveObj.move.name });
                    }
                    return formattedMoveObj;
                });
                levelUpMoves.sort((a, b) => a.level - b.level);
                formattedPokemonData.levelUpMovesInPages = [];
                formattedPokemonData.machineMovesInPages = [];
                while (levelUpMoves.length > 0)
                {
                    formattedPokemonData.levelUpMovesInPages.push(levelUpMoves.splice(0, 10));
                }
                while (machineMoves.length > 0)
                {
                    formattedPokemonData.machineMovesInPages.push(machineMoves.splice(0, 10));
                }

                formattedPokemonData.cry = new Audio(pokemonData.cries.latest);
                formattedPokemonData.cry.volume = 0.25;

                formattedPokemonData.stats =
                {
                    labels: pokemonData.stats.map((statObj) => statObj.stat.name),
                    datasets:
                    [
                        {
                            label: 'Base Stats',
                            data: pokemonData.stats.map((statObj) => statObj.base_stat),
                            backgroundColor: 'rgba(0, 0, 255, 0.5)',
                            borderColor: 'transparent',
                        }
                    ]
                };
                
                setPokemonData(formattedPokemonData);
                setIsLoading(false);
            })
            .catch((error) =>
            {
                setErrorMessage(`Could not find "${pokemonSearch}"...`)
            });
    }, [pokemonSearch]);

    const flipPokemonOnClick = (setIsFront) =>
    {
        setIsFront((currentIsFront) => !currentIsFront);
        pokemonData.cry.play();
    };

    return isLoading ? (
        <>
            <div className="loading"></div>
            <p>{errorMessage}</p>
        </>
    ) : (
        <Expander heading="INFO" initialShowing={true}>
            <section className="pokemon-info grid-background">
                <h3>&nbsp;{pokemonData.id} {pokemonData.name}</h3>
                <img id="normal-sprite" src={pokemonData.normalSprites[isNormalFront ? 0 : 1]} onClick={() => flipPokemonOnClick(setIsNormalFront)} />
                <img id="shiny-sprite" src={pokemonData.shinySprites[isShinyFront ? 0 : 1]} onClick={() => flipPokemonOnClick(setIsShinyFront)} />
                <ul id='type-list'>
                    {pokemonData.types.map((type) =>
                    {
                        return (
                            <li key={type} className="type" style={{'--type-color': typeColours[type]}}>
                                {type}
                            </li>
                        )
                    })}
                </ul>
                <div id="height-weight">
                    <p>Height:</p><p>{pokemonData.height/10}m</p>
                    <p>Weight:</p><p>{pokemonData.weight/10}kg</p>
                </div>
                <div id="stats">
                    <Expander heading="BASE STATS" initialShowing={true}>
                        <div id="radar-container">
                            <Radar data={pokemonData.stats} />
                        </div>
                    </Expander>
                </div>
                <div id="level-up-move-list">
                    <MoveList movesInPages={pokemonData.levelUpMovesInPages} heading="LEVEL UP" />
                </div>
                <div id="machine-move-list">
                    <MoveList movesInPages={pokemonData.machineMovesInPages} heading="MACHINE" />
                </div>
            </section>
        </Expander>
    );
};

export default PokemonInfo;