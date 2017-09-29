// Animation Exemple by Hermes Passer in 09-21-17
var dirGear = "img/gear.png",
	dirOther = "img/anim/"
class AnimTest extends Drawable{
	start(){
		
		// Separate sprite animation without loop
		this.spriteAnimW = new SpriteAnimation(100, 115, 50, 50);
		this.spriteAnimW.animationTime = 0.5;
		this.spriteAnimW.playInLoop = false;
		for (var i = 1; i < 11; i++)
			this.spriteAnimW.addFrame(dirOther + i + ".png");
		
		// Separate sprite animation
		this.spriteAnim = new SpriteAnimation(canvas.width/2 + 35, 115, 50, 50);
		this.spriteAnim.animationTime = 0.5;
		for (var i = 1; i < 11; i++)
			this.spriteAnim.addFrame(dirOther + i + ".png");
		
		// One sprite (sheet) animation without loop
		this.sheetW = new SpritesheetAnimation(dirGear, 50, 255, 134, 136);
		this.sheetW.animationTime = 0.2;
		this.sheetW.playInLoop = false;
		this.sheetW.addFrame(new Rect(0,0,133,135));
		this.sheetW.addFrame(new Rect(134,0,133,135));
		this.sheetW.addFrame(new Rect(270,0,133,135));
		
		// One sprite (sheet) animation
		this.sheet = new SpritesheetAnimation(dirGear, canvas.width/2, 255, 134, 136);
		this.sheet.animationTime = 0.2;
		this.sheet.addFrame(new Rect(0,0,133,135));
		this.sheet.addFrame(new Rect(134,0,133,135));
		this.sheet.addFrame(new Rect(270,0,133,135));	
	}
	
	draw(){
		ctx.fillText("Animation Exemple by Hermes Passer", 1, 10);
		
		var sa = this.spriteAnim.frames[this.spriteAnim.currentFrame].src;
		ctx.fillText("Sprites animation:", 1, 85);
		ctx.fillText(sa, 1, 100);
		
		var s = this.sheet.frames[this.sheet.currentFrame];
		var sh =  "img/gear.png(" + s.x + " " + s.y + " " + s.width + " " + s.height + ")";
		ctx.fillText("Spritesheet animation:", 1, 235);
		ctx.fillText(sh, 1, 250);
	}
}

new AnimTest(0,0,0,0);
Ramu.init();
