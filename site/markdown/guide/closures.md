> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Closures

Closures capture their current environment by reference. Captured mutation
remains visible after the defining function returns.

```nate
func counter() {
    value = 40
    return func() {
        value = value + 1
        return value
    }
}
next = counter()
print(next(), next())
```

The collector retains reachable environments and reclaims unreachable closure
cycles. Container arguments still alias their containers; capture is not an
isolation boundary. See [functions](./functions.md) and
[memory management](../specs/language/13-memory-and-gc.md).
