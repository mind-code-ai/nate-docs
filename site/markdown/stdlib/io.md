> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# io

This is the 1.0 interpreter API. [Normative specification](../specs/stdlib/io.md).

Import with `import "io"`. Exports are unqualified; import collisions
replace earlier bindings in the importing scope. Each file should choose its
imports deliberately. Functions require the listed argument count. Native
runtime errors propagate and can be recovered with `or` or `guard`.

## Public API

| Export | Behavior |
| --- | --- |
| `ReadFile(path)` | ReadFile reads entire file contents as string |
| `WriteFile(path, content)` | WriteFile writes content to file (overwrites) |
| `AppendFile(path, content)` | AppendFile appends content to file |
| `FileExists(path)` | FileExists checks if a file exists |
| `Println(value)` | Println prints value with newline |
| `Printf(format, args)` | Printf prints formatted string (simple version) |
| `ReadLines(path)` | ReadLines reads file and splits by newline |
| `WriteLines(path, lines)` | WriteLines writes array of lines to file |

## Contract

File paths and contents are strings. Operations propagate builtin I/O errors;
they do not convert failure to empty content. Read operations obey the regular
text-file limit and capability/taint checks in `runtime/safety.md`.
`WriteFile` replaces content; `AppendFile` appends. `WriteLines` joins string
elements with newline separators and does not append a final newline.
`ReadLines` uses split and omits empty lines. `Println` and `Printf` append one
newline and return nil. `Printf` replaces `{}` placeholders with array arguments.

Tests: `tests/conformance/stdlib_io_test.nate`.
