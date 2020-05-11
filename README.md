# exceptnomore

Result and Optional types that will make your code exception-proof.

This library allows you to wrap Promises, async functions and
normal functions in objects that will wrap those exceptions for a cleaner code with less try/catches and a better and more explicit Error Handling.

## Full documentation:
* [Result](docs/classes/result.md)
* [Optional](docs/classes/optional.md)

## Highlights

### Mapping and FlatMapping + if callbacks
#### Result.map
```
functionThatReturnsTheUserIdAsAResult()
    .map(id => getUserData(id))
    .ifOk(u => console.log(`Hello ${u.firstName}`))
    .ifErr(err => console.debug(err));
    // if err exists, it is the original Error returned by 'functionThatReturnsTheUserIdAsAResult'
```
#### Result.flatMap
```
functionThatReturnsTheUserIdAsAResult()
    .flatMap(id => mayFailGetUserData(id))
    .ifOk(u => console.log(`Hello ${u.firstName}`))
    .ifErr(err => console.debug(err));
    // if err exists, it is either the content of the Error Result of 'functionThatReturnsTheUserIdAsAResult'
    // or, if that successfully returned a userId, the Error Result of 'mayFailGetUserData'
```
`flatMap` and `map` rules also apply to the Optional type:
#### Optional.map
```
functionThatReturnsTheUserIdAsAnOptional()
    .map(id => getUserData(id))
    .ifPresent(u => console.log(`Hello ${u.firstName}`))
    .ifEmpty(() => console.debug('Not found'));
```
#### Optional.flatMap
```
functionThatReturnsTheUserIdAsAnOptional()
    .flatMap(id => mayNotFindUserData(id))
    .ifPresent(u => console.log(`Hello ${u.firstName}`))
    .ifEmpty(() => console.debug('Not found'));
    // the callback passed to ifEmpty gets called if
    // 'functionThatReturnsTheUserIdAsAnOptional'
    // or 'mayNotFindUserData' return an Empty Optional
```


## Example use cases:

#### A function call that may throw an exception
Before - the caller is not aware that the function may throw an exception:
```
function evil(): number {
    const n = Math.random();
    if (n < .5) {
        throw new Error('Ooops');
    } else {
        return n;
    }
}

console.log(evil()); // This statement can crash
```
After - the return type explicitly tells the caller that the function may return an error (also telling the type of it):
```
function evil(): Result<number, Error> {
    const n = Math.random();
    if (n < .5) {
        return Result.err(new Error('Ooops'));
    } else {
        return Result.ok(n);
    }
}
evil().ifOk(n => console.log(n)); // This statement will never crash

// Also, if you want to manage the error
evil()
    .ifOk(n => console.log(n))
    .ifErr(e => console.debug(e));

// Or, to be more concise
evil().if(n => console.log(n), e => console.debug(e));
```

#### A function that may return the object we are looking for or null (for example, when looking for a record in a database table)
Before:
```
function find(id: number): { name: string }|null {
    return Math.random() * 10 < id
        ? null
        : { name: 'Test User' };
}

console.log(find(5).name); // Compiler error that forces you to handle the null case if you are using TypeScript, "TypeError: Cannot read property 'name' of null" at runtime if you are not using a type-checker.
```
After:
```
function find(id: number): Optional<{ name: string }> {
    return Optional.ofNullable(
        Math.random() * 10 < id
            ? null
            : { name: 'Test User' }
    );
}

find(5).ifPresent(u => console.log(u.name)); // This statement will never crash

// Also, if you want to manage the Empty case
find(5)
    .ifPresent(u => console.log(u.name))
    .ifEmpty(() => console.log('User not found'));

// Or, to be more concise
find(5)
    .if(u => console.log(u.name), () => console.log('User not found'));
```