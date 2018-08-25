/// Displays a region (sprite sheet) of an image
class Spritesheet extends Drawable{
	constructor(image, sheetRect, x, y, w, h, canDraw = true){
		super(x, y, w, h);
		if (arguments.length < 6) throw new Error('ArgumentError: Wrong number of arguments');
		if (!(image instanceof Image)) throw Ramu.Utils.CustomTypeError(image, Image);

		this.img = image;
		this.setSheet(sheetRect);
		this.canDraw = canDraw;	
	}
	
	setSheet(sheetRect){
		if (!(sheetRect instanceof Rect)) throw Ramu.Utils.CustomTypeError(sheetRect, Rect);

		this.sheet = sheetRect;
	}
	
	setPosition(x, y){
		// why parsefloat? parseint isn't better since it is manipulating a canvas array?
		this.x = parseFloat(x);
		this.y = parseFloat(y);
	}
	
	draw(){					
		let originX = this.flipHorizontally ? -this.width - this.x : this.x;
		// does not work
		let originY = this.flipVertically   ? -this.height - this.y : this.y;

		if (!Ramu.Utils.imageIsLoaded(this.img)){
			Ramu.ctx.fillRect(originX, originY, this.width, this.height); // Draw a black rect instead of image
			return;
		}
		
		Ramu.ctx.imageSmoothingEnabled = false;
		Ramu.ctx.drawImage(this.img, this.sheet.x, this.sheet.y, this.sheet.width, this.sheet.height, 
					originX, originY, this.width, this.height);
	}
}
