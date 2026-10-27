> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Modules

Import a module using a string path. Capitalized declarations are exported into
the importing scope without a module qualifier.

```nate
import "math"
print(PI, Max(20, 42))
```

Use `import "./helpers"` for a file beside the importer. The .nate extension is
added during resolution. Private lowercase helpers stay in their defining scope.
Functions keep that scope when called by another module. Existing files are
canonicalized and cached; duplicate imports reuse exports and cycles are errors.

Project stdlib directories take precedence, then files beside the importer,
then NATE_STDLIB and the library bundled with the executable. Relative paths
bypass library lookup. Import collisions replace earlier bindings; choose modules
deliberately when they export the same names. Qualified `math.PI` is unsupported.

Package manager commands and remote package caches are preview. See
[the module contract](../specs/language/12-modules.md).
