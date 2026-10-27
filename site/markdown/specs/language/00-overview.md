> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Language Overview

Nate is a small, readable language. Frozen 1.0 syntax is listed here.
Detailed semantics live in the sibling files.

Status: frozen for the 1.0 interpreter; preview forms are excluded.

## Identity

- Readability first
- Explicit over magical
- Safe by default
- Recoverable runtime
- Minimal surface

Errors are values. Recovery is readable.
Concurrency is structured, safe, and easy to reason about.

## Frozen keywords

```
func return if else for break continue
switch case default match _
const struct enum interface import error
spawn channel concurrent
guard on or and not
true false nil panic
```

`_` is the wildcard pattern, not a general identifier.

## Preview keywords

```
async await
supervise
move
strict
expects ensures
```

`@` starts preview decorators such as `@strict`.

These parse in the current tree. They are not a 1.0 compatibility
promise. Getting-started docs must not teach them.

## Frozen forms

```nate
import "math"

struct Circle {
    radius
}

func (c Circle) area() {
    return PI * c.radius * c.radius
}

func main() {
    circle = Circle{radius: 5}
    print("Area:", circle.area())

    result = divide(10, 0) or 0

    concurrent {
        spawn fetch()
        spawn compute()
    }
    return 0
}
```

## File to read next

```
01-lexical.md                 Tokens, comments, identifiers
02-types-and-values.md        nil, numbers, strings, collections
03-expressions.md             Operators, calls, index, or
04-statements.md              if, for, switch, assign
05-functions-and-closures.md  func, methods, closures
06-structs-and-methods.md     struct types
07-interfaces.md              interface and type assert
08-enums.md                   enum and variants
09-pattern-matching.md        match arms
10-errors-and-panics.md       Frozen. or, errors, guard, panic
11-concurrency.md             Frozen. spawn, channel
12-modules.md                 import
13-memory-and-gc.md           GC, nil, bounds
```

## Source of syntax

Do not add keywords in a spec that are missing from `src/lexer.h`.
Do not freeze a keyword that [1.0-scope.md](../1.0-scope.md) marks
preview.

The tree-walking interpreter defines meaning. See
[compatibility.md](../compatibility.md).
