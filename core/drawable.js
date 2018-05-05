class Drawable extends GameObj{
	constructor(x, y, width, height, canDraw = false){
		super();
		if (arguments.length < 4) throw new Error('ArgumentError: Wrong number of arguments');

		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.canDraw = canDraw;
		this.drawPriority     = drawLastPriority++;
		this.flipHorizontally = false;
		this.flipVertically   = false;
		this.drawOutOfCanvas  = false;
		this.opacity = 1;
		Drawable.addObjt(this)
	}
	
	static addObjt(drawableObj){
		objsToDraw.push(drawableObj);
		Ramu.callSortDraw = true;
	}
	
	static sortPriority(){
		for (let i = 0; i < objsToDraw.length; ++i){
			for (let j = i + 1; j < objsToDraw.length; ++j){
				if (objsToDraw[i].drawPriority > objsToDraw[j].drawPriority){
					let temp =  objsToDraw[i];
					objsToDraw[i] = objsToDraw[j];
					objsToDraw[j] = temp;
				}
			}
		}
	}
	
	destroy(){
		super.destroy();
		for (let i = 0; i < objsToDraw.length; i++){
			if (objsToDraw[i] === this){
				objsToDraw.splice(i, 1);
				break;
			}
		}
	}
	
	drawInCanvas(){		
		if (this.canDraw){

			Ramu.ctx.globalAlpha = this.opacity;
		
			// To flip anything that is drawn (the position need be recalculated in draw() method).
			if (this.flipHorizontally || this.flipVertically){
				Ramu.ctx.save();
				Ramu.ctx.scale(this.flipHorizontally ? -1 : 1, this.flipVertically ? -1 : 1);
			}
			
			this.draw();
			
			if (this.flipHorizontally || this.flipVertically)
				Ramu.ctx.restore();
		}
	}
	
	/// Virtual draw to be inherited.
	draw(){ }
}
