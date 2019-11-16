class Raycast extends Collider{
	constructor(){
		super(1, 1, 1, 1);
		this.started = false;
		this.abort();
	}

	onRaycastEnd(){} // Virtual
	
	init(initX, initY, velocityX, velocityY, lifeTime){
		if (arguments.length != 5) throw new Error('ArgumentError: Wrong number of arguments');

		// To call onRaycastEnd when was aborted
		if (this.started)
			this.onRaycastEnd();
		
		this.x = initX;
		this.y = initY;
		this.initX = initX;
		this.initY = initY;
		this.velocityX = velocityX;
		this.velocityY = velocityY;
		this.lifeTime = lifeTime;
		this.currentTime = 0;
		this.started = true;
	}
	
	abort(){
		this.currentTime = 0;
		this.started = false;
	}
	
	update(){
		if (this.started && this.currentTime >= this.lifeTime){			
			this.onRaycastEnd();
			this.abort();
		}
	
		if (!this.started || this.currentTime >= this.lifeTime)
			return;
		
		if (this.started){			
			super.update();
					
			this.currentTime += Ramu.time.delta;
			this.x += this.velocityX * Ramu.time.delta;
			this.y += this.velocityY * Ramu.time.delta;
		}
	}
	
	draw(){
		if (this.canCollide)
			if (this.isInCollision)
				Ramu.ctx.strokeStyle = "red";
			else Ramu.ctx.strokeStyle = "blue";	
		else Ramu.ctx.strokeStyle = "green";
			
		Ramu.ctx.beginPath();
		Ramu.ctx.moveTo(this.x, this.y);
		Ramu.ctx.lineTo(this.initX, this.initY);
		Ramu.ctx.stroke();

		Ramu.ctx.strokeStyle = "#000000"; // reset to default value
	}
}
