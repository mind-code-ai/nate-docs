> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Nate Compiler

Status: experimental compiler implementation; the default C backend remains the
compatibility path until the compiler passes the complete frozen language suite.

The goal is a Nate-owned compiler pipeline with inferred types, native data
representations, optimization, and machine code generation. Nate keeps its
readable syntax. This work does not introduce Rust's ownership syntax or change
the frozen language's dynamic behavior.

```
Nate source -> parser -> type constraints -> typed IR -> verification
            -> checked constant folding -> instruction selection
            -> ARM64 / x86-64 assembly -> assembler + linker -> executable
```

The implementation is in `src/compiler/nate_*.c`. It is independent of both the
bootstrap C emitter and the old LLVM backend. It is initially written in C;
self-hosting is a later project, not a prerequisite for owning the compiler.

## Using the experimental compiler

```
nate build examples/compiler.nate --backend=nate -o compiler-demo
./compiler-demo
nate compiler examples/compiler.nate --emit-ir
nate compiler examples/compiler.nate --emit-asm
nate compiler examples/compiler.nate --emit-asm --target=x86_64-linux
```

`--backend=c` explicitly selects the existing backend and remains the default.
`--backend=nate` never silently falls back to C. Unsupported features produce a
compile-time diagnostic. The host toolchain driver selected by `NATE_CC` invokes
the assembler and linker; no generated C or LLVM is involved in this path.
Object-file emission and removal of the host driver are follow-up work.

Normal builds target the host. Assembly inspection also accepts `arm64-macos`,
`x86_64-macos`, `arm64-linux`, and `x86_64-linux`. Emitting assembly for another
target does not provide that target's runtime archive or a cross-linker.

## Implemented scalar core

- Signed 64-bit integers, IEEE binary64 floats, booleans, nil, and immutable string literals.
- Type inference across function arguments, returns, locals, globals, forward calls,
  and mutual recursion. No type annotations are required.
- Direct calls with up to 64 scalar arguments; monomorphic function signatures.
- Local variables, top-level constants, checked scalar globals, blocks, `if`, condition
  loops and three-clause loops, `break`, `continue`, and `return`.
- Checked integer arithmetic, native float arithmetic, mixed numeric comparisons,
  negation, `not`, short-circuit `and`,
  and scalar/error `or` fallback. String/nil equality and condition semantics
  retain the supported scalar language behavior.
- Deferred numeric constraints infer integer/float operands independently, then
  promote mixed arithmetic to binary64. Function signatures remain monomorphic.
  Floating zero is truthy and preserved by `or`; division by either signed zero
  raises an error. Float remainder raises the interpreter's invalid-operands error.
  Ordered NaN comparisons are false, while NaN inequality is true.
- `print`, including left-to-right evaluation, nested output, and partial output
  when an argument fails.
- Explicit error edges in IR, a two-word value/error return ABI, source-position
  diagnostics, and bounded native stack/call depth.
- Guard blocks for checked scalar failures, optional message bindings, nested
  handlers, and ordinary return/break/continue control flow.

Values and locals have concrete native representations. Floating operations use
ARM64 floating-point instructions or x86-64 SSE2. The internal direct-call ABI
passes 64-bit float bit patterns in the same general-purpose registers/stack slots
as other scalar values and returns the value bits alongside the error pointer.
No boxed-value conversion is needed at calls. The executable links
only `libnate_compiler_rt.a`, a small I/O/diagnostic/stack-guard runtime. It contains
no AST evaluator, boxed `Value`, environment lookup, SQLite, or interpreter GC.
This scalar core needs no runtime heap allocation for language values; string
literals live in static data.

Globals have a scalar payload, an initialized flag, and a constant flag in writable
static data. Top-level constants initialize first in declaration order; ordinary
top-level statements then run in source order, followed by `main()`. An uninitialized
read returns the interpreter's undefined-variable error, including its source
position. Constant reassignment also returns an error; both support `or` recovery.
No environment allocation or runtime name lookup is required.

Function assignments update a global when it already exists. Before that global
is initialized, assignment creates a local fallback for that invocation. Reads
prefer that local fallback, then the initialized global, and otherwise fail.
Each such binding has a stack flag cleared on entry, so one call cannot leak a
local into another. Parameters shadow globals and may have independent types.
Other global/fallback payloads share one inferred type. Function-name rebinding
and type-changing global assignments require the C backend.

`guard { ... } on error message { ... }` routes checked scalar failures to a
recovery block. The optional binding is an ordinary string containing the error
message without its source prefix. It is defined in the current invocation (or
at global scope for a top-level guard), matching interpreter `env_define` rules.
Top-level handler bindings clear an existing constant flag. Strings refer to
static runtime/compiler diagnostics, so recovery needs no heap allocation.
The handler's own failures propagate to the surrounding guard or caller.
Success skips the handler; side effects before failure remain visible.

Return expressions retain the interpreter's special rule: if evaluating a return
operand fails, that error leaves the function and bypasses guards in that function.
An explicit `or` inside the return expression can still recover it. Successful
returns, breaks, and continues also bypass the handler. Local initialization after
a guard is checked conservatively across success and recovery paths; initialize
locals before the guard when both paths need them. Handler bindings that would
change a local/global's inferred type require `--backend=c`.

The IR is typed three-address code with explicit blocks and mutable local slots.
It is not SSA yet. The verifier checks block structure, value definitions, slot
references, call arity, type consistency, and error targets. Error-message capture
must begin a recovery block that ordinary branches cannot enter. Constant folding
preserves integer overflow and division errors. The initial register assignment
spills virtual values to the stack; register allocation remains a major next step.

Current limits include 1,024 globals, 256 locals, 3,500 intermediate values, a 32 KiB frame per
function, and 512 native calls, with a separate native stack-headroom guard.
Unrecoverable stack exhaustion becomes an error, rather than an unchecked crash.

## Remaining language coverage

Heap strings, collections, structs, interfaces, enums, pattern matching,
closures, modules, Result/Option values, panic statements/hooks, concurrency, general builtins,
and polymorphic or changing variable types still require `--backend=c`.
Some otherwise valid scalar programs require it too: the first type solver uses
one type per local/function parameter and conservatively checks initialization.
Mixed return types and partial returns cannot yet be represented.

Heap features need typed layout and precise GC roots/stack maps before promotion.
They must preserve bounds checks, taint/capabilities, errors, and structured task
semantics. Native instruction generation alone is not a safety or speed proof.

## Promotion and performance gates

1. Complete typed/dynamic IR coverage for every frozen language construct.
2. Add SSA/liveness, register allocation, escape analysis, inlining, and proven
   bounds-check elimination, each with regressions and measurable evidence.
3. Add native object writers and target runtime packaging.
4. Pass all frozen conformance, negative, security, ownership, deployment, and
   sanitizer checks with the Nate backend. Only then change the default backend.
5. Compare runtime, memory, startup, binary size, and compile time with equivalent
   Go/Rust programs across multiple workloads and architectures. Preserve the
   specified safety behavior when comparing results.

`scripts/compiler_contract.py` checks execution, integer boundary/error cases,
type diagnostics, direct calls, standalone deployment, absence of interpreter
symbols, and assembly/object validity for all four target formats when Clang is
available. On ARM64 macOS with Rosetta already installed, it also executes the
generated x86-64 integer, float, and global-storage programs against the interpreter reference.
CI configuration includes native execution on macOS ARM64 and Linux x86-64 hosts.

`python3 scripts/compiler_bench.py --n 28 --runs 3` supplies an initial recursive
integer baseline against the bootstrap backend, interpreter, and installed
Rust/Go compilers. It includes process startup, prints build and median run time,
and validates equal results. One workload does not establish general parity.

GitHub is being decommissioned, with Axon planned as its replacement. The workflow
uses local branches, verified commits, and local merges while Axon is being
prepared. GitHub issues, project-board updates, PRs, remote merges, and pushes
are not required or performed unless the user explicitly requests them.
