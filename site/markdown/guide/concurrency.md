> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Structured concurrency

Use a `concurrent` block to give related tasks a shared lifetime. Each `spawn`
starts a function call. The block waits for every task it started before the
next statement runs.

## Wait for related tasks

Save this as `tasks.nate` and run `nate run tasks.nate`:

```nate
func prepare(name) {
    sleep(10)
    print(name, "ready")
}

concurrent {
    spawn prepare("Report")
    spawn prepare("Summary")
}

print("Both tasks finished")
```

One possible output:

```text
Report ready
Summary ready
Both tasks finished
```

The first two lines can appear in either order. `Both tasks finished` always
prints last because execution leaves the block only after both tasks finish.
Only `spawn` statements belong inside `concurrent`; put setup and follow-up
work before or after it.

Outside a `concurrent` block, `spawn` starts a task and waits for it immediately.
Use the block when you want several tasks to make progress together.

## Collect results with channels

Channels let tasks return values to the code coordinating them. Each worker
enqueues its result. After both workers finish, the caller receives the values
and adds them together:

```nate
channel results
func square(n) { send(results, n * n) }

concurrent {
    spawn square(3)
    spawn square(4)
}

total = receive(results) + receive(results)
assert_eq(total, 25)
print("Both tasks finished:", total)
close_channel(results)
```

This prints `Both tasks finished: 25`. The sum is the same regardless of which
worker sends first. Use channels to exchange values rather than depending on
task scheduling order or mutating a shared result variable.

`send` enqueues and returns; it does not wait for a receiver. `receive` waits
until a value is available or the channel is closed and drained. Queued values
remain available after closure. `value, ok = receive(results)` distinguishes a
queued nil from the end of a closed channel. Channels have no fixed capacity.

## Recover after the tasks finish

A task failure is returned after every started task has been joined. Place a
`guard` around the block to handle that failure:

```nate
channel completed
func failed_job() { panic "Job failed" }
func completed_job() { send(completed, "Other task finished") }

guard {
    concurrent {
        spawn failed_job()
        spawn completed_job()
    }
} on error message {
    print("Handled task failure")
}

print(receive(completed))
close_channel(completed)
```

This prints `Handled task failure` followed by `Other task finished`. A failed
task does not automatically cancel a sibling. The handler runs after joining;
a sibling blocked on a channel must still be given a way to finish.

## Execution boundaries

The interpreter serializes Nate evaluation with one lock. Blocking receive,
sleep, await, and task joins yield that lock so other tasks can make progress.
Structured concurrency does not promise parallel CPU execution.

Captured state is shared, not copied. Static analysis catches some visible
shared writes but is not complete race detection. Use channels and avoid
depending on scheduling order. Task groups have no automatic timeout or
cancellation; programs must arrange channel closure or other progress.

Async/await, supervision, links, monitors, and shared wrappers remain preview.
See [the concurrency contract](../specs/language/11-concurrency.md) for
the full interpreter semantics.
