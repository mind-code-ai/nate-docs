> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# time

Status: frozen for the 1.0 interpreter.

Import with `import "time"`. Exports are unqualified; import collisions
replace earlier bindings in the importing scope. Each file should choose its
imports deliberately. Functions require the listed argument count. Native
runtime errors propagate and can be recovered with `or` or `guard`.

## Public API

| Export | Behavior |
| --- | --- |
| `Now()` | Now returns the current time in milliseconds since epoch |
| `Sleep(ms)` | Sleep pauses for nonnegative integer milliseconds, yielding to other tasks |
| `Elapsed(start)` | Elapsed returns milliseconds elapsed since start time |
| `Measure(f)` | Measure runs a function and returns [result, elapsed_ms] |
| `FormatDuration(ms)` | FormatDuration formats milliseconds as human-readable string |
| `Benchmark(f, n)` | Benchmark runs a function n times and returns average time in ms |
| `Timer()` | Timer creates a timer that can be started and stopped |
| `TimerStart(t)` | TimerStart starts the timer |
| `TimerStop(t)` | TimerStop stops the timer |
| `TimerElapsed(t)` | TimerElapsed returns elapsed time in ms |

## Contract

Durations are integer milliseconds. `Now` uses the wall clock, so it is not a
monotonic stopwatch. `Sleep` uses the native sleep operation, yields to runnable
tasks, and rejects negative or noninteger durations. `Measure` calls a zero-argument
function once and returns `[result, elapsed_ms]`. `Benchmark` returns average
integer milliseconds and returns zero for nonpositive iteration counts.
Timers are mutable maps. Start resets the start time; stop records an end time.
`FormatDuration` uses ms below one second, seconds below one minute, minutes and
seconds below one hour, and hours and minutes thereafter. Fractional seconds
are truncated to tenths. Callbacks propagate errors.

Tests: `tests/conformance/stdlib_time_test.nate`.
