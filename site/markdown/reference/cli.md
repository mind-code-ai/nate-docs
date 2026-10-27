> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# CLI commands

The 1.0 interpreter commands are `nate`, `nate repl`, `nate run file.nate`,
`nate test [path]`, `nate bench [path]`, `nate doc file.nate`, `--version`,
and `--help`. With no arguments Nate starts the REPL; a filename runs it.

Run is quiet by default. `--ast` and `--verbose` enable diagnostics.
Run exits 0 on success, 1 on a runtime failure, 2 on parse/analysis failure,
and 3 for file/usage errors. Test and bench return nonzero if a file or function
fails; benchmark errors are not reported as successful measurements.

Test discovers `test_*` functions in `*_test.nate` files. Bench discovers
`bench_*` functions in `*_bench.nate` files. Both default to the current
directory and inspect its immediate files. Doc prints comments and signatures.
The REPL accepts `:help`, `:quit`, and `:clear`.

VM (`run --vm`), LLVM (`build`), LSP, and package commands are preview.
NATE_STDLIB sets an explicit standard-library directory. NATE_PATH and
NATE_DEBUG are not supported configuration contracts.

See the [normative CLI specification](../specs/cli.md).
