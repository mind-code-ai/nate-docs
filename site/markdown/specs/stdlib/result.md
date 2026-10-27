> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# result

Status: frozen for the 1.0 interpreter.

Import with `import "result"`. Exports are unqualified; import collisions
replace earlier bindings in the importing scope. Each file should choose its
imports deliberately. Functions require the listed argument count. Native
runtime errors propagate and can be recovered with `or` or `guard`.

## Public API

| Export | Behavior |
| --- | --- |
| `Result` | Enum type; variants are specified below. |
| `Is_ok(r)` | Check if a Result is Ok |
| `Is_err(r)` | Check if a Result is Err |
| `Unwrap_or(r, fallback)` | Unwrap Ok value, or return fallback if Err |
| `Unwrap(r)` | Unwrap Ok value, or panic if Err |
| `Err_value(r)` | Get the error from Err, or nil if Ok |
| `Map_ok(r, f)` | Map a function over the Ok value |
| `Map_err(r, f)` | Map a function over the Err value |
| `And_then(r, f)` | Chain Result operations (like flatMap/andThen) |
| `Ok(value)` | Create an Ok result |
| `Err(e)` | Create an Err result |

## Contract

`Result` has `Ok(value)` and `Err(err)` variants, with convenience constructors
of the same names. `Unwrap` returns an Ok payload and panics on Err or unrelated
values. `Unwrap_or` returns a fallback for Err or unrelated values. `Err_value`
returns an Err payload and nil otherwise. `Map_ok` and `And_then` act on Ok;
`Map_err` acts on Err. They preserve the other variant and pass unrelated values
through. `Is_ok` and `Is_err` return false for unrelated values. `or` unwraps Ok
and recovers from Err; guard handles an Err statement as failure.

Tests: `tests/conformance/stdlib_result_test.nate`.
