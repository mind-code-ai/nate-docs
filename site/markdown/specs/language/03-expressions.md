> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Expressions

Status: frozen for the 1.0 interpreter.

Precedence, highest first:

| Level | Forms |
| --- | --- |
| Postfix | Call `f(args)`, index `a[i]`, field `s.name`, assertion `x.(Type)` |
| Unary | `-value`, `not value` |
| Multiplicative | `* / %` |
| Additive | `+ -` |
| Ordering | `< <= > >=` |
| Equality | `== !=` |
| Conjunction | `and` |
| Fallback | `or` |

Binary operators associate left to right. Parentheses override precedence.
Operands and call arguments evaluate left to right. `and` skips its right side
when the left value is falsey and returns a boolean. `or` skips its fallback
when its left value succeeds; its enum unwrapping and panic recovery rules are
in `10-errors-and-panics.md`. It is a value operation, not boolean coercion.

`+` adds numbers; if either operand is a string, it stringifies both operands
and concatenates. Other arithmetic requires compatible numbers. Division or
remainder by zero and signed overflow return recoverable errors.

Calls, indexes, fields, and assertions can follow literals, parenthesized
expressions, returned values, and identifiers. Calling a non-callable value is
an error. Function-valued array elements and immediate closures are callable.
Struct literals use `Type{field: expression}` and arrays use `[elements]`.
Type assertion failure returns an error; comma-ok assertions return nil/false.

Tests: `tests/conformance/expr_test.nate`, `tests/conformance/statements_test.nate`,
`tests/conformance/functions_test.nate`, `tests/conformance/type_contract_test.nate`,
and `tests/conformance/safety_test.nate`.
