class RamuMath{
	/// Prevents creating an instance of this class.
	constructor(){
		throw new Error('This is a static class');
	}
	
	static distance(gameObjectA, gameObjectB){
		let x = Math.pow(gameObjectA.x - gameObjectB.x, 2),
			y = Math.pow(gameObjectA.y - gameObjectB.y, 2);
		return Math.sqrt(x + y, 2);
	}
	
	static overlap(rect1, rect2) {
		return(rect1.x < rect2.x + rect2.width &&
			   rect1.x + rect1.width > rect2.x &&
			   rect1.y < rect2.y + rect2.height &&
			   rect1.height + rect1.y > rect2.y);
	}
}
