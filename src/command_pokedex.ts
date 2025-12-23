import { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
    console.log("Your Pokedex:");
    for (const name of Object.keys(state.caughtPokemon)) {
        console.log(` - ${name}`);
    }
}