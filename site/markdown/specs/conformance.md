> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Conformance

A frozen spec section is not done until tests prove it.

Today `examples/` is both demo and test. That is not enough for 1.0.
Split them as the suite is built:

```
tests/
  conformance/     Spec-backed. Must pass for 1.0.
  preview/         async, supervise, vm, sqlite, extra HTTP
  negative/        Parse and analysis failures
examples/          Teaching only. May still be run in CI.
```

`tests/conformance/` and `tests/negative/` exist. `tests/preview/` does
not yet. `tests/cli/` holds pinned-output files for the CLI checks.
Add tests next to each frozen section.

## Mapping

Each frozen spec file lists the tests that prove it.

```
Spec section                          Tests
language/02, 03, 04                   tests/conformance/statements_test.nate
language/05-functions-and-closures    tests/conformance/functions_test.nate
language/06, 07                       tests/conformance/structs_test.nate
language/08, 09                       tests/conformance/match_test.nate
language/10-errors-and-panics.md      tests/conformance/errors_test.nate
                                      tests/negative/guard_missing_on_error.nate
                                      tests/negative/uncaught_panic.nate
language/11-concurrency.md            tests/conformance/concurrency_test.nate
                                      tests/negative/data_race_error.nate
                                      tests/negative/spawn_non_call.nate
language/12-modules.md                tests/conformance/modules_test.nate
                                      tests/negative/missing_module.nate
                                      tests/negative/private_import.nate
language/13-memory-and-gc.md          tests/conformance/memory_test.nate
runtime/safety.md                     examples/security.nate
                                      tests/conformance/safety_test.nate
                                      tests/conformance/security_test.nate
                                      tests/security/runtime_security.c
                                      scripts/security_regressions.py
stdlib/json.md                        tests/conformance/json_safety_test.nate
                                      tests/conformance/stdlib_json_test.nate
                                      tests/negative/move_error.nate
cli.md                                scripts/conformance.py CLI checks
```

## Negative test format

Each file in `tests/negative/` starts with:

```
# expect-exit: 2
# expect-error: <substring of stdout or stderr>
```

The runner fails the test if the exit code differs or the substring is
missing.

Update this table as files land. A section without a row is not frozen.

## Rules

1. Every frozen keyword has a positive test.
2. Every frozen error path has a negative test: parse fail, analysis
   fail, or runtime error value.
3. Empty collections, `nil`, and error returns are tested.
4. Security builtins used in 1.0 have tests. `examples/security.nate`
   must stay green.
5. `scripts/vm_parity_audit.py` runs on the frozen example set.
6. Teaching examples may print banners. Conformance tests should not
   depend on `=== RUNNING ===`.

## Commands

Release CI must run:

```
make -C src
make -C src test-security
make -C src test-parser-memory
make -C src test-runtime-memory
python3 scripts/release_audit.py
python3 scripts/docs_examples.py
python3 scripts/install_contract.py
python3 scripts/http_contract.py
python3 scripts/conformance.py        # CLI, tests/conformance, tests/negative, security
python3 scripts/run_examples.py       # every examples/*.nate (--offline skips network)
```

`.github/workflows/ci.yml` runs both on Ubuntu and macOS. The
pre-commit hook runs both locally.

CI also builds with `make -C src sanitize` and repeats the conformance and
host security checks with address and undefined-behavior sanitizers. Leak
detection is enabled on Linux for the parser corpus, runtime ownership target,
`nate test tests/conformance`, and the loopback HTTP contract. Native preview
resources and all other CLI paths are not covered by a complete leak audit.

`python3 scripts/vm_parity_audit.py` is informational until
[compatibility.md](compatibility.md) promotes the VM.

Files that are expected to fail belong in `tests/negative/`, not in
`examples/`.

## Pass criteria

A conformance file passes when:

- Exit code is 0.
- Any `test_*` function completes without a runtime error.
- Expected output, if the test pins it, matches exactly.

A negative test passes when the process exits non-zero for the documented
reason: parse, analysis, or runtime.

## Interpreter first

Conformance runs on the tree-walking interpreter.
VM and LLVM results are informational until
[compatibility.md](compatibility.md) promotes them.

## Not conformance

- Benchmarks
- HTTP tests that need the network
- Agent, MCP, and AI demos
- LLVM codegen unit tests
- File-size and style checks

## Public API inventory

`release.json` lists 139 frozen stdlib exports and their arities. Every entry
has a module contract in stdlib/ and an executable reference in a module test.
`release_audit.py` rejects unclassified exports or lexer keywords, missing
contract/test references, oversized C source files, and broken product-doc links.
This is a drift check, not a substitute for executable assertions or code coverage.
The HTTP client is tested against a local fixture, without public network access.
Installed layout and documentation examples are exercised separately.
