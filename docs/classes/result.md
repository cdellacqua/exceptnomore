[exceptnomore](../README.md) › [Result](result.md)

# Class: Result <**TOk, TErr**>

The Result class is meant to be an alternative to the more common
throw statements.
A Result can be either Ok or Error. The former wraps the
value returned by a function that successfully executed its
instructions. The latter can be used to return an exception,
or a generic reason why the function couldn't successfully return.

By using the Result type, the caller of a function
can explicitly see that it may fail and can handle both the
success and error conditions with the fluent API provided by this class.

## Type parameters

▪ **TOk**

▪ **TErr**

## Hierarchy

* **Result**

## Index

### Accessors

* [isErr](result.md#iserr)
* [isOk](result.md#isok)

### Methods

* [else](result.md#else)
* [elseErr](result.md#elseerr)
* [flatMap](result.md#flatmap)
* [flatMapAsync](result.md#flatmapasync)
* [flatMapErr](result.md#flatmaperr)
* [flatMapErrAsync](result.md#flatmaperrasync)
* [if](result.md#if)
* [ifAsync](result.md#ifasync)
* [ifErr](result.md#iferr)
* [ifErrAsync](result.md#iferrasync)
* [ifOk](result.md#ifok)
* [ifOkAsync](result.md#ifokasync)
* [map](result.md#map)
* [mapAsync](result.md#mapasync)
* [mapErr](result.md#maperr)
* [mapErrAsync](result.md#maperrasync)
* [toOptional](result.md#tooptional)
* [unwrap](result.md#unwrap)
* [unwrapErr](result.md#unwraperr)
* [err](result.md#static-err)
* [fromOptional](result.md#static-fromoptional)
* [fromPromise](result.md#static-frompromise)
* [fromThrower](result.md#static-fromthrower)
* [fromThrowerAsync](result.md#static-fromthrowerasync)
* [ok](result.md#static-ok)

## Accessors

###  isErr

• **get isErr**(): *boolean*

Returns true if the Result is of type Error, false otherwise

**Returns:** *boolean*

___

###  isOk

• **get isOk**(): *boolean*

Returns true if the Result is of type Ok, false otherwise

**Returns:** *boolean*

## Methods

###  else

▸ **else**(`value`: TOk): *TOk*

Returns the Ok value of a Result if present, otherwise returns the
passed value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | TOk | the fallback Ok value  |

**Returns:** *TOk*

___

###  elseErr

▸ **elseErr**(`value`: TErr): *TErr*

Returns the Error value of a Result if present, otherwise returns the
passed value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | TErr | the fallback Error value  |

**Returns:** *TErr*

___

###  flatMap

▸ **flatMap**<**TOk2**>(`f`: function): *[Result](result.md)‹TOk2, TErr›*

If the Result is of type Ok, its value is passed to the provided function and the return
value of the latter is returned. Otherwise, the Error value is preserved and the
function is not executed

**Type parameters:**

▪ **TOk2**

**Parameters:**

▪ **f**: *function*

the mapping function from TOk to Result<TOk2, TErr>

▸ (`value`: TOk): *[Result](result.md)‹TOk2, TErr›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | TOk |

**Returns:** *[Result](result.md)‹TOk2, TErr›*

___

###  flatMapAsync

▸ **flatMapAsync**<**TOk2**>(`f`: function): *Promise‹[Result](result.md)‹TOk2, TErr››*

If the Result is of type Ok, its value is passed to the provided async function and the return
value of the latter is returned. Otherwise, the Error value is preserved and the
function is not executed

**Type parameters:**

▪ **TOk2**

**Parameters:**

▪ **f**: *function*

the mapping function from TOk to Result<TOk2, TErr>

▸ (`value`: TOk): *Promise‹[Result](result.md)‹TOk2, TErr››*

**Parameters:**

Name | Type |
------ | ------ |
`value` | TOk |

**Returns:** *Promise‹[Result](result.md)‹TOk2, TErr››*

___

###  flatMapErr

▸ **flatMapErr**<**TErr2**>(`f`: function): *[Result](result.md)‹TOk, TErr2›*

If the Result is of type Error, its value is passed to the provided function and the return
value of the latter is returned. Otherwise, the Ok value is preserved and the
function is not executed

**Type parameters:**

▪ **TErr2**

**Parameters:**

▪ **f**: *function*

the mapping function from TOk to Result<TOk, TErr2>

▸ (`value`: TErr): *[Result](result.md)‹TOk, TErr2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | TErr |

**Returns:** *[Result](result.md)‹TOk, TErr2›*

___

###  flatMapErrAsync

▸ **flatMapErrAsync**<**TErr2**>(`f`: function): *Promise‹[Result](result.md)‹TOk, TErr2››*

If the Result is of type Error, its value is passed to the provided async function and the return
value of the latter is returned. Otherwise, the Ok value is preserved and the
function is not executed

**Type parameters:**

▪ **TErr2**

**Parameters:**

▪ **f**: *function*

the mapping function from TOk to Result<TOk, TErr2>

▸ (`value`: TErr): *Promise‹[Result](result.md)‹TOk, TErr2››*

**Parameters:**

Name | Type |
------ | ------ |
`value` | TErr |

**Returns:** *Promise‹[Result](result.md)‹TOk, TErr2››*

___

###  if

▸ **if**(`fOk`: function, `fErr?`: undefined | function): *[Result](result.md)‹TOk, TErr›*

Executes one of the provided functions based on the type of the Result

**Parameters:**

▪ **fOk**: *function*

a function that takes the Ok value of the Result

▸ (`value`: TOk): *any*

**Parameters:**

Name | Type |
------ | ------ |
`value` | TOk |

▪`Optional`  **fErr**: *undefined | function*

a function that takes the Error value of the Result

**Returns:** *[Result](result.md)‹TOk, TErr›*

___

###  ifAsync

▸ **ifAsync**(`fOk`: function, `fErr?`: undefined | function): *Promise‹[Result](result.md)‹TOk, TErr››*

Executes one of the provided async functions based on the type of the Result

**Parameters:**

▪ **fOk**: *function*

a function that takes the Ok value of the Result

▸ (`value`: TOk): *Promise‹any›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | TOk |

▪`Optional`  **fErr**: *undefined | function*

a function that takes the Error value of the Result

**Returns:** *Promise‹[Result](result.md)‹TOk, TErr››*

___

###  ifErr

▸ **ifErr**(`f`: function): *[Result](result.md)‹TOk, TErr›*

If the Result is of type Error, the provided function is executed

**Parameters:**

▪ **f**: *function*

a function that takes the Error value of the Result

▸ (`value`: TErr): *any*

**Parameters:**

Name | Type |
------ | ------ |
`value` | TErr |

**Returns:** *[Result](result.md)‹TOk, TErr›*

___

###  ifErrAsync

▸ **ifErrAsync**(`f`: function): *Promise‹[Result](result.md)‹TOk, TErr››*

If the Result is of type Error, the provided async function is executed

**Parameters:**

▪ **f**: *function*

a function that takes the Error value of the Result

▸ (`value`: TErr): *Promise‹any›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | TErr |

**Returns:** *Promise‹[Result](result.md)‹TOk, TErr››*

___

###  ifOk

▸ **ifOk**(`f`: function): *[Result](result.md)‹TOk, TErr›*

If the Result is of type Ok, the provided function is executed

**Parameters:**

▪ **f**: *function*

a function that takes the Ok value of the Result

▸ (`value`: TOk): *any*

**Parameters:**

Name | Type |
------ | ------ |
`value` | TOk |

**Returns:** *[Result](result.md)‹TOk, TErr›*

___

###  ifOkAsync

▸ **ifOkAsync**(`f`: function): *Promise‹[Result](result.md)‹TOk, TErr››*

If the Result is of type Ok, the provided async function is executed

**Parameters:**

▪ **f**: *function*

a function that takes the Ok value of the Result

▸ (`value`: TOk): *Promise‹any›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | TOk |

**Returns:** *Promise‹[Result](result.md)‹TOk, TErr››*

___

###  map

▸ **map**<**TOk2**>(`f`: function): *[Result](result.md)‹TOk2, TErr›*

If the Result is of type Ok, its value is passed to the provided function and the return
value of the latter is wrapped in a new Ok Result. Otherwise, the Error value is preserved and the
function is not executed

**Type parameters:**

▪ **TOk2**

**Parameters:**

▪ **f**: *function*

the mapping function from TOk to TOk2

▸ (`value`: TOk): *TOk2*

**Parameters:**

Name | Type |
------ | ------ |
`value` | TOk |

**Returns:** *[Result](result.md)‹TOk2, TErr›*

___

###  mapAsync

▸ **mapAsync**<**TOk2**>(`f`: function): *Promise‹[Result](result.md)‹TOk2, TErr››*

If the Result is of type Ok, its value is passed to the provided async function and the return
value of the latter is wrapped in a new Ok Result. Otherwise, the Error value is preserved and the
function is not executed

**Type parameters:**

▪ **TOk2**

**Parameters:**

▪ **f**: *function*

the mapping function from TOk to TOk2

▸ (`value`: TOk): *Promise‹TOk2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | TOk |

**Returns:** *Promise‹[Result](result.md)‹TOk2, TErr››*

___

###  mapErr

▸ **mapErr**<**TErr2**>(`f`: function): *[Result](result.md)‹TOk, TErr2›*

If the Result is of type Error, its value is passed to the provided function and the return
value of the latter is wrapped in a new Error Result. Otherwise, the Ok value is preserved and the
function is not executed

**Type parameters:**

▪ **TErr2**

**Parameters:**

▪ **f**: *function*

the mapping function from TErr to TErr2

▸ (`value`: TErr): *TErr2*

**Parameters:**

Name | Type |
------ | ------ |
`value` | TErr |

**Returns:** *[Result](result.md)‹TOk, TErr2›*

___

###  mapErrAsync

▸ **mapErrAsync**<**TErr2**>(`f`: function): *Promise‹[Result](result.md)‹TOk, TErr2››*

If the Result is of type Error, its value is passed to the provided async function and the return
value of the latter is wrapped in a new Error Result. Otherwise, the Ok value is preserved and the
function is not executed

**Type parameters:**

▪ **TErr2**

**Parameters:**

▪ **f**: *function*

the mapping function from TErr to TErr2

▸ (`value`: TErr): *Promise‹TErr2›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | TErr |

**Returns:** *Promise‹[Result](result.md)‹TOk, TErr2››*

___

###  toOptional

▸ **toOptional**(): *[Optional](optional.md)‹TOk›*

Generates an Optional from a Result. If the Result is of type Ok,
its value is wrapped into an Optional, otherwise an Empty Optional
is returned

**Returns:** *[Optional](optional.md)‹TOk›*

___

###  unwrap

▸ **unwrap**(): *TOk*

Returns the Ok value of a Result

**`throws`** {Error} if the Result is of type Error

**Returns:** *TOk*

___

###  unwrapErr

▸ **unwrapErr**(): *TErr*

Returns the Error value of a Result

**`throws`** {Error} if the Result is of type Ok

**Returns:** *TErr*

___

### `Static` err

▸ **err**<**TErr**>(`value`: TErr): *[Result](result.md)‹any, TErr›*

Generates a Result of type Error

**Type parameters:**

▪ **TErr**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | TErr | the Error value of the Result  |

**Returns:** *[Result](result.md)‹any, TErr›*

___

### `Static` fromOptional

▸ **fromOptional**<**O**, **TErr**>(`optional`: [Optional](optional.md)‹O›, `errIfEmpty`: TErr): *[Result](result.md)‹O, TErr›*

Generates a Result from an Optional. If the Optional has a value, the latter will
be wrapped as an Ok Result, otherwise an Error Result will be created with the specified error.

**Type parameters:**

▪ **O**

▪ **TErr**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`optional` | [Optional](optional.md)‹O› | the Optional that will be used to generate the Result |
`errIfEmpty` | TErr | the Error value of the Result in case the Optional is empty  |

**Returns:** *[Result](result.md)‹O, TErr›*

___

### `Static` fromPromise

▸ **fromPromise**<**TOk**, **TErr**>(`promise`: Promise‹TOk›): *Promise‹[Result](result.md)‹TOk, TErr››*

Generates a Result given a Promise that may resolve with a value (wrapped as an Ok Result) or reject with a value (wrapped as an Error Result)

**Type parameters:**

▪ **TOk**

▪ **TErr**

**Parameters:**

Name | Type |
------ | ------ |
`promise` | Promise‹TOk› |

**Returns:** *Promise‹[Result](result.md)‹TOk, TErr››*

___

### `Static` fromThrower

▸ **fromThrower**<**TOk**, **TErr**>(`callback`: function): *[Result](result.md)‹TOk, TErr›*

Generates a Result given a function that may return a value (wrapped as an Ok Result) or throw an exception (wrapped as an Error Result)

**Type parameters:**

▪ **TOk**

▪ **TErr**

**Parameters:**

▪ **callback**: *function*

a function that may or may not throw and exception.

▸ (): *TOk*

**Returns:** *[Result](result.md)‹TOk, TErr›*

___

### `Static` fromThrowerAsync

▸ **fromThrowerAsync**<**TOk**, **TErr**>(`callback`: function): *Promise‹[Result](result.md)‹TOk, TErr››*

Generates a Result given an async function that may return a value (wrapped as an Ok Result) or throw an exception (wrapped as an Error Result)

**Type parameters:**

▪ **TOk**

▪ **TErr**

**Parameters:**

▪ **callback**: *function*

an async function that may or may not throw and exception.

▸ (): *Promise‹TOk›*

**Returns:** *Promise‹[Result](result.md)‹TOk, TErr››*

___

### `Static` ok

▸ **ok**<**TOk**>(`value`: TOk): *[Result](result.md)‹TOk, any›*

Generates a Result of type Ok

**Type parameters:**

▪ **TOk**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | TOk | the Ok value of the Result  |

**Returns:** *[Result](result.md)‹TOk, any›*
