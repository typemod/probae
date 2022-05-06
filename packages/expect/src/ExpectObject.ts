import ExpectError from './ExpectError'
import { dequal } from 'dequal';

export default class ExpectObject {
	assertRefrence: any;
	flipped: boolean = false;

	constructor(assertRefrence: any) {
		this.assertRefrence = assertRefrence;
	}

	not(): ExpectObject {
		this.flipped = !this.flipped;
		return this;
	}

	anything(): void {
		if (!!this.assertRefrence === this.flipped) throw new ExpectError({ message: `Expected ${this.assertRefrence} to be anything` });
	}

	toBe(value: any): void {
		let equal = dequal(this.assertRefrence, value);

		if (equal === this.flipped) throw new ExpectError({ message: `Expected ${this.assertRefrence} to be ${value}` });
	}

	toBeType(type: string): void {
		if ((typeof this.assertRefrence === type) === this.flipped) throw new ExpectError({ message: `Expected ${this.assertRefrence} to be ${type}` });
	}

	toThrow(): void {
		if (typeof this.assertRefrence !== "function") throw new TypeError("Expected a function");

		let thrown = false;

		try {
			this.assertRefrence();
		} catch (e) {
			thrown = true;
		}

		if (thrown === this.flipped) throw new ExpectError({ message: `Expected ${this.assertRefrence} ${this.flipped ? "not ": ""}to throw` });
	}
}