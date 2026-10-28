> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Statements

Status: frozen for the 1.0 interpreter.

Native C builds implement the same control flow. Errors in a three-clause loop's
initializer, condition, body, or post statement propagate to `or`/`guard` or the
program boundary; they are never discarded.

Assignment uses `name = expression`. It updates an existing binding in the
scope chain, or creates one in the current scope. `const name = expression`
creates a binding that ordinary assignment cannot change. Redefining declarations
replaces same-scope bindings, including at the REPL; a const is not deep immutability.
Blocks ordinarily share their surrounding scope. Calls and match arms introduce
environments. Loop variables remain in the enclosing environment.

`a, b = array` unpacks the first two values. Too few values is an error; extra
values are ignored. Two-result map lookup, channel receive, and type assertion
have dedicated comma-ok behavior: an existing nil value still has ok=true.

`if condition { ... } else if condition { ... } else { ... }` selects a branch.
`if initializer; condition { ... }` evaluates its initializer before the condition.
The condition uses truthiness from `02-types-and-values.md`.

Loops: `for condition { ... }`, `for init; condition; step { ... }`,
and `for item in array { ... }`. For-in accepts arrays; maps are not iterable
through this form. `break` exits the loop and `continue` advances to the next
iteration (including the step of a three-clause loop).

`switch value { case expression { ... } default { ... } }` evaluates case
expressions in order and runs the first equal case, with no fallthrough.
Cases compare same-type integers, floats, bools, and strings. If no case matches,
default runs if present, otherwise the result is nil. Pattern matching is a
separate form defined in `09-pattern-matching.md`.

Imports and declarations are processed before ordinary top-level initialization.
Functions, structs, interfaces, and enums are registered before constants;
constants then initialize in source order. Ordinary top-level statements run
in source order. If the unit declares a zero-argument `main`, it is called after
initialization. Imported modules load declarations and constants, not arbitrary
top-level statements or a module main. Returning an int from main does not set
the process exit code. Entry point arity errors are runtime errors.

Tests: `tests/conformance/statements_test.nate`, `tests/conformance/type_contract_test.nate`,
`tests/cli/main_init.nate`, and the CLI checks in `scripts/conformance.py`.
