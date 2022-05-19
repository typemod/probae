import {
	overrideClass,
	getClassProps,
	getObjectProps,
	overrideObject,
	overrideFunction
} from '../src/index'

import { test } from 'uvu'
import * as assert from 'uvu/assert'

class Test {
	testFunc() {
		return 'test'
	}
}

class BetterTest extends Test {
	otherTestFunc() {
		return 'otherTest'
	}
}

test('getClassProps', () => {
	assert.equal(['testFunc'], getClassProps(new Test()))
	assert.equal(['otherTestFunc', 'testFunc'], getClassProps(new BetterTest()))
})

test('overrideClass', () => {
	const override = overrideClass(new Test())

	override.testFunc()

	assert.equal(override._inject['testFunc'].calledTimes, 1)
})

test('getObjectProps', () => {
	assert.equal(['testFunc'], getObjectProps({ testFunc: () => 'test' }))
})

test('overrideObject', () => {
	const override = overrideObject({ testFunc: () => 'test' })

	override.testFunc()

	assert.equal(override._inject['testFunc'].calledTimes, 1)
})

test("overrideFunction", () => {
	const override = overrideFunction(() => "test")

	override()

	console.log(override)

	// @ts-ignore
	assert.equal(override._inject, 1)
})

test.run()
