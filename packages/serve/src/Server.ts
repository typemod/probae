import ServerTestError from './ServerTestError'
import type { Handlers } from './ServerTypes'

import * as http from 'http'

export default class Server {
	/**
	 * The server's localhost port number.
	 */
	port: number

	/**
	 * The handlers for different server paths
	 */
	handlers: Handlers = {}

	/**
	 * The http#Server instance.
	 */
	server: http.Server

	/**
	 * The server's internal testing datastore.
	 * @private
	 */
	private testStore: {
		[path: string]: {
			timesVisited: number
		}
	}

	constructor(port: number, handlers: Handlers) {
		this.port = port
		this.handlers = handlers
		this.testStore = {}

		for (const handler in handlers) {
			this.testStore[handler] = {
				timesVisited: 0,
			}
		}

		this.server = http
			.createServer((req, res) => {
				if (req.url.split('?')[0] in this.handlers) {
					this.testStore[req.url.split('?')[0]].timesVisited++

					const handlerEntry = this.handlers[
						req.url.split('?')[0]
					].handler(
						Object.fromEntries(new URLSearchParams(req.url)),
						req
					)

					const isJSON = typeof handlerEntry === 'object'

					res.writeHead(200, {
						'Content-Type': isJSON
							? 'application/json'
							: 'text/plain',
					})

					res.end(
						isJSON ? JSON.stringify(handlerEntry) : handlerEntry
					)
				} else {
					res.statusCode = 404
					res.end('404')
				}
			})
			.listen(port)
	}

	test(): void {
		for (const handler in this.handlers) {
			const store = this.testStore[handler]
			if (this.handlers[handler].tests.once && store.timesVisited != 1) {
				throw new ServerTestError(
					`Handler ${handler} was not called once (called ${store.timesVisited} times)`
				)
			}
		}
	}

	get url(): string {
		return `http://localhost:${this.port}`
	}

	close(): void {
		this.server.close()
	}
}
