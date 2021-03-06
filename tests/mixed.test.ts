import { Result, Optional } from "../src/index";

beforeAll(() => {
    console.error = jest.fn();
});

describe('sync suite', function () {
    it('transform result to optional', function () {
        expect(Result.ok(1).toOptional().unwrap()).toBe(1);
        expect(Result.err(1).toOptional().isEmpty).toBe(true);
        expect(Optional.fromResult(Result.ok(1)).unwrap()).toBe(1);
        expect(Optional.fromResult(Result.err(1)).isEmpty).toBe(true);
    });
    it('transform optional to result', function () {
        expect(Optional.of(1).toResult('err').unwrap()).toBe(1);
        expect(Optional.empty().toResult('ko').unwrapErr()).toBe('ko');
        expect(Result.fromOptional(Optional.of(1), 'err').unwrap()).toBe(1);
        expect(Result.fromOptional(Optional.empty(), 'err').isErr).toBe(true);
        expect(Result.fromOptional(Optional.empty(), 'ko').unwrapErr()).toBe('ko');
    });
});

describe('error logging', function () {
    it('logs Result error from promise', async function () {
        console.error = jest.fn();
        process.env.NODE_ENV = 'production';
        await Result.fromPromise(Promise.reject('fail'));
        expect(console.error).not.toHaveBeenCalled();

        console.error = jest.fn();
        process.env.NODE_ENV = 'development';
        await Result.fromPromise(Promise.reject('fail'));
        expect(console.error).toHaveBeenCalled();
    });
});