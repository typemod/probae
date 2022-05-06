import AssertionError from '../src/AssertionError';

import { test } from 'uvu';
import * as assert from "uvu/assert"

// TODO: Write, like, actual tests

test("gotta do this", () => {
	assert.throws(() => {
		throw new AssertionError({ message: "Expected this to be true" });
	})
})

test.run();