'use strict';
// ---------------------------------- //
// Ramu 0.5.3 - Hermes Passer in 09/21//
//      hermespasser.github.io        //
// blog: gladiocitrico.blogspot.com   //
// ---------------------------------- //

// desquecrever o que cada classe é

// implementar improved input

var gameObjs	   = [],
    objsToDraw 	   = [],
    objsToCollide  = [],
    drawLastPriority = 0,
	collisionLastPriority = 0;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

const keyCode = {
	a:    65, b:    66, c:    67, d:    68, e:    69, f:    70, g:    71, h:    72, i:    73, j:    74, 
	k:    75, l:    76, m:    77, n:    78, o:    79, p:    80, q:	  81, r:    82, s:    83, t:    84,
	u:    85, v:    86, w:    87, x:    88, y:    89, z:    90, 
	num0: 48, num1: 49, num2: 50, num3: 51, num4: 52, num5: 53, num6: 54, num7: 55, num8: 56, num9: 57, 
	
	numpad0: 96,  numpad1: 97,  numpad2: 98,  numpad3: 99,  numpad4: 100, numpad5: 101, numpad6: 102, numpad7: 103, 
	numpad8: 104, numpad9: 105,

	space: 32,
	
	f1: 112, f2: 113, f3: 114, f4: 115, f5: 116, f6: 117, f7: 118, f8: 119, f9: 120, f10: 121, f11: 122, f12: 123,
	
	left_arrow: 37, up_arrow: 38, right_arrow: 39, down_arrow: 40, backspace: 8, tab: 9, enter: 13, shift: 16, 
	
	capslock: 20, numlock: 144, scrolllock: 145, left_window_key: 91, right_window_key: 92, 
	
	open_bracket: 219, close_braket: 221, ctrl: 17, alt: 18, end: 35, home: 36, insert: 45, delete: 46, select: 93, pause_break: 19, 
	
	escape: 27, page_up: 33, page_down: 34, multiply: 106, add: 107, subtract: 109, decimal_point: 110, divide: 111, semi_colon: 186, 

	equal_sign: 187, comma: 188, dash: 189, period: 190, forward_slash: 191, back_slash: 220, grave_accent: 192, single_quote: 222
};

class Rect{	
	constructor(x, y, w, h){
		if (arguments.length != 4) throw new Error('Wrong number of arguments');
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
	}
}

class RamuMath{
	/// Prevents creating an instance of this class.
	constructor(){
		throw new Error('This is a static class');
	}
	
	static overlap(rect1, rect2) {
		return(rect1.x < rect2.x + rect2.width &&
			   rect1.x + rect1.width > rect2.x &&
			   rect1.y < rect2.y + rect2.height &&
			   rect1.height + rect1.y > rect2.y);
	}
}

class Ramu{
	/// Prevents creating an instance of this class.
	constructor(){
		throw new Error('This is a static class');
	}
	
	/// Init the Ramu and Ramu main loop.
	static init(){
		Ramu.debugMode = false;
		Ramu.inLoop = true;
		
		// Deltatime is actually a timestep and frametime is originally the delta time,
		// change of terms exists for timestep be used instead of delta (frametimne)
		Ramu.time = { last: Date.now(), delta: 1/60, frameTime: 0 };
		
		Ramu.input();
		Ramu.start();
		window.requestAnimationFrame(Ramu.loop);
	}
	
	/// Start all input events listeners
	static input(){
		Ramu.pressedKeys	 = {}; // The key continues on this list until the key up.
		Ramu.lastKeysPressed = {}; // The key continues on this list until the end of frame.
		
		document.body.addEventListener("keydown", function(e){	
			Ramu.pressedKeys[e.keyCode] = e.keyCode;
			Ramu.lastKeysPressed[e.keyCode] = e.keyCode;
		}, false);
		
		document.body.addEventListener("keyup", function(e){
			delete Ramu.pressedKeys[e.keyCode];
		}, false);
		
		// canvas.addEventListener('click',      function(e){},  false);
		// canvas.addEventListener('mousemove'   function(e){},  false);
		// canvas.addEventListener('touchstart', function(e){},  false);
		// canvas.addEventListener('touchmove',  function(e){},  false);
	}

	/// Game loop of Ramu.
	static loop(){
		
		let now = 0;
		if (Ramu.inLoop){
			now = Date.now();
			Ramu.time.frameTime = Ramu.time.frameTime + Math.min(1, (now - Ramu.time.last) / 1000);
		
			while(Ramu.time.frameTime > Ramu.time.delta) {
				Ramu.checkCollision();
				Ramu.update();
				Ramu.time.frameTime = Ramu.time.frameTime - Ramu.time.delta;
				
				// Panic | from isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
				let numUpdateSteps = 0;
				if (++numUpdateSteps >= 240) {
					Ramu.time.frameTime = 0;
					break;
				}
			}
		}
		
		Ramu.draw();
		Ramu.lastKeysPressed = {};
		
		if (Ramu.inLoop) Ramu.time.last = now;
		window.requestAnimationFrame(Ramu.loop);
	}
	
	/// Executes all start methods of all gameObjs in the game.
	static start(){
		for (var i = 0; i < gameObjs.length; i++)
			gameObjs[i].start();	
	}
	
	/// Update all gameObjs in the game.
	static update(){
		for (var i = 0; i < gameObjs.length; i++)
			gameObjs[i].update();	
	}
	
	/// Check all collisions in the game.
	static checkCollision(){
		for (var i = 0; i < objsToCollide.length; i++)
			objsToCollide[i].checkCollision();
	}
	
	/// Executes all draw methods of all gameObjs in the game.
	static draw(){	
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (var i = 0; i < objsToDraw.length; i++){
			let positionWidth = objsToDraw[i].x + objsToDraw[i].width;		
			let positionHeigh = objsToDraw[i].y + objsToDraw[i].height;
			
			if (positionWidth >= 0 && objsToDraw[i].x <= canvas.width && // Renderiza somente o que esta no canvas
					positionHeigh>= 0 && objsToDraw[i].y <= canvas.height)
				objsToDraw[i].drawInCanvas();
		}
	}
}

class RamuUtils{
	constructor(){
		throw new Error('This is a static class');
	}
	
	/// Get a image with source
	static getImage(src){
		let img = new Image();
		img.src = src;
		return img;
	}
	
	/// Check if image is loaded
	static imageIsLoaded(img){
		return img.complete && img.naturalWidth !== 0 && img.naturalHeight !== 0;
	}
}

class GameObj{	
	constructor(x = 0, y = 0){
		if (arguments.length > 2) throw new Error('Wrong number of arguments');

		this.x = x;
		this.y = y;
		this.tag =  this.tag || "none";
		gameObjs.push(this);
	}
	
	destroy(){
		for (var i = 0; i < gameObjs.length; i++){
			if (gameObjs[i] === this){
				gameObjs.splice(i, 1);
				break;
			}
		}
	}
	
	/// Virtual start to be inherited.
	start() { }
	
	/// Virtual update to be inherited.
	update() { }
}

class Drawable extends GameObj{
	constructor(x, y, width, height, canDraw = false){
		super();
		if (arguments.length < 4) throw new Error('Wrong number of arguments');

		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.canDraw = true;
		this.drawPriority     = drawLastPriority++;
		this.flipHorizontally = false;
		this.flipVertically   = false;
		
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
					let temp =  objsToDraw[i];
					objsToDraw[i] = objsToDraw[j];
					objsToDraw[j] = temp;
				}
			}
		}
	}
	
	destroy(){
		super.destroy();
		for (var i = 0; i < objsToDraw.length; i++){
			if (objsToDraw[i] === this){
				objsToDraw.splice(i, 1);
				break;
			}
		}
	}
	
	drawInCanvas(){
		if (this.canDraw){
			
			// To flip anything that is drawn (the position need be recalculated in draw() method).
			if (this.flipHorizontally || this.verticalFlip){
				ctx.save();
				ctx.scale(this.flipHorizontally ? -1 : 1, this.flipVertically ? -1 : 1);
			}
			
			this.draw();
			
			if (this.flipHorizontally || this.flipVertically)
				ctx.restore();
		}
	}
	
	/// Virtual draw to be inherited.
	draw(){ }
}

class Collisor extends Drawable{
	constructor(x, y, width, height){
		super(x, y, width, height);
		if (arguments.length != 4) throw new Error('Wrong number of arguments');
		this.canCollide = true;
		// this.isInCollision = false;
		this.collision = [];
		this.collisionPriority = collisionLastPriority++;

		Collisor.addObjt(this);
	}
	
	static addObjt(colObj){
		objsToCollide.push(colObj);
		Collisor.sortPriority();
	}
	
	static sortPriority(){
		for (var i = 0; i < objsToCollide.length; ++i){
			for (var j = i + 1; j < objsToCollide.length; ++j){
				if (objsToCollide[i].collisionPriority > objsToCollide[j].collisionPriority){
					let temp =  objsToCollide[i];
					objsToCollide[i] = objsToCollide[j];
					objsToCollide[j] = temp;
				}
			}
		}
	}
	
	destroy(){
		super.destroy();
		for (var i = 0; i < objsToCollide.length; i++){
			if (objsToCollide[i] === this){
				objsToCollide.splice(i, 1);
				break;
			}
		}
	}
	
	update(){
		this.canDraw = Ramu.debugMode;
	}
	
	get isInCollision(){ 
		return this.collision.length != 0; 
	}
	
	/// Virtual onCollision to be inherited.
	onCollision(){ }

	checkCollision(){
		if(!this.canCollide) return;
		
		this.collision = [];
		for (var i = 0; i < objsToCollide.length; i++){
			if (objsToCollide[i] === this || !objsToCollide[i].canCollide)
				continue;
			
			let rect1 = new Rect(this.x, this.y, this.width, this.height);
			let rect2 = new Rect(objsToCollide[i].x, objsToCollide[i].y, objsToCollide[i].width, objsToCollide[i].height);
			
			if (RamuMath.overlap(rect1, rect2)){
				objsToCollide[i].collision.push(this);
				this.collision.push(objsToCollide[i]);
				this.onCollision();
			}
		}
	}
}

class SimpleRectCollisor extends Collisor{	
	draw(){
		if (Ramu.debugMode){
			
			if (this.isInCollision)
				ctx.strokeStyle = "red";
			else ctx.strokeStyle = "blue";
			
			ctx.strokeRect(this.x, this.y, this.width, this.height);
			ctx.strokeStyle = "#000000"; // reset default value
		}
	}
}

// create version of gamesprite using sheets of an image instead of full images
class GameSprite extends Drawable{
	constructor(src, x, y, w, h, canDraw = true){
		super(x, y, w, h);
		if (arguments.length < 4) throw new Error('Wrong number of arguments');

		this.img = new Image();
		this.img.src = src;
		this.canDraw = canDraw;	
	}
	
	draw(){					
		let originX = this.flipHorizontally ? -this.width - this.x : this.x;
		let originY = this.flipVertically   ? -this.height - this.y : this.y;
		
		if (!RamuUtils.imageIsLoaded(this.img)){
			ctx.fillRect(originX, originY, this.width, this.height); // Draw a black rect instead of image
			return;
		}
		
		//if (this.canDraw)
			ctx.drawImage(this.img, originX, originY, this.width, this.height);
	}
}

class GameSpritesheet extends Drawable{
	constructor(image, sheetRect, x, y, w, h, canDraw = true){
		super(x, y, w, h);
		if (arguments.length < 5) throw new Error('Wrong number of arguments');

		this.img = image;
		this.sheet = sheetRect;
		this.canDraw = canDraw;	
	}
	
	draw(){					
		let originX = this.flipHorizontally ? -this.width - this.x : this.x;
		let originY = this.flipVertically   ? -this.height - this.y : this.y;

		if (!RamuUtils.imageIsLoaded(this.img)){
			ctx.fillRect(originX, originY, this.width, this.height); // Draw a black rect instead of image
			return;
		}	
		
		ctx.drawImage(this.img, this.sheet.x, this.sheet.y, this.sheet.width, this.sheet.height, 
					originX, originY, this.width, this.height);
	}
}

class SpriteAnimation extends Drawable{
	constructor(x, y, width, height){
		super(x, y, width, height);
		this.frames 		 = [];
		this.currentFrame 	 = 0;
		this.currentTime 	 = 0;
		this.animationTime 	 = 2;
		this.animationPause  = false;
		this.animationIsOver = false;
		this.playInLoop 	 = true;
	}
	
	addFrame(src){ 
		if (arguments.length != 1) throw new Error('Wrong number of arguments');
		this.frames.push(RamuUtils.getImage(src)); // Frame as a image
	}
	
	reset(){
		this.animationIsOver = false;
		this.currentFrame = 0;
		this.currentTime  = 0;
	}
	
	update(){
		if (this.animationPause)
			return;
		
		if (this.currentFrame == this.frames.length - 1){
			this.animationIsOver = true;
			if (!this.playInLoop) return;
			
		} else this.animationIsOver = false;
		
		this.currentTime += Ramu.time.delta;
		if (this.frames.length > 0 && this.currentTime > this.animationTime){ 
			this.currentFrame = (this.currentFrame + 1) % this.frames.length;
			this.currentTime = 0;
		} 
	}
	
	draw(){
		let originX = this.flipHorizontally ? -this.width - this.x : this.x;
		let originY = this.flipVertically   ? -this.height - this.y : this.y;
		
		if (this.frames.length > 0){
			if (!RamuUtils.imageIsLoaded(this.frames[this.currentFrame])){
				ctx.fillRect(originX, originY, this.width, this.height); // Draw a black rect instead of image
				return;
			}
			
			ctx.drawImage(this.frames[this.currentFrame], originX, originY, this.width, this.height);
		}
	}

}

// check if rect is grather than or less than de image size
class SpritesheetAnimation extends SpriteAnimation{
	constructor(image, x, y, width, height){
		super(x, y, width, height);
		if (arguments.length != 5) throw new Error('Wrong number of arguments');
		this.img = image;
	}
	
	addFrame(rect){
		if (arguments.length != 1) 
			throw new Error('Wrong number of arguments');
		else this.frames.push(rect); // Frame as a rect of a image
	}
	
	draw(){
		let originX = this.flipHorizontally ? -this.width - this.x : this.x;
		let originY = this.flipVertically   ? -this.height - this.y : this.y;
		
		//Draw
		if (this.frames.length > 0){
			if (!RamuUtils.imageIsLoaded(this.img)){
				ctx.fillRect(originX, originY, this.width, this.height); // Draw a black rect instead of image
				return;
			}	
			
			ctx.drawImage(this.img, this.frames[this.currentFrame].x, this.frames[this.currentFrame].y, 
						this.frames[this.currentFrame].width, this.frames[this.currentFrame].height, 
						originX, originY, this.width, this.height);
		}
	}
}

class SpritesheetAnimator extends GameObj{
	constructor(x, y, width, height){
		super(x,y);
		if (arguments.length != 4) throw new Error('Wrong number of arguments');
		
		this.anim = {};
		this.animDrawPriority = drawLastPriority++;
		
		// Create because GameObj doesn't contains width and height
		this.width  = width;
		this.height = height;
	}
	
	addAnimation(nameID, spritesheetAnimation){
		if (arguments.length != 2) throw new Error('Wrong number of arguments');
		
		spritesheetAnimation.x = this.x;
		spritesheetAnimation.y = this.y;
		spritesheetAnimation.canDraw = false;
		spritesheetAnimation.drawPriority = this.animDrawPriority;
		Drawable.sortPriority();
		this.anim[nameID] = spritesheetAnimation;
	}
	
	setCurrentAnimation(nameID){
		if (arguments.length != 1) throw new Error('Wrong number of arguments');
		
		for (var key in this.anim)
			this.anim[key].canDraw = false;
		
		if (this.anim[key] != null)
			this.anim[nameID].canDraw = true;
	}
	
	getCurrentAnimationID(){
		for (var key in this.anim)
			if (this.anim[key].canDraw)
				return key;
		return null;		
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
	}
	
	setY(y){
		for (var key in this.anim)
			this.anim[key].y = y;
	}	
	
	addX(x){
		for (var key in this.anim)
			this.anim[key].x += x;
	}
	
	addY(y){
		for (var key in this.anim)
			this.anim[key].y += y;
	}
	
	destroy(){
		for (var key in this.anim)
			this.anim[key].destroy();
		super.destroy();
	}
}

class Parallax extends GameObj{ // Not use time delta yet
	constructor(src, x, y, w, h, velocity = 2){
		super(x, y);
		if (arguments.length < 5) throw new Error('Wrong number of arguments');

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
	
	destroy(){
		this.left.destroy();
		this.center.destroy();
		this.right.destroy();
		super.destroy();
	}
}

