export async function commandInspect(state, ...args) {
    if (args.length !== 1) {
        console.log("Usage: inspect <pokemon>");
        return;
    }
    const pokemonName = args[0];
    const pokemon = state.caughtPokemon[pokemonName];
    if (pokemon === undefined) {
        console.log(`${pokemonName} is not caught.`);
        return;
    }
    console.log(`  Name: ${pokemon.name}`);
    console.log(`  Height: ${pokemon.height}`);
    console.log(`  Weight: ${pokemon.weight}`);
    console.log(`  Stats:`);
    for (const stat of pokemon.stats) {
        console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
    }
    console.log("Types:");
    for (const typeInfo of pokemon.types) {
        console.log("  -", typeInfo.type.name);
    }
}
