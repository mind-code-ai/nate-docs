> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# Design by Contract

Preview: these APIs are outside the 1.0 compatibility contract.

Nate supports Design by Contract with `expects` and `ensures` clauses.

## Overview

Design by Contract (DbC) lets you specify:
- **Preconditions** (`expects`) — What must be true when calling a function
- **Postconditions** (`ensures`) — What will be true after the function returns

## Expects (Preconditions)

Use `expects` to validate inputs:

```nate
func divide(a, b) {
    expects b != 0, "divisor cannot be zero"
    return a / b
}

divide(10, 2)  # OK - returns 5
divide(10, 0)  # Error: divisor cannot be zero
```

### Multiple Preconditions

```nate
func create_user(name, age) {
    expects name != "", "name is required"
    expects age >= 0, "age cannot be negative"
    expects age < 150, "age seems unrealistic"

    return User{name: name, age: age}
}
```

## Ensures (Postconditions)

Use `ensures` to validate outputs:

```nate
func absolute(x) {
    ensures result >= 0, "result must be non-negative"

    if x < 0 {
        return -x
    }
    return x
}
```

The special variable `result` refers to the return value.

### Multiple Postconditions

```nate
func clamp(value, min, max) {
    ensures result >= min, "result below minimum"
    ensures result <= max, "result above maximum"

    if value < min {
        return min
    }
    if value > max {
        return max
    }
    return value
}
```

## Combined Example

```nate
func square_root(x) {
    expects x >= 0, "cannot compute square root of negative"
    ensures result * result == x, "result must be valid"

    return sqrt(x)
}
```

## Benefits

### 1. Self-Documenting Code

Contracts make function requirements explicit:

```nate
func process_order(order) {
    expects order != nil, "order is required"
    expects order.items != [], "order must have items"
    expects order.customer != nil, "customer is required"

    # The contracts tell you exactly what's needed
}
```

### 2. Early Error Detection

Contracts fail fast with clear messages:

```
Error: [line 5, col 4] contract violation: divisor cannot be zero
```

### 3. Debugging Aid

When something goes wrong, contracts help pinpoint the cause.

## When to Use Contracts

### Good Use Cases

- **API boundaries** — Validate inputs from external callers
- **Critical functions** — Ensure correctness in important code
- **Complex invariants** — Document non-obvious requirements

### Avoid Overuse

```nate
# Too much - makes code noisy
func add(a, b) {
    expects type(a) == "int"
    expects type(b) == "int"
    ensures type(result) == "int"
    return a + b
}

# Better - simple functions don't need contracts
func add(a, b) {
    return a + b
}
```

## Practical Example

```nate
struct BankAccount {
    owner, balance
}

func (a BankAccount) withdraw(amount) {
    expects amount > 0, "withdrawal amount must be positive"
    expects amount <= a.balance, "insufficient funds"
    ensures a.balance >= 0, "balance cannot go negative"

    a.balance = a.balance - amount
    return a
}

func (a BankAccount) deposit(amount) {
    expects amount > 0, "deposit amount must be positive"
    ensures a.balance > 0, "balance must increase"

    a.balance = a.balance + amount
    return a
}

func transfer(from, to, amount) {
    expects amount > 0, "transfer amount must be positive"
    expects from.balance >= amount, "insufficient funds"

    from = from.withdraw(amount)
    to = to.deposit(amount)

    return [from, to]
}
```

## Best Practices

1. **Clear messages** — Tell what went wrong
2. **Check inputs** — Validate what you receive
3. **Document invariants** — Express business rules
4. **Don't duplicate** — If the language already checks, skip the contract

## See Also

- [Error Handling](../guide/errors.md)
- [Functions](../guide/functions.md)
