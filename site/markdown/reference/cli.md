> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# CLI commands

The 1.0 interpreter commands are `nate`, `nate repl`, `nate run file.nate`,
`nate build file.nate [-o output]`, `nate test [path]`, `nate bench [path]`, `nate doc file.nate`, `--version`,
and `--help`. With no arguments Nate starts the REPL; a filename runs it.

Run is quiet by default. `--ast` and `--verbose` enable diagnostics.
Run exits 0 on success, 1 on a runtime failure, 2 on parse/analysis failure,
and 3 for file/usage errors. Test and bench return nonzero if a file or function
fails; benchmark errors are not reported as successful measurements.

Test discovers `test_*` functions in `*_test.nate` files. Bench discovers
`bench_*` functions in `*_bench.nate` files. Both default to the current
directory and inspect its immediate files. Doc prints comments and signatures.
The REPL accepts `:help`, `:quit`, and `:clear`.

Build compiles a native executable through the host C compiler; set `NATE_CC`
to select a compiler executable. The result bundles imported modules and runs
without Nate or the source files. Builds return 2 for compilation failures and
3 for invalid arguments or a missing root source. Output defaults to the source
name with its final `.nate` suffix removed, or with `.out` appended otherwise.

`nate build file.nate --backend=c` explicitly selects the default portable C
backend. `--backend=nate` selects the experimental Nate Compiler, which emits
ARM64/x86-64 instructions for its supported scalar subset: integers, floats,
booleans, nil, string literals, scalar globals, direct calls, ordinary control
flow, and guard recovery. Unsupported features produce a diagnostic.

Inspect the experimental compiler with `nate compiler file.nate --emit-ir` or
`--emit-asm`. Assembly inspection accepts `--target=arm64-macos`,
`--target=x86_64-macos`, `--target=arm64-linux`, or `--target=x86_64-linux`.
These targets do not configure cross-linking for `nate build`.
See [Native Compilation](../getting-started/compilation.md) for a complete example
and current limitations.

VM (`run --vm`), legacy LLVM source, LSP, and package commands are preview.
NATE_STDLIB sets an explicit standard-library directory. NATE_PATH and
NATE_DEBUG are not supported configuration contracts.

See the [normative CLI specification](../specs/cli.md).
