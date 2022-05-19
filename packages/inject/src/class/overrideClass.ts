import getClassProps from './getClassProps'
import { hook } from '../index'

export default function overrideClass(cls) {
	cls._inject = {}
	const classFuncs = getClassProps(cls)

	classFuncs.forEach((name) => {
		const func = cls[name]

		cls[name] = function () {
			hook(this, name)
			return func()
		}
	})

	return cls
}
