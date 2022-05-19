import type { Handlers } from './ServerTypes'

import Server from './Server'

export default function serve(
	handlers: Handlers,
	options?: Partial<{
		port: number
	}>
): { url: string; test: () => void; close: () => void } {
	const server = new Server(options?.port ?? 8080, handlers)
	return {
		url: server.url,
		test: server.test.bind(server),
		close: server.close.bind(server),
	}
}

export { Server }
