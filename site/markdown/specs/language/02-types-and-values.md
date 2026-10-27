> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Types and values

Status: frozen for the 1.0 interpreter.

Frozen values are nil, bool, int, float, string, array, map, set, error,
function/closure, struct, enum, and interface definitions. Variables are dynamic;
`type(value)` reports the runtime type. An int is a signed 64-bit host long on
the supported macOS/Linux targets. Float is a C double. Arithmetic on integers
checks overflow. Mixed int/float arithmetic converts the integer to double;
integer division truncates toward zero and remainder follows the dividend.

In conditions and `not`, nil, false, integer zero, and errors are falsey.
All other values are truthy, including an empty string, empty containers, and
floating zero. Errors normally propagate before a condition is evaluated.
The `or` fallback test is specified separately in `10-errors-and-panics.md`:
it does not treat integer zero as failure.

Strings are immutable NUL-free byte sequences. Length and indexing count bytes.
Arrays are mutable, ordered, zero-indexed sequences. Maps use string keys;
missing keys return nil. Array/string indexes must be in range integers.
Map and array index assignment replaces a value; invalid types or bounds return
errors. Sets contain strings and are operated on through collection builtins.
`len` accepts arrays and strings; use `map_size` or `set_size` for those types.

Scalar equality is defined for nil, booleans, strings, and numbers. Mixed
numeric types compare numerically. Comparing anything to nil is allowed.
Equality or ordering of unsupported non-scalar operands returns an error;
there is no implicit structural equality for arrays, maps, structs, or enums.
Numeric ordering is defined; string ordering is not frozen.

Assigning a container, struct, or closure aliases its storage. Mutations of an
array or map are visible through aliases. Strings share immutable storage.
Function scopes and captured environment lifetimes are described in
`05-functions-and-closures.md` and `13-memory-and-gc.md`.

Tests: `tests/conformance/statements_test.nate`, `tests/conformance/type_contract_test.nate`,
`tests/conformance/memory_test.nate`, and `tests/conformance/safety_test.nate`.
