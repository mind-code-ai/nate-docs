> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# JSON

Status: frozen for the 1.0 interpreter. Interpreter APIs; implementation uses C builtins.

`import "json"` exports the following unqualified functions:

| Function | Behavior |
| --- | --- |
| `Decode(text)` | Parse one complete JSON value; malformed input returns an error. |
| `Encode(value)` | Produce compact JSON. |
| `EncodePretty(value)` | Produce JSON with two-space indentation. |
| `Valid(text)` | Report whether decoding succeeds, including `null`, `false`, and `0`. |
| `Get(object, key, fallback)` | Return an existing map value or the fallback. |
| `GetPath(object, keys)` | Follow map keys; missing paths return `nil`. |
| `Merge(first, second)` | Return a new map; second-map entries override matching first-map entries. |
| `Clone(value)` | Copy a JSON-compatible value through encoding and decoding. |

The corresponding low-level operations are `json_decode`, `json_encode`, and
`json_encode_pretty`. Objects become maps, arrays become arrays, numbers become
`int` or `float`, and JSON `null` becomes `nil`. Object output sorts keys.

Only JSON whitespace, number syntax and escapes are accepted. Unicode escapes
decode to UTF-8; surrogate pairs must be valid. Nate strings cannot contain NUL,
so `\u0000` is rejected. Oversized integers, nonfinite floats, extra input after
the value, unclosed containers, and unknown escapes return errors.

Encoding accepts `nil`, booleans, numbers, strings, arrays and maps. Unsupported
types return errors. Cycles and nesting beyond 128 levels return errors. Output
is limited to 64 MiB. Control characters are escaped. Input provenance is
preserved through decoding and collected from nested values during encoding.

Tests: `tests/conformance/json_safety_test.nate` and
`tests/conformance/stdlib_json_test.nate`.
