import { ShallowLocations } from "./pokeapi.js";
import type { State } from "./state.js";

export async function commandMapb(state: State): Promise<void> {
    let locations: ShallowLocations;

    if (state.prevLocationsURL === null) {
        locations = await state.pokeAPI.fetchLocations();
    } else {
        locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
    }

    for (const location of locations.results) {
        console.log(location.name);
    }

    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
}   