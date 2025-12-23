import { createInterface } from "readline";
import { getCommands } from "./registry.js";
import { PokeAPI } from "./pokeapi.js";
export function initState() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "pokedex > ",
    });
    const commands = getCommands();
    return {
        readline: rl,
        commands,
        pokeAPI: new PokeAPI(),
        nextLocationsURL: null,
        prevLocationsURL: null,
        caughtPokemon: {},
    };
}
