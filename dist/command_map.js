export async function commandMap(state) {
    let locations;
    if (state.nextLocationsURL === null) {
        locations = await state.pokeAPI.fetchLocations();
    }
    else {
        locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
    }
    for (const location of locations.results) {
        console.log(location.name);
    }
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
}
