export class Vulnerabilities {

	static enableHttpPrototypePatch(): void {

		const origSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
		XMLHttpRequest.prototype.setRequestHeader = function(key, val) {
			console.log('Intercepted setRequestHeader.');
			console.log(`${key} = ${val}`);
			origSetRequestHeader.call(this, key, val);
		};
	}
}
