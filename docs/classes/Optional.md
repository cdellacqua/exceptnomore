[**exceptnomore**](../README.md)

***

[exceptnomore](../README.md) / Optional

# Class: Optional\<T\>

Defined in: [optional.ts:13](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L13)

The Optional class is meant to be an alternative to the more common
'return null'/'return undefined' statements.
An Optional can be either Present or Empty. The former wraps the
value returned by a function. The latter can be used instead of null/undefined.
 
By using the Optional type, the caller of a function
can explicitly see that it may not return any meaningful value and can handle both the
present and empty conditions with the fluent API provided by this class.

## Type Parameters

### T

`T`

## Accessors

### isEmpty

#### Get Signature

> **get** **isEmpty**(): `boolean`

Defined in: [optional.ts:114](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L114)

Returns true if the Optional is Empty, false otherwise

##### Returns

`boolean`

***

### isPresent

#### Get Signature

> **get** **isPresent**(): `boolean`

Defined in: [optional.ts:120](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L120)

Returns true if the Optional is Present, false otherwise

##### Returns

`boolean`

## Methods

### else()

> **else**(`value`): `T`

Defined in: [optional.ts:138](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L138)

Returns the Present value of an Optional, otherwise returns the
passed value

#### Parameters

##### value

`T`

the fallback value

#### Returns

`T`

***

### filter()

> **filter**(`predicate`): `Optional`\<`T`\>

Defined in: [optional.ts:276](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L276)

If the Optional is Empty or the provided function returns false given the value of the Present Optional,
an Empty Optional is returned. Otherwise the original Present Optional is returned.

#### Parameters

##### predicate

(`value`) => `boolean`

a function that returns a boolean based on the value of the Optional

#### Returns

`Optional`\<`T`\>

***

### filterAsync()

> **filterAsync**(`predicate`): `Promise`\<`Optional`\<`T`\>\>

Defined in: [optional.ts:289](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L289)

If the Optional is Empty or the provided async function returns false given the value of the Present Optional,
an Empty Optional is returned. Otherwise the original Present Optional is returned.

#### Parameters

##### predicate

(`value`) => `Promise`\<`boolean`\>

a function that returns a boolean based on the value of the Optional

#### Returns

`Promise`\<`Optional`\<`T`\>\>

***

### flatMap()

> **flatMap**\<`O`\>(`f`): `Optional`\<`O`\>

Defined in: [optional.ts:177](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L177)

If the Optional is Present, its value is passed to the provided function and the return
value is returned. Otherwise, an Empty Optional is returned and the
function is not executed

#### Type Parameters

##### O

`O`

#### Parameters

##### f

(`value`) => `Optional`\<`O`\>

the mapping function from T to O

#### Returns

`Optional`\<`O`\>

***

### flatMapAsync()

> **flatMapAsync**\<`O`\>(`f`): `Promise`\<`Optional`\<`O`\>\>

Defined in: [optional.ts:191](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L191)

If the Optional is Present, its value is passed to the provided async function and the return
value is returned. Otherwise, an Empty Optional is returned and the
function is not executed

#### Type Parameters

##### O

`O`

#### Parameters

##### f

(`value`) => `Promise`\<`Optional`\<`O`\>\>

the mapping function from T to O

#### Returns

`Promise`\<`Optional`\<`O`\>\>

***

### if()

> **if**(`fPresent`, `fEmpty?`): `Optional`\<`T`\>

Defined in: [optional.ts:248](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L248)

Executes one of the provided functions based on the type of the Optional

#### Parameters

##### fPresent

(`value`) => `any`

a function that takes the value of the Optional

##### fEmpty?

() => `any`

a function that does not have parameters

#### Returns

`Optional`\<`T`\>

***

### ifAsync()

> **ifAsync**(`fOk`, `fErr?`): `Promise`\<`Optional`\<`T`\>\>

Defined in: [optional.ts:262](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L262)

Executes one of the provided async functions based on the type of the Optional

#### Parameters

##### fOk

(`value`) => `Promise`\<`any`\>

a function that takes the value of the Optional

##### fErr?

() => `Promise`\<`any`\>

a function that does not have parameters

#### Returns

`Promise`\<`Optional`\<`T`\>\>

***

### ifEmpty()

> **ifEmpty**(`f`): `Optional`\<`T`\>

Defined in: [optional.ts:225](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L225)

If the Optional is Empty, the provided function is executed

#### Parameters

##### f

() => `any`

a function

#### Returns

`Optional`\<`T`\>

***

### ifEmptyAsync()

> **ifEmptyAsync**(`f`): `Promise`\<`Optional`\<`T`\>\>

Defined in: [optional.ts:236](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L236)

If the Optional is Empty, the provided async function is executed

#### Parameters

##### f

() => `Promise`\<`any`\>

a function

#### Returns

`Promise`\<`Optional`\<`T`\>\>

***

### ifPresent()

> **ifPresent**(`f`): `Optional`\<`T`\>

Defined in: [optional.ts:203](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L203)

If the Optional is Present, the provided function is executed

#### Parameters

##### f

(`value`) => `any`

a function that takes the value of the Optional

#### Returns

`Optional`\<`T`\>

***

### ifPresentAsync()

> **ifPresentAsync**(`f`): `Promise`\<`Optional`\<`T`\>\>

Defined in: [optional.ts:214](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L214)

If the Optional is Present, the provided async function is executed

#### Parameters

##### f

(`value`) => `Promise`\<`any`\>

a function that takes the value of the Optional

#### Returns

`Promise`\<`Optional`\<`T`\>\>

***

### map()

> **map**\<`O`\>(`f`): `Optional`\<`O`\>

Defined in: [optional.ts:149](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L149)

If the Optional is Present, its value is passed to the provided function and the return
value of the latter is wrapped in a new Optional. Otherwise, an Empty Optional is returned and the
function is not executed

#### Type Parameters

##### O

`O`

#### Parameters

##### f

(`value`) => `O`

the mapping function from T to O

#### Returns

`Optional`\<`O`\>

***

### mapAsync()

> **mapAsync**\<`O`\>(`f`): `Promise`\<`Optional`\<`O`\>\>

Defined in: [optional.ts:163](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L163)

If the Optional is Present, its value is passed to the provided async function and the return
value of the latter is wrapped in a new Optional. Otherwise, an Empty Optional is returned and the
function is not executed

#### Type Parameters

##### O

`O`

#### Parameters

##### f

(`value`) => `Promise`\<`O`\>

the mapping function from T to O

#### Returns

`Promise`\<`Optional`\<`O`\>\>

***

### toResult()

> **toResult**\<`TErr`\>(`errIfEmpty`): [`Result`](Result.md)\<`T`, `TErr`\>

Defined in: [optional.ts:129](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L129)

Generates a Result from an Optional. If the Optional has a value, the latter will
be wrapped as an Ok Result, otherwise an Error Result will be created with the specified error.

#### Type Parameters

##### TErr

`TErr`

#### Parameters

##### errIfEmpty

`TErr`

the Error value of the Result in case the Optional is empty

#### Returns

[`Result`](Result.md)\<`T`, `TErr`\>

***

### unwrap()

> **unwrap**(): `T`

Defined in: [optional.ts:97](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L97)

Unwrap the Present value of the Optional

#### Returns

`T`

#### Throws

if the Optional is of type Empty

***

### unwrapNullable()

> **unwrapNullable**(): `T` \| `null`

Defined in: [optional.ts:107](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L107)

Unwrap the value (if the Optional is Present) or returns null (if the Optional is Empty)

#### Returns

`T` \| `null`

***

### empty()

> `static` **empty**\<`O`\>(): `Optional`\<`O`\>

Defined in: [optional.ts:89](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L89)

Generates an Empty Optional

#### Type Parameters

##### O

`O` = `any`

#### Returns

`Optional`\<`O`\>

***

### fromPromise()

> `static` **fromPromise**\<`O`\>(`promise`): `Promise`\<`Optional`\<`O`\>\>

Defined in: [optional.ts:71](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L71)

Generates an Optional from a Promise. If it was resolved its value is wrapped in a Present Optional, otherwise
an Empty Optional is returned

#### Type Parameters

##### O

`O`

#### Parameters

##### promise

`Promise`\<`O`\>

a Promise that may resolve with a value or reject.

#### Returns

`Promise`\<`Optional`\<`O`\>\>

***

### fromResult()

> `static` **fromResult**\<`O`, `TErr`\>(`value`): `Optional`\<`O`\>

Defined in: [optional.ts:34](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L34)

Generates an Optional from a Result. If the Result is of type Ok, its value is wrapped in the Optional,
otherwise an Empty Optional is returned

#### Type Parameters

##### O

`O`

##### TErr

`TErr`

#### Parameters

##### value

[`Result`](Result.md)\<`O`, `TErr`\>

the value

#### Returns

`Optional`\<`O`\>

***

### fromThrower()

> `static` **fromThrower**\<`O`\>(`callback`): `Optional`\<`O`\>

Defined in: [optional.ts:46](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L46)

Generates an Optional executing a function that may or may not throw an exception.
On successful completion, the returned value is wrapped in a Present Optional, otherwise
an Empty Optional is returned

#### Type Parameters

##### O

`O`

#### Parameters

##### callback

() => `O`

a function that may or may not throw an exception

#### Returns

`Optional`\<`O`\>

***

### fromThrowerAsync()

> `static` **fromThrowerAsync**\<`O`\>(`callback`): `Promise`\<`Optional`\<`O`\>\>

Defined in: [optional.ts:59](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L59)

Generates an Optional executing an async function that may or may not throw an exception.
On successful completion, the returned value is wrapped in a Present Optional, otherwise
an Empty Optional is returned

#### Type Parameters

##### O

`O`

#### Parameters

##### callback

() => `Promise`\<`O`\>

a function that may or may not throw an exception

#### Returns

`Promise`\<`Optional`\<`O`\>\>

***

### of()

> `static` **of**\<`O`\>(`value`): `Optional`\<`O`\>

Defined in: [optional.ts:25](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L25)

Generates an Optional that wraps the provided value

#### Type Parameters

##### O

`O`

#### Parameters

##### value

`O`

the value

#### Returns

`Optional`\<`O`\>

***

### ofNullable()

> `static` **ofNullable**\<`O`\>(`value`): `Optional`\<`O`\>

Defined in: [optional.ts:80](https://github.com/cdellacqua/exceptnomore/blob/master/src/optional.ts#L80)

Generates an Optional of a value. If the value is null or undefined, an Empty Optional
is returned, otherwise the value is wrapped in a Present Optional.

#### Type Parameters

##### O

`O`

#### Parameters

##### value

`O` \| `null` \| `undefined`

the nullable/undefinable value to be wrapped

#### Returns

`Optional`\<`O`\>
