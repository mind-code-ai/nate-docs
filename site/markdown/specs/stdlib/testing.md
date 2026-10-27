> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# testing

Status: frozen for the 1.0 interpreter.

Import with `import "testing"`. Exports are unqualified; import collisions
replace earlier bindings in the importing scope. Each file should choose its
imports deliberately. Functions require the listed argument count. Native
runtime errors propagate and can be recovered with `or` or `guard`.

## Public API

| Export | Behavior |
| --- | --- |
| `AssertEqual(actual, expected, message)` | AssertEqual asserts two values are equal |
| `AssertNotEqual(actual, notExpected, message)` | AssertNotEqual asserts two values are not equal |
| `AssertTrue(value, message)` | AssertTrue asserts value is true |
| `AssertFalse(value, message)` | AssertFalse asserts value is false |
| `AssertNil(value, message)` | AssertNil asserts value is nil |
| `AssertNotNil(value, message)` | AssertNotNil asserts value is not nil |
| `AssertError(value, message)` | AssertError asserts value is an error |
| `AssertNoError(value, message)` | AssertNoError asserts value is not an error |
| `AssertContains(arr, value, message)` | AssertContains asserts array contains value |
| `AssertLength(arr, expected, message)` | AssertLength asserts array has expected length |
| `AssertGreater(a, b, message)` | AssertGreater asserts a > b |
| `AssertLess(a, b, message)` | AssertLess asserts a < b |
| `AssertBetween(value, min, max, message)` | AssertBetween asserts min <= value <= max |
| `Skip(reason)` | Skip marks a test as skipped |
| `Todo(description)` | Todo marks a test as not yet implemented |

## Contract

Assertion helpers return nil on success and produce an error through `fail`
on failure. Comparison helpers use language scalar equality, not deep structural
equality. `AssertContains` examines array elements and `AssertLength` uses len.
`AssertError` accepts a zero-argument callback and succeeds when its execution
fails with a guard-catchable error, panic, or Result.Err. `AssertNoError` invokes
a callback and requires successful completion. Non-callable values retain the
value-inspection behavior. Ordinary argument evaluation propagates computed
errors before entering a function; use the callback form to test failures.
`Skip` and `Todo` print advisory messages and return nil. They do not change the
test runner's counts or skip the remainder of the calling test.

Tests: `tests/conformance/stdlib_testing_test.nate`.
