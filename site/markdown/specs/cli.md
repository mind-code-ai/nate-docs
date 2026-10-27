> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# CLI

Frozen Nate 1.0 commands. Preview commands are listed last and may change.

The implementation lives in `src/main.c` and `src/cmd_*.c`.

## Invocation

```
nate [command] [options] [arguments]
```

No arguments starts the REPL. A `.nate` path with no command runs the
file, same as `nate run <file>`.

## Frozen commands

**`nate` / `nate repl`**

Interactive prompt. Commands: `:help`, `:quit`, `:clear`.

**`nate run <file.nate>`**

Run with the tree-walking interpreter.

- Prints program stdout/stderr only.
- Does not print the AST or a `=== RUNNING ===` banner by default.
- `--ast` prints the AST, then runs.
- `--verbose` prints analysis and run banners.
- `--vm` is preview. See [compatibility.md](compatibility.md).

**`nate test [path]`**

Default path is `.`. Discovers `test_*` functions in `*_test.nate`
files, or in the given file. Exit 0 if all pass.

**`nate bench [path]`**

Default path is `.`. Discovers `bench_*` functions. Auto-calibrates
toward about one second per benchmark.

**`nate doc <file.nate>`**

Prints text documentation. `nate doc --html [out.html]` is allowed.

**`nate --version` / `nate -v`**

Prints `nate 1.0.0` as specified in [versioning.md](versioning.md).

**`nate --help` / `nate -h`**

Lists frozen commands first, then preview commands.

## Run exit codes

```
0  Success
1  Runtime error
2  Parse or analysis error
3  File not found or usage error
```

`test` and `bench` return 1 when a file/function fails. Their diagnostic
classification is reported within the command; they do not reuse every run
exit code. Benchmark errors stop measurement rather than printing success.

Diagnostics (parse errors, analysis errors, runtime error summaries)
go to stderr. Program output goes to stdout.

## Implementation status

All of these hold in the current binary:

1. `--version` and `--help` exist.
2. `nate run` is quiet by default.
3. No banner is printed outside the REPL.
4. `nate run --vm` is rejected with a clear message if the binary was
   built without `NATE_VM`.
5. `nate build` is rejected with a clear message if built without LLVM.
6. Exit codes match the table above.

The version string is `NATE_VERSION` in `src/commands.h`. It stays
`1.0.0-rc.1` for the candidate and becomes `1.0.0` for the stable tag.

## Preview commands

Not a 1.0 compatibility promise:

```
nate build <file.nate> [-o output]
nate lsp
nate init [name]
nate get <package>
nate lock
nate install
```

`nate build` requires an LLVM-enabled binary. Native compilation is
preview. See GitHub issue #68.

## Environment

```
NATE_STDLIB  Explicit host standard-library directory
```

NATE_STDLIB is tested by `scripts/install_contract.py`. NATE_PATH and
NATE_DEBUG are not implemented or frozen.

## Non-goals for 1.0

- Formatter command
- Debugger command
- Package registry command
- `nate compile` as a second AOT entry point

The REPL limits lines to 4095 bytes and accumulated input to 32767 bytes.
Oversized input is rejected, not executed in fragments. Tokenized delimiters
permit multiline arrays, calls, and blocks without counting quoted braces.
