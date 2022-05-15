export default class ServerTestError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'ServerTestError'
	}
}
