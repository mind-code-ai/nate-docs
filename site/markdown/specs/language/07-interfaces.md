> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Interfaces and type assertions

Status: frozen for the 1.0 interpreter.

`interface Reader { read() }` declares required method names and explicit
parameter counts. `implements(value, "Reader")` returns whether a struct has
every named method with that arity; no explicit implements declaration is needed.
The second argument is a string, not an interface value. Unknown interfaces or
non-struct first arguments are errors. Interfaces can be exported by modules.
The runtime definition is a value used for checking, not an interface wrapper
that changes method dispatch.

`value.(Type)` returns the original value when its runtime type matches, or a
recoverable error otherwise. `result, ok = value.(Type)` returns original/true
on success and nil/false on mismatch. It does not coerce numeric values.
Supported names are int, float, bool, string, array, map, set, func, a declared
struct or enum name, or an interface satisfied by a struct. Interface satisfaction
uses method names and arities in the current scope, including module methods.
An error evaluating the original expression propagates before the type test.

Example: `file, ok = candidate.(Reader)`. If ok is true, `file.read()` dispatches
on the candidate's struct type as usual.

Generic interfaces and reflection APIs beyond the documented checks remain preview.

Tests: `tests/conformance/structs_test.nate`, `tests/conformance/type_contract_test.nate`,
and `tests/fixtures/modules/interfaces.nate`.
