> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

<section class="product-hero" aria-labelledby="nate-makes-error-recovery-readable">
<div class="hero-copy">
<a class="release-pill" href="specs/1.0-scope.html"><span class="status-dot" aria-hidden="true"></span>Meet Nate 1.0.0-rc.1<span aria-hidden="true">↗</span></a>

# Nate makes error recovery readable.

<p class="product-lead">Nate is a small programming language for scripts, CLI tools, and learning. It combines Go-inspired readability with error recovery and structured tasks built into the language.</p>
<div class="product-actions"><a class="button-primary" href="getting-started/hello-world.html">Write your first program <span aria-hidden="true">→</span></a><a class="button-secondary" href="guide/errors.html">See how recovery works <span aria-hidden="true">↗</span></a></div>
<p class="access-note">Read the guides now. Installing the release candidate requires repository access.</p>
</div>
<div class="sample-workbench">
<div class="workbench-head"><span class="file-mark" aria-hidden="true">N</span><span>recovery.nate</span><span class="workbench-label">NATE</span></div>
<div class="example-tabs" role="tablist" aria-label="Error recovery examples">
<button id="json-tab" role="tab" aria-controls="json-example" aria-selected="true" tabindex="0">JSON fallback</button>
<button id="guard-tab" role="tab" aria-controls="guard-example" aria-selected="false" tabindex="-1">Guard recovery</button>
</div>
<div id="json-example" role="tabpanel" aria-labelledby="json-tab" tabindex="0">

```nate
import "json"

# Recover from invalid input.
config = Decode("{broken json}") or Decode("{}")
port = config["port"] or 8080

print("Port:", port)
```

<div class="example-output"><span>OUTPUT</span><samp>Port: 8080</samp><span class="output-success">Completed</span></div>
</div>
<div id="guard-example" role="tabpanel" aria-labelledby="guard-tab" tabindex="0" hidden>

```nate
guard {
    print([1, 2][9])
} on error message {
    print("Could not read that item")
}

print("Still running")
```

<div class="example-output"><span>OUTPUT</span><samp>Could not read that item<br>Still running</samp><span class="output-success">Recovered</span></div>
</div>
<a class="example-caption" href="guide/errors.html">Two recovery patterns. Both are complete, runnable Nate programs.<span aria-hidden="true">↗</span></a>
</div>
</section>

<div class="capability-strip" aria-label="Interpreter capabilities"><span>Runs on <strong>macOS &amp; Linux</strong></span><span>Test your code with <code>nate test</code></span><span><strong>12 modules</strong> in the standard library</span></div>

<section class="purpose-section" aria-labelledby="why-nate-exists">
<div class="purpose-intro"><p class="section-kicker">WHY NATE EXISTS</p><h2 id="why-nate-exists">Make everyday programs easier to understand.</h2><p>Nate was created to make code easier to read and learn, with behavior you can reason about. Its design takes inspiration from Go and focuses on a small set of concepts, explicit recovery, and structured concurrency.</p><a href="guide/variables.html">Explore the language guide <span aria-hidden="true">→</span></a></div>
<dl class="purpose-details">
<div><dt>A language you can learn in smaller steps</dt><dd>Familiar control flow and a compact set of core concepts aim to keep the learning curve manageable as your scripts grow.</dd></div>
<div><dt>Recovery beside the operation that can fail</dt><dd>Use <code>or</code> for a local fallback. Use <code>guard</code> to handle a failure across a group of operations in one recovery block.</dd></div>
<div><dt>Task lifetimes you can follow in the code</dt><dd>A <code>concurrent</code> block waits for the tasks it starts to finish. Channels let those tasks exchange values.</dd></div>
</dl>
</section>

<section class="resource-section" aria-labelledby="build-with-nate">
<div class="section-intro"><div><p class="section-kicker">THE DOCUMENTATION</p><h2 id="build-with-nate">Build your understanding of Nate.</h2></div><p>Follow the first-program guide, look up an API, or check exactly what the runtime guarantees.</p></div>
<div class="resource-grid">
<a class="resource-card" href="getting-started/hello-world.html"><span class="resource-icon" aria-hidden="true">&gt;_</span><h3>Your first Nate program</h3><p>Write a file, run it, and understand what happens at startup.</p><span class="resource-action">Follow the guide <span aria-hidden="true">→</span></span></a>
<a class="resource-card" href="guide/variables.html"><span class="resource-icon" aria-hidden="true">{ }</span><h3>The language, explained</h3><p>Learn values, functions, error recovery, and tasks through examples.</p><span class="resource-action">Read the language guide <span aria-hidden="true">→</span></span></a>
<a class="resource-card" href="stdlib/overview.html"><span class="resource-icon" aria-hidden="true">[ ]</span><h3>An API for the task</h3><p>Find JSON parsing, file I/O, collection helpers, and their exact signatures.</p><span class="resource-action">Browse the standard library <span aria-hidden="true">→</span></span></a>
<a class="resource-card" href="advanced/security.html"><span class="resource-icon" aria-hidden="true">#</span><h3>The runtime boundaries</h3><p>Understand capability scopes, input provenance, and interpreter limits.</p><span class="resource-action">Read the security guide <span aria-hidden="true">→</span></span></a>
</div>
</section>

<section class="release-panel" aria-labelledby="release-heading"><div><p class="section-kicker">CURRENT RELEASE</p><h2 id="release-heading">A clear contract for the first release.</h2><p>The 1.0 release candidate targets the tree-walking interpreter. The specifications define the supported language, standard library, and CLI behavior.</p><div class="release-actions"><a href="specs/1.0-scope.html">Review the 1.0 scope <span aria-hidden="true">→</span></a><a href="getting-started/installation.html">Installation instructions <span aria-hidden="true">→</span></a></div></div><div class="release-facts"><span class="release-tag">1.0.0-rc.1</span><dl><div><dt>Runtime</dt><dd>Interpreter</dd></div><div><dt>Platforms</dt><dd>macOS, Linux</dd></div><div><dt>Status</dt><dd>Release candidate</dd></div><div><dt>Install access</dt><dd>Private repository</dd></div></dl></div></section>

<details class="preview-note"><summary>What is still in preview?</summary><p>VM/AOT, LSP, packages, async/await, supervision, strict ownership, agents, AI, SQLite, and extended networking remain preview. Read the <a href="specs/1.0-scope.html">release scope</a> before depending on those features.</p></details>

<footer class="product-footer"><span><strong>Nate</strong> · The language documentation</span><nav aria-label="Footer navigation"><a href="reference/cli.html">CLI reference</a><a href="specs/index.html">Specification</a><a href="llms.txt">For AI tools</a></nav></footer>
