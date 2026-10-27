> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Structs and methods

Status: frozen for the 1.0 interpreter.

`struct Point { x, y }` declares named, untyped fields. Fields can be separated
by commas or newlines. `Point{x: 1, y: 2}` constructs an instance. Omitted fields
are nil; an unknown field name returns an error. Initializers evaluate in order.
The struct type must be declared. Field access is `point.x`; accessing an unknown
field or accessing a field of nil is an error. Names are case-sensitive.

`func (p Point) sum() { return p.x + p.y }` declares a method. The receiver is
bound as the first local binding, followed by the method's explicit parameters.
`point.sum()` dispatches using the runtime struct type and method name.
Arity must match exactly. Methods execute in their defining module scope.

Struct assignment aliases the instance. There is no frozen `point.x = value`
assignment syntax; construct a replacement instance to change scalar fields.
Arrays/maps stored in fields remain mutable through their ordinary index APIs.
Rebinding the receiver variable does not replace its caller's binding.

Generic structs may parse but remain preview. Struct equality is not structural;
use fields or pattern matching to compare supported values.

Tests: `tests/conformance/structs_test.nate`, `tests/conformance/type_contract_test.nate`,
and `tests/conformance/arguments_test.nate`.
