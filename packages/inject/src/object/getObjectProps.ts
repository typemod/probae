export default function getObjectProps(obj) {
	return Object.getOwnPropertyNames(obj).filter(
		(item) => obj[item] instanceof Function
	)
}
