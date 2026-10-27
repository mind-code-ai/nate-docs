> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Memory and GC

Status: frozen for the 1.0 interpreter. Implementation in `src/interp_gc.c` and
[runtime/safety.md](../runtime/safety.md).

Frozen 1.0 memory is the interpreter GC. LLVM AOT and the bytecode VM
are preview. Their allocators are not a 1.0 promise.

## Guarantees

- Strings, errors, arrays, maps, sets, structs and enums are traced by the interpreter GC.
  Users do not explicitly free values.
- `nil` is a value. It is not a C null pointer in user code.
- Array and string indexes are bounds-checked.
- Closures retain captured environments and their values. Unreachable cycles
  between closures and environments are collected.

Tracing uses a work queue, so deeply nested container graphs do not consume
the native call stack. Collection occurs at outer statement boundaries;
nested evaluation and programs with suspended tasks defer collection because
their C stack temporaries are not yet explicit roots. Module environments
remain roots for the lifetime of the interpreter.
The last statement's result is a temporary root across its collection point,
including when a block returns an otherwise unbound string.

Parsed units own their source, nodes, names, and temporary parser allocations.
Releasing a unit frees its storage iteratively, including on syntax errors.
Runtime declarations retain their units, so saved REPL functions and closures
do not borrow the mutable command buffer. Queued channel messages are roots for
both collections and the source of any contained functions. Between REPL commands, units no longer
referenced by reachable runtime values are released. Redefinitions replace the
current scope's binding rather than retaining hidden versions of old definitions.
Collection is deferred while tasks or incompletely traced preview handles may
hold native references. Unit references are also released at interpreter teardown.

Parser allocation cleanup, repeated runtime string/error and closure allocation,
and the conformance test command run with LeakSanitizer on Linux. Native preview
handles still need a separate ownership audit; their presence can defer collection.
Resource quotas and bounded memory consumption are not
guarantees of the current interpreter. True allocation exhaustion may terminate
the process; user-level `or` is not an out-of-memory isolation boundary.

## C embedding ownership

Text values produced during evaluation belong to the interpreter. Aliases share
the same text; embedders must not free it. A returned value is borrowed until a
later collection or interpreter teardown; copy text before retaining it solely
in host storage across evaluations. Host C locals are not collector roots.

Outside evaluation, `make_string` and `make_error` return caller-owned copies.
`make_string_owned` adopts a malloc buffer during evaluation and leaves it
caller-owned outside evaluation. Borrowed C text supplied to evaluation remains
the caller's responsibility. Captured variable mutation remains visible through
the shared environment.

## Preview

- `@strict` ownership
- `move`
- AOT runtime in `src/runtime/nate_runtime.c`

## Tests

`examples/gc_stress.nate`, `tests/conformance/memory_test.nate`, and
`tests/conformance/safety_test.nate`.

AST lifetime checks: `tests/cli/repl_source.in`, `tests/security/parser_memory.c`,
`tests/security/runtime_security.c`, and `make -C src test-parser-memory`.

Text and closure ownership checks: `tests/conformance/runtime_memory_test.nate`,
`tests/security/runtime_memory.c`, and `make -C src test-runtime-memory`.
