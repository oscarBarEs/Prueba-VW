import { PokeData } from "./interfaces";


export const getPokemon = async (
    pokeId: string
): Promise<PokeData> => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeId}/`;
    const resp = await fetch(url);
    const data = await resp.json();

    const pokemon: PokeData = {
        id: data.id,
        name: data.name,
        sprite: data.sprites.other?.showdown?.front_default || data.sprites.front_default,
        speciesUrl: data.species.url,
        sound: data.cries?.latest,
        types: data.types.map((type: { type: { name: string } }) => type.type.name),
    };

    console.log(pokemon);
    return pokemon;
};

export default getPokemon;