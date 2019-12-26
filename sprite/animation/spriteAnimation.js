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
		
	_addArrayOfFrames(images) {
		for (let i = 0, len = images.length; i < len; ++i) {
			const currImg = images[i];
			if(!currImg instanceof Image)
				throw new Error('TypeError: Array item ${i} is not an Image');
			
			this.frames.push(currImg);
		}	
	}
	
	addFrame(obj) { 
		if(arguments.length !== 1)
			throw new Error('ArgumentError: Wrong number of arguments');
		
		if(Array.isArray(obj)){
			this._addArrayOfFrames(obj);
		} else if(obj instanceof Image){
			this.frames.push(obj);
		} else {
			throw new Error('TypeError: obj must be an Image or an array of Images');
		}
	}
	
	reset(){
		this.animationIsOver = false;
		this.currentFrame = 0;
		this.currentTime  = 0;
	}
	
	update(){
		const len = this.frames.length;
		if (this.animationPause) return;
		if (this.currentFrame == len - 1){
			this.animationIsOver = true;
			if (!this.playInLoop) return;
			
		} else this.animationIsOver = false;
		
		this.currentTime += Ramu.time.delta;
		if (len > 0 && this.currentTime > this.animationTime){ 
			this.currentFrame = (this.currentFrame + 1) % len;
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
