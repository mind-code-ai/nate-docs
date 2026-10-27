> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Arrays, maps, and sets

Arrays are mutable and zero-indexed. Maps use string keys. Missing map keys
return nil; comma-ok lookup distinguishes a missing key from a stored nil.

```nate
values = [1, 2]
push(values, 3)
print(values[0], pop(values))
record = map_create()
record["answer"] = 42
answer, ok = record["answer"]
assert(ok)
print(answer, map_size(record))
tags = set_create()
set_add(tags, "release")
assert(set_has(tags, "release"))
```

Use len for arrays and strings, map_size for maps, and set_size for sets.
Indexing outside an array/string or using a negative index is an error.
Assignment aliases containers. Direct container equality is unsupported;
compare scalar elements or use a suitable representation for the task.

The [collections module](../stdlib/collections.md) provides transformations and
callbacks. Queue and stack native handles remain preview.
