> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# strings

Status: frozen for the 1.0 interpreter.

Import with `import "strings"`. Exports are unqualified; import collisions
replace earlier bindings in the importing scope. Each file should choose its
imports deliberately. Functions require the listed argument count. Native
runtime errors propagate and can be recovered with `or` or `guard`.

## Public API

| Export | Behavior |
| --- | --- |
| `Repeat(s, n)` | Repeat returns s repeated n times |
| `StartsWith(s, prefix)` | StartsWith checks if s starts with prefix |
| `EndsWith(s, suffix)` | EndsWith checks if s ends with suffix |
| `Contains(s, substr)` | Contains checks if s contains substr |
| `IndexOf(s, substr)` | IndexOf returns the first index of substr in s, or -1 if not found |
| `Reverse(s)` | Reverse returns the string with characters in reverse order |
| `IsEmpty(s)` | IsEmpty returns true if s is empty or only whitespace |
| `PadLeft(s, totalLen, ch)` | PadLeft pads s on the left with ch to reach total length |
| `PadRight(s, totalLen, ch)` | PadRight pads s on the right with ch to reach total length |
| `Lines(s)` | Lines splits a string by newline (wrapper around split) |
| `Words(s)` | Words splits a string by whitespace (wrapper around split) |
| `Join(arr, sep)` | Join concatenates array elements with separator |

## Contract

Inputs are NUL-free strings; lengths, offsets, and reversal operate on bytes,
not Unicode characters. `Repeat` returns an empty string for nonpositive counts.
`Contains(s, "")` is true and `IndexOf(s, "")` is zero. A missing substring has
index `-1`. Padding repeats the entire fill string once per missing byte.
`Lines` and `Words` use the builtin split operation: runs of newline or space
delimiters are collapsed and empty fields omitted. `Words` splits spaces,
not all Unicode whitespace. `Join([], separator)` returns an empty string.

Tests: `tests/conformance/stdlib_strings_test.nate`.
