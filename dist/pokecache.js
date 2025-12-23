export class CacheEntry {
    createdAt;
    val;
    constructor(val) {
        this.createdAt = Date.now();
        this.val = val;
    }
}
export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    add(key, val) {
        this.#cache.set(key, new CacheEntry(val));
    }
    get(key) {
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
    constructor(interval) {
        this.#interval = interval;
        this.#startReapLoop();
    }
    stopReapLoop() {
        if (this.#reapIntervalId !== undefined) {
            clearInterval(this.#reapIntervalId);
        }
    }
}
