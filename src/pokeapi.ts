import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private readonly cache: Cache;
    constructor() {
        this.cache = new Cache(1000);
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;
        
        const cached = this.cache.get<ShallowLocations>(url);
        if (cached !== undefined) {
            return cached;
        }

        const resp = await fetch(url);
        if (!resp.ok) {
            // resp.status is the HTTP status code (e.g. 404, 500)
            // resp.statusText is the message (e.g. "Not Found")
            throw new Error(`Request failed: ${resp.status} ${resp.statusText}`);
        }

        const data = (await resp.json()) as ShallowLocations;
        this.cache.add(url, data);
        return data;
    }

    async fetchLocation(locationName: string): Promise<LocationArea> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

        const cached = this.cache.get<LocationArea>(url);
        if (cached !== undefined) {
            return cached;
        }

        const resp = await fetch(url);
        if (!resp.ok) {
            // resp.status is the HTTP status code (e.g. 404, 500)
            // resp.statusText is the message (e.g. "Not Found")
            throw new Error(`Request failed: ${resp.status} ${resp.statusText}`);
        }

        const data = (await resp.json()) as LocationArea;
        this.cache.add(url, data);
        return data;
    }

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

        const cached = this.cache.get<Pokemon>(url);
        if (cached !== undefined) {
            return cached;
        }

        const resp = await fetch(url);
        if (!resp.ok) {
            // resp.status is the HTTP status code (e.g. 404, 500)
            // resp.statusText is the message (e.g. "Not Found")
            throw new Error(`Request failed: ${resp.status} ${resp.statusText}`);
        }

        const data = (await resp.json()) as Pokemon;
        this.cache.add(url, data);
        return data;
    }
}


export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        name: string;
        url: string;
    }[];
};

export type LocationArea = {
    name: string;
    pokemon_encounters: {
        pokemon: {
            name: string;
            url: string;
        };
    }[];
};

export type Pokemon = {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    stats: {
        base_stat: number;
        effort: number;
        stat: {
            name: string; // "hp", "attack", etc.
            url: string;
        };
    }[];
    types: {
        slot: number;
        type: {
            name: string; // "normal", "flying", etc.
            url: string;
        };
    }[];
};