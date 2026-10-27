> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Hello world

Save this as hello.nate:

```nate
func main() {
    print("Hello, Nate!")
}
```

Run `nate run hello.nate`, or `nate hello.nate`. Both print just `Hello, Nate!`
and a newline. `--ast` and `--verbose` opt into compiler diagnostics.

A file may instead contain top-level statements. If it declares main, ordinary
top-level initialization runs first, followed by a zero-argument main call.
Functions return nil unless they use return. Main's returned number does not
set the process exit code.

```nate
greeting = "Hello"
func main() { print(greeting + ", Nate!") }
```

Run `nate` for the [REPL](./repl.md), or continue with
[variables](../guide/variables.md).
