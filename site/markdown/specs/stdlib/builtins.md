> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Frozen builtin operations

Status: frozen for the 1.0 interpreter. Other native integrations are preview.

Builtin arguments are values, with the same error recovery model as language
expressions. Numeric operations validate types before accessing their values.
Use the listed argument counts and documented overloads; other accepted native
call shapes are outside the compatibility contract.
Names can be shadowed by user callables.

| Operations | Contract |
| --- | --- |
| `print(values...)` | Print values separated by spaces and a final newline; return nil. |
| `type(value)`, `str(value)` | Runtime type name and text representation. |
| `len(array_or_string)`, `strlen(text)` | Element count or byte count. |
| `push(array, value)`, `pop(array)` | Append and return the array; remove/return its final element. Pop on an empty array is an error. |
| `copy(value)` | Copy array/map storage one level; nested values remain aliased. Other values may be returned unchanged. |
| `abs(number)` | Absolute value; minimum signed integer overflow is an error. |
| `min(a, b)`, `max(a, b)` | Numeric minimum/maximum; two integers produce int, otherwise float. |
| `sqrt(number)`, `pow(base, exponent)` | Floating result; negative square root is an error. |
| `floor(number)`, `ceil(number)`, `round(number)` | Floating result; round uses the native math rounding operation. |
| `int(number)`, `float(number)` | Numeric conversion; int truncates and rejects nonfinite/out-of-range values. |
| `substring(text, start, end)` | Half-open byte slice, clipping endpoints into the text bounds. |
| `split(text, delimiters)` | Delimiter bytes form a separator set; runs collapse and empty fields are omitted. Empty delimiters split into bytes. |
| `replace(text, old, replacement)` | Replace matching substrings; empty old leaves text unchanged. |
| `trim(text)`, `upper(text)`, `lower(text)` | Byte-oriented whitespace/case transformations. |
| `contains(text, part)`, `starts_with(text, part)`, `ends_with(text, part)` | String predicates. |
| `index_of(text, part)`, `char_at(text, index)` | First byte offset or -1; char_at returns one byte or an error for an invalid offset. |
| `fmt(format, values...)` | Brace formatting: `{}`, types d/f/x/X/b/o/e, alignment and width/precision up to 255. Double braces escape braces. Missing arguments leave placeholders literal. |
| `map_create()` | New mutable map. |
| `map_set(map, key, value)`, `map_get(map, key)` | Set/return a value; retrieve or return nil. A third get argument supplies a missing-key fallback. Keys are strings. |
| `map_has(map, key)`, `map_delete(map, key)` | Membership; delete if present and return the map. |
| `map_keys(map)`, `map_size(map)` | Array of string keys, and entry count. Key enumeration order is unspecified. |
| `set_create()`, `set_add(set, text)`, `set_remove(set, text)` | Create a string set; add/remove returns whether the set changed. |
| `set_has(set, text)`, `set_size(set)` | Membership and distinct-item count. |
| `slice(array, start, end)` | Half-open clipped array slice; a two-argument form uses the array length as end. |
| `time_ms()`, `sleep(milliseconds)` | Wall-clock milliseconds; yielding sleep for a nonnegative integer duration. |
| `random()`, `random_int(min, max)`, `random_seed(seed)` | Noncryptographic random generator, described in random.md. |
| `assert(value)`, `assert_true(value)`, `assert_false(value)` | Assertions for conditions or booleans. |
| `assert_eq(a, b)`, `assert_ne(a, b)`, `fail(message)` | Scalar test comparisons and explicit test failure. |
| `is_nil(value)`, `is_error(value)`, `error_message(error)` | Value/error inspection; error_message requires an error. |
| `implements(value, interface_name)` | Interface checking, specified in language/07-interfaces.md. |

File operations are `read_file(path)`, `write_file(path, text)`,
`append_file(path, text)`, and `file_exists(path)`, as specified in io.md.
JSON operations are specified in json.md. Task/channel operations are specified
in language/11-concurrency.md. Capability and taint APIs are specified in
runtime/capabilities-and-taint.md.

Tests: `tests/conformance/release_builtins_test.nate`,
`tests/conformance/safety_test.nate`, `tests/conformance/security_test.nate`,
`tests/conformance/task_failures_test.nate`, and the stdlib module tests.
