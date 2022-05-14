import expect from "../src/index";

import { test } from 'uvu'
import * as assert from 'uvu/assert'

// Tests here can be lighter because of all the testing for the ExpectObject class.

test("expect", () => {
	expect("test").toBe("test")
	expect("test").not().toBe("testn't")

	assert.throws(() => expect("test").toBe("testn't"))
	assert.throws(() => expect("test").not().toBe("test"))
})