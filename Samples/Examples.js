class AnimatedRect extends SimpleRectCollisor{
	constructor(x,y,width,height){
		super(x,y, width, height);
		this.forceX = 3;
		this.forceY = 3;
	}
	
	draw(){
		ctx.strokeRect(this.x, this.y, this.width, this.height);
	}
	
	onUpdate(){
		if (this.x <= 0 || this.x >= canvas.width - this.width)
			this.forceX = -(this.forceX);
		
		if (this.y <= 0 || this.y >= canvas.height - this.height)
			this.forceY = -(this.forceY);
		
		this.x += this.forceX;
		this.y += this.forceY;
	}
	
	onCollision(){
		this.forceX = -(this.forceX + (Math.random() * 3));
		this.forceY = -(this.forceY + (Math.random() * 3));
		
		if (this.forceX < -10 || this.forceX > 10)
			this.forceX = 1;
		
		if (this.forceY < -10 || this.forceY > 10)
			this.forceY = 1;
	}
}

class MovingChar extends SimpleRectCollisor{
	constructor(x,y,width,height){
		super(x,y, width, height);
		this.die = false;
	}
	
	draw(){
		super.draw();
		if (this.die) ctx.fillText("*Died*",this.x, this.y);
	}
	
	onUpdate(){
		if (this.die) return;
		super.onUpdate();
		this.canDraw = true;
		
		if (lastKeyPressed == 97) // A
			this.x -= 1;
		else if (lastKeyPressed == 100) // D
			this.x += 1;
			
		if (lastKeyPressed == 115) // S
			this.y += 1;
		else if (lastKeyPressed == 119) // W
			this.y -= 1;
	}
	
	onCollision(){
		if (!this.die){
			this.width--;
			this.height--;
		}	
		
		if (this.width == 0 && this.height == 0){
			this.die = true;
			this.canCollide = false;
		}
	}
}