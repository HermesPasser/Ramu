class Panorama extends GameObj{
	constructor(img, x, y, w, h, velocity = 20){
		super(x, y, w, h);
		if (arguments.length < 5) throw new Error('ArgumentError: Wrong number of arguments');
		if (!(img instanceof Image)) throw Ramu.Utils.CustomTypeError(img, Image);

		this.left   = new Sprite(img, x - w, y, w, h);
		this.center = new Sprite(img, x  + w  , y, w, h);
		this.right  = new Sprite(img, x + w, y, w, h);
		this.velocity = velocity;
		this.setDrawPriority(-1);
	}
	
	canDraw(bool){
		if (!(typeof(bool) === 'boolean')) throw Ramu.Utils.CustomTypeError(bool, Boolean);

		this.left.canDraw   = bool;
		this.center.canDraw = bool;
		this.right.canDraw  = bool;
	}
	
	setDrawPriority(num){
		this.left.drawPriority   = parseInt(num);
		this.center.drawPriority = parseInt(num);
		this.right.drawPriority  = parseInt(num);
		Ramu.callSortDraw = true;
	}
	
	update(){
		let vel = this.velocity * Ramu.time.delta;
		this.left.x   += vel;
		this.center.x += vel;
		this.right.x  += vel;
		
		// Left
		if (this.center.x >= Ramu.canvas.width)
			this.center.x = this.right.x - this.right.width;
		
		if (this.right.x >= Ramu.canvas.width)
			this.right.x = this.center.x - this.center.width;
		
		// Right
		if (this.center.x + this.center.width <= 0)
			this.center.x = this.right.width;
		
		if (this.right.x + this.right.width <= 0)
			this.right.x = this.center.width;
	}
	
	setActive(bool){
		super.setActive(bool);
		this.left.setActive(bool);
		this.center.setActive(bool);
		this.right.setActive(bool);
	}
	
	destroy(){
		this.left.destroy();
		delete this.left; //= null;
		this.center.destroy();
		delete this.center; //= null;
		this.right.destroy();
		delete this.right; //= null;
		super.destroy();
	}
}
