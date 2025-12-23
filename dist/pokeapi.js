import { Cache } from "./pokecache.js";
export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    cache;
    constructor() {
        this.cache = new Cache(1000);
    }
    async fetchLocations(pageURL) {
        const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;
        const cached = this.cache.get(url);
        if (cached !== undefined) {
            return cached;
        }
        const resp = await fetch(url);
        if (!resp.ok) {
            // resp.status is the HTTP status code (e.g. 404, 500)
            // resp.statusText is the message (e.g. "Not Found")
            throw new Error(`Request failed: ${resp.status} ${resp.statusText}`);
        }
        const data = (await resp.json());
        this.cache.add(url, data);
        return data;
    }
    async fetchLocation(locationName) {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const cached = this.cache.get(url);
        if (cached !== undefined) {
            return cached;
        }
        const resp = await fetch(url);
        if (!resp.ok) {
            // resp.status is the HTTP status code (e.g. 404, 500)
            // resp.statusText is the message (e.g. "Not Found")
            throw new Error(`Request failed: ${resp.status} ${resp.statusText}`);
        }
        const data = (await resp.json());
        this.cache.add(url, data);
        return data;
    }
    async fetchPokemon(pokemonName) {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
        const cached = this.cache.get(url);
        if (cached !== undefined) {
            return cached;
        }
        const resp = await fetch(url);
        if (!resp.ok) {
            // resp.status is the HTTP status code (e.g. 404, 500)
            // resp.statusText is the message (e.g. "Not Found")
            throw new Error(`Request failed: ${resp.status} ${resp.statusText}`);
        }
        const data = (await resp.json());
        this.cache.add(url, data);
        return data;
    }
}
