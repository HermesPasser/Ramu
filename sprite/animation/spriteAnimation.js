/// Displays an animation that uses various images
class SpriteAnimation extends Drawable{
	constructor(x, y, width, height){
		super(x, y, width, height, true);
		if (arguments.length != 4) throw new Error('ArgumentError: Wrong number of arguments');
		this.frames 		 = [];
		this.currentFrame 	 = 0;
		this.currentTime 	 = 0;
		this.animationTime 	 = 2;
		this.animationPause  = false;
		this.animationIsOver = false;
		this.playInLoop 	 = true;
	}
	
	addFrame(img){ 
		if(void 0 === img || arguments.length != 1)
			throw new Error('ArgumentError: Wrong number of arguments');
		
		if(Array.isArray(img)){
			for (let i = 0; i < img.length; i++) {
				if(!img[i] instanceof Image)
					throw Ramu.Utils.CustomTypeError(img, img);
				
				this.frames.push(img[i]);
			}
			return;
		} else if(img instanceof Image){
			if(!img instanceof Image)
				throw Ramu.Utils.CustomTypeError(img, img);
			
			this.frames.push(img);
			return;
		}

		throw Ramu.Utils.CustomTypeError(img, Image);
	}
	
	reset(){
		this.animationIsOver = false;
		this.currentFrame = 0;
		this.currentTime  = 0;
	}
	
	update(){
		if (this.animationPause) return;
		if (this.currentFrame == this.frames.length - 1){
			this.animationIsOver = true;
			if (!this.playInLoop) return;
			
		} else this.animationIsOver = false;
		
		this.currentTime += Ramu.time.delta;
		if (this.frames.length > 0 && this.currentTime > this.animationTime){ 
			this.currentFrame = (this.currentFrame + 1) % this.frames.length;
			this.currentTime = 0;
		} 
	}
		
	draw(){
		let originX = this.flipHorizontally ? -this.width - this.x : this.x;
		let originY = this.flipVertically   ? -this.height - this.y : this.y;
		
		if (this.frames.length > 0){
			if (!Ramu.Utils.imageIsLoaded(this.frames[this.currentFrame])){
				Ramu.ctx.fillRect(originX, originY, this.width, this.height); // Draw a black rect instead of image
				return;
			}
			
			Ramu.ctx.imageSmoothingEnabled = false;
			Ramu.ctx.drawImage(this.frames[this.currentFrame], originX, originY, this.width, this.height);
		}
	}
}
