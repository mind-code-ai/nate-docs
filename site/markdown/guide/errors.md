> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Errors and recovery

Use or for a fallback. Nil, false, runtime errors, Option.None, and Result.Err
select the fallback; zero and empty strings do not. Some/Ok unwrap their payload.

```nate
func divide(a, b) {
    if b == 0 { return nil }
    return a / b
}
print(divide(10, 0) or -1)
```

A guard stops at the first runtime error, panic, or Result.Err statement and
runs its handler. Nil and false do not fail a guard.

```nate
guard {
    value = [1][9]
} on error message {
    print(message)
}
print("continued")
```

Functions can return `[value, error_message]` and callers can unpack it with
`value, err = function()`. A nonempty error-message string is truthy in `if err`;
nil is falsey. A top-level on-panic handler runs once and ends the program,
without resuming at the panic site. There is no try/catch or throw syntax.

See [the error contract](../specs/language/10-errors-and-panics.md).
