// ============ RAMU DECLARATION 1.7 - 2018-06-30 ============ //

class Ramu{
	/// Prevents creating an instance of this class.
	constructor(){
		throw new Error('This is a static class');
	}
	
	static get width(){
		if (Ramu.canvas)
			return Ramu.canvas.width;
		return 0;
	}

	static get height(){
		if (Ramu.canvas)
			return Ramu.canvas.height;
		return 0;
	}
	
	static get VERSION() {
		return '0.7a';
	}
}
