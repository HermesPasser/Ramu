// --------------------------------- //
// Ramu 0.3 - Hermes Passer in 08/09 //
//      hermespasser.github.io       //
// blog: gladiocitrico.blogspot.com  //
// --------------------------------- //

var gameObjs	   = [];
var objsToDraw 	   = [];
var objsToCollide  = [];
var drawLastPriority = 0;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

class Ramu{	
	constructor() {
		throw new Error('This is a static class');
	}
	
	static init(){
		Ramu.debugMode = false;
		Ramu.inLoop = true;
		Ramu.time = { last: 0, delta: 0 };
		Ramu.lastKeyPressed = null;
		// Ramu.size = {x: 0, y: 0, w: 0, h: 0};
		
		Ramu.input();
		Ramu.start();
		window.requestAnimationFrame(Ramu.loop);
	}
	
	static input(){
		document.body.onkeypress = function(e) {
			Ramu.lastKeyPressed = (e.keyCode || e.which);
		}
	}

	static loop(){
		// Calcule delta time
		var t = Date.now();
		Ramu.time.delta = t - Ramu.time.last;
		Ramu.time.last = t;
		
		if (Ramu.inLoop){
			Ramu.update();
			Ramu.checkCollision();
		}
		
		Ramu.draw();
		
		// To the input work even with update disbled
		Ramu.lastKeyPressed = null;
		window.requestAnimationFrame(Ramu.loop);
	}
	
	static start(){
		for (var i = 0; i < gameObjs.length; i++)
			gameObjs[i].start();	
	}
	
	static update(){
		for (var i = 0; i < gameObjs.length; i++)
			gameObjs[i].update();	
	}
	
	static checkCollision(){
		for (var i = 0; i < objsToCollide.length; i++)
			objsToCollide[i].checkCollision();
	}
	
	static draw(){	
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		for (var i = 0; i < objsToDraw.length; i++){
			var positionWidth = objsToDraw[i].x + objsToDraw[i].width;		
			var positionHeigh = objsToDraw[i].y + objsToDraw[i].height;
			
			if (positionWidth >= 0 && objsToDraw[i].x <= canvas.width && // Renderiza somente o que esta no canvas
					positionHeigh>= 0 && objsToDraw[i].y <= canvas.height)
				objsToDraw[i].drawInCanvas();
		}
	}
}

class GameObj{
	constructor(x = 0, y = 0){
		this.x = x;
		this.y = y;
		this.tag =  this.tag || "none";
		gameObjs.push(this);
	}
	
	destroy(){
		for (var i = 0; i < gameObjs.length; i++){
			if (gameObjs[i] == this){
				gameObjs.splice(i);
				break;
			}
		}
	} 
	
	start() { } // Virtual
	
	update() { } // Virtual
	
	// onKeypress() { } // Virtual
}

class Drawable extends GameObj{
	constructor(x, y, width, height, canDraw = false){
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.canDraw = true;
		this.drawPriority = drawLastPriority++;
		
		Drawable.addObjt(this)
	}
	
	static addObjt(drawableObj){
		objsToDraw.push(drawableObj);
		
		for (var i = 0; i < objsToDraw.length; i++){
			if (objsToDraw[i] > objsToDraw[i + 1]){
				var temp = objsToDraw[i];
				objsToDraw[i] = objsToDraw[i + 1];
				objsToDraw[i + 1] = temp;
			}
		}
	}
	
	destroy(){
		super.destroy();
		for (var i = 0; i < objsToDraw.length; i++){
			if (objsToDraw[i] == this){
				objsToDraw.splice(i);
				break;
			}
		}
	}
	
	drawInCanvas(){
		if (this.canDraw) this.draw();
	}
	
	draw(){ } // Virtual
}

class Collisor extends Drawable{
	constructor(x, y, width, height){
		super(x,y, width, height);
		this.canCollide = true;
		this.collision = null;
		this.isInCollision = false;
		objsToCollide.push(this);
	}
	
	destroy(){
		super.destroy();
		for (var i = 0; i < objsToCollide.length; i++){
			if (objsToCollide[i] == this){
				objsToCollide.splice(i);
				break;
			}
		}
	}
	
	update(){
		this.canDraw = Ramu.debugMode;
	}
	
	onCollision(){ } // Virtual

	checkCollision(){
		if(!this.canCollide) return;
		
		for (var i = 0; i < objsToCollide.length; i++){
			if (objsToCollide[i] === this || !objsToCollide[i].canCollide) // Para não testar consigo mesmo
				continue;
			
			if (this.x < objsToCollide[i].x + objsToCollide[i].width &&
				   this.x + this.width > objsToCollide[i].x &&
				   this.y < objsToCollide[i].y + objsToCollide[i].height &&
				   this.height + this.y > objsToCollide[i].y){
			
				this.isInCollision = true;
				this.collision = objsToCollide[i];
				this.onCollision();
			} else {
				this.isInCollision = false;
				this.collisor = null;
			}
		}
	}
}

class SimpleRectCollisor extends Collisor{
	// constructor(x, y, width, height){ super(x, y, width, height); }
	
	draw(){
		if (Ramu.debugMode){
			if (!this.isInCollision)
				ctx.strokeStyle = "blue";
			else 
				ctx.strokeStyle = "red";

			ctx.strokeRect(this.x, this.y, this.width, this.height);
			ctx.strokeStyle = "#000000"; // reset default value
		}
	}
}

class GameSprite extends Drawable{
	constructor(url, x, y, w, h, canDraw = true){
		super(x, y, w, h);
		this.img = new Image();
		this.img.src = url;
		this.canDraw = canDraw;	
	}
	
	draw(){
		if (this.canDraw)
			ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
}

class SpriteAnimation extends Drawable{
	constructor(x, y, width, height){
		super(x, y, width, height);
		this.frames 		= [];
		this.animationIndex = 0;
		this.currentTime 	= 0;
		this.animationTime 	= 500;
	}
	
	addFrame(src){
		var img = new Image();
		img.src = src;
		this.frames.push(img);
	}
	
	update(){
		this.currentTime += Ramu.time.delta;
		if (this.frames.length > 0 && this.currentTime > this.animationTime){ 
			this.animationIndex = (this.animationIndex + 1) % this.frames.length;
			this.currentTime = 0;
		} 
	}
	
	draw(){
		if (this.frames.length > 0)
			ctx.drawImage(this.frames[this.animationIndex], this.x, this.y, this.width, this.height);
	}
}