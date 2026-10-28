> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Runtime Compatibility

Nate supports native C compilation and interpreted development. Both implement
the frozen language.

| Runtime | Role | Command |
|---------|------|---------|
| Native C backend | Supported native executables | `nate build file.nate` |
| Tree-walking interpreter | Reference implementation | `nate run file.nate` |
| Bytecode VM | Preview | `nate run file.nate --vm` |
| Legacy LLVM backend | Experimental source | Development only |

If these disagree, the interpreter is correct. The other runtime is a
bug or an advertised limitation.

## Interpreter

`nate run` uses the tree-walking interpreter in `src/interp_*.c`.

It must implement every frozen feature in [1.0-scope.md](1.0-scope.md).
Conformance tests run against this runtime.

Default `nate run` is quiet except program output. AST dumps and
analysis traces are opt-in. This is verified by the CLI conformance checks.

## Bytecode VM

`nate run --vm` compiles the AST to bytecode and runs `src/vm/`.

Rules for 1.0:

1. The VM is preview. Docs must say so.
2. Frozen examples the VM claims to run must match interpreter stdout
   and exit code, ignoring framework banners.
3. `scripts/vm_parity_audit.py` is the gate for the frozen example set.
4. If a frozen feature fails on the VM, either implement it or list it
   in a VM known-issues section. Do not fail silently.

Known-issues belong in this file as they are discovered. Do not hide
them in issue comments.

## Native C backend

`nate build` compiles ahead of time through C and links the checked Nate runtime.
It needs a system C compiler at build time and no LLVM installation. Executables
bundle imports and run without Nate or source files. All frozen conformance test
functions run natively through `scripts/native_suite.py`. Build and deployment
semantics are specified in [native-compilation.md](native-compilation.md).

Missing, circular, or invalid imports fail at build time. This intentionally
moves those failures earlier than `nate run`. Negative program checks distinguish
build errors from errors raised by an executable. Timing and thread ordering
are not compatibility guarantees.

The old LLVM code generator remains experimental source in `src/compiler/`.
It is not the backend used by `nate build`.

## Parity definition

Two runs match when:

- Exit codes are equal.
- Program stdout is equal after stripping interpreter/VM banners.
- Both succeed, or both fail with the same class of error: parse,
  analysis, or runtime.

Timing, thread interleaving, and map iteration order are not required
to match unless a test pins them.

## Analysis vs execution

Static analysis in `src/analyzer*.c` runs before interpretation or native compilation.
Data-race errors and ownership errors that reject a program are part
of the language if they are frozen.

The VM path currently skips some of that pipeline. Until it does not,
those programs are interpreter-only.

## Promotion path

A preview runtime becomes frozen only when:

1. It has a spec section in this file.
2. The frozen conformance set is green on that runtime in CI.
3. Missing features are empty, or listed as interpreter-only in the
   language spec, not discovered by users.

Do not promote the VM or LLVM as part of tagging `v1.0.0`.

## Known preview limitations

The VM skips interpreter analysis, executes spawn/concurrent synchronously,
and does not implement guard or scoped capability callbacks. Direct interface
assertions, module export isolation, and interpreter memory ownership are not
VM compatibility promises. Its parity audit is informational and may fail.
Legacy LLVM AOT requires LLVM development files and has incomplete builtin coverage.
Neither backend is promoted by a candidate or stable interpreter tag.
