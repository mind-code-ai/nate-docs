> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Variables and constants

Assignment creates a binding or updates an existing binding in the scope chain.
Values are dynamically typed. A const blocks ordinary rebinding, but does not
make referenced containers immutable.

```nate
const LIMIT = 3
values = [1, 2]
alias = values
alias[0] = 9
print(values[0], LIMIT)
```

Integers are signed 64-bit values on the release platforms. Overflow is a
recoverable error. Strings are immutable byte sequences; lengths and indexes
count bytes. Array and string negative indexes are errors. Nil, false, and
integer zero are falsey; empty strings and containers are truthy. The fallback
operator has its own rules and preserves integer zero.

See [types and values](../specs/language/02-types-and-values.md).
