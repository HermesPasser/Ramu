// Animation Exemple by Hermes Passer in 09-21-17

class AnimTest extends Drawable{
	start(){
		this.spriteAnim = new SpriteAnimation(canvas.width/2 - 25, 115, 50, 50);
		this.spriteAnim.addFrame("img/anim/1.png");
		this.spriteAnim.addFrame("img/anim/2.png");
		this.spriteAnim.addFrame("img/anim/3.png");
		this.spriteAnim.addFrame("img/anim/4.png");
		this.spriteAnim.addFrame("img/anim/5.png");
		this.spriteAnim.addFrame("img/anim/6.png");
		this.spriteAnim.addFrame("img/anim/7.png");
		this.spriteAnim.addFrame("img/anim/8.png");
		this.spriteAnim.addFrame("img/anim/9.png");
		this.spriteAnim.addFrame("img/anim/10.png");
		this.spriteAnim.animationTime = 0.5;
		
		this.sheet = new SpritesheetAnimation("img/gear.png", canvas.width/2 - 67, 255, 134, 136);
		this.sheet.addFrame(new Rect(0,0,133,135));
		this.sheet.addFrame(new Rect(134,0,133,135));
		this.sheet.addFrame(new Rect(270,0,133,135));
		this.sheet.animationTime = 0.2;
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
