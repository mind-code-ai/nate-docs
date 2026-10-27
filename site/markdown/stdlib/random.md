> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# random

This is the 1.0 interpreter API. [Normative specification](../specs/stdlib/random.md).

Import with `import "random"`. Exports are unqualified; import collisions
replace earlier bindings in the importing scope. Each file should choose its
imports deliberately. Functions require the listed argument count. Native
runtime errors propagate and can be recovered with `or` or `guard`.

## Public API

| Export | Behavior |
| --- | --- |
| `Random()` | Random returns a random float between 0.0 and 1.0 |
| `RandomInt(min, max)` | RandomInt returns a random integer between min and max (inclusive) |
| `Seed(seed)` | Seed seeds the random number generator |
| `RandomBool()` | RandomBool returns a random boolean |
| `RandomChoice(arr)` | RandomChoice returns a random element from an array |
| `Shuffle(arr)` | Shuffle returns a new array with elements in random order |
| `Sample(arr, n)` | Sample returns n random elements from array (without replacement) |
| `RandomRange(min, max, n)` | RandomRange returns array of n random integers in range [min, max] |
| `Dice(sides)` | Dice rolls a die with n sides (1 to n) |
| `D6()` | D6 rolls a standard 6-sided die |
| `D20()` | D20 rolls a standard 20-sided die |
| `CoinFlip()` | CoinFlip returns "heads" or "tails" |
| `Weighted(weights)` | Weighted returns index based on weights array |

## Contract

This module uses a process-wide noncryptographic generator. Do not use it for
secrets. `Random` is in the inclusive range [0, 1]; integer ranges include both
endpoints. A seed reproduces a sequence only on the same C library and process
configuration. `RandomChoice([])` returns nil. `Shuffle` returns a new array;
`Sample` samples positions without replacement, clips counts to the input size,
and returns an empty array for nonpositive counts. `RandomRange` returns an empty
array for a nonpositive count. Dice require positive sides. `Weighted` expects
nonnegative numeric weights; zero total weight, including empty input, returns 0.

Tests: `tests/conformance/stdlib_random_test.nate`.
