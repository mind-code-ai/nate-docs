> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Functions and closures

Status: frozen for the 1.0 interpreter.

`func add(a, b) { return a + b }` declares a named function.
`func(x) { return x * 2 }` is a closure expression. Parameters are untyped names;
there are no frozen optional, default, or variadic parameter declarations.
Arguments must match arity exactly and evaluate left to right. An argument error
stops the call. Calls support more than sixteen arguments without a fixed stack
buffer. Recursion is permitted up to the documented evaluation-depth limit.

`return expression` leaves the current function or closure. Bare `return` and
falling off a function return nil; the last ordinary statement is not an implicit
function return. Runtime errors still propagate. `return` cannot be used to
escape an enclosing function from a called function.

Calls create an environment whose parent is the declaration's scope. Named
functions execute in their defining file/module scope, not their caller's scope.
Closures capture the current environment by reference, so later mutation remains
visible. Assigning to a captured binding updates it. Arguments holding containers
share those containers. Unreachable closure cycles are reclaimed by tracing.

Functions and closures are values: store, pass, return, and call them through
identifiers, arrays, or other expressions. A user callable shadows a builtin
with the same name. Calling an invalid value or using the wrong arity returns
an error recoverable by guard/or.

Methods are specified in `06-structs-and-methods.md`. Generic function parameters,
expects/ensures contracts, strict ownership, and async/await remain preview.

Tests: `tests/conformance/functions_test.nate`, `tests/conformance/arguments_test.nate`,
`tests/conformance/expr_test.nate`, and `tests/conformance/runtime_memory_test.nate`.
