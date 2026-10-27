> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Functions

Functions require exactly the declared number of arguments and evaluate them
left to right. Return explicitly; an ordinary last statement is not a return.

```nate
func add(a, b) { return a + b }
func no_value() { x = 1 }
print(add(20, 22))
assert_eq(no_value(), nil)
```

Functions use their defining file/module scope. Function values can be passed,
returned, stored in arrays, and called. User callables shadow builtins with the
same name. Default and variadic parameter declarations are outside the frozen API.

See [closures](./closures.md) and the [function contract](../specs/language/05-functions-and-closures.md).
