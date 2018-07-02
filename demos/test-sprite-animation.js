// Sprite & Animation Tests by Hermes Passer in 09-21-17

class AnimTest extends Drawable{
	
	start(){
		this.canDraw = true;
		this.imgsheet = Ramu.Utils.getImage("img/anim/crossSheet.gif");

		this.sprtY 	  	  = 50;
		this.sprtshtY     = 150;
		this.sprtAnimY 	  = 250;
		this.sprtshtAnimY = 350;
		this.shtanimatorY = 450;
		
		this.setSprite();
		this.setSpritesheet();
		this.setSpriteAnimation();
		this.setSpriteSheetAnimation();
	}
	
	draw(){
		Ramu.ctx.fillText("Sprite & Animation Tests by Hermes Passer", 1, 10);
		
		var colsPosY = this.sprtY - 5;
		var src = this.gmsprt.img.src;
		Ramu.ctx.fillText("Sprite: " + src, 1, this.sprtY - 20);
		Ramu.ctx.fillText("normal", 10, colsPosY);
		Ramu.ctx.fillText("flip horizontally", 210, colsPosY);
		Ramu.ctx.fillText("flip vertically", 310, colsPosY);
		Ramu.ctx.fillText("flip horizontally & vertically", 400, colsPosY);
		
		colsPosY = this.sprtshtY - 5;
		src = this.sprtsht.img.src;
		Ramu.ctx.fillText("Spritesheet: " + src + " (x:" + 
					this.sprtsht.sheet.x + " y:" + this.sprtsht.sheet.y + " w:" +
					this.sprtsht.sheet.width + " h:" + 
					this.sprtsht.sheet.x + ")", 1, this.sprtshtY - 20);
		Ramu.ctx.fillText("normal", 10, colsPosY);
		Ramu.ctx.fillText("flip horizontally", 210, colsPosY);
		Ramu.ctx.fillText("flip vertically", 310, colsPosY);
		Ramu.ctx.fillText("flip horizontally & vertically", 410, colsPosY);
		
		colsPosY = this.sprtAnimY - 5;
		src = this.sprtAnim.frames[this.sprtAnim.currentFrame].src;
		Ramu.ctx.fillText("Sprite animation: " + src, 1, this.sprtAnimY - 20);
		Ramu.ctx.fillText("without loop", 10, colsPosY);
		Ramu.ctx.fillText("with loop", 110, colsPosY);
		Ramu.ctx.fillText("flip horizontally", 210, colsPosY);
		Ramu.ctx.fillText("flip vertically", 310, colsPosY);
		Ramu.ctx.fillText("flip horizontally & vertically", 410, colsPosY);
		
		colsPosY = this.sprtshtAnimY - 5;
		src = this.sprtsheetAnim.frames[this.sprtsheetAnim.currentFrame]
		Ramu.ctx.fillText("Spritesheet animation: "  + this.sprtsheetAnim.img.src + " (x:" + 
					src.x + " y:" + src.y + " w:" + src.width + " h:" + 
					src.height + ")", 1, this.sprtshtAnimY - 20);
		Ramu.ctx.fillText("without loop", 10, colsPosY);
		Ramu.ctx.fillText("with loop", 110, colsPosY);
		Ramu.ctx.fillText("flip horizontally", 210, colsPosY);
		Ramu.ctx.fillText("flip vertically", 310, colsPosY);
		Ramu.ctx.fillText("flip horizontally & vertically", 410, colsPosY);
		
		Ramu.ctx.fillText("Spritesheet Animator: (soon)" , 1, this.shtanimatorY - 20);
	}
	
	setSprite(){
		let img = Ramu.Utils.getImage("img/anim/crossSprite_3.gif")
		
		// normal
		this.gmsprt = new Sprite(img, 10, this.sprtY, 70, 70);

		// flip horizontally
		this.gmsprt = new Sprite(img, 210, this.sprtY, 70, 70);
		this.gmsprt.flipHorizontally = true;
		
		// flip vertically
		this.gmsprt = new Sprite(img, 310, this.sprtY, 70, 70);
		this.gmsprt.flipVertically = true;
		
		// flip horizontally & vertically
		this.gmsprt = new Sprite(img, 410, this.sprtY, 70, 70);
		this.gmsprt.flipHorizontally = true;
		this.gmsprt.flipVertically = true;
	}
	
	setSpritesheet(){
		let rect = new Rect(83, 2, 35, 35);

		// normal
		this.sprtsht = new Spritesheet(this.imgsheet, rect, 10, this.sprtshtY, 70, 70);

		// flip horizontally
		this.sprtsht = new Spritesheet(this.imgsheet, rect, 210, this.sprtshtY, 70, 70);
		this.sprtsht.flipHorizontally = true;
		
		// flip vertically
		this.sprtsht = new Spritesheet(this.imgsheet, rect, 310, this.sprtshtY, 70, 70);
		this.sprtsht.flipVertically = true;
		
		// flip horizontally & vertically
		this.sprtsht = new Spritesheet(this.imgsheet, rect, 410, this.sprtshtY, 70, 70);
		this.sprtsht.flipHorizontally = true;
		this.sprtsht.flipVertically = true;
	}
	
	setSpriteAnimation(){
		let dir = "img/anim/crossSprite_";
		
		// without loop
		this.sprtAnim = new SpriteAnimation(10, this.sprtAnimY, 70, 70);
		this.sprtAnim.playInLoop = false;
		for (var i = 1; i < 6; i++)
			this.sprtAnim.addFrame(Ramu.Utils.getImage(dir + i + ".gif"));
		
		// with loop
		this.sprtAnim = new SpriteAnimation(100, this.sprtAnimY, 70, 70);
		for (var i = 1; i < 6; i++)
			this.sprtAnim.addFrame(Ramu.Utils.getImage(dir + i + ".gif"));
		
		// flip horizontally
		this.sprtAnim = new SpriteAnimation(210, this.sprtAnimY, 70, 70);
		this.sprtAnim.flipHorizontally = true;
		for (var i = 1; i < 6; i++)
			this.sprtAnim.addFrame(Ramu.Utils.getImage(dir + i + ".gif"));
				
		// flip vertically
		this.sprtAnim = new SpriteAnimation(310, this.sprtAnimY, 70, 70);
		this.sprtAnim.flipVertically = true;
		for (var i = 1; i < 6; i++)
			this.sprtAnim.addFrame(Ramu.Utils.getImage(dir + i + ".gif"));
		
		// flip horizontally & vertically
		this.sprtAnim = new SpriteAnimation(410, this.sprtAnimY, 70, 70);
		this.sprtAnim.flipHorizontally = true;
		this.sprtAnim.flipVertically = true;
		for (var i = 1; i < 6; i++)
			this.sprtAnim.addFrame(Ramu.Utils.getImage(dir + i + ".gif"));
	}
	
	setSpriteSheetAnimation(){
		let spriteSize = 35,
		    frame1 = new Rect(43, 52, spriteSize, spriteSize),
			frame2 = new Rect(3, 52, spriteSize, spriteSize),
			frame3 = new Rect(83, 2, spriteSize, spriteSize),
			frame4 = new Rect(43, 2, spriteSize, spriteSize),
			frame5 = new Rect(3, 2, spriteSize, spriteSize);

		// without loop
		this.sprtsheetAnim = new SpritesheetAnimation(this.imgsheet, 10, this.sprtshtAnimY, 70, 70);
		this.sprtsheetAnim.playInLoop = false;
		this.sprtsheetAnim.addFrame([frame1, frame2, frame3, frame4, frame5]);
		
		// with loop
		this.sprtsheetAnim = new SpritesheetAnimation(this.imgsheet, 100, this.sprtshtAnimY, 70, 70);
		this.sprtsheetAnim.addFrame([frame1, frame2, frame3, frame4, frame5]);

		// flip horizontally
		this.sprtsheetAnim = new SpritesheetAnimation(this.imgsheet, 210, this.sprtshtAnimY, 70, 70);
		this.sprtsheetAnim.flipHorizontally = true;
		this.sprtsheetAnim.addFrame([frame1, frame2, frame3, frame4, frame5]);
		
		// flip vertically
		this.sprtsheetAnim = new SpritesheetAnimation(this.imgsheet, 310, this.sprtshtAnimY, 70, 70);
		this.sprtsheetAnim.flipVertically = true;
		this.sprtsheetAnim.addFrame([frame1, frame2, frame3, frame4, frame5]);
		
		// flip horizontally & vertically
		this.sprtsheetAnim = new SpritesheetAnimation(this.imgsheet, 410, this.sprtshtAnimY, 70, 70);
		this.sprtsheetAnim.flipHorizontally = true;
		this.sprtsheetAnim.flipVertically = true;
		this.sprtsheetAnim.addFrame([frame1, frame2, frame3, frame4, frame5]);
	}
}

new AnimTest(0,0,0,0);
Ramu.init(window.innerWidth, window.innerHeight);
