> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Pattern matching

Status: frozen for the 1.0 interpreter.

`match expression { case pattern { body } case _ { fallback } }` evaluates the
subject once, then tries arms in source order. The first matching arm with a
successful guard runs. If no arm matches, the result is a runtime error.
An arm body produces its final statement value as a match-expression result;
explicit return still exits the surrounding function. Every arm requires case.

Patterns: integer, float, string, bool, nil, wildcard `_`, identifier binding,
array `[first, second]`, array rest `[first, ...rest]`, struct
`Point{x: 0, y}`, and enum `Result.Ok(value)` or `Color.Red`.
Identifiers bind rather than compare existing variables. A struct shorthand
field binds that field. `_` ignores a value or payload. String literals use the
same escapes as ordinary expressions. Fixed array patterns require exact length;
a rest pattern binds the remaining elements to an array.

Each attempted arm has a fresh child scope for bindings. Failed arms and their
guards do not leak pattern bindings. `case pattern if condition { ... }` requires
a boolean true guard to run; another value or false moves to the next arm.
Guard runtime errors propagate. This guard expression differs from the guard
error-handling statement. Existing outer variables may still be updated by the
arm's ordinary assignments.

There is no static exhaustiveness guarantee. Include a wildcard when appropriate.
Switch remains a separate value-comparison statement.

Tests: `tests/conformance/match_test.nate`, `tests/conformance/expr_test.nate`,
and `tests/negative/match_no_arm.nate`.
