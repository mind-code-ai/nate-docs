> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Standard library

These are the 1.0 interpreter modules.

| Module | Contract |
| --- | --- |
| math | [math](math.md) |
| strings | [strings](strings.md) |
| collections | [collections](collections.md) |
| io | [io](io.md) |
| time | [time](time.md) |
| fmt | [fmt](fmt.md) |
| random | [random](random.md) |
| json | [json](json.md) |
| testing | [testing](testing.md) |
| option | [option](option.md) |
| result | [result](result.md) |
| http | [http](http.md) |

Import with `import "math"`, then call `Abs(-42)` or use `PI`. Exports are
unqualified; `math.PI` is not supported. Names from later imports replace
earlier bindings, so avoid conflicting exported names in one scope.

All modules except JSON and the native I/O/time/HTTP wrappers use Nate code.
Their implementation is readable in stdlib/. Only the listed public contracts
are frozen. The HTTP client supports plain text HTTP; TLS and chunked response
decoding are unsupported. Its Tcp* exports and extended server integrations
remain preview. SQLite, vectors, agents, AI, and observability APIs are preview.

See [builtin operations](../reference/builtins.md), [module resolution](../guide/modules.md),
and [release scope](../specs/1.0-scope.md). Tests for every public export live in
tests/conformance/stdlib_*_test.nate, with isolated loopback HTTP checks in
scripts/http_contract.py. The inventory audit checks references, while these
executable assertions check behavior.
