> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Runtime Safety

Status: frozen for the 1.0 interpreter.

Nate 1.0 is safe by default. The interpreter must not produce undefined
behavior for frozen programs.

## Guarantees

- No null pointer dereference from Nate code. Missing values are `nil`.
- Array and string index operations are bounds-checked.
- Memory is managed. Frozen 1.0 uses the interpreter GC.
- Division by zero and similar failures become error values or panics,
  not process crashes, except for true resource exhaustion.

See [errors and panics](../language/10-errors-and-panics.md).

## Capabilities and taint

Frozen builtins:

```
grant_capability(name)
has_capability(name)
require_capability(name)
taint(value)
untaint(value)
is_tainted(value)
sandbox(fn)
```

The implemented scope and exact sink list are specified in
[capabilities-and-taint.md](capabilities-and-taint.md). `sanitize` is an
explicit taint removal alias, not an input validator.

`examples/security.nate` is a 1.0 release gate.

## Race detection

The analyzer rejects some unsynchronized shared writes across `spawn`.
Rejected programs are illegal, not runtime lotteries.

This applies to the interpreter path. VM parity is preview. See
[compatibility.md](../compatibility.md).

## Not frozen

- `@strict` ownership
- `move`
- Full capability matrix beyond the security example
- Guarantees for LLVM AOT binaries

## Tests

- `examples/security.nate`
- `tests/negative/data_race_error.nate`
- `tests/conformance/safety_test.nate`, `tests/conformance/security_test.nate`
- `tests/conformance/memory_test.nate`, `tests/conformance/arguments_test.nate`
- `tests/conformance/json_safety_test.nate`
- `tests/security/runtime_security.c`
- `scripts/security_regressions.py`

## Defined limits

Integer arithmetic checks signed overflow, including negation of the smallest
integer and its division/remainder by `-1`. Errors are recoverable with `or`
and `guard`. Numeric literals outside the host `long`/finite `double` ranges
are compile errors; the release targets use 64-bit `long`.

Source files, imports and `read_file` accept regular text files up to 64 MiB.
NUL-containing text is rejected. Short reads use the actual byte count;
I/O and close failures are reported. FIFOs and devices are rejected without
waiting for input. Existence checks use metadata and do not read file content.

Parser recursion is limited to 256 tracked levels, analyzer traversal to 512,
and evaluation to 512. Exceeding a limit returns a diagnostic. These bounds
protect native stacks; they do not limit loop iterations or total allocations.
Evaluation also reserves 256 KiB of native stack headroom on the supported
platforms. A small host stack or sanitizer build can reach this guard before
the nominal recursion limit. It returns the same depth diagnostic. If native
stack bounds cannot be inspected, evaluation uses a conservative 128-level cap.

JSON nesting is limited to 128 levels and encoded output to 64 MiB. Format
width and precision are limited to 255. Larger values return errors before
padding buffers or numeric conversion can overflow.
