export async function commandCatch(state, ...args) {
    if (args.length !== 1) {
        console.log("Usage: catch <pokemon>");
        return;
    }
    const pokemonName = args[0];
    const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    if (Math.random() < 100 / pokemon.base_experience) {
        console.log(`${pokemonName} was caught!`);
        state.caughtPokemon[pokemon.name] = pokemon;
    }
    else {
        console.log(`${pokemonName} escaped!`);
    }
}
