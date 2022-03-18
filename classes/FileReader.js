const fs = require('fs');

module.exports = class FileReader {
	#arrayStr;
	#array;

	constructor(fileName) {
		this.#arrayStr = fs.readFileSync(`${fileName}`).toString().split("\n");
		this.#array = [];
		for (let i = 0; i < this.#arrayStr.length; i++) {
			this.#array.push(this.#arrayStr[i].split(' '));
		}

		for (let i = 0; i < this.#array.length; i++) {
			for (let j = 0; j < this.#array.length; j++) {
				this.#array[i][j] = Number(this.#array[i][j]);
			}
		}

		return this.#array;
	}
};