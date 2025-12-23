import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";
export function getCommands() {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Displays a list of locations",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Displays the previous list of locations",
            callback: commandMapb,
        },
        explore: {
            name: "explore",
            description: "Explores a specific location",
            callback: commandExplore,
        },
        catch: {
            name: "catch",
            description: "Catches a specific Pokemon",
            callback: commandCatch,
        },
        inspect: {
            name: "inspect",
            description: "Inspects a caught Pokemon",
            callback: commandInspect,
        },
        pokedex: {
            name: "pokedex",
            description: "Opens the pokedex",
            callback: commandPokedex,
        },
    };
}
