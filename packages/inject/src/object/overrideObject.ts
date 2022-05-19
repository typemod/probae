import getObjectProps from './getObjectProps'
import { hook } from '../index'

export default function overrideObject(obj) {
	obj._inject = {}
	const objectFuncs = getObjectProps(obj)

	objectFuncs.forEach((name) => {
		const func = obj[name]

		obj[name] = function () {
			hook(this, name)
			return func()
		}
	})

	return obj
}
