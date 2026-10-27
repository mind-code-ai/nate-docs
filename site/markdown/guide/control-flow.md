> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Control flow

If selects a branch. For loops support condition-only, three-clause, and array
iteration forms. Break exits a loop and continue moves to its next iteration.

```nate
total = 0
for value in [1, 2, 3] { total = total + value }
if total == 6 { print("six") } else { print("unexpected") }
for i = 0; i < 2; i = i + 1 { print(i) }
switch total {
    case 6 { print("matched") }
    default { print("other") }
}
```

Switch does not fall through. Match supports patterns and bindings:

```nate
value = [1, 2, 3]
match value {
    case [first, ...rest] { print(first, len(rest)) }
    case _ { print("empty") }
}
```

A match without a successful arm returns an error. See
[statements](../specs/language/04-statements.md) and
[patterns](../specs/language/09-pattern-matching.md).
