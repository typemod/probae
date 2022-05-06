import ExpectObject from './ExpectObject';

export default function expect(refrence: any): ExpectObject {
	return new ExpectObject(refrence);
}

export { default as ExpectError } from './ExpectError'
export { ExpectObject }