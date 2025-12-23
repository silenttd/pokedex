export class CacheEntry<T> {
    createdAt: number;
    val: T;
    constructor(val: T) {
        this.createdAt = Date.now();
        this.val = val;
    }

}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    add<T>(key: string, val: T) {
        this.#cache.set(key, new CacheEntry(val));
    }
    get<T>(key: string): T | undefined {
        const entry = this.#cache.get(key);
        if (entry === undefined) {
            return undefined;
        }
        return entry.val;
    }
    #reap() {
        for (const [key, val] of this.#cache) {
            if (Date.now() - val.createdAt > this.#interval) {
                this.#cache.delete(key);
            }
        }
    }
    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => {
            this.#reap();
        }, this.#interval);
    }
    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }
    stopReapLoop() {
        if (this.#reapIntervalId !== undefined) {
            clearInterval(this.#reapIntervalId);
        }
    }
}