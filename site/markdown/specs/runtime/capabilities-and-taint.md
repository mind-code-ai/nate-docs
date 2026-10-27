> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Capabilities, taint, and scoped execution

Status: frozen for the tree-walking interpreter. VM and AOT are preview.

## Capabilities

Capability names are `file_read`, `file_write`, `network`, `env`, `exec`,
and `unsafe`. Unknown names and non-string arguments return errors.
The ordinary CLI enables file reads, file writes, networking, and environment
access. Programs are trusted scripts with the operating system permissions of
the process that runs Nate.

| Operation | Result |
| --- | --- |
| `grant_capability(name)` | Enables the named flag and returns `true`; denied inside `sandbox`. |
| `has_capability(name)` | Returns whether the named operation is allowed in the current scope. |
| `require_capability(name)` | Returns `true` when allowed, otherwise an error recoverable with `or` or `guard`. |

Every operation takes exactly one argument. File reads, imports, and existence
checks require `file_read`. Writes and appends require `file_write`.
TCP and HTTP client operations require `network`. Preview SQLite operations
require both file capabilities. A combined host capability check succeeds
only when every requested flag is enabled; `CAP_NONE` always succeeds.

`env`, `exec`, and `unsafe` are reserved capability flags. Granting one does not
create a new environment, subprocess, or unsafe-memory language API.
Grants in ordinary trusted code can expand permissions: these functions do
not establish an embedding boundary for arbitrary hostile scripts.

## Scoped execution

`sandbox(fn)` calls a synchronous, zero-argument function or closure and
returns its result. `is_sandboxed()` takes no arguments and reports whether
execution is currently inside such a callback. Nested calls remain restricted.

Inside the callback:

- File operations and imports return security errors.
- Capability grants return security errors and leave permissions unchanged.
- TCP, HTTP, WebSocket, SQLite, MCP, agent, and AI integrations are denied.
- `spawn`, `concurrent`, `supervise`, and async calls are denied, preventing
  callbacks from queuing work that runs after the restriction ends.

The restriction ends on success, error, or panic. `or` and `guard` recover as
usual. A callback that needs arguments or is not callable returns an error.
Callbacks can access their captured values and change application state.
This is an interpreter capability scope, not operating system isolation,
memory isolation, or an execution-time/memory quota.

## Taint

`taint(value)` returns a copy of the value tagged `user`.
`is_tainted(value)` reports whether a tag is present. `get_taint(value)`
returns `none`, `user`, `file`, `network`, or `env`.
Each takes exactly one argument and propagates argument evaluation errors.

File text is tagged `file`; TCP receive results and HTTP response maps are
tagged `network`. Values obtained by indexing a tagged container inherit its
tag. JSON decoding carries source taint into parsed values; encoding also
collects taint from nested values.

Arithmetic, concatenation, slicing, case conversion, trimming, splitting,
formatting, copying, and builtin transformations preserve explicit input
taint. When several origins contribute, one origin is retained; tags are not
a set of all sources. Control flow is not tracked as information flow.

File paths passed to `read_file`, `write_file`, `append_file`, and
`file_exists` must be untainted. File content may be tainted: writing data
does not interpret that data as a path or command.

`untaint(value)` explicitly removes the tag on the returned value.
`sanitize(value)` is a compatibility alias. Neither validates input, escapes
content, nor changes the original variable. Validate the path for the intended
operation before clearing its tag. Removing a container tag does not remove
tags already stored on individual elements.

## Verification

- `tests/conformance/security_test.nate`
- `tests/conformance/safety_test.nate`
- `tests/conformance/json_safety_test.nate`
- `tests/security/runtime_security.c` via `make -C src test-security`
