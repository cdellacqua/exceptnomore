import { Result } from "./result";

/**
 * The Optional class is meant to be an alternative to the more common
 * 'return null'/'return undefined' statements.
 * An Optional can be either Present or Empty. The former wraps the
 * value returned by a function. The latter can be used instead of null/undefined.
 *  
 * By using the Optional type, the caller of a function
 * can explicitly see that it may not return any meaningful value and can handle both the
 * present and empty conditions with the fluent API provided by this class.
 */
export class Optional<T> {

    private value: T|null = null;

    private constructor(value: T|null) {
        this.value = value;
    }
    
    /**
     * Generates an Optional that wraps the provided value
     * @param value the value 
     */
    static of<O>(value: O): Optional<O> {
        return new Optional<O>(value);
    }

    /**
     * Generates an Optional from a Result. If the Result is of type Ok, its value is wrapped in the Optional,
     * otherwise an Empty Optional is returned
     * @param value the value 
     */
    static fromResult<O, TErr>(value: Result<O, TErr>): Optional<O> {
        return value.isOk
            ? Optional.of<O>(value.unwrap())
            : Optional.empty<O>();
    }

    /**
     * Generates an Optional executing a function that may or may not throw an exception.
     * On successful completion, the returned value is wrapped in a Present Optional, otherwise
     * an Empty Optional is returned
     * @param callback a function that may or may not throw an exception
     */
    static fromThrower<O>(callback: () => O): Optional<O> {
        try {
            return Optional.of<O>(callback());
        } catch (err) {
            return Optional.empty<O>();
        }
    }
    /**
     * Generates an Optional executing an async function that may or may not throw an exception.
     * On successful completion, the returned value is wrapped in a Present Optional, otherwise
     * an Empty Optional is returned
     * @param callback a function that may or may not throw an exception
     */
    static async fromThrowerAsync<O>(callback: () => Promise<O>): Promise<Optional<O>> {
        try {
            return Optional.of<O>(await callback());
        } catch (err) {
            return Optional.empty<O>();
        }
    }
    /**
     * Generates an Optional from a Promise. If it was resolved its value is wrapped in a Present Optional, otherwise
     * an Empty Optional is returned
     * @param callback a function that may or may not thr
     * @param promise 
     */
    static async fromPromise<O>(promise: Promise<O>): Promise<Optional<O>> {
        return this.fromThrowerAsync<O>(() => promise);
    }

    /**
     * Generates an Optional of a value. If the value is null or undefined, an Empty Optional
     * is returned, otherwise the value is wrapped in a Present Optional.
     * @param value the nullable/undefinable value to be wrapped
     */
    static ofNullable<O>(value: O|null|undefined): Optional<O> {
        return value === undefined || value === null
            ? Optional.empty<O>()
            : Optional.of<O>(value);
    }

    /**
     * Generates an Empty Optional
     */
    static empty<O = any>(): Optional<O> {
        return new Optional<O>(null);
    }
    
    /**
     * Unwrap the Present value of the Optional
     * @throws {Error} if the Optional is of type Empty
     */
    unwrap(): T {
        if (this.isEmpty) {
            throw new Error('Cannot call unwrap on empty optional');
        }
        return this.value!;
    }
    
    /**
     * Unwrap the value (if the Optional is Present) or returns null (if the Optional is Empty)
     */
    unwrapNullable(): T|null {
        return this.value;
    }

    /**
     * Returns true if the Optional is Empty, false otherwise
     */
    get isEmpty() {
        return this.value === null;
    }
    /**
     * Returns true if the Optional is Present, false otherwise
     */
    get isPresent() {
        return !this.isEmpty;
    }

    /**
     * Generates a Result from an Optional. If the Optional has a value, the latter will
     * be wrapped as an Ok Result, otherwise an Error Result will be created with the specified error.
     * @param optional the Optional that will be used to generate the Result
     * @param errIfEmpty the Error value of the Result in case the Optional is empty
     */
    toResult<TErr>(errIfEmpty: TErr): Result<T, TErr> {
        return Result.fromOptional<T, TErr>(this, errIfEmpty);
    }

    /**
     * Returns the Present value of an Optional, otherwise returns the
     * passed value
     * @param value the fallback value
     */
    else(value: T): T {
        return this.isEmpty ? value : this.value!;
    }


    /**
     * If the Optional is Present, its value is passed to the provided function and the return
     * value of the latter is wrapped in a new Optional. Otherwise, an Empty Optional is returned and the
     * function is not executed
     * @param f the mapping function from T to O
     */
    map<O>(f: (value: T) => O): Optional<O> {
        if (this.isEmpty) {
            return Optional.empty<O>();
        } else {
            return Optional.of<O>(f(this.value!));
        }
    }

    /**
     * If the Optional is Present, its value is passed to the provided async function and the return
     * value of the latter is wrapped in a new Optional. Otherwise, an Empty Optional is returned and the
     * function is not executed
     * @param f the mapping function from T to O
     */
    async mapAsync<O>(f: (value: T) => Promise<O>): Promise<Optional<O>> {
        if (this.isEmpty) {
            return Optional.empty<O>();
        } else {
            return Optional.of<O>(await f(this.value!));
        }
    }

    /**
     * If the Optional is Present, its value is passed to the provided function and the return
     * value is returned. Otherwise, an Empty Optional is returned and the
     * function is not executed
     * @param f the mapping function from T to O
     */
    flatMap<O>(f: (value: T) => Optional<O>) {
        if (this.isEmpty) {
            return Optional.empty<O>();
        } else {
            return f(this.value!);
        }
    }

    /**
     * If the Optional is Present, its value is passed to the provided async function and the return
     * value is returned. Otherwise, an Empty Optional is returned and the
     * function is not executed
     * @param f the mapping function from T to O
     */
    async flatMapAsync<O>(f: (value: T) => Promise<Optional<O>>): Promise<Optional<O>> {
        if (this.isEmpty) {
            return Optional.empty<O>();
        } else {
            return await f(this.value!);
        }
    }

    /**
     * If the Optional is Present, the provided function is executed
     * @param f a function that takes the value of the Optional
     */
    ifPresent(f: (value: T) => any): Optional<T> {
        if (this.isPresent) {
            f(this.value!);
        }
        return this;
    }

    /**
     * If the Optional is Present, the provided async function is executed
     * @param f a function that takes the value of the Optional
     */
    async ifPresentAsync(f: (value: T) => Promise<any>): Promise<Optional<T>> {
        if (this.isPresent) {
            await f(this.value!);
        }
        return this;
    }

    /**
     * If the Optional is Empty, the provided function is executed
     * @param f a function
     */
    ifEmpty(f: () => any): Optional<T> {
        if (this.isEmpty) {
            f();
        }
        return this;
    }

    /**
     * If the Optional is Empty, the provided async function is executed
     * @param f a function
     */
    async ifEmptyAsync(f: () => Promise<any>): Promise<Optional<T>> {
        if (this.isEmpty) {
            await f();
        }
        return this;
    }
    
    /**
     * Executes one of the provided functions based on the type of the Optional
     * @param fPresent a function that takes the value of the Optional
     * @param fEmpty a function that does not have parameters
     */
    if(fPresent: (value: T) => any, fEmpty?: () => any): Optional<T> {
        this.ifPresent(fPresent);
        if (fEmpty) {
            this.ifEmpty(fEmpty);
        }
        
        return this;
    }
    
    /**
     * Executes one of the provided async functions based on the type of the Optional
     * @param fPresent a function that takes the value of the Optional
     * @param fEmpty a function that does not have parameters
     */
    async ifAsync(fOk: (value: T) => Promise<any>, fErr?: () => Promise<any>): Promise<Optional<T>> {
        await this.ifPresentAsync(fOk);
        if (fErr) {
            await this.ifEmptyAsync(fErr);
        }
        
        return this;
    }
    
    /**
     * If the Optional is Empty or the provided function returns false given the value of the Present Optional,
     * an Empty Optional is returned. Otherwise the original Present Optional is returned.
     * @param predicate a function that returns a boolean based on the value of the Optional
     */
    filter(predicate: (value: T) => boolean): Optional<T> {
        if (this.isPresent && predicate(this.value!)) {
            return this;
        } else {
            return Optional.empty<T>();
        }
    }
    
    /**
     * If the Optional is Empty or the provided async function returns false given the value of the Present Optional,
     * an Empty Optional is returned. Otherwise the original Present Optional is returned.
     * @param predicate a function that returns a boolean based on the value of the Optional
     */
    async filterAsync(predicate: (value: T) => Promise<boolean>): Promise<Optional<T>> {
        if (this.isPresent && await predicate(this.value!)) {
            return this;
        } else {
            return Optional.empty<T>();
        }
    }
}