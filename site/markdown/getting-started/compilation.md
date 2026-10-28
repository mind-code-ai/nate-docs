> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Native compilation

Use `nate build` to compile your program into a native executable. The default
C backend supports the full release language. The experimental Nate Compiler
generates ARM64 or x86-64 instructions for scalar programs.

## Choose a backend

| Command | Compiler | Language coverage |
|---------|----------|-------------------|
| `nate build program.nate -o program` | Portable C backend (default) | Supported release language, imports, and checked runtime |
| `nate build program.nate --backend=c -o program` | Explicit C backend | Same as the default |
| `nate build program.nate --backend=nate -o program` | Nate Compiler (experimental) | Scalar subset described below |

The executable runs without Nate or the source files installed. To build it,
you need your platform's development toolchain; `NATE_CC` selects its driver.
The C backend generates C. Nate Compiler generates assembly, then uses the
host assembler and linker to create the executable.

## Try the Nate Compiler

Save this complete program as `counter.nate`:

```nate
const step = 1.5
counter = 0.0

func increment() {
    counter = counter + step
    return counter
}

func main() {
    print(increment(), increment(), counter)
    guard {
        print(10 / 0)
    } on error message {
        print("Calculation failed:", message)
    }
    print("Execution continues")
}
```

Build and run it:

```sh
nate build counter.nate --backend=nate -o counter
./counter
```

Output:

```text
1.5 3 3
Calculation failed: division by zero
Execution continues
```

Functions can update initialized scalar globals. Reads before initialization and
writes to constants produce recoverable errors. Parameters shadow globals.
Guard blocks stop at the first checked failure, bind its message as a string,
and continue after the handler. Nested handlers and `or` recovery are supported.

## Current coverage and limits

The experimental compiler supports signed 64-bit integers, binary64 floats,
booleans, nil, string literals, scalar globals and constants, direct function
calls, conditionals, ordinary loops, `break`, `continue`, `return`, `print`,
`and`, `or`, and scalar guard recovery. Mixed integer/float arithmetic promotes
to floats. Integer overflow and division by zero remain checked.

Types are inferred, but each variable and function parameter has one concrete
type. Type-changing programs, heap strings, collections, modules, closures,
Result/Option values, panic statements/hooks, concurrency, and general builtins
still need the C backend. Unsupported code produces a compile-time diagnostic;
the compiler does not silently select another backend. Local initialization
around guards is checked conservatively across success and recovery paths.

## Inspect compiler output

```sh
nate compiler counter.nate --emit-ir
nate compiler counter.nate --emit-asm
nate compiler counter.nate --emit-asm --target=x86_64-linux
```

Assembly targets are `arm64-macos`, `x86_64-macos`, `arm64-linux`, and
`x86_64-linux`. Normal builds target your host. Emitting assembly for another
target does not supply a cross-linker or that target's runtime archive.

Read the [Nate Compiler specification](../specs/nate-compiler.md) for
initialization, recovery, ABI, resource limits, and promotion gates, and the
[native compilation contract](../specs/native-compilation.md) for the
default backend's deployment and security behavior.
