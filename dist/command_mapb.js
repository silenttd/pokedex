export async function commandMapb(state) {
    let locations;
    if (state.prevLocationsURL === null) {
        locations = await state.pokeAPI.fetchLocations();
    }
    else {
        locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
    }
    for (const location of locations.results) {
        console.log(location.name);
    }
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
}
