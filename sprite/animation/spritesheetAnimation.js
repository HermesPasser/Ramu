// se eu colocar para ele se mexer em x ou y com algum valor que nao seja inteiro
// e ele tiver setado para girar o sprite em vertical ou horizontal
// ele desenha parte fora do sprite
// isso acontece mesmo se a animação tiver um frame

/// Displays an animation that uses various sprite sheets of a single image
class SpritesheetAnimation extends SpriteAnimation{
	constructor(img, x, y, width, height){
		super(x, y, width, height);
		if (arguments.length != 5) throw new Error('ArgumentError: Wrong number of arguments');
		if (!(img instanceof Image)) throw new Error('TypeError: img must be a Image instance');

		this.img = img;
	}
	
	addFrame(rect){
		// multi frame support by github.com/Kawtmany
		if(void 0 === rect || arguments.length != 1)
			throw new Error('ArgumentError: Wrong number of arguments');
		
		if(Array.isArray(rect)){
			for (let i = 0, len = rect.length; i < len; ++i){
				const r = rect[i];
				
				if(!r instanceof Rect)
					throw new Error('TypeError: rect must be a Rect instance');
				
				if (Rect.hasNegativeValueInXY(r))
					throw new Error('ArgumentOutOfRangeError: The rect position cannot be negative.');
				
				this.frames.push(r);			
			}
			
			return;
		} else if(rect instanceof Rect){
			if(!rect instanceof Rect)
				throw new Error('TypeError: rect must be a Rect instance');
			
			if (Rect.hasNegativeValueInXY(rect))
				throw new Error('ArgumentOutOfRangeError: The rect position cannot be negative.');
			
			this.frames.push(rect);
			return;
		}

		throw new Error('TypeError: rect must be a Rect instance');
	}
	
	draw(){
		// o problema deve estar aqui
		const originX = this.flipHorizontally ? -this.width - this.x : this.x;
		const originY = this.flipVertically   ? -this.height - this.y : this.y;
		const rect    = this.frames[this.currentFrame];
		const loaded  = Ramu.Utils.imageIsLoaded(this.img);
		
		//Draw
		if (this.frames.length > 0){
			if (loaded && (rect.width > this.img.width || rect.height > this.img.height))
				throw new Error('The rect size cannot be greater than the image size.');
			
			if (!loaded){
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
