import serve from '../src/index'

import { request } from 'undici'

import { test } from 'uvu'
import * as assert from 'uvu/assert'

test('serve', () => {
	const { url, test, close } = serve(
		{
			'/': {
				handler: () => 'hello!',
				tests: { once: true },
			},
		},
		{ port: 8082 }
	)

	assert.equal(url, 'http://localhost:8082')
	assert.type(test, 'function')
	assert.type(close, 'function')

	close()
})

test.run()
