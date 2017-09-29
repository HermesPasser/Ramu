// Player Control by Hermes Passer in 09-19-17 using Ramu 0.5.1
var state = { idle: 0, run: 1, jump: 2, rouch: 3, climb_idle: 4, climb: 4 },
	current 		   = state.idle,
	vel 			   = 60,
	trueHeight 		   = 50,
	timeToShot 		   = 0.2,
	currentTimeToShot  = 0,
	currentPixelToJump = 0,
	pixelsToJump 	   = 100;
	gravityVel 		   = 15,
	inJump 			   = false,
	potatoDir		   = "img/potato.png",
	lightningDir	   = "lightning.png",
	lumDir	   		   = "lum-rip-by-rojimenez.png";
	
class Player extends GameObj{
	constructor(x, y, width, height){
		super(x,y);
		
		// Create because GameObj doesn't contains width and height
		this.width  = width;
		this.height = height;
		
		// Colliders to detect collision
		this.mainCol = new SimpleRectCollisor(x, y, width, height);

		this.anim = {};
		this.inGround = false;
	}
	
	addAnimation(nameID, animation){
		animation.x = this.x;
		animation.y = this.y;
		animation.canDraw = false;
		this.anim[nameID] = animation;
	}
	
	setCurrentAnimation(nameID){
		for (var key in this.anim)
			this.anim[key].canDraw = false;
		
		if (this.anim[key] != null)
			this.anim[nameID].canDraw = true;
	}
	
	setFlipHorizontally(bool){
		for (var key in this.anim)
			this.anim[key].flipHorizontally = bool;
	}
	
	setFlipVertically(bool){
		for (var key in this.anim)
			this.anim[key].flipVertically = bool;
	}
	
	setX(x){
		for (var key in this.anim)
			this.anim[key].x = x;
		this.mainCol.x 	= x;
		this.x = x;
	}
	
	setY(y){
		for (var key in this.anim)
			this.anim[key].y = y;
		this.mainCol.y  = y;
		this.y = y;
	}	
	
	addX(x){
		for (var key in this.anim)
			this.anim[key].x += x;
		this.mainCol.x  += x;
		this.x += x;
	}
	
	addY(y){
		for (var key in this.anim)
			this.anim[key].y += y;
		this.mainCol.y  += y;
		this.y += y;
	}
	
	update(){
		if (this.x > canvas.width)
			this.setX(-this.width - 1);
		else if (this.x < -this.width)
			this.setX(canvas.width);
		
		// Gravity
			
		var g = gravityVel * Ramu.time.delta;
		this.addY(g);
		
		for (var i = 0; i < this.mainCol.collision.length; i++){
			if (this.mainCol.collision[i].tag == "ground"){
				this.addY(-g);
			}
		}
	}
}

class Lightning extends GameObj{
	constructor(x, y){
		super(x,y);	
		this.width  = 16;
		this.height = 6;
		this.coll = new SimpleRectCollisor(x, y, this.width, this.height);
		this.sprite = new GameSprite(lightningDir, x, y, this.width, this.height);
		this.directionIsRight = true;
		this.tag = "shot";
	}
	
	destroy(){
		this.sprite.destroy();
		this.coll.destroy();
		super.destroy();
	}
	
	update(){
		// Moviment force
		var force = 120 * Ramu.time.delta;
		
		// Change the direction if directionIsRight is true
		if (this.directionIsRight)
			force = -force;
		
		// Move
		this.x += force;
		this.sprite.x += force;
		this.coll.x += force; 

		// Kill the enemy if collide // implementar inimigo
		for (var i = 0; i < this.coll.collision.length; i++){
			if (this.coll.collision[i].tag == "enemy"){
				this.coll.collision[i].applyDamage(10);
				this.destroy();					
			}
		}
		
		// Destroy when is out of the canvas
		if (this.x < -this.width || this.x > canvas.width)
			this.destroy();
		
	}
}

class Enemy extends SimpleRectCollisor{
	constructor(x, y){
		super(x,y,61,61);	
		this.sprite = new GameSprite(potatoDir, x, y, this.width, this.height);
		this.health = 100;
		this.tag = "enemy";
	}
		
	destroy(){
		this.sprite.destroy();
		super.destroy();
	}
	
	applyDamage(damage){
		this.health -= damage;
		if (this.health < 1)
			this.destroy();
	}
	
	onCollision(){
		for (var i = 0; i < this.collision.length; i++){
			if (this.collision[i].tag == "ground"){
				let g = gravityVel * Ramu.time.delta;
				g = -g;
				this.y += g;
				this.sprite.y += g;			
			}
		}
	}
	
	update(){
		var g = gravityVel * Ramu.time.delta;
		
		this.y += g;
		this.sprite.y += g;

	}
}

class MyGame extends GameObj{
	
	start(){
		Ramu.debugMode = true;

		// Animation
		
		var lum_idle = new SpritesheetAnimation(lumDir, 40, 40, 25, 50);
		lum_idle.addFrame(new Rect(0,0,25,50));
		
		var lum_run = new SpritesheetAnimation(lumDir, 80, 40, 25, 50);
		lum_run.addFrame(new Rect(0,0,25,50));
		lum_run.addFrame(new Rect(25,0,25,50));
		lum_run.addFrame(new Rect(50,0,25,50));
		lum_run.animationTime = 0.2;
		
		var lum_jump = new SpritesheetAnimation(lumDir, 140, 40, 25, 50);
		lum_jump.addFrame(new Rect(75,0,25,50));
		lum_jump.addFrame(new Rect(101,0,25,50));
		lum_jump.animationTime = 1;
		lum_jump.playInLoop = false;
		
		var lum_climb_idle = new SpritesheetAnimation(lumDir, 180, 40, 25, 50);
		lum_climb_idle.addFrame(new Rect(125,0,25,50));
		
		var lum_climb = new SpritesheetAnimation(lumDir, 180, 40, 25, 50);
		lum_climb.addFrame(new Rect(125,0,25,50));
		lum_climb.addFrame(new Rect(151,0,25,50));
		lum_climb.animationTime = 0.2;
		
		var lum_crouch = new SpritesheetAnimation(lumDir, 200, 40, 25, 50);
		lum_crouch.addFrame(new Rect(175,0,25,50));
		
		// Enemy
	
		new Enemy(100, 300, 55, 55);
	
		// Ground
		
		var ground = new SimpleRectCollisor(1,400, 400, 1);
		ground.tag = "ground"; 
		
		// Player
		
		this.lum = new Player(300,300,25,trueHeight);
		this.lum.addAnimation("idle", lum_idle);
		this.lum.addAnimation("run", lum_run);
		this.lum.addAnimation("jump", lum_jump);
		this.lum.addAnimation("climb_idle", lum_climb_idle);
		this.lum.addAnimation("climb", lum_climb);
		this.lum.addAnimation("rouch", lum_crouch);
		this.lum.setCurrentAnimation("idle");
	}
	
	update(){
		
		// ===== Player Control ===== //
		
		currentTimeToShot += Ramu.time.delta;
		
		if (inJump){
			currentPixelToJump++;
			
			if (currentPixelToJump >= pixelsToJump){
				inJump = false;
				currentPixelToJump = 0;
			} else  this.lum.addY(-(30 * Ramu.time.delta));		
		}
		
		switch(current){
			case state.idle:  this.lum.setCurrentAnimation("idle");
				break;
			case state.run:   this.lum.setCurrentAnimation("run");
				break;
			case state.rouch: this.lum.setCurrentAnimation("rouch");
				break;
			case state.climb_idle: this.lum.setCurrentAnimation("climb_idle");	
				break;
		}
			
		// Shot
		if (keyCode.e in Ramu.lastKeysPressed && currentTimeToShot >= timeToShot){	
			if (this.lum.anim["idle"].flipHorizontally){
				var l = new Lightning(this.lum.x + 27, this.lum.y + 15);
				l.directionIsRight = false;
				
			} else new Lightning(this.lum.x - 17, this.lum.y + 15);
			
			currentTimeToShot = 0;
		}

		// Jump
		if (keyCode.space in Ramu.pressedKeys && !inJump){
			for (var i = 0; i < this.lum.mainCol.collision.length; i++){
				if (this.lum.mainCol.collision[i].tag == "ground"){ // To not do double jump
					this.lum.setCurrentAnimation("jump");
					current = state.jump;
					inJump = true;
					
					if (this.lum.anim["jump"].animationIsOver)
						this.lum.anim["jump"].reset();	
				}
			}	
		}
		
		// Climb idle
		if (keyCode.w in Ramu.pressedKeys && !inJump){
			current = state.climb_idle;
			
			// Climb
			if (keyCode.a in Ramu.pressedKeys){
				current = state.climb;
				this.lum.setCurrentAnimation("climb");	
				this.lum.addX(-(vel * Ramu.time.delta));
				this.lum.setFlipHorizontally(false);
			} else if (keyCode.d in Ramu.pressedKeys){
				current = state.run;
				this.lum.setCurrentAnimation("climb");
				this.lum.addX(vel * Ramu.time.delta);
				this.lum.setFlipHorizontally(true);
			}
		}
		
		// Run
		else if (keyCode.a in Ramu.pressedKeys){
			this.lum.addX(-(vel * Ramu.time.delta));
			this.lum.setFlipHorizontally(false);
			
			if (!inJump){
				for (var i = 0; i < this.lum.mainCol.collision.length; i++){
					if (this.lum.mainCol.collision[i].tag == "ground") // To not run in the air
						current = state.run;
				}
			}
		}
			
		else if (keyCode.d in Ramu.pressedKeys){
			this.lum.addX(vel * Ramu.time.delta);
			this.lum.setFlipHorizontally(true);
			
			if (!inJump){
				for (var i = 0; i < this.lum.mainCol.collision.length; i++){
					if (this.lum.mainCol.collision[i].tag == "ground") // To not run in the air
						current = state.run;
				}
			}
		}
		
		// Rouch
		else if (keyCode.s in Ramu.pressedKeys && !inJump){			
			current = state.rouch;
			this.lum.mainCol.height = trueHeight/2 + 10;
			this.lum.mainCol.y = this.lum.y + 15;
		} else {
			if (!inJump){
				current = state.idle;
			}
		}
		
		this.lum.mainCol.height = trueHeight;
		this.lum.mainCol.y = this.lum.y;
	}
}

new MyGame(0,0,0,0);
Ramu.init(); 
