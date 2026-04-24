[**exceptnomore**](../README.md)

***

[exceptnomore](../README.md) / Result

# Class: Result\<TOk, TErr\>

Defined in: [result.ts:15](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L15)

The Result class is meant to be an alternative to the more common
throw statements.
A Result can be either Ok or Error. The former wraps the
value returned by a function that successfully executed its
instructions. The latter can be used to return an exception,
or a generic reason why the function couldn't successfully return.

By using the Result type, the caller of a function
can explicitly see that it may fail and can handle both the
success and error conditions with the fluent API provided by this class.

## Type Parameters

### TOk

`TOk`

### TErr

`TErr`

## Accessors

### isErr

#### Get Signature

> **get** **isErr**(): `boolean`

Defined in: [result.ts:92](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L92)

Returns true if the Result is of type Error, false otherwise

##### Returns

`boolean`

***

### isOk

#### Get Signature

> **get** **isOk**(): `boolean`

Defined in: [result.ts:85](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L85)

Returns true if the Result is of type Ok, false otherwise

##### Returns

`boolean`

## Methods

### else()

> **else**(`value`): `TOk`

Defined in: [result.ts:132](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L132)

Returns the Ok value of a Result if present, otherwise returns the
passed value

#### Parameters

##### value

`TOk`

the fallback Ok value

#### Returns

`TOk`

***

### elseErr()

> **elseErr**(`value`): `TErr`

Defined in: [result.ts:141](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L141)

Returns the Error value of a Result if present, otherwise returns the
passed value

#### Parameters

##### value

`TErr`

the fallback Error value

#### Returns

`TErr`

***

### flatMap()

> **flatMap**\<`TOk2`\>(`f`): `Result`\<`TOk2`, `TErr`\>

Defined in: [result.ts:263](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L263)

If the Result is of type Ok, its value is passed to the provided function and the return
value of the latter is returned. Otherwise, the Error value is preserved and the
function is not executed

#### Type Parameters

##### TOk2

`TOk2`

#### Parameters

##### f

(`value`) => `Result`\<`TOk2`, `TErr`\>

the mapping function from TOk to Result<TOk2, TErr>

#### Returns

`Result`\<`TOk2`, `TErr`\>

***

### flatMapAsync()

> **flatMapAsync**\<`TOk2`\>(`f`): `Promise`\<`Result`\<`TOk2`, `TErr`\>\>

Defined in: [result.ts:277](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L277)

If the Result is of type Ok, its value is passed to the provided async function and the return
value of the latter is returned. Otherwise, the Error value is preserved and the
function is not executed

#### Type Parameters

##### TOk2

`TOk2`

#### Parameters

##### f

(`value`) => `Promise`\<`Result`\<`TOk2`, `TErr`\>\>

the mapping function from TOk to Result<TOk2, TErr>

#### Returns

`Promise`\<`Result`\<`TOk2`, `TErr`\>\>

***

### flatMapErr()

> **flatMapErr**\<`TErr2`\>(`f`): `Result`\<`TOk`, `TErr2`\>

Defined in: [result.ts:291](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L291)

If the Result is of type Error, its value is passed to the provided function and the return
value of the latter is returned. Otherwise, the Ok value is preserved and the
function is not executed

#### Type Parameters

##### TErr2

`TErr2`

#### Parameters

##### f

(`value`) => `Result`\<`TOk`, `TErr2`\>

the mapping function from TOk to Result<TOk, TErr2>

#### Returns

`Result`\<`TOk`, `TErr2`\>

***

### flatMapErrAsync()

> **flatMapErrAsync**\<`TErr2`\>(`f`): `Promise`\<`Result`\<`TOk`, `TErr2`\>\>

Defined in: [result.ts:305](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L305)

If the Result is of type Error, its value is passed to the provided async function and the return
value of the latter is returned. Otherwise, the Ok value is preserved and the
function is not executed

#### Type Parameters

##### TErr2

`TErr2`

#### Parameters

##### f

(`value`) => `Promise`\<`Result`\<`TOk`, `TErr2`\>\>

the mapping function from TOk to Result<TOk, TErr2>

#### Returns

`Promise`\<`Result`\<`TOk`, `TErr2`\>\>

***

### if()

> **if**(`fOk`, `fErr?`): `Result`\<`TOk`, `TErr`\>

Defined in: [result.ts:194](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L194)

Executes one of the provided functions based on the type of the Result

#### Parameters

##### fOk

(`value`) => `any`

a function that takes the Ok value of the Result

##### fErr?

(`value`) => `any`

a function that takes the Error value of the Result

#### Returns

`Result`\<`TOk`, `TErr`\>

***

### ifAsync()

> **ifAsync**(`fOk`, `fErr?`): `Promise`\<`Result`\<`TOk`, `TErr`\>\>

Defined in: [result.ts:208](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L208)

Executes one of the provided async functions based on the type of the Result

#### Parameters

##### fOk

(`value`) => `Promise`\<`any`\>

a function that takes the Ok value of the Result

##### fErr?

(`value`) => `Promise`\<`any`\>

a function that takes the Error value of the Result

#### Returns

`Promise`\<`Result`\<`TOk`, `TErr`\>\>

***

### ifErr()

> **ifErr**(`f`): `Result`\<`TOk`, `TErr`\>

Defined in: [result.ts:171](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L171)

If the Result is of type Error, the provided function is executed

#### Parameters

##### f

(`value`) => `any`

a function that takes the Error value of the Result

#### Returns

`Result`\<`TOk`, `TErr`\>

***

### ifErrAsync()

> **ifErrAsync**(`f`): `Promise`\<`Result`\<`TOk`, `TErr`\>\>

Defined in: [result.ts:182](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L182)

If the Result is of type Error, the provided async function is executed

#### Parameters

##### f

(`value`) => `Promise`\<`any`\>

a function that takes the Error value of the Result

#### Returns

`Promise`\<`Result`\<`TOk`, `TErr`\>\>

***

### ifOk()

> **ifOk**(`f`): `Result`\<`TOk`, `TErr`\>

Defined in: [result.ts:149](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L149)

If the Result is of type Ok, the provided function is executed

#### Parameters

##### f

(`value`) => `any`

a function that takes the Ok value of the Result

#### Returns

`Result`\<`TOk`, `TErr`\>

***

### ifOkAsync()

> **ifOkAsync**(`f`): `Promise`\<`Result`\<`TOk`, `TErr`\>\>

Defined in: [result.ts:160](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L160)

If the Result is of type Ok, the provided async function is executed

#### Parameters

##### f

(`value`) => `Promise`\<`any`\>

a function that takes the Ok value of the Result

#### Returns

`Promise`\<`Result`\<`TOk`, `TErr`\>\>

***

### map()

> **map**\<`TOk2`\>(`f`): `Result`\<`TOk2`, `TErr`\>

Defined in: [result.ts:223](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L223)

If the Result is of type Ok, its value is passed to the provided function and the return
value of the latter is wrapped in a new Ok Result. Otherwise, the Error value is preserved and the
function is not executed

#### Type Parameters

##### TOk2

`TOk2`

#### Parameters

##### f

(`value`) => `TOk2`

the mapping function from TOk to TOk2

#### Returns

`Result`\<`TOk2`, `TErr`\>

***

### mapAsync()

> **mapAsync**\<`TOk2`\>(`f`): `Promise`\<`Result`\<`TOk2`, `TErr`\>\>

Defined in: [result.ts:233](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L233)

If the Result is of type Ok, its value is passed to the provided async function and the return
value of the latter is wrapped in a new Ok Result. Otherwise, the Error value is preserved and the
function is not executed

#### Type Parameters

##### TOk2

`TOk2`

#### Parameters

##### f

(`value`) => `Promise`\<`TOk2`\>

the mapping function from TOk to TOk2

#### Returns

`Promise`\<`Result`\<`TOk2`, `TErr`\>\>

***

### mapErr()

> **mapErr**\<`TErr2`\>(`f`): `Result`\<`TOk`, `TErr2`\>

Defined in: [result.ts:243](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L243)

If the Result is of type Error, its value is passed to the provided function and the return
value of the latter is wrapped in a new Error Result. Otherwise, the Ok value is preserved and the
function is not executed

#### Type Parameters

##### TErr2

`TErr2`

#### Parameters

##### f

(`value`) => `TErr2`

the mapping function from TErr to TErr2

#### Returns

`Result`\<`TOk`, `TErr2`\>

***

### mapErrAsync()

> **mapErrAsync**\<`TErr2`\>(`f`): `Promise`\<`Result`\<`TOk`, `TErr2`\>\>

Defined in: [result.ts:253](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L253)

If the Result is of type Error, its value is passed to the provided async function and the return
value of the latter is wrapped in a new Error Result. Otherwise, the Ok value is preserved and the
function is not executed

#### Type Parameters

##### TErr2

`TErr2`

#### Parameters

##### f

(`value`) => `Promise`\<`TErr2`\>

the mapping function from TErr to TErr2

#### Returns

`Promise`\<`Result`\<`TOk`, `TErr2`\>\>

***

### toOptional()

> **toOptional**(): [`Optional`](Optional.md)\<`TOk`\>

Defined in: [result.ts:123](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L123)

Generates an Optional from a Result. If the Result is of type Ok,
its value is wrapped into an Optional, otherwise an Empty Optional
is returned

#### Returns

[`Optional`](Optional.md)\<`TOk`\>

***

### unwrap()

> **unwrap**(): `TOk`

Defined in: [result.ts:100](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L100)

Returns the Ok value of a Result

#### Returns

`TOk`

#### Throws

if the Result is of type Error

***

### unwrapErr()

> **unwrapErr**(): `TErr`

Defined in: [result.ts:111](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L111)

Returns the Error value of a Result

#### Returns

`TErr`

#### Throws

if the Result is of type Ok

***

### err()

> `static` **err**\<`TErr`\>(`value`): `Result`\<`any`, `TErr`\>

Defined in: [result.ts:37](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L37)

Generates a Result of type Error

#### Type Parameters

##### TErr

`TErr`

#### Parameters

##### value

`TErr`

the Error value of the Result

#### Returns

`Result`\<`any`, `TErr`\>

***

### fromOptional()

> `static` **fromOptional**\<`O`, `TErr`\>(`optional`, `errIfEmpty`): `Result`\<`O`, `TErr`\>

Defined in: [result.ts:47](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L47)

Generates a Result from an Optional. If the Optional has a value, the latter will
be wrapped as an Ok Result, otherwise an Error Result will be created with the specified error.

#### Type Parameters

##### O

`O`

##### TErr

`TErr`

#### Parameters

##### optional

[`Optional`](Optional.md)\<`O`\>

the Optional that will be used to generate the Result

##### errIfEmpty

`TErr`

the Error value of the Result in case the Optional is empty

#### Returns

`Result`\<`O`, `TErr`\>

***

### fromPromise()

> `static` **fromPromise**\<`TOk`, `TErr`\>(`promise`): `Promise`\<`Result`\<`TOk`, `TErr`\>\>

Defined in: [result.ts:78](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L78)

Generates a Result given a Promise that may resolve with a value (wrapped as an Ok Result) or reject with a value (wrapped as an Error Result)

#### Type Parameters

##### TOk

`TOk`

##### TErr

`TErr` = `Error`

#### Parameters

##### promise

`Promise`\<`TOk`\>

a Promise that may resolve with a value or reject with an error value.

#### Returns

`Promise`\<`Result`\<`TOk`, `TErr`\>\>

***

### fromThrower()

> `static` **fromThrower**\<`TOk`, `TErr`\>(`callback`): `Result`\<`TOk`, `TErr`\>

Defined in: [result.ts:55](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L55)

Generates a Result given a function that may return a value (wrapped as an Ok Result) or throw an exception (wrapped as an Error Result)

#### Type Parameters

##### TOk

`TOk`

##### TErr

`TErr` = `Error`

#### Parameters

##### callback

() => `TOk`

a function that may or may not throw and exception.

#### Returns

`Result`\<`TOk`, `TErr`\>

***

### fromThrowerAsync()

> `static` **fromThrowerAsync**\<`TOk`, `TErr`\>(`callback`): `Promise`\<`Result`\<`TOk`, `TErr`\>\>

Defined in: [result.ts:66](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L66)

Generates a Result given an async function that may return a value (wrapped as an Ok Result) or throw an exception (wrapped as an Error Result)

#### Type Parameters

##### TOk

`TOk`

##### TErr

`TErr` = `Error`

#### Parameters

##### callback

() => `Promise`\<`TOk`\>

an async function that may or may not throw and exception.

#### Returns

`Promise`\<`Result`\<`TOk`, `TErr`\>\>

***

### ok()

> `static` **ok**\<`TOk`\>(`value`): `Result`\<`TOk`, `any`\>

Defined in: [result.ts:29](https://github.com/cdellacqua/exceptnomore/blob/master/src/result.ts#L29)

Generates a Result of type Ok

#### Type Parameters

##### TOk

`TOk`

#### Parameters

##### value

`TOk`

the Ok value of the Result

#### Returns

`Result`\<`TOk`, `any`\>
