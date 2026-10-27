> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

<div class="hero">
<div>
<div class="eyebrow">The Nate language · Documentation</div>

# Read it.<br>Write it.<br>Make it work.

<p class="lead">A readable language for scripts, CLI tools, and learning. Start small. Handle errors explicitly. Build your understanding as you go.</p>
<div class="hero-actions"><a class="primary-link" href="getting-started/installation.html">Start building →</a><a href="guide/functions.html">Explore the language ↗</a></div>

<p class="fine">The current release candidate requires repository access.</p>

</div>
<div class="code-window">
<div class="window-head"><span>hello.nate</span><span>NATE</span></div>

```nate
func divide(a, b) {
    if b == 0 { return nil }
    return a / b
}
print(divide(10, 0) or "Try again")
```

<div class="terminal"><span>›</span>Try again</div>
</div>
</div>
<a class="release-note" href="specs/1.0-scope.html"><span class="release-dot"></span>1.0.0-rc.1 · Interpreter release candidate · See what’s included →</a>

<hr class="home-divider">
<div class="section-heading"><h2>Find your starting point</h2><span>THREE WAYS IN</span></div>
<div class="path-grid">
<a class="path-card" href="getting-started/hello-world.html"><span class="card-number">01 ↗</span><strong>Write your first program</strong><p>Go from a blank file to running Nate with complete examples.</p></a>
<a class="path-card" href="stdlib/overview.html"><span class="card-number">02 ↗</span><strong>Find the right API</strong><p>Explore 12 standard library modules, signatures, and practical usage notes.</p></a>
<a class="path-card" href="specs/index.html"><span class="card-number">03 ↗</span><strong>Know the guarantees</strong><p>Understand the interpreter contract, runtime limits, and compatibility boundaries.</p></a>
</div>

## What can I rely on?

The tree-walking interpreter is the 1.0 runtime. The current candidate is
`1.0.0-rc.1`; it is a prerelease for validation before the stable tag.

Arrays, maps, closures, structs, enums, pattern matching, error recovery, modules,
and structured tasks are supported. The interpreter manages memory and checks
indexes and integer overflow. Trusted programs run with the process's operating
system permissions. Scoped capabilities do not provide process isolation or quotas.

Start with [installation](./getting-started/installation.md) and
[hello world](./getting-started/hello-world.md). The
[specifications](specs/index.md) define the compatibility contract.

VM/AOT, LSP, packages, async/await, supervision, strict ownership, agents, AI,
SQLite, and extended networking remain preview. A package registry, full generics,
GPU/mobile/WASM support, and self-hosting are outside 1.0.
