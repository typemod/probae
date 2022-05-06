import AssertionError from './AssertionError';
import { dequal } from 'dequal';

export default class AssertObject {
	assertRefrence: any;
	flipped: boolean = false;

	constructor(assertRefrence: any) {
		this.assertRefrence = assertRefrence;
	}

	not(): AssertObject {
		this.flipped = !this.flipped;
		return this;
	}

	anything(): void {
		if (!!this.assertRefrence === this.flipped) throw new AssertionError({ message: `Expected ${this.assertRefrence} to be anything` });
	}

	toBe(value: any): void {
		let equal = dequal(this.assertRefrence, value);

		if (equal === this.flipped) throw new AssertionError({ message: `Expected ${this.assertRefrence} to be ${value}` });
	}

	toThrow(): void {
		if (typeof this.assertRefrence !== "function") throw new TypeError("Expected a function");

		let thrown = false;

		try {
			this.assertRefrence();
		} catch (e) {
			thrown = true;
		}

		if (thrown === this.flipped) throw new AssertionError({ message: `Expected ${this.assertRefrence} ${this.flipped ? "not ": ""}to throw` });
	}
}