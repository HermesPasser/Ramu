// Animation Exemple by Hermes Passer in 09-14-27

class AnimTest extends Drawable{
	start(){
		this.t = new SpriteAnimation(10, 10, 50, 50);
		this.t.addFrame("anim/1.png");
		this.t.addFrame("anim/2.png");
		this.t.addFrame("anim/3.png");
		this.t.addFrame("anim/4.png");
		this.t.addFrame("anim/5.png");
		this.t.addFrame("anim/6.png");
		this.t.addFrame("anim/7.png");
		this.t.addFrame("anim/8.png");
		this.t.addFrame("anim/9.png");
		this.t.addFrame("anim/10.png");
		this.t.animationTime = 100;
	}
}

new AnimTest(0,0,0,0);
Ramu.init();
