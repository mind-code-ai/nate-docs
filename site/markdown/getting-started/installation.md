> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Installation

Nate's interpreter builds on macOS and Linux without LLVM. The release candidate
reports `nate 1.0.0-rc.1`.

On macOS, install Xcode command-line tools with `xcode-select --install`.
On Debian/Ubuntu, install `build-essential`, `git`, and `libsqlite3-dev`:

```bash
sudo apt-get update
sudo apt-get install build-essential git libsqlite3-dev
git clone https://github.com/mind-code-ai/nate-lang.git
cd nate-lang
make -C src
./src/nate --version
./src/nate run examples/hello.nate
```

Source builds use the library in the checkout. Release archives contain `bin/nate`
and `share/nate/stdlib`; preserve that layout and add the archive's bin directory
to PATH. The binary resolves its own location, so programs can run from another
directory. `NATE_STDLIB` can point to an explicit library directory, including for
C embedding. Project-local libraries and modules take precedence.

To verify a source checkout:

```bash
python3 scripts/release_audit.py
python3 scripts/conformance.py
python3 scripts/http_contract.py
python3 scripts/install_contract.py
```

LLVM AOT and the bytecode VM are optional preview backends. Their availability
does not imply compatibility with every frozen interpreter feature.

Next: [Hello world](./hello-world.md).
