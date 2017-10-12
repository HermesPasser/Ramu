// Spritesheet Animator and Player Control by Hermes Passer in 09-19-17 using Ramu 0.5.1
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
	groundDir    	   = "img/ground.png",
	lightningDir	   = "img/lightning.png",
	lumDir	   		   = "img/lum-rip-by-rojimenez.png";
// diminuir collider no pulo

class Player extends SpritesheetAnimator{
	constructor(x, y, width, height){
		super(x, y, width, height);
		this.mainCol = new SimpleRectCollisor(x, y, width, height);
		this.inGround = false;
	}
	
	setX(x){
		super.setX(x);
		this.mainCol.x 	= x;
		this.x = x;
	}
	
	setY(y){
		super.setY(y);
		this.mainCol.y  = y;
		this.y = y;
	}	
	
	addX(x){
		super.addX(x);
		this.mainCol.x  += x;
		this.x += x;
	}
	
	addY(y){
		super.addY(y);
		this.mainCol.y  += y;
		this.y += y;
	}
	
	update(){
		if (this.x > canvas.width)
			this.setX(-this.width - 1);
		else if (this.x < -this.width)
			this.setX(canvas.width);
		
		if (this.y > canvas.height) this.setY(canvas.height)
		
		// Gravity
				
		var g = gravityVel * Ramu.time.delta;
		this.addY(g);
		
		for (var i = 0; i < this.mainCol.collision.length; i++){
			if (this.mainCol.collision[i].tag == "ground"){
				this.addY(-g);
			}
		}
	}
	
	destroy(){
		super.destroy();
		this.mainCol.destroy();
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
	
	//add
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
	
	//add
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
		
		let lumImg = RamuUtils.getImage(lumDir);
		
		var lum_idle = new SpritesheetAnimation(lumImg, 40, 40, 25, 50);
		lum_idle.addFrame(new Rect(0,0,25,50));
		
		var lum_run = new SpritesheetAnimation(lumImg, 80, 40, 25, 50);
		lum_run.addFrame(new Rect(0,0,25,50));
		lum_run.addFrame(new Rect(25,0,25,50));
		lum_run.addFrame(new Rect(50,0,25,50));
		lum_run.animationTime = 0.2;
		
		var lum_jump = new SpritesheetAnimation(lumImg, 140, 40, 25, 50);
		lum_jump.addFrame(new Rect(75,0,25,50));
		lum_jump.addFrame(new Rect(101,0,25,50));
		lum_jump.animationTime = 1;
		lum_jump.playInLoop = false;
		
		var lum_climb_idle = new SpritesheetAnimation(lumImg, 180, 40, 25, 50);
		lum_climb_idle.addFrame(new Rect(125,0,25,50));
		
		var lum_climb = new SpritesheetAnimation(lumImg, 180, 40, 25, 50);
		lum_climb.addFrame(new Rect(125,0,25,50));
		lum_climb.addFrame(new Rect(151,0,25,50));
		lum_climb.animationTime = 0.2;
		
		var lum_crouch = new SpritesheetAnimation(lumImg, 200, 40, 25, 50);
		lum_crouch.addFrame(new Rect(175,0,25,50));
		
		// Enemy
	
		new Enemy(300, 300, 55, 55);
		
		// uma lum interfere noutra bugando tudo.
		// talvez porque seja a mesma referencia, tentar 
		// copiar a animação e ver se vai
		// se for add no metodo de que ele faça uma copia e
		// nao passe diretamente	
		// aparentemente é isso mesmo
		// this.lumenemy = new EnemyBase(300,300,25,50);
		// this.lumenemy.addAnimation("idle", lum_idle);
		// this.lumenemy.addAnimation("run", lum_run);
		// this.lumenemy.setCurrentAnimation("idle");
	
		// Ground
		
		this.g0 = new GameSprite(groundDir,1,450,200,50);
		this.g1 = new SimpleRectCollisor(-50,450,250,50);
		this.g0.drawPriority = 0;
		this.g1.tag = "ground";
		
		this.g0 = new GameSprite(groundDir,250,450,500,50);
		this.g0.drawPriority = 0;
		this.g2 = new SimpleRectCollisor(250,450,5000,50);
		this.g2.tag = "ground";
		
		// Player
		
		this.lum = new Player(100,300,25,trueHeight);
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
		
		// impedir que se abaixe fora do chao
		// para isso é so fazer que injump seja true se ele nao estiver no chao
		
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
			} else {
			}
		}
		
		//dentro do else ele diminui, ele não retorna ao normal se outra tecla for apertada
		// então deve ficar aqui fora.
		// isso seria resolvido setando para abaixar em keydown
		// e botar no lugar novamene em keyup
				this.lum.mainCol.height = trueHeight;
				this.lum.mainCol.y = this.lum.y;
	}
}

new MyGame(0,0);
Ramu.init(); 
