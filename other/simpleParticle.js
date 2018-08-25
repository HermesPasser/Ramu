class SimpleParticle extends GameObj{
	constructor(img, rect, lifeSpan, particleNumber){
		super(rect.x, rect.y, rect.width, rect.height);
		if (arguments.length != 4) throw new Error('ArgumentError: Wrong number of arguments');
		
		this.drawPriority = Ramu.drawLastPriority++;
		this.particleNumber = particleNumber / 2;
		this.particle = img;
		this.destroyOnEnd = false;
		this.lifeSpan = lifeSpan;
	}
	
	start(){
		this.particles = [];
		this.isOver = true;
		this.alreadyPlayed = false;
		Ramu.callSortDraw = true;
		for (let i = 0; i < this.particleNumber; ++i){
			this.particles[i] = new Sprite(this.particle, this.x, this.y, this.width, this.height, false);
			this.particles[i].drawPriority = this.drawPriority;
			this.particles[i].tag = 'particle-sprite';
		}
	}
	
	init(){
		if (!this._start_was_called){
			console.warn("The update was not called yet,")
			this.start();
			this._start_was_called = true;
		}
		
		for (let i = 0, len = this.particles.length; i < len ; ++i){
			this.particles[i].canDraw = true;
			this.particles[i].opacity = 1;
		}

		this.currentTimeToFall = 0;
		this.currentLife = 0;
		this.isOver = false;		
	}
	
	setDrawPriority(priority){
		Ramu.callSortDraw = true;
		this.drawPriority = priority;

		for (let i = 0, len = this.particles.length; i < len; ++i)
			this.particles[i].drawPriority = priority;	
	}
	
	setPosition(x, y){
		this.x = x;
		this.y = y;
		
		// if (this.isOver)
		this.resetPosition();
	}
		
	setActive(bool){
		super.setActive(bool);
		for (let i = 0, len = this.particles.length; i < len ; ++i)
			this.particles[i].setActive(bool);
	}
	
	update(){
		if (this.isOver)
			return;
			
		this.currentTimeToFall >= this.currentLife / 2 ? this.move(this.particleNumber) : this.move(this.particleNumber / 2);
		this.currentLife += Ramu.time.delta;
				
		if (this.currentLife > this.lifeSpan){
			for (let i = 0; i < this.particles.length ; i++)
				this.particles[i].opacity -= 0.07;
		}
		
		if (this.particles[0].opacity <= 0){
			this.isOver = true;
			this.alreadyPlayed = true;
			
			if (this.destroyOnEnd)
				this.destroy();
			else this.resetPosition();
		}
	}
	
	resetPosition(){
		for (let i = 0, len = this.particles.length; i < len; ++i){
			this.particles[i].x = this.x;
			this.particles[i].y = this.y;			
			this.particles[i].canDraw = false;
		}
	}
	
	destroy(){
		this.canUpdate = false;
		// i commented this because this break something, but the sprites must be removed anyway. Gotta go figure out other way to destroy objects
		// for (let i = 0; i < this.particles.length; i++)
			// this.particles[i].destroy();
		
		// this.particles = null;
		// this.particle.destroy();
		
		// its no use, the image is a ramu object
		this.particle = null;
		super.destroy();
	}
	
	random(max, min){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	move(vel){
		for (let i = 0, len = this.particles.length; i < len ; i++){
			let x = this.random(-vel, vel);
			let y = this.random(-vel, vel);
			this.particles[i].x += x * Ramu.time.delta;
			this.particles[i].y += y * Ramu.time.delta;
		}	
	}
}
