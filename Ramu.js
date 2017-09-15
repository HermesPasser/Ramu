// --------------------------------- //
// Ramu 0.3 - Hermes Passer in 08/09 //
//      hermespasser.github.io       //
// blog: gladiocitrico.blogspot.com  //
// --------------------------------- //

// criar scenario com plataformas que se mechem
// e parallax

var gameObjs	   = [];
var objsToDraw 	   = [];
var objsToCollide  = [];
var drawLastPriority = 0;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Diferencia minuscula e maiuscula
const keyCode = {
	a:    65, b:    66, c:    67, d:    68, e:    69, f:    70, g:    71, h:    72, i:    73, j:    74, 
	k:    75, l:    76, m:    77, n:    78, o:    79, p:    80, q:	  81, r:    82, s:    83, t:    84,
	u:    85, v:    86, w:    87, x:    88, y:    89, z:    90, 
	num0: 48, num1: 49, num2: 50, num3: 51, num4: 52, num5: 53, num6: 54, num7: 55, num8: 56, num9: 57, 
	
	numpad0: 96,  numpad1: 97,  numpad2: 98,  numpad3: 99,  numpad4: 100, numpad5: 101, numpad6: 102, numpad7: 103, 
	numpad8: 104, numpad9: 105,

	f1: 112, f2: 113, f3: 114, f4: 115, f5: 116, f6: 117, f7: 118, f8: 119, f9: 120, f10: 121, f11: 122, f12: 123,
	
	left_arrow: 37, up_arrow: 38, right_arrow: 39, down_arrow: 40, backspace: 8, tab: 9, enter: 13, shift: 16, 
	
	capslock: 20, numlock: 144, scrolllock: 145, left_window_key: 91, right_window_key: 92, 
	
	open_bracket: 219, close_braket: 221, ctrl: 17, alt: 18, end: 35, home: 36, insert: 45, delete: 46, select: 93, pause_break: 19, 
	
	escape: 27, page_up: 33, page_down: 34, multiply: 106, add: 107, subtract: 109, decimal_point: 110, divide: 111, semi_colon: 186, 

	equal_sign: 187, comma: 188, dash: 189, period: 190, forward_slash: 191, back_slash: 220, grave_accent: 192, single_quote: 222
};

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
		Drawable.sortPriority();
	}
	
	static sortPriority(){
		for (var i = 0; i < objsToDraw.length; ++i){
			for (var j = i + 1; j < objsToDraw.length; ++j){
				if (objsToDraw[i].drawPriority > objsToDraw[j].drawPriority){
					var temp =  objsToDraw[i];
					objsToDraw[i] = objsToDraw[j];
					objsToDraw[j] = temp;
				}
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
	constructor(src, x, y, w, h, canDraw = true){
		super(x, y, w, h);
		this.img = new Image();
		this.img.src = src;
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
		this.currentFrame 	= 0;
		this.currentTime 	= 0;
		this.animationTime 	= 500;
		this.animationPause = false;
	}
	
	addFrame(src){
		var img = new Image();
		img.src = src;
		this.frames.push(img);
	}
	
	update(){
		if (this.animationPause)
			return;
		
		this.currentTime += Ramu.time.delta;
		if (this.frames.length > 0 && this.currentTime > this.animationTime){ 
			this.currentFrame = (this.currentFrame + 1) % this.frames.length;
			this.currentTime = 0;
		} 
	}
	
	draw(){
		if (this.frames.length > 0)
			ctx.drawImage(this.frames[this.currentFrame], this.x, this.y, this.width, this.height);
	}
}

class Parallax extends GameObj{
	constructor(src, x, y, w, h, velocity = 2){
		super(x, y);
		this.left   = new GameSprite(src, x - w, y, w, h);
		this.center = new GameSprite(src, x  + w  , y, w, h);
		this.right  = new GameSprite(src, x + w, y, w, h);
		this.velocity = velocity;
		this.setDrawPriority(-1);
	}
	
	canDraw(bool){
		this.left.canDraw   = bool;
		this.center.canDraw = bool;
		this.right.canDraw  = bool;
	}
	
	setDrawPriority(num){
		this.left.drawPriority   = num;
		this.center.drawPriority = num;
		this.right.drawPriority  = num;
		Drawable.sortPriority();
	}
	
	update(){
		this.left.x   += this.velocity;
		this.center.x += this.velocity;
		this.right.x  += this.velocity;
		
		// Left
		if (this.center.x >= canvas.width)
			this.center.x = this.right.x - this.right.width;
		
		if (this.right.x >= canvas.width)
			this.right.x = this.center.x - this.center.width;
		
		// Right
		if (this.center.x + this.center.width <= 0)
			this.center.x = this.right.width;
		
		if (this.right.x + this.right.width <= 0)
			this.right.x = this.center.width;
	}
}

