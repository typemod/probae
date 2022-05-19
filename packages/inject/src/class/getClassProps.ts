export default function getClassProps(cls) {
	let props = []

	do {
		const l = Object.getOwnPropertyNames(cls)
			.concat(Object.getOwnPropertySymbols(cls).map((s) => s.toString()))
			.sort()
			.filter(
				(p, i, arr) =>
					cls[p] instanceof Function &&
					p !== 'constructor' &&
					(i == 0 || p !== arr[i - 1]) &&
					props.indexOf(p) === -1
			)
		props = props.concat(l)
	} while ((cls = Object.getPrototypeOf(cls)) && Object.getPrototypeOf(cls))

	return props
}
