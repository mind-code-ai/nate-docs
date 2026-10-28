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

Compile a native executable to share or deploy the program:

```bash
nate build hello.nate -o hello
./hello
```

The build uses your system C compiler. The executable runs without Nate installed
or the original source file. Nate's syntax and runtime behavior stay the same.

The experimental Nate Compiler also accepts `--backend=nate` for its scalar
subset, including floats, globals, and guard recovery. Continue with
[Native Compilation](./compilation.md) to choose a backend and inspect compiler output.

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
