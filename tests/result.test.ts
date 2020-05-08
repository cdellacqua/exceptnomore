import { Result, Optional } from "../src/index";

describe('constructors sync suite', function () {
    it('creates results', function () {
        expect(Result.ok(0)).toBeInstanceOf(Result);
        expect(Result.err(0)).toBeInstanceOf(Result);
    });
    it('creates results that can be ok xor err', function () {
        expect(Result.ok(0).isOk).toBe(true);
        expect(Result.ok(0).isErr).toBe(false);
        expect(Result.err(0).isOk).toBe(false);
        expect(Result.err(0).isErr).toBe(true);
    });
    it('creates results from exception-throwing statements', function () {
        expect(Result.fromThrower(() => {
            throw new Error('oh no');
        }).isErr).toBe(true);
        expect(Result.fromThrower(() => {
            throw new Error('oh no');
        }).unwrapErr()).toBeInstanceOf(Error);
        expect(Result.fromThrower<never, string>(() => {
            throw 'oh no';
        }).unwrapErr()).toBe('oh no');

        expect(Result.fromThrower(() => {
            return 'everything was fine';
        }).isOk).toBe(true);
        expect(Result.fromThrower(() => {
            return 'everything was fine';
        }).unwrap()).toBe('everything was fine');
    });
    it('creates results from optionals', function () {
        expect(Result.fromOptional(Optional.empty()).isErr).toBe(true);
        expect(Result.fromOptional(Optional.of(1)).isOk).toBe(true);
        expect(Result.fromOptional(Optional.ofNullable(undefined)).isErr).toBe(true);
        expect(Result.fromOptional(Optional.ofNullable(null)).isErr).toBe(true);
    });
});

describe('constructors async suite', function () {
    it('creates results from promises', async function () {
        expect((await Result.fromPromise(Promise.reject(new Error()))).isErr).toBe(true);
        expect((await Result.fromPromise(Promise.resolve(1))).isOk).toBe(true);
        expect((await Result.fromPromise(Promise.resolve(new Error()))).isOk).toBe(true);
    });
    it('creates results from async exception-throwing statements', async function () {
        expect((await Result.fromThrowerAsync(() => Promise.reject(new Error()))).isErr).toBe(true);
        expect((await Result.fromThrowerAsync(() => Promise.resolve(1))).isOk).toBe(true);
        expect((await Result.fromThrowerAsync(() => Promise.resolve(1))).unwrap()).toBe(1);
        expect((await Result.fromThrowerAsync(() => Promise.resolve(new Error()))).isOk).toBe(true);
        expect((await Result.fromThrowerAsync(async () => { throw new Error(); })).isErr).toBe(true);
        expect((await Result.fromThrowerAsync(async () => { return 1; })).isOk).toBe(true);
        expect((await Result.fromThrowerAsync(async () => { return 1; })).unwrap()).toBe(1);
    });
});

describe('unwrap value', function () {
    it('extracts values with "else/elseErr"', function () {
        expect(Result.ok('ok').else('ko')).toBe('ok');
        expect(Result.ok('oh yes').elseErr('ko')).toBe('ko');
        expect(Result.err('oh no').else('ko')).toBe('ko');
        expect(Result.err('oh no').elseErr('ko')).toBe('oh no');
    });
    it('extracts values with "unwrap/unwrapErr"', function () {
        expect(Result.ok('ok').unwrap()).toBe('ok');
        expect(Result.err('oh no').unwrapErr()).toBe('oh no');
        expect(() => Result.ok('ok').unwrapErr()).toThrowError();
        expect(() => Result.err('oh no').unwrap()).toThrowError();
    });
});

describe('conditional execution', function () {
    it('executes lambda based on Result type', function () {
        let ext = undefined;
        Result.ok(1).ifOk(v => ext = v)
        expect(ext).toBe(1);

        ext = undefined;
        Result.ok(1).ifErr(v => ext = v)
        expect(ext).toBeUndefined();

        ext = undefined;
        Result.err(1).ifOk(v => ext = v)
        expect(ext).toBeUndefined();

        ext = undefined;
        Result.err(1).ifErr(v => ext = v)
        expect(ext).toBe(1);

        ext = undefined;
        Result.err('ko')
            .if(v => ext = 'ok', v => ext = v)
        expect(ext).toBe('ko');

        ext = undefined;
        Result.err('ko')
            .if(v => ext = 'ok')
        expect(ext).toBe(undefined);

        ext = undefined;
        Result.ok('ok')
            .if(v => ext = v, v => ext = 'ko');
        expect(ext).toBe('ok');
    });
    it('executes lambdas based on Result type', function () {
        let ext = undefined;
        Result.ok(1)
            .ifOk(v => ext = v)
            .ifErr(v => ext = 'err');
        expect(ext).toBe(1);

        ext = undefined;
        Result.err(1)
            .ifOk(v => ext = v)
            .ifErr(v => ext = 'err');
        expect(ext).toBe('err');
    });
    it('executes async lambda based on Result type', async function () {
        let ext = undefined;
        await Result.ok(1)
            .ifOkAsync(async v => ext = v);
        expect(ext).toBe(1);

        ext = undefined;
        await Result.err(1)
            .ifErrAsync(async v => ext = 'err');
        expect(ext).toBe('err');

        ext = undefined;
        await Result.err(1)
            .ifAsync(async v => ext = v, async v => ext = 'err');
        expect(ext).toBe('err');

        ext = undefined;
        await Result.err(1)
            .ifAsync(async v => ext = v);
        expect(ext).toBe(undefined);

        ext = undefined;
        await Result.ok(1)
            .ifAsync(async v => ext = v, async v => ext = 'err');
        expect(ext).toBe(1);
    });
});

describe('Result mapping functions', function () {
    it('map/mapErr', function () {
        expect(Result.ok(1).map(v => v === 1 ? 'ok' : 'ko').unwrap()).toBe('ok');
        expect(Result.ok(1).mapErr(v => v === 1 ? '(1) should not be executed' : '(2) should not be executed').unwrap()).toBe(1);
        expect(Result.err(1).mapErr(v => v === 1 ? 'ok' : 'ko').unwrapErr()).toBe('ok');
        expect(Result.err(1).map(v => v === 1 ? '(1) should not be executed' : '(2) should not be executed').unwrapErr()).toBe(1);
    });
    it('async map/mapErr', async function () {
        expect((await Result.ok(1).mapAsync(async v => v === 1 ? 'ok' : 'ko')).unwrap()).toBe('ok');
        expect((await Result.ok(1).mapErrAsync(async v => v === 1 ? '(1) should not be executed' : '(2) should not be executed')).unwrap()).toBe(1);
        expect((await Result.err(1).mapErrAsync(async v => v === 1 ? 'ok' : 'ko')).unwrapErr()).toBe('ok');
        expect((await Result.err(1).mapAsync(async v => v === 1 ? '(1) should not be executed' : '(2) should not be executed')).unwrapErr()).toBe(1);
    });
    it('flatMap/flatMapErr', async function () {
        expect(Result.ok(1).flatMap(v => v === 1 ? Result.ok('ok') : Result.err('ko')).unwrap()).toBe('ok');
        expect(Result.ok(1).flatMap(v => v === 2 ? Result.ok('ok') : Result.err('ko')).unwrapErr()).toBe('ko');
        expect(Result.err(1).flatMap(v => v === 1 ? Result.ok('ok') : Result.err(2)).unwrapErr()).toBe(1);

        expect(Result.err(1).flatMapErr(v => v === 1 ? Result.ok('ok') : Result.err('ko')).unwrap()).toBe('ok');
        expect(Result.err(1).flatMapErr(v => v === 2 ? Result.ok('ok') : Result.err('ko')).unwrapErr()).toBe('ko');
        expect(Result.ok(1).flatMapErr(v => v === 1 ? Result.ok(2) : Result.err('ko')).unwrap()).toBe(1);
    });
    it('async flatMap/flatMapErr', async function () {
        expect((await Result.ok(1).flatMapAsync(async v => v === 1 ? Result.ok('ok') : Result.err('ko'))).unwrap()).toBe('ok');
        expect((await Result.ok(1).flatMapAsync(async v => v === 2 ? Result.ok('ok') : Result.err('ko'))).unwrapErr()).toBe('ko');
        expect((await Result.err(1).flatMapAsync(async v => v === 1 ? Result.ok('ok') : Result.err(2))).unwrapErr()).toBe(1);

        expect((await Result.err(1).flatMapErrAsync(async v => v === 1 ? Result.ok('ok') : Result.err('ko'))).unwrap()).toBe('ok');
        expect((await Result.err(1).flatMapErrAsync(async v => v === 2 ? Result.ok('ok') : Result.err('ko'))).unwrapErr()).toBe('ko');
        expect((await Result.ok(1).flatMapErrAsync(async v => v === 1 ? Result.ok(2) : Result.err('ko'))).unwrap()).toBe(1);
    });
});