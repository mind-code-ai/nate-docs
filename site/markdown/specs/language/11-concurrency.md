> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Concurrency

Status: frozen for the 1.0 interpreter.

`spawn worker(args)` starts a task. Its operand must be a call. Outside a
concurrent block, spawn waits for completion before the next statement and
returns the task's integer ID. A failed task returns its error to the spawning
statement, where guard/or can recover.

`concurrent { spawn first() spawn second() }` queues its spawn statements,
starts their threads, and joins every started thread before returning. Only
spawn statements are allowed in this block. All tasks finish even if another
task fails; the first failure in spawn order is returned after joining. There
is no automatic cancellation or timeout of a blocked sibling. Programs must
arrange channel closure or other progress themselves.

Each task evaluates its call in the spawner's captured scope. Calls then create
their own function-local scopes. The captured environment is shared, not copied.
One interpreter lock serializes Nate evaluation. Blocking receive, native sleep,
await, and task joins yield that lock. This is concurrency, not a promise of
parallel CPU execution. Native external integrations may serialize execution.

## Channels

`channel messages` declares a named, thread-safe FIFO queue and binds the string
`"messages"` as the channel variable. Channel operations accept that string.

| Call | Behavior |
| --- | --- |
| `send(messages, value)` | Enqueue a value and return nil; it does not wait for a receiver. |
| `receive(messages)` | Wait for a value, or return nil when closed and drained. |
| `value, ok = receive(messages)` | True for a queued value, including nil; nil/false when closed and drained. |
| `close_channel(messages)` | Close and wake receivers; repeated close succeeds. |

Queued values drain after close. Sending after close or operating on an unknown
name returns an error. Queues have no fixed capacity or memory quota; they are
not Go-style unbuffered rendezvous channels. Queued containers and closures stay
reachable until received or interpreter teardown. Repeating a channel declaration
with the same name makes the newest queue the lookup target; use distinct names
for independent streams.

The analyzer rejects some visible shared writes across spawned tasks. It is a
conservative check, not complete race detection. Captured mutable state is not
automatically copied or isolated. Prefer channels; do not depend on task
interleaving or treat the interpreter as an operating-system sandbox.

Async/await, supervise, link/monitor, shared-memory wrappers, retry, and circuit
breakers remain preview. An interpreter waits for outstanding async work during
teardown, but that is not a frozen task API.

Tests: `tests/conformance/concurrency_test.nate`, `tests/conformance/task_failures_test.nate`,
`tests/negative/data_race_error.nate`, `tests/negative/spawn_non_call.nate`,
and `tests/negative/concurrent_non_spawn.nate`.
