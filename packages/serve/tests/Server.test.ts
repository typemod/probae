import Server from '../src/Server'

import { request } from 'undici'

import { test } from 'uvu'
import * as assert from 'uvu/assert'

test('Server#constructor', async () => {
	let server = new Server(8080, {
		'/': {
			handler: () => 'hello!',
			tests: { once: true },
		},
	})

	assert.equal(server.port, 8080)

	const { statusCode, body } = await request(server.url)

	assert.equal(statusCode, 200)
	assert.equal(await body.text(), 'hello!')

	server.close()
})

test('Server#tests | once', () => {
	let server = new Server(8081, {
		'/': {
			handler: () => 'hello!',
			tests: { once: true },
		},
	})

	assert.throws(() => server.test())

	server.close()
})

test.run()
