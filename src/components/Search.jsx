import { useState } from "react";
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const Search = ({ setPokemonSearch }) =>
{
    const [newPokemonSearch, setNewPokemonSearch] = useState('');
    const handleNewPokemonSearchSubmit = (event) =>
    {
        event.preventDefault();
        setPokemonSearch(newPokemonSearch);
        setNewPokemonSearch('');
    };
    const handleNewPokemonSearchChange = (event) =>
    {
        setNewPokemonSearch(event.target.value);
    };

    return (
        <form className="search-bar" onSubmit={handleNewPokemonSearchSubmit}>
            <label htmlFor="pokemon-input">Enter a Pokémon name</label>
            <Input
                id="pokemon-input"
                color="primary"
                placeholder=""
                size="lg"
                variant="outlined"
                sx=
                {{
                    borderRadius: '10px 0 0 10px',
                    '--Input-focusedInset': 'inset',
                    '--Input-focusedThickness': '0.25rem',
                    '--Input-focusedHighlight': 'rgba(13,110,253,.25)',
                    '&::before': {
                        transition: 'box-shadow .15s ease-in-out',
                    },
                    '&:focus-within': {
                        borderColor: '#86b7fe',
                    }
                }}
                value={newPokemonSearch}
                onChange={handleNewPokemonSearchChange}
            />
            <Button
                type="submit"
                size="lg"
                variant="solid"
                endDecorator={<KeyboardArrowRight />}
                sx={{ borderRadius: '0 10px 10px 0' }}
                aria-label="Search a Pokemon for its information"
            >
                Search
            </Button>
        </form>
    );
};

export default Search;