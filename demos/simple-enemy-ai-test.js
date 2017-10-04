// Simple Enemy A.I Test by Hermes Passer in 09-19-17 using Ramu 0.4

var FORCE = 100;
var FORCEX = 100;
var RANGE = 50;
var VEL = 4;
var LUMDIR = "img/lum-rip-by-rojimenez.png";
var GROUDNDIR = "img/ground.png";

class EnemyBase extends SpritesheetAnimator{
	constructor(x, y, width, height){
		super(x,y, width, height);
		this.health = 100;
		this.tag = "enemy";
		
		// Colliders to detect collision
		this.mainCol      = new SimpleRectCollisor(x, y, width, height);
		this.leftSensor   = new SimpleRectCollisor(x - width + 15 , y + height, 10, 10);
		this.rightSensor  = new SimpleRectCollisor(x + width , y + height, 10, 10);
		
		this.inGround = false;
	}
	
	destroy(){
		this.mainCol.destroy();
		this.leftSensor.destroy();
		this.leftSensor.destroy();
		this.rightSensor.destroy();
		super.destroy();
	}
	
	applyDamage(damage){
		this.health -= damage;
		if (this.health < 1)
			this.destroy();
	}
	
	setX(x){
		super.setX(x);
		this.mainCol.x 	= x;
		this.leftSensor.x  = x - this.width + 15;
		this.rightSensor.x = x + this.width;
		this.x = x;
	}
	
	setY(y){
		super.setY(y);
		this.mainCol.y  = y;
		this.leftSensor.y 	= y;
		this.rightSensor.y = y;
		this.y = y;
	}	
	
	addX(x){
		super.addX(x);
		this.mainCol.x  += x;
		this.leftSensor.x 	+= x;
		this.rightSensor.x += x;
		this.x += x;
	}
	
	addY(y){
		super.addY(y);
		this.mainCol.y  += y;
		this.leftSensor.y 	+= y;
		this.rightSensor.y += y;
		this.y += y;
	}
	
	update(){
		if (this.x > canvas.width)
			this.setX(-this.width - 1);
		else if (this.x < -this.width)
			this.setX(canvas.width);
		
		if (this.mainCol.InCollision) {
			for (var i = 0; i < this.mainCol.collision.length; i++){
				if (this.mainCol.collision[i].tag == "ground")
					this.inGround = true;
			}
		}
	
		if (!this.leftSensor.InCollision || !this.rightSensor.InCollision) {	
			FORCEX = -FORCEX
		} 
		
		// Gravity system
		if (!this.mainCol.InCollision) this.inGround = false;
		if (!this.inGround) this.addY(FORCE * Ramu.time.delta);
		
		// Move System		
		if (this.inGround) this.addX((FORCEX * Ramu.time.delta));
		
	}
}

class MyGame extends GameObj{
	start(){
		Ramu.debugMode = true;
		
		// Animation
		
		var lum_idle = new SpritesheetAnimation(LUMDIR, 40, 40, 25, 50);
		lum_idle.addFrame(new Rect(0,0,25,50));
		
		// var lum_run = new SpritesheetAnimation(LUMDIR, 80, 40, 25, 50);
		// lum_run.addFrame(new Rect(0,0,25,50));
		// lum_run.addFrame(new Rect(25,0,25,50));
		// lum_run.addFrame(new Rect(50,0,25,50));
		// lum_run.animationTime = 0.2;
		
		// Enemy
		
		this.lum = new EnemyBase(300,300,25,50);
		this.lum.addAnimation("idle", lum_idle);
		// this.lum.addAnimation("run", lum_run);
		this.lum.setCurrentAnimation("idle");
	
		// Ground

		var s = new GameSprite(GROUDNDIR,1,450,200,50);
		s.drawPriority = 0;
		this.g1 = new SimpleRectCollisor(-50,450,250,50);
		this.g1.tag = "ground";
		
		var s = new GameSprite(GROUDNDIR,250,450,500,50);
		s.drawPriority = 0;
		this.g2 = new SimpleRectCollisor(250,450,5000,50);
		this.g2.tag = "ground";
	}
}

new MyGame(0,0,0,0);
Ramu.init(); 
