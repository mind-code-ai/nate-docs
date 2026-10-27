> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Structs and methods

Struct fields are untyped names. Omitted fields are nil; unknown fields are an
error. Methods dispatch on a value's runtime struct type.

```nate
struct Point { x, y }
func (p Point) sum() { return p.x + p.y }
point = Point{x: 20, y: 22}
print(point.x, point.sum())
```

There is no frozen field-assignment syntax. Construct a replacement instance to
change scalar fields. Arrays and maps stored in fields remain mutable. Generic
struct declarations are preview.

See [the struct contract](../specs/language/06-structs-and-methods.md).
