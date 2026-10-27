> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Modules

Status: frozen for the 1.0 interpreter.

## Frozen form

```nate
import "result"          # stdlib module by name
import "./mathutils"     # file relative to this one

r = Result.Ok(1)
print(Add(2, 3))         # exported names are used unqualified
```

`import` takes a string path. Frozen programs import stdlib modules by
name: `"math"`, `"json"`, `"http"`.

## Rules (tested)

- Exported names start with an uppercase letter: functions, structs,
  enums, constants, and methods of exported types. Lowercase names are
  private to the module.
- Exported names are added to the importer's scope unqualified.
  `math.PI`-style qualified access is not supported.
- A module's functions run in the module's own scope, so exported
  functions may call the module's private helpers.
- Search order for `import "name"`: `stdlib/name.nate` under the project
  root, then `name.nate` next to the importing file, then the explicit
  `NATE_STDLIB` directory and the library bundled with the executable. The project root is
  the nearest ancestor directory of the importing file that contains
  `stdlib/`.
- `import "./x"` and `import "../x"` are relative to the importing file.
- A missing module is a runtime error: `Cannot open module: <path>`.
- Existing paths are canonicalized before caching. A module is initialized
  once; later importers receive its cached exports in their own scopes.
- Imports are top-level declarations. Cyclic imports are runtime errors,
  including cycles spelled with different relative paths. Import nesting is
  limited to 128 modules.
- Constants initialize in their module's private scope after functions are
  registered, so private helpers can be used in constant initializers.
- Importing a module does not re-export that module's own imports.

Names imported later replace earlier non-constant bindings of the same name.
Exports are unqualified: users must choose imports deliberately when names collide.
Module initialization registers declarations and evaluates constants; arbitrary
top-level assignments and module entry points do not run during import.
Interfaces are exported by the same capitalized-name rule.

`NATE_STDLIB` is a host-supplied directory override tested by
`scripts/install_contract.py`. The executable searches ../share/nate/stdlib
(relative to its bin directory), then ../stdlib for source builds.
`NATE_PATH` is not implemented or frozen. See [cli.md](../cli.md).

## Preview

Package manager commands: `nate init`, `nate get`, `nate lock`,
`nate install`. Not module syntax.

## Tests

`examples/modules.nate`, `tests/conformance/modules_test.nate`,
`tests/negative/missing_module.nate`, `tests/negative/private_import.nate`.
