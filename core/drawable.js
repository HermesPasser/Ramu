class Drawable extends GameObj{
	constructor(x, y, width, height, canDraw = false){
		super(x, y, width, height);
		if (arguments.length < 4) throw new Error('ArgumentError: Wrong number of arguments');
		this.canDraw = canDraw;
		this.drawPriority     = ++Ramu.drawLastPriority;
		this.flipHorizontally = false;
		this.flipVertically   = false;
		this.drawOutOfCanvas  = false;
		this.opacity = 1;
		Drawable.addObjt(this)
	}
	
	static addObjt(drawableObj){
		if (!drawableObj instanceof Drawable)
			throw new Error("'drawableObj' is not a Drawable instance.");
		Ramu.objsToDraw.push(drawableObj);
		Ramu.callSortDraw = true;
	}
	
	static sortPriority(){
		for (let i = 0; i < Ramu.objsToDraw.length; ++i){
			for (let j = i + 1; j < Ramu.objsToDraw.length; ++j){
				if (Ramu.objsToDraw[i].drawPriority > Ramu.objsToDraw[j].drawPriority){
					let temp =  Ramu.objsToDraw[i];
					Ramu.objsToDraw[i] = Ramu.objsToDraw[j];
					Ramu.objsToDraw[j] = temp;
				}
			}
		}
	}
	
	drawInCanvas(){	
		if (this.canDraw) {

			Ramu.ctx.globalAlpha = this.opacity;
		
			// To flip anything that is drawn (the position need be recalculated in draw() method).
			if (this.flipHorizontally || this.flipVertically)
				Ramu.ctx.scale(this.flipHorizontally ? -1 : 1, this.flipVertically ? -1 : 1);
			
			this.draw();
		}
	}
	
	/// Virtual draw to be inherited.
	draw(){ }
}
