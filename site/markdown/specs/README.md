> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Nate 1.0 Specifications

This directory is the source of truth for Nate 1.0.

User docs in `docs-site/` teach the language. Specs here define it.
If docs and specs disagree, the spec wins and the docs must change.
If code and a frozen spec disagree, the code is a bug.

## How a feature becomes 1.0

1. Write a normative spec with examples and illegal programs.
2. Add conformance tests that quote the spec section.
3. Make the tree-walking interpreter pass those tests.
4. Make the VM match, or mark the feature interpreter-only.
5. Update user docs from the spec.
6. Mark the section frozen in `1.0-scope.md`.

A feature with code but no spec is not 1.0.
A spec with no conformance test is not frozen.

## Status labels

- **Frozen**: syntax and semantics will not change in a breaking way after 1.0.
- **Draft**: spec is being written from the current implementation.
- **Preview**: implemented, documented as unstable, may change after 1.0.
- **Out**: not part of 1.0. Keep it off the getting-started path.

## Layout

```
specs/
  README.md                 This file
  1.0-scope.md              What is in, preview, and out
  versioning.md             1.0.0 and compatibility promises
  compatibility.md          Interpreter vs VM vs LLVM
  native-compilation.md     Native builds, toolchain, and deployment
  nate-compiler.md          Owned typed compiler and machine code roadmap
  conformance.md            How tests prove the spec
  cli.md                    Frozen CLI
  language/                 Language semantics
  runtime/                  Safety, GC, capabilities
  stdlib/                   Public module APIs
```

Language files:

```
language/
  00-overview.md
  01-lexical.md
  02-types-and-values.md
  03-expressions.md
  04-statements.md
  05-functions-and-closures.md
  06-structs-and-methods.md
  07-interfaces.md
  08-enums.md
  09-pattern-matching.md
  10-errors-and-panics.md
  11-concurrency.md
  12-modules.md
  13-memory-and-gc.md
```

## Writing rules

- Specify what Nate already does. Do not invent syntax in a spec.
- Every frozen keyword in `src/lexer.h` is specified or marked preview.
- Illegal programs matter as much as legal ones.
- Quote builtins by their real names. Channel ops are `send`, `receive`,
  and `close_channel`, not `channel_create`.
- Mark preview features in the spec header, not only in prose.

## Implementation source of truth

Until a section is frozen, read behavior from:

- `src/lexer.h`, `src/parser.h` for syntax
- `src/interp_*.c` for interpreter semantics
- `examples/*.nate` for intended usage
- `stdlib/*.nate` for module APIs

Native C executables and the tree-walking interpreter implement the 1.0 language.
The bytecode VM and legacy LLVM backend remain preview.

## Related docs

- [1.0 scope](1.0-scope.md)
- [Roadmap](https://github.com/mind-code-ai/nate-lang/blob/main/ROADMAP.md)
- [Language identity](https://github.com/mind-code-ai/nate-lang/blob/main/AGENTS.md)
