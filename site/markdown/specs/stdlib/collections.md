> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# collections

Status: frozen for the 1.0 interpreter.

Import with `import "collections"`. Exports are unqualified; import collisions
replace earlier bindings in the importing scope. Each file should choose its
imports deliberately. Functions require the listed argument count. Native
runtime errors propagate and can be recovered with `or` or `guard`.

## Public API

| Export | Behavior |
| --- | --- |
| `Map(arr, f)` | Map applies a function to each element of an array |
| `Filter(arr, predicate)` | Filter returns elements that satisfy predicate |
| `Reduce(arr, initial, f)` | Reduce folds array into single value |
| `ForEach(arr, f)` | ForEach calls f for each element (for side effects) |
| `Any(arr, predicate)` | Any returns true if any element satisfies predicate |
| `All(arr, predicate)` | All returns true if all elements satisfy predicate |
| `Find(arr, predicate)` | Find returns first element satisfying predicate, or nil |
| `Take(arr, n)` | Take returns first n elements |
| `Drop(arr, n)` | Drop returns array without first n elements |
| `Zip(arr1, arr2)` | Zip combines two arrays into array of pairs |
| `Enumerate(arr)` | Enumerate returns array of [index, value] pairs |
| `Partition(arr, predicate)` | Partition splits array into two: satisfying and not satisfying predicate |
| `GroupBy(arr, keyFunc)` | GroupBy groups elements by key function result |

## Contract

Collection arguments are arrays. Callbacks receive an element, except `Reduce`,
whose callback receives accumulator and element. Results preserve input order.
`GroupBy` callbacks must return string keys. `Any([])` is false, `All([])` is true,
`Find([])` returns nil, and reducing an empty array returns the initial value.
`Take`/`Drop` clip counts at the array boundaries. When no slicing is needed,
they may return the original array; no deep copy is promised. `Zip` stops at
the shorter array. Callback errors propagate.

Tests: `tests/conformance/stdlib_collections_test.nate`.
