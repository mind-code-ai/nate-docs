> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Native compilation

Status: supported candidate surface. `nate build` is included in normal builds.

This contract describes the default C backend. The independent, experimental
Nate compiler is selected with `--backend=nate`; its current subset and target
pipeline are described in [nate-compiler.md](nate-compiler.md).

```
nate build program.nate
nate build program.nate -o application
./application
```

Without `-o`, the final `.nate` suffix is removed. A source without that suffix
gets `.out` appended. Unknown options, repeated `-o`, and missing arguments fail
with exit 3. A missing root source also exits 3. Parse, analysis, import,
code-generation, and host compiler failures exit 2. A successful build exits 0
and reports the output path on stderr. A failed build preserves an existing
executable. Output cannot overwrite the root source or any imported source,
including aliases of those files.

## Compilation and execution

The C backend parses and analyzes source at build time, recursively resolves
imports, and emits C functions for expressions, functions, initialization,
blocks, branches, loops, switches, matches, guards, and recovery. Dynamic calls
use native callbacks. Static metadata supplies signatures, patterns, fields,
and source locations to shared runtime operations. The host compiler optimizes
this C and links the Nate runtime into an executable for the current host.
There is no runtime source parsing, bytecode VM, or invocation of `nate run`.

The checked runtime is shared with the interpreter: dynamic values, integer
overflow and bounds errors, taint, capabilities, captured environments, GC,
panic containment, channels, and structured task joins retain their language
semantics. The interpreter remains a reference implementation. This backend
does not introduce static types, ownership/borrowing, or a Rust performance
guarantee. Memory collection retains the limits in
[13-memory-and-gc.md](language/13-memory-and-gc.md).

Imported modules are compiled into the executable, including private helpers,
module environments, cached exports, and constant initialization. Missing,
invalid, or circular imports fail during compilation. Import capability checks
still apply when executing compiled module initialization. Changing an imported
source or `NATE_STDLIB` after compilation does not change an executable.

`main()` runs after top-level initialization and must have zero arguments.
Its numeric result does not set the process exit code, matching `nate run`.
The executable exits 0 on success and 1 on an uncaught runtime error. Diagnostics
retain Nate line and column locations. A top-level panic handler runs once,
after which the executable ends.

## Toolchain and installation

Builds require a C11 compiler and host development libraries (pthread, SQLite,
and math). `NATE_CC` selects a compiler executable; its value is a path or program
name, not a shell command or list of flags. It defaults to `cc`. Source and
output paths are passed as process arguments, including spaces and metacharacters.
Builds use private temporary files and publish a completed executable atomically.

Source builds include `src/native/libnate_native.a`. Installed builds resolve
`include/nate` and `lib/nate/libnate_native.a` relative to `bin/nate`. These
development files and the stdlib are required on the build machine. The resulting
executable needs none of them, nor a Nate installation. It still depends on normal
host system libraries, including SQLite. Cross-compilation, a portable binary
format, and a stable native ABI are outside this contract.

The legacy LLVM backend remains experimental source. The VM and language features
classified as preview in `release.json` retain their preview status.

## Validation

`python3 scripts/native_suite.py` compiles and runs the conformance test functions.
`python3 scripts/native_contract.py` covers compatibility fixtures, runtime
errors, negative programs, source deletion, hostile paths, output preservation,
and compiler failures. Installation and archive tests build outside the checkout,
remove the development files, and run the resulting executable. CI runs native
checks on macOS and Linux, including address/undefined-behavior sanitizer builds.
