function createStore() {
	return {
		timesRan: 0
	}
}

function hook(store) {
	store.timesRan++
}

export default function overrideFunction(fn, hookThis?) {
	const store = createStore();

	let newFn = (...args) => {
		hook(store)
		return fn.apply(hookThis ?? {}, args)
	}

	Object.defineProperty(newFn, "_inject", {
		value: {}
	})

	return newFn
}
