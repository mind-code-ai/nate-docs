> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# math

Status: frozen for the 1.0 interpreter.

Import with `import "math"`. Exports are unqualified; import collisions
replace earlier bindings in the importing scope. Each file should choose its
imports deliberately. Functions require the listed argument count. Native
runtime errors propagate and can be recovered with `or` or `guard`.

## Public API

| Export | Behavior |
| --- | --- |
| `PI` | Constant `3.14159265358979323846`. |
| `E` | Constant `2.71828182845904523536`. |
| `Abs(x)` | Abs returns the absolute value of x |
| `Max(a, b)` | Max returns the larger of a and b |
| `Min(a, b)` | Min returns the smaller of a and b |
| `Clamp(x, minVal, maxVal)` | Clamp restricts x to the range [min, max] |
| `Sign(x)` | Sign returns -1 for negative, 0 for zero, 1 for positive |
| `Pow(base, exp)` | Pow computes base^exp using iterative multiplication |
| `Factorial(n)` | Factorial computes n! = n * (n-1) * ... * 1 |
| `Gcd(a, b)` | Gcd computes the greatest common divisor of a and b |
| `Lcm(a, b)` | Lcm computes the least common multiple of a and b |
| `IsEven(x)` | IsEven returns true if x is even |
| `IsOdd(x)` | IsOdd returns true if x is odd |

## Contract

Inputs are numbers; exponent and factorial arguments are integers. Integer
arithmetic is checked. `Pow` and `Factorial` return `0` for negative arguments.
`Pow(x, 0)` and `Factorial(0)` return `1`. `Gcd(0, 0)` and an `Lcm` with a zero
argument return `0`. `Clamp` expects an ordered minimum and maximum.

Tests: `tests/conformance/stdlib_math_test.nate`.
