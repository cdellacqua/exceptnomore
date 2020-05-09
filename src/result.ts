import { Optional } from "./optional";

export class Result<TOk, TErr> {

    private okValue: TOk|null = null;
    private errValue: TErr|null = null;

    private constructor(okValue: TOk|null, errValue: TErr|null) {
        this.okValue = okValue;
        this.errValue = errValue;
    }

    static ok<TOk>(value: TOk) {
        return new Result<TOk, any>(value, null);
    }
    static err<TErr>(value: TErr) {
        return new Result<any, TErr>(null, value);
    }

    static fromOptional<O, TErr>(optional: Optional<O>, errIfEmpty: TErr): Result<O,TErr> {
        return optional.isEmpty ? Result.err<TErr>(errIfEmpty) : Result.ok<O>(optional.unwrap()!);
    }

    static fromThrower<TOk, TErr = Error>(callback: () => TOk): Result<TOk, TErr> {
        try {
            return Result.ok(callback());
        } catch (err) {
            return Result.err<TErr>(err);
        }
    }
    static async fromThrowerAsync<TOk, TErr = Error>(callback: () => Promise<TOk>): Promise<Result<TOk, TErr>> {
        try {
            return Result.ok(await callback());
        } catch (err) {
            return Result.err<TErr>(err);
        }
    }
    
    static async fromPromise<TOk, TErr = Error>(promise: Promise<TOk>): Promise<Result<TOk, TErr>> {
        return this.fromThrowerAsync<TOk, TErr>(() => promise);
    }

    get isOk() {
        return this.okValue !== null;
    }

    get isErr() {
        return this.errValue !== null;
    }

    unwrap() {
        if (this.okValue === null) {
            throw new Error('Cannot call unwrap on error result');
        }
        return this.okValue;
    }
    
    unwrapErr() {
        if (this.errValue === null) {
            throw new Error('Cannot call unwrapErr on ok result');
        }
        return this.errValue;
    }

    toOptional(): Optional<TOk> {
        return Optional.fromResult(this);
    }

    else(value: TOk): TOk {
        return this.isOk ? this.okValue! : value;
    }
    elseErr(value: TErr): TErr {
        return this.isErr ? this.errValue! : value;
    }

    ifOk(f: (value: TOk) => any): Result<TOk, TErr> {
        if (this.isOk) {
            f(this.okValue!);
        }
        return this;
    }
    async ifOkAsync(f: (value: TOk) => Promise<any>): Promise<Result<TOk, TErr>> {
        if (this.isOk) {
            await f(this.okValue!);
        }
        return this;
    }
    
    ifErr(f: (value: TErr) => any): Result<TOk, TErr> {
        if (this.isErr) {
            f(this.errValue!);
        }
        return this;
    }
    async ifErrAsync(f: (value: TErr) => Promise<any>): Promise<Result<TOk, TErr>> {
        if (this.isErr) {
            await f(this.errValue!);
        }
        return this;
    }

    if(fOk: (value: TOk) => any, fErr?: (value: TErr) => any): Result<TOk, TErr> {
        this.ifOk(fOk);
        if (fErr) {
            this.ifErr(fErr);
        }
        
        return this;
    }
    async ifAsync(fOk: (value: TOk) => Promise<any>, fErr?: (value: TErr) => Promise<any>): Promise<Result<TOk, TErr>> {
        await this.ifOkAsync(fOk);
        if (fErr) {
            await this.ifErrAsync(fErr);
        }
        
        return this;
    }

    map<TOk2>(f: (value: TOk) => TOk2): Result<TOk2, TErr> {
        return this.isOk ? Result.ok(f(this.okValue!)) : Result.err(this.errValue!);
    }
    async mapAsync<TOk2>(f: (value: TOk) => Promise<TOk2>): Promise<Result<TOk2, TErr>> {
        return this.isOk ? Result.ok(await f(this.okValue!)) : Result.err(this.errValue!);
    }

    mapErr<TErr2>(f: (value: TErr) => TErr2): Result<TOk, TErr2> {
        return this.isErr ? Result.err(f(this.errValue!)) : Result.ok(this.okValue!);
    }
    async mapErrAsync<TErr2>(f: (value: TErr) => Promise<TErr2>): Promise<Result<TOk, TErr2>> {
        return this.isErr ? Result.err(await f(this.errValue!)) : Result.ok(this.okValue!);
    }

    flatMap<TOk2>(f: (value: TOk) => Result<TOk2, TErr>): Result<TOk2, TErr> {
        if (this.isOk) {
            return f(this.okValue!);
        } else {
            return Result.err(this.errValue!);
        }
    }
    async flatMapAsync<TOk2>(f: (value: TOk) => Promise<Result<TOk2, TErr>>): Promise<Result<TOk2, TErr>> {
        if (this.isOk) {
            return await f(this.okValue!);
        } else {
            return Result.err(this.errValue!);
        }
    }

    flatMapErr<TErr2>(f: (value: TErr) => Result<TOk, TErr2>): Result<TOk, TErr2> {
        if (this.isErr) {
            return f(this.errValue!);
        } else {
            return Result.ok(this.okValue!);
        }
    }
    async flatMapErrAsync<TErr2>(f: (value: TErr) => Promise<Result<TOk, TErr2>>): Promise<Result<TOk, TErr2>> {
        if (this.isErr) {
            return await f(this.errValue!);
        } else {
            return Result.ok(this.okValue!);
        }
    }
}