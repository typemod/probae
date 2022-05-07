import ExpectObject from '../src/ExpectObject'

import { test } from 'uvu'
import * as assert from 'uvu/assert'

// TODO: Write actual tests

test('ExpectObject#toBe', () => {
	new ExpectObject('test').toBe('test')
	new ExpectObject('test').not().toBe("testn't")

	assert.throws(() => new ExpectObject('test').toBe("testn't"))
	assert.throws(() => new ExpectObject('test').not().toBe('test'))
})

test('ExpectObject#anything', () => {
	new ExpectObject('test').anything()
	new ExpectObject(undefined).not().anything()

	assert.throws(() => new ExpectObject('test').not().anything())
	assert.throws(() => new ExpectObject(undefined).anything())
})

test('ExpectObject#not', () => {
	assert.is(new ExpectObject('test').not().flipped, true)
	assert.is(new ExpectObject('test').flipped, false)
})

test('ExpectObject#toThrow', () => {
	new ExpectObject(() => {
		throw new Error('test')
	}).toThrow()
	new ExpectObject(() => {}).not().toThrow()

	assert.throws(() => new ExpectObject(() => {}).toThrow())
	assert.throws(() =>
		new ExpectObject(() => {
			throw new Error('test')
		})
			.not()
			.toThrow()
	)

	assert.throws(() => new ExpectObject(null).toThrow())
	assert.throws(() => new ExpectObject(null).not().toThrow())
})

test('ExpectObject#toBeType', () => {
	new ExpectObject('test').toBeType('string')
	new ExpectObject('test').not().toBeType('number')

	assert.throws(() => new ExpectObject('test').not().toBeType('string'))
	assert.throws(() => new ExpectObject('test').toBeType('number'))
})

test.run()
