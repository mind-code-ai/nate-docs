> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Errors and Panics

Status: frozen for the 1.0 interpreter. `guard` is implemented in the
interpreter; the VM rejects it.

Nate has no `try` and no exceptions. Failures are values. Recovery stays
on the page.

## Failure values

These are failures for `or`:

- A value of type error
- `nil`
- `false`
- `Result.Err(e)`
- `Option.None`

`Result.Ok(v)` and `Option.Some(v)` succeed. `or` unwraps them to `v`.

Strings, including empty strings, succeed for `or`. An error-pair string is
truthy in `if err`; nil is falsey, so there is no `err != nil` requirement.
A runtime error itself normally propagates before condition evaluation.

## `or`

```nate
result = divide(a, b) or 0
config = read_file("config.json") or "{}"
value = get_from_cache() or get_from_db() or default_value
```

Evaluate the left expression.

- If it is `Result.Ok(v)` or `Option.Some(v)`, the result is `v`.
- If it is a failure value, evaluate the right expression and return that.
- Otherwise return the left value.

`or` groups left to right and may be chained. Each stage only runs if the
previous stage failed.

If the left side panics, `or` clears panic mode and uses the fallback.
That is how simple recovery works.

## Explicit error pairs

Functions may return a two-element array `[value, err]`. Multi-assign
unpacks it:

```nate
func parse_int(s) {
    if s == "42" {
        return [42, nil]
    }
    return [nil, "invalid number"]
}

value, err = parse_int("abc")
if err {
    print("Error:", err)
}
```

`nil` on the error side means success. A string or error value means
failure. Do not invent a separate `error` type for 1.0 user code.

Returning `nil` alone also works with `or`:

```nate
func safe_divide(a, b) {
    if b == 0 {
        return nil
    }
    return a / b
}

result = safe_divide(10, 0) or -1
```

## `guard`

```nate
guard {
    process_data()
    save_file()
} on error err {
    print("Operation failed:", err)
}
```

The name after `on error` is optional: `} on error { ... }`.

Statements in the guard body run in order. A statement fails when:

- it produces a runtime error (bad index, undefined function, ...)
- it panics, directly or in a called function
- it evaluates to `Result.Err(e)`, including `x = f()` where `f`
  returns `Result.Err(e)`

On the first failure the rest of the body is skipped and the `on error`
block runs. `err` is bound to:

- `e` for `Result.Err(e)`
- the error or panic message as a string otherwise, without the
  `[line N, col M]` prefix

A panic caught by `guard` clears panic mode, the same as `or`.
Execution continues after the guard.

These are not failures inside `guard`: `nil`, `false`, `Option.None`.
Functions that return nothing return `nil`, and that must not trip a
guard.

`return`, `break`, and `continue` inside the body leave the guard
normally. The handler does not run.

Variables assigned in the body or handler stay visible after the guard.
No stack unwinding past the guard.

## `panic`

```nate
panic "Out of memory"
panic expr
```

`panic` evaluates `expr`, sets panic mode, and yields an error value.
If `expr` is not a string, the message is `"panic"`.

Panic is for broken invariants, not for missing files.

One top-level `on panic { ... }` handler may be declared. An uncaught panic
stops ordinary program execution, clears panic state, and runs that handler
once. A successful handler ends the program successfully; execution does not
resume at the panic site. A failing handler propagates its error and is not
retried. Duplicate handlers are compile errors. Imported modules do not
install a handler for the importing program.

Prefer `or` or `guard` when execution should continue after a failure.

## Illegal programs

- Using exceptions or `throw`. Nate has neither.
- `guard { ... }` without `on error`. Parse error, exit code 2.

## Tests

- `examples/error_handling.nate`
- `tests/conformance/errors_test.nate`
- `tests/negative/guard_missing_on_error.nate`, `tests/negative/uncaught_panic.nate`
- `examples/guard_test.nate`, `examples/guard.nate`
- `tests/cli/panic_hook.nate`, `examples/panic_recovery.nate`
- `tests/negative/duplicate_panic_hook.nate`, `tests/negative/panic_hook_failure.nate`

## Implementation

- Parser: `NODE_OR_EXPR`, `NODE_PANIC`, `NODE_GUARD` (`parser_guard.c`),
  `NODE_MULTI_ASSIGN`
- Interpreter: `interp_eval_basic.c` for `or`, `interp_eval_program.c`
  for `panic`, `interp_eval_advanced.c` for `guard`
