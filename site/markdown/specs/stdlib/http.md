> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# http

Status: frozen for the 1.0 interpreter.

Import with `import "http"`. Exports are unqualified; import collisions
replace earlier bindings in the importing scope. Each file should choose its
imports deliberately. Functions require the listed argument count. Native
runtime errors propagate and can be recovered with `or` or `guard`.

## Public API

| Export | Behavior |
| --- | --- |
| `Get(url)` | Make an HTTP GET request |
| `Post(url, body, content_type)` | Make an HTTP POST request |
| `PostJson(url, json_body)` | Make an HTTP POST request with JSON body (convenience) |
| `Put(url, body, content_type)` | Make an HTTP PUT request |
| `PutJson(url, json_body)` | Make an HTTP PUT request with JSON body (convenience) |
| `Delete(url)` | Make an HTTP DELETE request |
| `Request(method, url, headers, body)` | Make a generic HTTP request |
| `IsOk(response)` | Check if HTTP response was successful (2xx status code) |
| `IsRedirect(response)` | Check if HTTP response is a redirect (3xx status code) |
| `IsClientError(response)` | Check if HTTP response is a client error (4xx status code) |
| `IsServerError(response)` | Check if HTTP response is a server error (5xx status code) |
| `GetJsonBody(response)` | Get the body from a response, parsing as JSON if content_type is application/json |
| `ParseRequest(raw)` | Parse a raw HTTP request string into a structured map |
| `BuildResponse(status, headers, body)` | Build an HTTP response string |
| `JsonResponse(status, json_body)` | Build a JSON HTTP response |
| `HtmlResponse(status, html_body)` | Build an HTML HTTP response |
| `TextResponse(status, text_body)` | Build a plain text HTTP response |

## Contract

The frozen client supports plain HTTP over IPv4 TCP and text bodies. HTTPS/TLS,
IPv6, redirects, compression, binary bodies, and chunked response decoding are
unsupported. HTTPS and unsupported response framing return errors. Status codes
do not automatically become errors: inspect the status or use the helpers.

Client responses are maps with `status`, `status_text`, `body`, and `content_type`.
`Request` accepts a string method, URL, nil or a string-valued header map, and a
string body. Header names and values are validated; callers cannot override Host,
Content-Length, Transfer-Encoding, or Connection. Header injection is rejected.
Client requests and raw responses are limited to 64 MiB; response NUL bytes and
Content-Length mismatches are rejected. Socket send/receive timeouts are ten
seconds; DNS resolution is a synchronous system operation. Network capability
checks apply, and response values carry network provenance.

`ParseRequest` parses a complete HTTP/1.0 or HTTP/1.1 request string into a map
with method, path, query, version, headers, body, content_length, and content_type.
It rejects unsupported versions and incomplete declared bodies. `BuildResponse`
accepts status 100–599, nil or a string header map, and a string body. It generates
Content-Length and Connection headers; reserved or injected headers are rejected.
The JSON/HTML/text response helpers set a fixed content type. These are text
builders and parsers, not a production server or a request-stream framer.

Low-level `Tcp*` exports remain preview and are outside the frozen API below.

Tests: `tests/conformance/stdlib_http_test.nate`. Network contract: `tests/fixtures/http_client.nate`, run by `scripts/http_contract.py`.
