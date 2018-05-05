/// Displays an entire image
class Sprite extends Drawable{
	constructor(img, x, y, w, h, canDraw = true){
		super(x, y, w, h);
		if (arguments.length < 5) throw new Error('ArgumentError: Wrong number of arguments');
		if (!(img instanceof Image)) throw RamuUtils.CustomTypeError(img, Image);

		this.img = img;
		this.canDraw = canDraw;	
	}
	
	draw(){
		let originX = this.flipHorizontally ? -this.width - this.x : this.x;
		let originY = this.flipVertically   ? -this.height - this.y : this.y;
		
		if (!RamuUtils.imageIsLoaded(this.img)){
			Ramu.ctx.fillRect(originX, originY, this.width, this.height); // Draw a black rect instead of image
			return;
		}
		
		//if (this.canDraw)
			Ramu.ctx.imageSmoothingEnabled = false;
			Ramu.ctx.drawImage(this.img, originX, originY, this.width, this.height);
	}
}
