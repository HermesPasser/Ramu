// Potato Atack by Hermes Passer in 09-12-27 using Ramu 0.2

class AnimatedCollisor extends SimpleRectCollisor{
	constructor(x,y,w,h){
		super(x,y, w, h);
		this.forceX = 5;
		this.forceY = -5;
	}
	
	onCollision(){
		this.forceX = -(this.forceX);
		this.forceY = -(this.forceY);
	}
}

class StaticRect extends GameObj{
	constructor(x,y,w,h){
		super(x,y, w, h);	
		this.collider = new AnimatedCollisor(x, y, w, h);
		this.sprite = new GameSprite("img/potato.png", x, y, w, h);
		this.sprite.canDraw = false;
	}
}

class AnimatedRect extends Drawable{
	constructor(x,y,w,h){
		super(x, y, w, h, false);	
		this.collider = new AnimatedCollisor(x, y, w, h);
		this.sprite = new GameSprite("img/potato.png", x, y, w, h);
		this.sprite.forceX = Math.floor(Math.random() * 10) - 5
		this.sprite.forceY = Math.floor(Math.random() * 10) - 5;
		this.sprite.canDraw = false;
	}
	
	update(){
		if (this.x <= 0 || this.x >= canvas.width - this.width){
			this.collider.forceX = -(this.collider.forceX);
		}
		if (this.y <= 0 || this.y >= canvas.height - this.height){
			this.collider.forceY = -(this.collider.forceY);
		}

		this.x += this.collider.forceX;
		this.y += this.collider.forceY;
		this.sprite.x += this.collider.forceX;
		this.sprite.y += this.collider.forceY;
		this.collider.x += this.collider.forceX;
		this.collider.y += this.collider.forceY;
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
		else ctx.strokeRect(this.x, this.y, this.width, this.height);
	}
	
	update(){
		console.log(Ramu.lastKeyPressed)
		if (this.die) 
			return;
		
		super.update();
		
		this.canDraw = true;
		var value = 2 * Ramu.time.delta;
		
		if (Ramu.lastKeyPressed == 97 || Ramu.lastKeyPressed == keyCode.a){ 		// A
			this.x -= 2 * Ramu.time.delta;
		} else if (Ramu.lastKeyPressed == 100 || Ramu.lastKeyPressed == keyCode.d){ // D
			this.x += 2	* Ramu.time.delta;
		}else if (Ramu.lastKeyPressed == 115){ // S
			this.y += 2 * Ramu.time.delta;
		} else if (Ramu.lastKeyPressed == 119){ // W
			this.y -= 2 * Ramu.time.delta;
		}
		
		if (this.x <= 0)
			this.x = canvas.width - this.width;
		else if (this.x >= canvas.width)
			this.x = this.width;
		
		if (this.y <= 0){
			this.y = canvas.height - this.height;
		} else if (this.y >= canvas.height){
			this.y = this.height;
		}
		
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

class MyGame extends Drawable{
	start(){
		Ramu.inLoop = false;
		
		this.block1 = new StaticRect(300, 50, 50, 50);
		this.block2 = new StaticRect(200, 300, 50, 50);
		
		this.option = [0, 1, 2];
		this.state = { menu: 0, game: 1, gameOver: 2 };
		this.reset();
				
		this.w = canvas.width / 2 - 35;
		this.h = canvas.height / 2 - 50;
		
		this.gradient = ctx.createLinearGradient(0,0,canvas.width,0);
		this.gradient.addColorStop("0","red");
		this.gradient.addColorStop("0.5","blue");
		this.gradient.addColorStop("0.8","green");
	}
		
	readInput(){
		if (Ramu.lastKeyPressed == 115) // S
			this.currOp = (this.currOp + 1) % this.option.length
		else if (Ramu.lastKeyPressed == 119) // W
			this.currOp = this.currOp - 1 <= -1 ? this.option.length - 1 : this.currOp - 1;
		else if (Ramu.lastKeyPressed == 13){ // Enter
			if (this.currState == this.state.gameOver){
				this.character.destroy();
				this.currState = this.state.menu;
				this.reset();
			} else {
				switch(this.currOp){
					case 0:
						this.currState = this.state.game;
						break;
					case 1:
						Ramu.debugMode = !Ramu.debugMode;
						break;
					case 2:
						break;
				}
			}
		}
	}
	
	reset(){
		this.character = new MovingChar(canvas.width/2 - 25,canvas.height/2 - 25, 50, 50);
		this.enemy1 = new AnimatedRect(Math.floor(Math.random() * canvas.width - 70), 
			Math.floor(Math.random() * canvas.height - 70), 70, 70);
			
		this.enemy2 = new AnimatedRect(Math.floor(Math.random() * canvas.width - 70),
			Math.floor(Math.random() * canvas.height - 70), 40, 70);
			
		this.enemy1.sprite.canDraw = false;
		this.enemy2.sprite.canDraw = false;
		this.block1.sprite.canDraw = false;
		this.block2.sprite.canDraw = false;
		
		this.currOp = 0;
		this.currState = this.state.menu;
	}
	
	update(){
		if (this.character.die){
			this.currState = this.state.gameOver;
			this.currOp = 0;
		}
	}
	
	draw(){
		ctx.fillStyle = this.gradient;
	
		this.readInput();		
		switch(this.currState){
			case this.state.menu:			
				ctx.font="30px Verdana";
				ctx.fillText("img/potato Attack", this.w - 65, this.h - 50);
			
				ctx.font="13px Arial";
				ctx.strokeStyle = this.currOp == 0 ? "red" : "black";
				ctx.strokeText("Start", this.w, this.h);
				
				ctx.strokeStyle = this.currOp == 1 ? "red" : "black";
				ctx.strokeText("Run in debug mode: " + Ramu.debugMode, this.w, this.h + 20);
				
				ctx.strokeStyle = this.currOp == 2 ? "red" : "black";
				ctx.strokeText("Empty option", this.w, this.h + 40);
				
				ctx.strokeStyle = "black";
				ctx.strokeText("up = w", 1,    canvas.height - 65);
				ctx.strokeText("down = s", 1,  canvas.height - 45);
				ctx.strokeText("left = s", 1,  canvas.height - 25);
				ctx.strokeText("right = d", 1, canvas.height - 5);
				ctx.strokeText("Hermes Passer - 2017", this.w - 30, canvas.height - 5);
				break;
			case this.state.game:
				this.character.canDraw = true;
				this.enemy1.sprite.canDraw = true;
				this.enemy2.sprite.canDraw = true;
				this.block1.sprite.canDraw = true;
				this.block2.sprite.canDraw = true;
				Ramu.inLoop = true;

				break;
			case this.state.gameOver:
				Ramu.inLoop = false;
				
				ctx.font="30px Verdana";
				ctx.fillText("Game Over", this.w - 50, this.h - 50);
			
				ctx.font="13px Arial";
				ctx.strokeStyle = "red";
				ctx.strokeText("return to main menu", this.w, this.h);
				break;
		}
	}
}
	
new MyGame(0,0,0,0);

Ramu.init();
