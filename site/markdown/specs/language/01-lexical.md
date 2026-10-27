> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Lexical structure

Status: frozen for the 1.0 interpreter.

Source is NUL-free text. UTF-8 text is preserved in strings; identifiers use
ASCII letters, digits, and underscore, beginning with a letter or underscore.
Identifiers are case-sensitive and limited to 127 bytes. `_` alone is a pattern
wildcard. Keywords, including preview keywords, cannot be identifiers. `in` is
an ordinary identifier recognized contextually by a for-in loop. The reserved
`error` token introduces a guard handler. See `00-overview.md` for keywords.

`#` begins a comment through the end of a line. Spaces, tabs, and carriage
returns are skipped; newline tokens separate statements. Blocks accept newline
separators. Array elements and call arguments can span lines, including a
newline before the closing delimiter; a trailing comma is allowed there.
An operator and its following operand belong on the same expression line.

Integers are decimal, including leading zeros. A decimal point followed by a
digit makes a float. Exponent notation and hexadecimal literals are not frozen.
Out-of-range integers and nonfinite float literals are compile errors.
Negative integers are a unary-minus form, including the minimum 64-bit value.

Strings use double quotes. The escapes are `\n`, `\r`, `\t`, `\\`, and `\"`.
For another escaped byte, the backslash is discarded: `"\q"` means `"q"`.
A string may contain a literal newline. An unterminated string is an error.
There is no interpolation, single-quoted string, or NUL string value.

Operators: `+ - * / % = == != < <= > >=`, `and`, `or`, `not`.
Delimiters: `( ) { } [ ] , : ; .`; `...` is three dots in a rest pattern.
`->` and `@` are reserved tokens; decorators are preview.

Tests: `tests/conformance/lexical_test.nate`, `tests/conformance/expr_test.nate`,
`tests/negative/invalid_token.nate`, numeric negative tests, and
`scripts/security_regressions.py`.
