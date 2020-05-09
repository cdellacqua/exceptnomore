import { Result } from "./result";

export class Optional<T> {

    private value: T|null = null;

    private constructor(value: T|null) {
        this.value = value;
    }
    
    static of<O>(value: O) {
        return new Optional<O>(value);
    }

    static fromResult<O, TErr>(value: Result<O, TErr>): Optional<O> {
        return value.isOk
            ? Optional.of<O>(value.unwrap())
            : Optional.empty<O>();
    }

    static fromThrower<O>(callback: () => O): Optional<O> {
        try {
            return Optional.of<O>(callback());
        } catch (err) {
            return Optional.empty<O>();
        }
    }
    static async fromThrowerAsync<O>(callback: () => Promise<O>): Promise<Optional<O>> {
        try {
            return Optional.of<O>(await callback());
        } catch (err) {
            return Optional.empty<O>();
        }
    }
    
    static async fromPromise<O>(promise: Promise<O>): Promise<Optional<O>> {
        return this.fromThrowerAsync<O>(() => promise);
    }

    static ofNullable<O>(value: O|null|undefined) {
        return value === undefined || value === null
            ? Optional.empty<O>()
            : Optional.of<O>(value);
    }

    static empty<O>() {
        return new Optional<O>(null);
    }
    
    unwrap(): T {
        if (this.isEmpty) {
            throw new Error('Cannot call unwrap on empty optional');
        }
        return this.value!;
    }
    
    unwrapNullable(): T|null {
        return this.value;
    }

    get isEmpty() {
        return this.value === null;
    }

    get isPresent() {
        return !this.isEmpty;
    }

    toResult<TErr>(errIfEmpty: TErr): Result<T, TErr> {
        return Result.fromOptional<T, TErr>(this, errIfEmpty);
    }

    else(value: T): T {
        return this.isEmpty ? value : this.value!;
    }

    map<O>(f: (value: T) => O): Optional<O> {
        if (this.isEmpty) {
            return Optional.empty<O>();
        } else {
            return Optional.of<O>(f(this.value!));
        }
    }
    async mapAsync<O>(f: (value: T) => Promise<O>): Promise<Optional<O>> {
        if (this.isEmpty) {
            return Optional.empty<O>();
        } else {
            return Optional.of<O>(await f(this.value!));
        }
    }

    flatMap<O>(f: (value: T) => Optional<O>) {
        if (this.isEmpty) {
            return Optional.empty<O>();
        } else {
            return f(this.value!);
        }
    }
    async flatMapAsync<O>(f: (value: T) => Promise<Optional<O>>): Promise<Optional<O>> {
        if (this.isEmpty) {
            return Optional.empty<O>();
        } else {
            return await f(this.value!);
        }
    }

    ifPresent(f: (value: T) => any): Optional<T> {
        if (this.isPresent) {
            f(this.value!);
        }
        return this;
    }
    async ifPresentAsync(f: (value: T) => Promise<any>): Promise<Optional<T>> {
        if (this.isPresent) {
            await f(this.value!);
        }
        return this;
    }

    ifEmpty(f: () => any): Optional<T> {
        if (this.isEmpty) {
            f();
        }
        return this;
    }
    async ifEmptyAsync(f: () => Promise<any>): Promise<Optional<T>> {
        if (this.isEmpty) {
            await f();
        }
        return this;
    }

    if(fPresent: (value: T) => any, fEmpty?: () => any): Optional<T> {
        this.ifPresent(fPresent);
        if (fEmpty) {
            this.ifEmpty(fEmpty);
        }
        
        return this;
    }
    async ifAsync(fOk: (value: T) => Promise<any>, fErr?: () => Promise<any>): Promise<Optional<T>> {
        await this.ifPresentAsync(fOk);
        if (fErr) {
            await this.ifEmptyAsync(fErr);
        }
        
        return this;
    }

    filter(predicate: (value: T) => boolean): Optional<T> {
        if (this.isPresent && predicate(this.value!)) {
            return this;
        } else {
            return Optional.empty<T>();
        }
    }
    async filterAsync(predicate: (value: T) => Promise<boolean>): Promise<Optional<T>> {
        if (this.isPresent && await predicate(this.value!)) {
            return this;
        } else {
            return Optional.empty<T>();
        }
    }
}