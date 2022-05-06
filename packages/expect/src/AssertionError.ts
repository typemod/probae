import { red, bold, green } from "colorette";

/**
 * AssertionError is thrown whenever an assertion inside an expect call fails.
 *
 * @param opts.message {String} The message to be displayed when the assertion fails.
 */
export default class AssertionError extends Error {
	constructor(
		opts: {
			message: string | undefined;
			refrence?: any;
			value?: any;
		} = { message: undefined, refrence: undefined, value: undefined }
	) {
		super(opts.message ?? "Assertion failed");

		this.name = "AssertionError";

		let refrence = opts.refrence.split("\n");
		let value = opts.value.split("\n");

		// Turns refrence and value into an array formatted like this:
		// [[refrence, value], [refrence, value], ...]
		const result = refrence.map((l, i) => [l, value[i]]);

		// Gets the longest string and then pads the other strings to that length + 4
		const spacing =
			result
				.flat()
				.sort((a, b) => a.length - b.length)
				.at(-1).length + 4;

		// TODO: Add actual diff message to the error.
		this.message = `
${bold(green("Left:" + " ".repeat(spacing - 5) + "Right:"))}
${"-".repeat(spacing + 6)}
${result
	// Lazy, but working diff algorithm.
	.map((x) => [x[0], x[0] == x[1] ? green(bold(x[1])) : red(bold(x[1]))])
	// Formatting
	.map((x) => x[0] + " ".repeat(spacing - x[0].length) + x[1])
	.join("\n")}
`;
	}
}
