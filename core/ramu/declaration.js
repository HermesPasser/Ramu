// ============ RAMU DECLARATION 0.8 - 2018-12-11 ============ //

class Ramu {
	/// Prevents creating an instance of this class.
	constructor() {
		throw new Error('This is a static class');
	}
	
	static get width() {
		if (Ramu.canvas)
			return Ramu.canvas.width;
		return 0;
	}

	static get height() {
		if (Ramu.canvas)
			return Ramu.canvas.height;
		return 0;
	}
	
	static get VERSION() {
		return '0.7c';
	}

	static restoreAfter(func) {
		if (!Ramu.ctx)
			return
		Ramu.ctx.save()
		func()
		Ramu.ctx.restore()
	}
}
