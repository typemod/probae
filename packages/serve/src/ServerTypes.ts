import type { IncomingMessage } from 'http'

export type Handlers = {
	[path: string]: {
		handler: (
			params: { [key: string]: string },
			req: IncomingMessage
		) => string | JSON
		tests: {
			once: boolean
		}
	}
}
