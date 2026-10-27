> Nate 1.0.0-rc.1 · https://mind-code-ai.github.io/nate-docs/

# AI Integration

Preview: these APIs are outside the 1.0 compatibility contract.

Nate includes built-in AI capabilities through Benjamin, the AI assistant.

## Overview

Benjamin is Nate's AI assistant that can help with code generation, analysis, and natural language processing tasks directly from your Nate programs.

## ask_benjamin

Query the AI assistant:

```nate
response = ask_benjamin("What's the best way to sort an array?")
print(response)
```

## Use Cases

### Code Explanation

```nate
code = "func fib(n) { if n <= 1 { return n } return fib(n-1) + fib(n-2) }"
explanation = ask_benjamin("Explain this code: " + code)
print(explanation)
```

### Data Analysis

```nate
data = "[1, 5, 3, 9, 2, 8, 4, 7, 6]"
analysis = ask_benjamin("Analyze this data and describe patterns: " + data)
print(analysis)
```

### Natural Language Processing

```nate
text = "The quick brown fox jumps over the lazy dog."
result = ask_benjamin("Extract the nouns from: " + text)
print(result)  # ["fox", "dog"]
```

### Code Generation

```nate
spec = "A function that validates email addresses"
code = ask_benjamin("Generate Nate code for: " + spec)
print(code)
```

## Error Handling

AI operations can fail gracefully:

```nate
response = ask_benjamin("Complex query") or "AI unavailable"
```

## AI Agents

Create specialized AI agents:

```nate
# Create an agent with a specific role
agent = create_agent("code_reviewer")

# Use the agent
feedback = agent.review(code)
print(feedback)
```

## MCP Integration

Nate supports the Model Context Protocol (MCP) for advanced AI integrations:

```nate
# Connect to an MCP server
server = mcp_connect("localhost:8080")

# Send requests
response = mcp_request(server, "analyze", data)
```

## Practical Examples

### Interactive Assistant

```nate
func main() {
    print("Ask Benjamin anything (type 'quit' to exit):")

    for true {
        input = readline("> ")
        if input == "quit" {
            break
        }

        response = ask_benjamin(input) or "Sorry, I couldn't process that."
        print("\nBenjamin:", response, "\n")
    }

    return 0
}
```

### Code Review Tool

```nate
func review_file(filename) {
    code = read_file(filename) or return nil

    prompt = "Review this Nate code for issues:\n\n" + code
    feedback = ask_benjamin(prompt)

    print("=== Code Review for", filename, "===")
    print(feedback)
}

review_file("mycode.nate")
```

### Documentation Generator

```nate
func generate_docs(code) {
    prompt = "Generate documentation for this Nate function:\n\n" + code
    return ask_benjamin(prompt)
}

func_code = "func calculate_tax(income, rate) { return income * rate }"
docs = generate_docs(func_code)
print(docs)
```

## Offline Mode

Benjamin can work offline with pre-computed knowledge:

```nate
# Queries to the built-in knowledge base
response = ask_benjamin("What is the or operator?")
# Returns cached response without network
```

## Best Practices

1. **Clear prompts** — Be specific in your queries
2. **Handle errors** — AI operations can fail
3. **Cache responses** — Avoid redundant queries
4. **Security** — Don't send sensitive data to AI

## See Also

- [Error Handling](../guide/errors.md)
- [Security & Capabilities](./security.md)
