> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Tasks and channels

Outside a concurrent block, spawn starts a task and waits for it. Inside a
concurrent block, spawns are started together and every started thread is joined.
Task errors propagate after joining and can be caught with guard/or.

```nate
channel results
func worker(value) { send(results, value * 2) }
concurrent {
    spawn worker(10)
    spawn worker(20)
}
print(receive(results), receive(results))
close_channel(results)
```

Channels are named FIFO queues. Send enqueues and returns; receive blocks until
a value exists or a closed queue drains. `value, ok = receive(results)` distinguishes
queued nil from the end of a closed queue. There is no fixed queue capacity.

One interpreter lock serializes evaluation. Receive, sleep, await, and joining
tasks yield the lock. Captured state is shared, not copied. Static analysis catches
some visible shared writes but is not complete race detection. Use channels and
avoid depending on scheduling order. A failing task does not cancel blocked siblings.

Async/await, supervision, links, monitors, and shared wrappers remain preview.
See [the concurrency contract](../specs/language/11-concurrency.md).
