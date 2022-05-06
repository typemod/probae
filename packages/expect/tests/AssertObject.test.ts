import AssertObject from '../src/AssertObject';

import { test } from 'uvu';
import * as assert from "uvu/assert"

// TODO: Write actual tests

test("AssertObject#toBe", () => {
	new AssertObject("test").toBe("test")
	new AssertObject("test").not().toBe("testn't")

	assert.throws(() => new AssertObject("test").toBe("testn't"))
	assert.throws(() => new AssertObject("test").not().toBe("test"))
})

test("AssertObject#anything", () => {
	new AssertObject("test").anything()
	new AssertObject(undefined).not().anything()

	assert.throws(() => new AssertObject("test").not().anything())
	assert.throws(() => new AssertObject(undefined).anything())
})

test("AssertObject#not", () => {
	assert.is(new AssertObject("test").not().flipped, true)
	assert.is(new AssertObject("test").flipped, false)
})

test("AssertObject#toThrow", () => {
	new AssertObject(() => { throw new Error("test") }).toThrow()
	new AssertObject(() => { }).not().toThrow()

	assert.throws(() => new AssertObject(() => { }).toThrow())
	assert.throws(() => new AssertObject(() => { throw new Error("test") }).not().toThrow())

	assert.throws(() => new AssertObject(null).toThrow())
	assert.throws(() => new AssertObject(null).not().toThrow())
})

test.run();