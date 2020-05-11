[exceptnomore](../README.md) › [Optional](optional.md)

# Class: Optional <**T**>

The Optional class is meant to be an alternative to the more common
'return null'/'return undefined' statements.
An Optional can be either Present or Empty. The former wraps the
value returned by a function. The latter can be used instead of null/undefined.

By using the Optional type, the caller of a function
can explicitly see that it may not return any meaningful value and can handle both the
present and empty conditions with the fluent API provided by this class.

## Type parameters

▪ **T**

## Hierarchy

* **Optional**

## Index

### Accessors

* [isEmpty](optional.md#isempty)
* [isPresent](optional.md#ispresent)

### Methods

* [else](optional.md#else)
* [filter](optional.md#filter)
* [filterAsync](optional.md#filterasync)
* [flatMap](optional.md#flatmap)
* [flatMapAsync](optional.md#flatmapasync)
* [if](optional.md#if)
* [ifAsync](optional.md#ifasync)
* [ifEmpty](optional.md#ifempty)
* [ifEmptyAsync](optional.md#ifemptyasync)
* [ifPresent](optional.md#ifpresent)
* [ifPresentAsync](optional.md#ifpresentasync)
* [map](optional.md#map)
* [mapAsync](optional.md#mapasync)
* [toResult](optional.md#toresult)
* [unwrap](optional.md#unwrap)
* [unwrapNullable](optional.md#unwrapnullable)
* [empty](optional.md#static-empty)
* [fromPromise](optional.md#static-frompromise)
* [fromResult](optional.md#static-fromresult)
* [fromThrower](optional.md#static-fromthrower)
* [fromThrowerAsync](optional.md#static-fromthrowerasync)
* [of](optional.md#static-of)
* [ofNullable](optional.md#static-ofnullable)

## Accessors

###  isEmpty

• **get isEmpty**(): *boolean*

Returns true if the Optional is Empty, false otherwise

**Returns:** *boolean*

___

###  isPresent

• **get isPresent**(): *boolean*

Returns true if the Optional is Present, false otherwise

**Returns:** *boolean*

## Methods

###  else

▸ **else**(`value`: T): *T*

Returns the Present value of an Optional, otherwise returns the
passed value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | T | the fallback value  |

**Returns:** *T*

___

###  filter

▸ **filter**(`predicate`: function): *[Optional](optional.md)‹T›*

If the Optional is Empty or the provided function returns false given the value of the Present Optional,
an Empty Optional is returned. Otherwise the original Present Optional is returned.

**Parameters:**

▪ **predicate**: *function*

a function that returns a boolean based on the value of the Optional

▸ (`value`: T): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

**Returns:** *[Optional](optional.md)‹T›*

___

###  filterAsync

▸ **filterAsync**(`predicate`: function): *Promise‹[Optional](optional.md)‹T››*

If the Optional is Empty or the provided async function returns false given the value of the Present Optional,
an Empty Optional is returned. Otherwise the original Present Optional is returned.

**Parameters:**

▪ **predicate**: *function*

a function that returns a boolean based on the value of the Optional

▸ (`value`: T): *Promise‹boolean›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

**Returns:** *Promise‹[Optional](optional.md)‹T››*

___

###  flatMap

▸ **flatMap**<**O**>(`f`: function): *[Optional](optional.md)‹O›*

If the Optional is Present, its value is passed to the provided function and the return
value is returned. Otherwise, an Empty Optional is returned and the
function is not executed

**Type parameters:**

▪ **O**

**Parameters:**

▪ **f**: *function*

the mapping function from T to O

▸ (`value`: T): *[Optional](optional.md)‹O›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

**Returns:** *[Optional](optional.md)‹O›*

___

###  flatMapAsync

▸ **flatMapAsync**<**O**>(`f`: function): *Promise‹[Optional](optional.md)‹O››*

If the Optional is Present, its value is passed to the provided async function and the return
value is returned. Otherwise, an Empty Optional is returned and the
function is not executed

**Type parameters:**

▪ **O**

**Parameters:**

▪ **f**: *function*

the mapping function from T to O

▸ (`value`: T): *Promise‹[Optional](optional.md)‹O››*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

**Returns:** *Promise‹[Optional](optional.md)‹O››*

___

###  if

▸ **if**(`fPresent`: function, `fEmpty?`: undefined | function): *[Optional](optional.md)‹T›*

Executes one of the provided functions based on the type of the Optional

**Parameters:**

▪ **fPresent**: *function*

a function that takes the value of the Optional

▸ (`value`: T): *any*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

▪`Optional`  **fEmpty**: *undefined | function*

a function that does not have parameters

**Returns:** *[Optional](optional.md)‹T›*

___

###  ifAsync

▸ **ifAsync**(`fOk`: function, `fErr?`: undefined | function): *Promise‹[Optional](optional.md)‹T››*

Executes one of the provided async functions based on the type of the Optional

**Parameters:**

▪ **fOk**: *function*

▸ (`value`: T): *Promise‹any›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

▪`Optional`  **fErr**: *undefined | function*

**Returns:** *Promise‹[Optional](optional.md)‹T››*

___

###  ifEmpty

▸ **ifEmpty**(`f`: function): *[Optional](optional.md)‹T›*

If the Optional is Empty, the provided function is executed

**Parameters:**

▪ **f**: *function*

a function

▸ (): *any*

**Returns:** *[Optional](optional.md)‹T›*

___

###  ifEmptyAsync

▸ **ifEmptyAsync**(`f`: function): *Promise‹[Optional](optional.md)‹T››*

If the Optional is Empty, the provided async function is executed

**Parameters:**

▪ **f**: *function*

a function

▸ (): *Promise‹any›*

**Returns:** *Promise‹[Optional](optional.md)‹T››*

___

###  ifPresent

▸ **ifPresent**(`f`: function): *[Optional](optional.md)‹T›*

If the Optional is Present, the provided function is executed

**Parameters:**

▪ **f**: *function*

a function that takes the value of the Optional

▸ (`value`: T): *any*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

**Returns:** *[Optional](optional.md)‹T›*

___

###  ifPresentAsync

▸ **ifPresentAsync**(`f`: function): *Promise‹[Optional](optional.md)‹T››*

If the Optional is Present, the provided async function is executed

**Parameters:**

▪ **f**: *function*

a function that takes the value of the Optional

▸ (`value`: T): *Promise‹any›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

**Returns:** *Promise‹[Optional](optional.md)‹T››*

___

###  map

▸ **map**<**O**>(`f`: function): *[Optional](optional.md)‹O›*

If the Optional is Present, its value is passed to the provided function and the return
value of the latter is wrapped in a new Optional. Otherwise, an Empty Optional is returned and the
function is not executed

**Type parameters:**

▪ **O**

**Parameters:**

▪ **f**: *function*

the mapping function from T to O

▸ (`value`: T): *O*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

**Returns:** *[Optional](optional.md)‹O›*

___

###  mapAsync

▸ **mapAsync**<**O**>(`f`: function): *Promise‹[Optional](optional.md)‹O››*

If the Optional is Present, its value is passed to the provided async function and the return
value of the latter is wrapped in a new Optional. Otherwise, an Empty Optional is returned and the
function is not executed

**Type parameters:**

▪ **O**

**Parameters:**

▪ **f**: *function*

the mapping function from T to O

▸ (`value`: T): *Promise‹O›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

**Returns:** *Promise‹[Optional](optional.md)‹O››*

___

###  toResult

▸ **toResult**<**TErr**>(`errIfEmpty`: TErr): *[Result](result.md)‹T, TErr›*

Generates a Result from an Optional. If the Optional has a value, the latter will
be wrapped as an Ok Result, otherwise an Error Result will be created with the specified error.

**Type parameters:**

▪ **TErr**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`errIfEmpty` | TErr | the Error value of the Result in case the Optional is empty  |

**Returns:** *[Result](result.md)‹T, TErr›*

___

###  unwrap

▸ **unwrap**(): *T*

Unwrap the Present value of the Optional

**`throws`** {Error} if the Optional is of type Empty

**Returns:** *T*

___

###  unwrapNullable

▸ **unwrapNullable**(): *T | null*

Unwrap the value (if the Optional is Present) or returns null (if the Optional is Empty)

**Returns:** *T | null*

___

### `Static` empty

▸ **empty**<**O**>(): *[Optional](optional.md)‹O›*

Generates an Empty Optional

**Type parameters:**

▪ **O**

**Returns:** *[Optional](optional.md)‹O›*

___

### `Static` fromPromise

▸ **fromPromise**<**O**>(`promise`: Promise‹O›): *Promise‹[Optional](optional.md)‹O››*

Generates an Optional from a Promise. If it was resolved its value is wrapped in a Present Optional, otherwise
an Empty Optional is returned

**Type parameters:**

▪ **O**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`promise` | Promise‹O› |   |

**Returns:** *Promise‹[Optional](optional.md)‹O››*

___

### `Static` fromResult

▸ **fromResult**<**O**, **TErr**>(`value`: [Result](result.md)‹O, TErr›): *[Optional](optional.md)‹O›*

Generates an Optional from a Result. If the Result is of type Ok, its value is wrapped in the Optional,
otherwise an Empty Optional is returned

**Type parameters:**

▪ **O**

▪ **TErr**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | [Result](result.md)‹O, TErr› | the value  |

**Returns:** *[Optional](optional.md)‹O›*

___

### `Static` fromThrower

▸ **fromThrower**<**O**>(`callback`: function): *[Optional](optional.md)‹O›*

Generates an Optional executing a function that may or may not throw an exception.
On successful completion, the returned value is wrapped in a Present Optional, otherwise
an Empty Optional is returned

**Type parameters:**

▪ **O**

**Parameters:**

▪ **callback**: *function*

a function that may or may not throw an exception

▸ (): *O*

**Returns:** *[Optional](optional.md)‹O›*

___

### `Static` fromThrowerAsync

▸ **fromThrowerAsync**<**O**>(`callback`: function): *Promise‹[Optional](optional.md)‹O››*

Generates an Optional executing an async function that may or may not throw an exception.
On successful completion, the returned value is wrapped in a Present Optional, otherwise
an Empty Optional is returned

**Type parameters:**

▪ **O**

**Parameters:**

▪ **callback**: *function*

a function that may or may not throw an exception

▸ (): *Promise‹O›*

**Returns:** *Promise‹[Optional](optional.md)‹O››*

___

### `Static` of

▸ **of**<**O**>(`value`: O): *[Optional](optional.md)‹O›*

Generates an Optional that wraps the provided value

**Type parameters:**

▪ **O**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | O | the value  |

**Returns:** *[Optional](optional.md)‹O›*

___

### `Static` ofNullable

▸ **ofNullable**<**O**>(`value`: O | null | undefined): *[Optional](optional.md)‹O›*

Generates an Optional of a value. If the value is null or undefined, an Empty Optional
is returned, otherwise the value is wrapped in a Present Optional.

**Type parameters:**

▪ **O**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | O &#124; null &#124; undefined | the nullable/undefinable value to be wrapped  |

**Returns:** *[Optional](optional.md)‹O›*
