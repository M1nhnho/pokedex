# Pokédex!
As part of *Northcoders' Skills Bootcamp in Software Development*, we were tasked with creating an interactive app from scratch to visualise data from any API - my choice being [PokeAPI](https://pokeapi.co/). Users can enter any Pokémon name to search through this API, returning the Pokémon's data in a stylistic and slightly interactive info display. Note that newer Pokémon may be lacking bits of data such as a back sprite.

CSS libraries were used to get a handle on how to integrate them into an app. [MUI](https://mui.com/) was used for the search bar and [react-chartjs-2](https://react-chartjs-2.js.org/) for the graph to display base stats. Otherwise, I created everything else including the retro Pokédex-styled info display and the Pokéball loading animation (which can be seen by searching any word that isn't a Pokémon).

## Navigation
This app can be viewed at  
➤ https://m1nhnho.github.io/pokedex/  

Upon successfully searching a Pokémon name, an info display will pop up which is collapsible by clicking the red heading.  
The info shown is as follows:
- Normal and shiny sprites (which can be clicked to make a sound and spin around)
- Pokédex number and Pokémon name
- Types
- Height and weight
- Base stats (collapsible)
- Moves learned at certain levels (collapsible)
- Moves learned through machine (collapsible)
