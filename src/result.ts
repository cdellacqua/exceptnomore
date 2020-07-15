import { Optional } from "./optional";

/**
 * The Result class is meant to be an alternative to the more common
 * throw statements.
 * A Result can be either Ok or Error. The former wraps the
 * value returned by a function that successfully executed its
 * instructions. The latter can be used to return an exception,
 * or a generic reason why the function couldn't successfully return.
 * 
 * By using the Result type, the caller of a function
 * can explicitly see that it may fail and can handle both the
 * success and error conditions with the fluent API provided by this class.
 */
export class Result<TOk, TErr> {

    private okValue: TOk|null = null;
    private errValue: TErr|null = null;

    private constructor(okValue: TOk|null, errValue: TErr|null) {
        this.okValue = okValue;
        this.errValue = errValue;
    }

    /**
     * Generates a Result of type Ok
     * @param value the Ok value of the Result
     */
    static ok<TOk>(value: TOk): Result<TOk, any> {
        return new Result<TOk, any>(value, null);
    }

    /**
     * Generates a Result of type Error
     * @param value the Error value of the Result
     */
    static err<TErr>(value: TErr): Result<any, TErr> {
        return new Result<any, TErr>(null, value);
    }

    /**
     * Generates a Result from an Optional. If the Optional has a value, the latter will
     * be wrapped as an Ok Result, otherwise an Error Result will be created with the specified error.
     * @param optional the Optional that will be used to generate the Result
     * @param errIfEmpty the Error value of the Result in case the Optional is empty
     */
    static fromOptional<O, TErr>(optional: Optional<O>, errIfEmpty: TErr): Result<O,TErr> {
        return optional.isEmpty ? Result.err<TErr>(errIfEmpty) : Result.ok<O>(optional.unwrap()!);
    }

    /**
     * Generates a Result given a function that may return a value (wrapped as an Ok Result) or throw an exception (wrapped as an Error Result)
     * @param callback a function that may or may not throw and exception.
     */
    static fromThrower<TOk, TErr = Error>(callback: () => TOk): Result<TOk, TErr> {
        try {
            return Result.ok(callback());
        } catch (err) {
            if (process?.env?.NODE_ENV !== 'production') {
                console.error('Creating error Result containing the following exception:');
                console.error(err);
            }
            return Result.err<TErr>(err);
        }
    }
    /**
     * Generates a Result given an async function that may return a value (wrapped as an Ok Result) or throw an exception (wrapped as an Error Result)
     * @param callback an async function that may or may not throw and exception.
     */
    static async fromThrowerAsync<TOk, TErr = Error>(callback: () => Promise<TOk>): Promise<Result<TOk, TErr>> {
        try {
            return Result.ok(await callback());
        } catch (err) {
            err = err ?? new Error('Catched empty exception, this may indicate a Promise that rejected and did not pass any error');
            if (process?.env?.NODE_ENV !== 'production') {
                console.error('Creating error Result containing the following exception:');
                console.error(err);
            }
            return Result.err<TErr>(err);
        }
    }
    
    /**
     * Generates a Result given a Promise that may resolve with a value (wrapped as an Ok Result) or reject with a value (wrapped as an Error Result)
     * @param callback a function that may or may not throw and exception.
     */
    static async fromPromise<TOk, TErr = Error>(promise: Promise<TOk>): Promise<Result<TOk, TErr>> {
        return this.fromThrowerAsync<TOk, TErr>(() => promise);
    }

    /**
     * Returns true if the Result is of type Ok, false otherwise
     */
    get isOk() {
        return this.okValue !== null;
    }

    /**
     * Returns true if the Result is of type Error, false otherwise
     */
    get isErr() {
        return this.errValue !== null;
    }

    /**
     * Returns the Ok value of a Result
     * @throws {Error} if the Result is of type Error
     */
    unwrap() {
        if (this.okValue === null) {
            throw new Error('Cannot call unwrap on error result');
        }
        return this.okValue;
    }
    
    /**
     * Returns the Error value of a Result
     * @throws {Error} if the Result is of type Ok
     */
    unwrapErr() {
        if (this.errValue === null) {
            throw new Error('Cannot call unwrapErr on ok result');
        }
        return this.errValue;
    }

    /**
     * Generates an Optional from a Result. If the Result is of type Ok,
     * its value is wrapped into an Optional, otherwise an Empty Optional
     * is returned
     */
    toOptional(): Optional<TOk> {
        return Optional.fromResult(this);
    }

    /**
     * Returns the Ok value of a Result if present, otherwise returns the
     * passed value
     * @param value the fallback Ok value
     */
    else(value: TOk): TOk {
        return this.isOk ? this.okValue! : value;
    }

    /**
     * Returns the Error value of a Result if present, otherwise returns the
     * passed value
     * @param value the fallback Error value
     */
    elseErr(value: TErr): TErr {
        return this.isErr ? this.errValue! : value;
    }

    /**
     * If the Result is of type Ok, the provided function is executed
     * @param f a function that takes the Ok value of the Result
     */
    ifOk(f: (value: TOk) => any): Result<TOk, TErr> {
        if (this.isOk) {
            f(this.okValue!);
        }
        return this;
    }

    /**
     * If the Result is of type Ok, the provided async function is executed
     * @param f a function that takes the Ok value of the Result
     */
    async ifOkAsync(f: (value: TOk) => Promise<any>): Promise<Result<TOk, TErr>> {
        if (this.isOk) {
            await f(this.okValue!);
        }
        return this;
    }
    
    /**
     * If the Result is of type Error, the provided function is executed
     * @param f a function that takes the Error value of the Result
     */
    ifErr(f: (value: TErr) => any): Result<TOk, TErr> {
        if (this.isErr) {
            f(this.errValue!);
        }
        return this;
    }
    
    /**
     * If the Result is of type Error, the provided async function is executed
     * @param f a function that takes the Error value of the Result
     */
    async ifErrAsync(f: (value: TErr) => Promise<any>): Promise<Result<TOk, TErr>> {
        if (this.isErr) {
            await f(this.errValue!);
        }
        return this;
    }

    /**
     * Executes one of the provided functions based on the type of the Result
     * @param fOk a function that takes the Ok value of the Result
     * @param fErr a function that takes the Error value of the Result
     */
    if(fOk: (value: TOk) => any, fErr?: (value: TErr) => any): Result<TOk, TErr> {
        this.ifOk(fOk);
        if (fErr) {
            this.ifErr(fErr);
        }
        
        return this;
    }

    /**
     * Executes one of the provided async functions based on the type of the Result
     * @param fOk a function that takes the Ok value of the Result
     * @param fErr a function that takes the Error value of the Result
     */
    async ifAsync(fOk: (value: TOk) => Promise<any>, fErr?: (value: TErr) => Promise<any>): Promise<Result<TOk, TErr>> {
        await this.ifOkAsync(fOk);
        if (fErr) {
            await this.ifErrAsync(fErr);
        }
        
        return this;
    }

    /**
     * If the Result is of type Ok, its value is passed to the provided function and the return
     * value of the latter is wrapped in a new Ok Result. Otherwise, the Error value is preserved and the
     * function is not executed
     * @param f the mapping function from TOk to TOk2
     */
    map<TOk2>(f: (value: TOk) => TOk2): Result<TOk2, TErr> {
        return this.isOk ? Result.ok(f(this.okValue!)) : Result.err(this.errValue!);
    }

    /**
     * If the Result is of type Ok, its value is passed to the provided async function and the return
     * value of the latter is wrapped in a new Ok Result. Otherwise, the Error value is preserved and the
     * function is not executed
     * @param f the mapping function from TOk to TOk2
     */
    async mapAsync<TOk2>(f: (value: TOk) => Promise<TOk2>): Promise<Result<TOk2, TErr>> {
        return this.isOk ? Result.ok(await f(this.okValue!)) : Result.err(this.errValue!);
    }

    /**
     * If the Result is of type Error, its value is passed to the provided function and the return
     * value of the latter is wrapped in a new Error Result. Otherwise, the Ok value is preserved and the
     * function is not executed
     * @param f the mapping function from TErr to TErr2
     */
    mapErr<TErr2>(f: (value: TErr) => TErr2): Result<TOk, TErr2> {
        return this.isErr ? Result.err(f(this.errValue!)) : Result.ok(this.okValue!);
    }

    /**
     * If the Result is of type Error, its value is passed to the provided async function and the return
     * value of the latter is wrapped in a new Error Result. Otherwise, the Ok value is preserved and the
     * function is not executed
     * @param f the mapping function from TErr to TErr2
     */
    async mapErrAsync<TErr2>(f: (value: TErr) => Promise<TErr2>): Promise<Result<TOk, TErr2>> {
        return this.isErr ? Result.err(await f(this.errValue!)) : Result.ok(this.okValue!);
    }

    /**
     * If the Result is of type Ok, its value is passed to the provided function and the return
     * value of the latter is returned. Otherwise, the Error value is preserved and the
     * function is not executed
     * @param f the mapping function from TOk to Result<TOk2, TErr>
     */
    flatMap<TOk2>(f: (value: TOk) => Result<TOk2, TErr>): Result<TOk2, TErr> {
        if (this.isOk) {
            return f(this.okValue!);
        } else {
            return Result.err(this.errValue!);
        }
    }

    /**
     * If the Result is of type Ok, its value is passed to the provided async function and the return
     * value of the latter is returned. Otherwise, the Error value is preserved and the
     * function is not executed
     * @param f the mapping function from TOk to Result<TOk2, TErr>
     */
    async flatMapAsync<TOk2>(f: (value: TOk) => Promise<Result<TOk2, TErr>>): Promise<Result<TOk2, TErr>> {
        if (this.isOk) {
            return await f(this.okValue!);
        } else {
            return Result.err(this.errValue!);
        }
    }

    /**
     * If the Result is of type Error, its value is passed to the provided function and the return
     * value of the latter is returned. Otherwise, the Ok value is preserved and the
     * function is not executed
     * @param f the mapping function from TOk to Result<TOk, TErr2>
     */
    flatMapErr<TErr2>(f: (value: TErr) => Result<TOk, TErr2>): Result<TOk, TErr2> {
        if (this.isErr) {
            return f(this.errValue!);
        } else {
            return Result.ok(this.okValue!);
        }
    }

    /**
     * If the Result is of type Error, its value is passed to the provided async function and the return
     * value of the latter is returned. Otherwise, the Ok value is preserved and the
     * function is not executed
     * @param f the mapping function from TOk to Result<TOk, TErr2>
     */
    async flatMapErrAsync<TErr2>(f: (value: TErr) => Promise<Result<TOk, TErr2>>): Promise<Result<TOk, TErr2>> {
        if (this.isErr) {
            return await f(this.errValue!);
        } else {
            return Result.ok(this.okValue!);
        }
    }
}