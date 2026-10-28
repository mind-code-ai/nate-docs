> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Versioning

Nate 1.0 uses a three-part version: `MAJOR.MINOR.PATCH`.

The first public language release is `1.0.0`.
The current candidate prints `nate 1.0.0-rc.1`. Bump `NATE_VERSION` in
`src/commands.h` to `1.0.0` as part of the tag.

## What 1.0.0 promises

After `v1.0.0`, a program that uses only frozen syntax, frozen stdlib
APIs, and frozen CLI flags keeps working on later 1.x releases.

Frozen means listed as frozen in [1.0-scope.md](1.0-scope.md) and
specified in this directory.

## Compatibility classes

**Language (frozen).** Breaking changes require 2.0. Examples: removing
`or`, changing `spawn` to require a different form, making `nil` truthy.

**Stdlib (frozen public API).** Removing or renaming a documented
function requires 2.0. Adding a function is a minor release.

**CLI (frozen commands).** `run`, `build`, `test`, `bench`, `doc`, `--version`,
and `--help` keep their meaning. New flags are minor. Removing a frozen
flag is major.

**Preview.** VM, LLVM, LSP, packages, async, supervise, move, contracts,
reflection, extra HTTP, SQLite, agents. No compatibility promise.
A preview flag may disappear in 1.x.

**Out of 1.0.** Not shipped as product. No version promise.

## What may change in 1.x without a major bump

- Bug fixes that match the frozen spec
- Performance
- Better error messages
- New stdlib functions
- New CLI commands, clearly marked
- Preview features, including removal
- Implementation internals: GC details, C file layout, VM opcodes

## What requires 2.0

- Changing the meaning of frozen syntax
- Removing a frozen builtin or stdlib function
- Changing frozen CLI exit codes in a way that breaks scripts
- Making a preview feature frozen without a minor release that says so

## Interpreter vs other runtimes

The version number describes the language, interpreter, and native C backend.

`nate build` uses the supported C backend. The VM and legacy LLVM backend are
preview. A VM or legacy LLVM mismatch is
not a 1.0 language bug unless [compatibility.md](compatibility.md)
has already promoted that runtime.

## Command output

```
nate --version
```

must print a single line of the form:

```
nate 1.0.0
```

Optional extra lines for build features are allowed after that line:

```
nate 1.0.0
interpreter: yes
vm: preview
llvm: preview
```

`nate --help` lists frozen commands first. Preview commands are grouped
under a Preview heading.

## Tagging

- Git tag: `v1.0.0`
- C macro: `NATE_VERSION "1.0.0"`
- VS Code extension may stay `0.1.x` until it talks to `nate lsp`
- Docs site version matches the language version

## Changelog

Every 1.x release has a changelog entry that states:

1. What frozen behavior changed, if any. Prefer none.
2. What was added.
3. What preview features changed.
4. What is still not supported.

See [1.0-scope.md](1.0-scope.md) for the 1.0.0 product boundary.

## Release candidates

Candidate tags use `vMAJOR.MINOR.PATCH-rc.N` and the binary reports the same
version without the v prefix. Candidates are prereleases and may change before
the stable tag. Native archives retain bin/nate and share/nate/stdlib, include
commit metadata, and have SHA-256 checksum sidecars. The release workflow reruns
the complete CI gate before building and publishing archives. Tag and manifest
versions must agree. Repository visibility is unchanged by publication.
