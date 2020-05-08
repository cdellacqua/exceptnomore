import { Result, Optional } from "../src/index";

describe('constructors sync suite', function () {
    it('creates optionals', function () {
        expect(Optional.of(0)).toBeInstanceOf(Optional);
        expect(Optional.empty()).toBeInstanceOf(Optional);
        expect(Optional.ofNullable(null).isEmpty).toBe(true);
        expect(Optional.ofNullable(undefined).isEmpty).toBe(true);
        expect(Optional.ofNullable(1).isPresent).toBe(true);
    });
    it('creates optionals that can be present xor empty', function () {
        expect(Optional.of(0).isPresent).toBe(true);
        expect(Optional.of(0).isEmpty).toBe(false);
        expect(Optional.empty().isPresent).toBe(false);
        expect(Optional.empty().isEmpty).toBe(true);
    });
    it('creates optionals from exception-throwing statements', function () {
        expect(Optional.fromThrower(() => {
            throw new Error('oh no');
        }).isEmpty).toBe(true);
        expect(Optional.fromThrower(() => {
            throw 'oh no';
        }).isEmpty).toBe(true);

        expect(Optional.fromThrower(() => {
            return 'everything was fine';
        }).isPresent).toBe(true);
        expect(Optional.fromThrower(() => {
            return 'everything was fine';
        }).unwrap()).toBe('everything was fine');
    });
    it('creates optionals from results', function () {
        expect(Optional.fromResult(Result.err(1)).isEmpty).toBe(true);
        expect(Optional.fromResult(Result.ok(1)).isPresent).toBe(true);
    });
});

describe('constructors async suite', function () {
    it('creates optionals from promises', async function () {
        expect((await Optional.fromPromise(Promise.reject(new Error()))).isEmpty).toBe(true);
        expect((await Optional.fromPromise(Promise.resolve(1))).isPresent).toBe(true);
        expect((await Optional.fromPromise(Promise.resolve(new Error()))).isPresent).toBe(true);
    });
    it('creates optionals from async exception-throwing statements', async function () {
        expect((await Optional.fromThrowerAsync(() => Promise.reject(new Error()))).isEmpty).toBe(true);
        expect((await Optional.fromThrowerAsync(() => Promise.resolve(1))).isPresent).toBe(true);
        expect((await Optional.fromThrowerAsync(() => Promise.resolve(1))).unwrap()).toBe(1);
        expect((await Optional.fromThrowerAsync(() => Promise.resolve(new Error()))).isPresent).toBe(true);
        expect((await Optional.fromThrowerAsync(async () => { throw new Error(); })).isEmpty).toBe(true);
        expect((await Optional.fromThrowerAsync(async () => { return 1; })).isPresent).toBe(true);
        expect((await Optional.fromThrowerAsync(async () => { return 1; })).unwrap()).toBe(1);
    });
});

describe('unwrap value', function () {
    it('extracts values with "else/elseErr"', function () {
        expect(Optional.of('ok').else('ko')).toBe('ok');
        expect(Optional.empty().else('ko')).toBe('ko');
    });
    it('extracts values with "unwrap/unwrapErr"', function () {
        expect(Optional.of('ok').unwrap()).toBe('ok');
        expect(() => Optional.empty().unwrap()).toThrowError();
    });
    it('converts to nullable"', function () {
        expect(Optional.of('ok').toNullable()).toBe('ok');
        expect(Optional.empty().toNullable()).toBeNull();
    });
});

describe('conditional execution', function () {
    it('executes lambda based on Optional type', function () {
        let ext = undefined;
        Optional.of(1).ifPresent(v => ext = v)
        expect(ext).toBe(1);

        ext = undefined;
        Optional.of(1).ifEmpty(() => ext = 'empty')
        expect(ext).toBeUndefined();

        ext = undefined;
        Optional.empty().ifPresent(v => ext = v)
        expect(ext).toBeUndefined();

        ext = undefined;
        Optional.empty().ifEmpty(() => ext = 'empty')
        expect(ext).toBe('empty');

        ext = undefined;
        Optional.empty()
            .if(v => ext = 'ok', () => ext = 'ko')
        expect(ext).toBe('ko');

        ext = undefined;
        Optional.empty()
            .if(v => ext = 'ok')
        expect(ext).toBe(undefined);

        ext = undefined;
        Optional.of('ok')
            .if(v => ext = v, () => ext = 'ko');
        expect(ext).toBe('ok');
    });
    it('executes lambdas based on Optional type', function () {
        let ext = undefined;
        Optional.of(1)
            .ifPresent(v => ext = v)
            .ifEmpty(() => ext = 'empty')
        expect(ext).toBe(1);

        ext = undefined;
        Optional.empty()
            .ifPresent(v => ext = v)
            .ifEmpty(() => ext = 'empty')
        expect(ext).toBe('empty');
    });
    it('executes async lambda based on Optional type', async function () {
        let ext = undefined;
        await Optional.of(1)
            .ifPresentAsync(async v => ext = v);
        expect(ext).toBe(1);

        ext = undefined;
        await Optional.empty()
            .ifEmptyAsync(async () => ext = 'empty');
        expect(ext).toBe('empty');

        ext = undefined;
        await Optional.empty()
            .ifAsync(async v => ext = v, async () => ext = 'empty');
        expect(ext).toBe('empty');

        ext = undefined;
        await Optional.empty()
            .ifAsync(async v => ext = v);
        expect(ext).toBe(undefined);

        ext = undefined;
        await Optional.of(1)
            .ifAsync(async v => ext = v, async () => ext = 'empty');
        expect(ext).toBe(1);
    });
});

describe('Optional mapping functions', function () {
    it('map/mapErr', function () {
        expect(Optional.of(1).map(v => v === 1 ? 'ok' : 'ko').unwrap()).toBe('ok');
        expect(Optional.empty().map(v => v === 1 ? '(1) should not be executed' : '(2) should not be executed').isEmpty).toBe(true);
    });
    it('async map/mapErr', async function () {
        expect((await Optional.of(1).mapAsync(async v => v === 1 ? 'ok' : 'ko')).unwrap()).toBe('ok');
        expect((await Optional.empty().mapAsync(async v => v === 1 ? '(1) should not be executed' : '(2) should not be executed')).isEmpty).toBe(true);
    });
    it('flatMap/flatMapErr', async function () {
        expect(Optional.of(1).flatMap(v => v === 1 ? Optional.of('ok') : Optional.empty()).unwrap()).toBe('ok');
        expect(Optional.of(1).flatMap(v => v === 2 ? Optional.of('ok') : Optional.empty()).isEmpty).toBe(true);
        expect(Optional.empty().flatMap(v => v === 1 ? Optional.of('ok') : Optional.empty()).isEmpty).toBe(true);
    });
    it('async flatMap/flatMapErr', async function () {
        expect((await Optional.of(1).flatMapAsync(async v => v === 1 ? Optional.of('ok') : Optional.empty())).unwrap()).toBe('ok');
        expect((await Optional.of(1).flatMapAsync(async v => v === 2 ? Optional.of('ok') : Optional.empty())).isEmpty).toBe(true);
        expect((await Optional.empty().flatMapAsync(async v => v === 1 ? Optional.of('ok') : Optional.empty())).isEmpty).toBe(true);
    });
});

describe('Optional filter functions', function () {
    it('filters optional', function () {
        expect(Optional.of(1).filter(Boolean).isPresent).toBe(true);
        expect(Optional.of(0).filter(Boolean).isPresent).toBe(false);
        expect(Optional.empty().filter(() => !!'not executed').isPresent).toBe(false);
    });
    it('filters optional async', async function () {
        expect((await Optional.of(1).filterAsync(async v => Boolean(v))).isPresent).toBe(true);
        expect((await Optional.of(0).filterAsync(async v => Boolean(v))).isPresent).toBe(false);
        expect((await Optional.empty().filterAsync(async () => !!'not executed')).isPresent).toBe(false);
    });
});