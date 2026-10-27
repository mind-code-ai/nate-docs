> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Runtime Compatibility

Nate 1.0 has three execution paths. Only one is the language.

```
┌──────────────────────────┬──────────┬─────────────────────────┐
│ Runtime                  │ 1.0 role │ Command                 │
├──────────────────────────┼──────────┼─────────────────────────┤
│ Tree-walking interpreter │ Source of│ nate run file.nate      │
│                          │ truth    │                         │
│ Bytecode VM              │ Preview  │ nate run file.nate --vm │
│ LLVM AOT                 │ Preview  │ nate build file.nate    │
└──────────────────────────┴──────────┴─────────────────────────┘
```

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

## LLVM AOT

`nate build` emits a native binary. It requires a Nate build with LLVM.

Rules for 1.0:

1. AOT is preview. Install docs must not require LLVM to run Nate.
2. Document missing builtins instead of implying C-level completeness.
3. GitHub issue #68 remains open until AOT has its own freeze spec.
4. `make` must still produce a working interpreter without LLVM.

## Parity definition

Two runs match when:

- Exit codes are equal.
- Program stdout is equal after stripping interpreter/VM banners.
- Both succeed, or both fail with the same class of error: parse,
  analysis, or runtime.

Timing, thread interleaving, and map iteration order are not required
to match unless a test pins them.

## Analysis vs execution

Static analysis in `src/analyzer*.c` runs before the interpreter.
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
LLVM AOT requires an LLVM-enabled build and has incomplete builtin coverage.
Neither backend is promoted by a candidate or stable interpreter tag.
