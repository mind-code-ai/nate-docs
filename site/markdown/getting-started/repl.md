> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# REPL

Run `nate` or `nate repl`. Enter an expression to see its result. Definitions
and captured values survive later input. `:help`, `:quit`, and `:clear` are
available, with the aliases `:h`, `:q`, and `:c`.

Braces, parentheses, and array brackets support multiline input. Delimiters
inside strings and comments do not affect continuation. Close string literals
on the entered line. A line is limited to 4095 bytes and a buffered input unit
to 32767 bytes; longer input is rejected rather than executed in fragments.
The source-file limit is specified separately for `nate run`.

Use files and `nate test` for repeatable programs. REPL state is local to that
process; there is no automatic history persistence or package installation.
