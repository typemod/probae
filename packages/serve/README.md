# @vvft/serve ✨🧪✨

`@vvft/serve` is a toolkit for making basic HTTP servers for testing.

- 📈 Simple 1-function API!
- ⚡ No-friction greased-lightning speed!
- 💎 Zero dependencies!
- 💡 100% Typescript!

## Example

```typescript
import serve from "@vvft/serve"

const { url, test, close } = serve({
	'/': {
		handler: () => 'hello!',
		tests: { once: true }
	},
}, { port: 8080 })

console.log(url) // http://localhost:8080

// do something that pings the server at the "/" route once.

// throws no error (unless it failed to ping)
test()

// close the server
close()
```
