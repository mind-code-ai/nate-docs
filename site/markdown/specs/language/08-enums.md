> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Enums

Status: frozen for the 1.0 interpreter.

`enum Color { Red, Green, Blue }` declares zero-payload variants.
`enum Result { Ok(value), Err(message) }` declares one-payload variants.
Construct a zero-payload value with `Color.Red`, and a payload value with
`Result.Ok(42)`. Payload variants require exactly one argument; zero-payload
variants cannot be called. Unknown variants and invalid arity return errors.
Variants are separated by commas or newlines. Multi-payload variants are not
frozen; store an array or struct in a single payload instead.

Values retain enum and variant names plus an optional payload. Inspect them with
match patterns or type assertion. Direct enum equality is unsupported and returns
an error; matching compares names and extracts payloads.

The enum names `Option` and `Result` have additional fallback behavior:
`Option.Some(x)` and `Result.Ok(x)` unwrap through `or`; None and Err use its
fallback. Guard treats Result.Err as a failure. User declarations with those
names have the same behavior; these are name-based runtime conventions.
Import the corresponding stdlib module for constructors and helper functions.

Tests: `tests/conformance/match_test.nate`, `tests/conformance/errors_test.nate`,
`tests/conformance/stdlib_option_test.nate`, and `tests/conformance/stdlib_result_test.nate`.
