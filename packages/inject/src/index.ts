import overrideFunction from './function/overrideFunction'
import getClassProps from './class/getClassProps'
import overrideClass from './class/overrideClass'
import getObjectProps from './object/getObjectProps'
import overrideObject from './object/overrideObject'

export function hook(clsThis, clsFunc) {
	clsThis._inject = {
		[clsFunc]: {
			calledTimes: 0,
		},
	}
	clsThis._inject[clsFunc].calledTimes++
}

type Class<T> = new (...args: any[]) => T

export default function inject(injects: (Object | Class<any> | Function)[]) {
	return injects.map((inject) => {})
}

export {
	overrideFunction,
	getClassProps,
	overrideClass,
	getObjectProps,
	overrideObject,
}
