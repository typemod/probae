# @probae/serve โจ๐งชโจ

`@probae/serve` is a toolkit for making basic HTTP servers for testing.

-   ๐ Simple 1-function API!
-   โก No-friction greased-lightning speed!
-   ๐ Zero dependencies!
-   ๐ก 100% Typescript!

## Example

```typescript
import serve from '@probae/serve'

const { url, test, close } = serve(
	{
		'/': {
			handler: () => 'hello!',
			tests: { once: true },
		},
	},
	{ port: 8080 }
)

console.log(url) // http://localhost:8080

// do something that pings the server at the "/" route once.

// throws no error (unless it failed to ping)
test()

// close the server
close()
```
