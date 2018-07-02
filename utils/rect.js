//Ramu.Rect = 
class Rect{	
	constructor(x, y, w, h){
		if (arguments.length != 4) throw new Error('ArgumentError: Wrong number of arguments');
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
	}
	
	static hasNegativeValue(rect){
		return Rect.hasNegativeValueInXY(rect) || Rect.hasNegativeValueInWH(rect);
	}
	
	static hasNegativeValueInXY(rect){
		return rect.x < 0 || rect.y < 0;
	}
	
	static hasNegativeValueInWH(rect){
		return rect.width < 0 || rect.height < 0;
	}
}
