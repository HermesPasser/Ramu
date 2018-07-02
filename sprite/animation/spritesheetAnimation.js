// se eu colocar para ele se mexer em x ou y com algum valor que nao seja inteiro
// e ele tiver setado para girar o sprite em vertical ou horizontal
// ele desenha parte fora do sprite
// isso acontece mesmo se a animação tiver um frame

/// Displays an animation that uses various sprite sheets of a single image
class SpritesheetAnimation extends SpriteAnimation{
	constructor(img, x, y, width, height){
		super(x, y, width, height);
		if (arguments.length != 5) throw new Error('ArgumentError: Wrong number of arguments');
		if (!(img instanceof Image)) throw Ramu.Utils.CustomTypeError(img, Image);

		this.img = img;
	}
	
	addFrame(rect){
		// multi frame support by github.com/Kawtmany
		if(void 0 === rect || arguments.length != 1)
			throw new Error('ArgumentError: Wrong number of arguments');
		
		if(Array.isArray(rect)){
			for (let i = 0; i < rect.length; i++){
				if(!rect[i] instanceof Rect)
					throw Ramu.Utils.CustomTypeError(rect, rect);
				
				if (Rect.hasNegativeValueInXY(rect[i]))
					throw new Error('ArgumentOutOfRangeError: The rect position cannot be negative.');
				
				this.frames.push(rect[i]);			
			}
			
			return;
		} else if(rect instanceof Rect){
			if(!rect instanceof Rect)
				throw Ramu.Utils.CustomTypeError(rect, rect);
			
			if (Rect.hasNegativeValueInXY(rect))
				throw new Error('ArgumentOutOfRangeError: The rect position cannot be negative.');
			
			this.frames.push(rect);
			return;
		}

		throw Ramu.Utils.CustomTypeError(rect, rect);
	}
	
	draw(){
		// o problema deve estar aqui
		let originX = this.flipHorizontally ? -this.width - this.x : this.x;
		let originY = this.flipVertically   ? -this.height - this.y : this.y;
		let rect    = this.frames[this.currentFrame];
		
		if (Ramu.Utils.imageIsLoaded(this.img) && (rect.width > this.img.width || rect.height > this.img.height))
			throw new Error('The rect size cannot be greater than the image size.');

		//Draw
		if (this.frames.length > 0){
			if (!Ramu.Utils.imageIsLoaded(this.img)){
				Ramu.ctx.fillRect(originX, originY, this.width, this.height); // Draw a black rect instead of image
				return;
			}	
			
			Ramu.ctx.imageSmoothingEnabled = false;
			Ramu.ctx.drawImage(this.img, 
								rect.x, 
								rect.y, 
								rect.width, 
								rect.height, 
								originX, 
								originY, 
								this.width, 
								this.height);	
		}
	}
}
