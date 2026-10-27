> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Interfaces

An interface specifies method names and explicit argument counts. A struct
satisfies it when those methods are available. Implements takes the interface
name as a string.

```nate
interface Reader { read() }
struct Text { content }
func (t Text) read() { return t.content }
text = Text{content: "hello"}
assert(implements(text, "Reader"))
value, ok = text.(Reader)
assert(ok)
print(value.read())
```

A direct assertion, such as `text.(Reader)`, returns the original value or an
error. Comma-ok assertions return nil/false on mismatch. Assertions do not
convert numbers or wrap a value in an interface object. Interfaces and methods
can be exported by modules. See [the contract](../specs/language/07-interfaces.md).
