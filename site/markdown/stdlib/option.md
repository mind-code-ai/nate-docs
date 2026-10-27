> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# option

This is the 1.0 interpreter API. [Normative specification](../specs/stdlib/option.md).

Import with `import "option"`. Exports are unqualified; import collisions
replace earlier bindings in the importing scope. Each file should choose its
imports deliberately. Functions require the listed argument count. Native
runtime errors propagate and can be recovered with `or` or `guard`.

## Public API

| Export | Behavior |
| --- | --- |
| `Option` | Enum type; variants are specified below. |
| `Is_some(o)` | Check if an Option is Some |
| `Is_none(o)` | Check if an Option is None |
| `Unwrap_or(o, fallback)` | Unwrap Some value, or return fallback if None |
| `Unwrap(o)` | Unwrap Some value, or panic if None |
| `Map(o, f)` | Map a function over the Some value |
| `And_then(o, f)` | Chain Option operations (like flatMap/andThen) |
| `Filter(o, pred)` | Filter: keep Some only if predicate is true |
| `To_array(o)` | Convert to array: [value] for Some, [] for None |
| `Some(value)` | Create a Some option |

## Contract

`Option` has `Some(value)` and `None` variants. `Some` is a convenience constructor.
`Unwrap` returns a Some payload and panics on None or a non-Option value.
`Unwrap_or` returns the fallback for None or a non-Option value.
`Map`, `And_then`, and `Filter` operate only on Some payloads, preserve None,
and pass unrelated values through. `Is_some` is false for unrelated values;
`Is_none` is true. `To_array` returns `[payload]` for Some and `[]` otherwise.
`or` unwraps Some and recovers from None without calling these helpers.

Tests: `tests/conformance/stdlib_option_test.nate`.
