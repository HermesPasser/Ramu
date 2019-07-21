class KeyController {
	#keys = {};
	#toBeResetedList = [];

	keyDown(key) { // The key continues on this list until the key up.
		if (typeof key === 'string')
			key = keyCode[key.toLowerCase()];

		if (this.#keys[key]) 
			return this.#keys[key].down
		return false;
	}

	keyUp(key) { // The key continues on this list until the end of frame.
		if (typeof key === 'string')
			key = keyCode[key.toLowerCase()];

		if (this.#keys[key])
			return this.#keys[key].up
		return false;
	}

	_setDown(key) {
		this.#keys[key] = {down: true, up: false};
	}

	_setUp(key) {
		this.#keys[key] = {down: false, up: true};
		this.#toBeResetedList.push(key);
	}

	_resetState() {
		for (let i = 0; i < this.#toBeResetedList.length; i++) {
			const key = this.#toBeResetedList[i];
			if (this.#keys[key])
				this.#keys[key].up = false;
		}
		this.#toBeResetedList = [];
	}
}
