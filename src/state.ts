import { createInterface, type Interface } from "readline";
import { getCommands } from "./registry.js";
import { PokeAPI } from "./pokeapi.js";
import { Pokemon } from "./pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    readline: Interface;              // the rl instance
    commands: Record<string, CLICommand>; // or whatever type getCommands returns'
    pokeAPI: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
    caughtPokemon: Record<string, Pokemon>;
};

export function initState(): State {
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