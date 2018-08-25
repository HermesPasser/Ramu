class Drawable extends GameObj{
	constructor(x, y, width, height, canDraw = false){
		super();
		if (arguments.length < 4) throw new Error('ArgumentError: Wrong number of arguments');

		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.canDraw = canDraw;
		this.drawPriority     = ++Ramu.drawLastPriority;
		this.flipHorizontally = false;
		this.flipVertically   = false;
		this.drawOutOfCanvas  = false;
		this.opacity = 1;
		Drawable.addObjt(this)
	}
	
	static addObjt(drawableObj){
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
	
	destroy(){
		if (!this._start_was_called){
			console.warn("The update was not called yet,")
			return;
		}
		
		super.destroy();
		for (let i = 0; i < Ramu.objsToDraw.length; ++i){
			if (Ramu.objsToDraw[i] === this){
				Ramu.objsToDraw.splice(i, 1);
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
