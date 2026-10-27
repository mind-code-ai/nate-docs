> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# fmt

Status: frozen for the 1.0 interpreter.

Import with `import "fmt"`. Exports are unqualified; import collisions
replace earlier bindings in the importing scope. Each file should choose its
imports deliberately. Functions require the listed argument count. Native
runtime errors propagate and can be recovered with `or` or `guard`.

## Public API

| Export | Behavior |
| --- | --- |
| `Sprintf(format, args)` | Sprintf formats a string with placeholders |
| `Printf(format, args)` | Printf prints a formatted string |
| `Quote(s)` | Quote wraps a string in double quotes |
| `Indent(s, spaces)` | Indent adds indentation to each line of a string |
| `Join(arr, sep)` | Join helper (same as strings.Join) |
| `Center(s, width, fillChar)` | Center centers a string within a given width |
| `Truncate(s, maxLen, suffix)` | Truncate truncates a string to maxLen with optional suffix |
| `WrapText(text, width)` | WrapText wraps text at specified width |
| `Table(headers, data)` | Table formats data as a simple table |

## Contract

Formatting uses `{}` placeholders and an array of arguments; this is separate
from the variadic formatting builtin `fmt`, which also supports format specs. Extra arguments are ignored;
unfilled placeholders remain literal. `Printf` appends a newline and returns nil.
`Quote` adds quote characters without escaping its input. `Join` stringifies
elements and returns empty text for an empty array. Widths and substring offsets
count bytes. `Indent` omits empty lines because it uses split. `Center` repeats
fill tokens; `Truncate` clips with a suffix when it fits. `WrapText` splits on
spaces and leaves words longer than the width intact. `Table` produces plain
text and does not escape table syntax in cells.

Tests: `tests/conformance/stdlib_fmt_test.nate`.
