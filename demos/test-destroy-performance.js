var img = Ramu.Utils.getImage("img/particleblue.png");

class SuicideParticle extends SimpleParticle{
	start(){
		super.start();
		this.currentLifeTime = 0;
	}
	update() {
		if (this.isOver)
			this.init();

		super.update();
		
		if (this.currentLifeTime >= this.lifeSpan){
			this.destroy();
		}
		this.currentLifeTime += Ramu.time.delta;	
	}
}

class Game extends Clickable{
	start(){
		super.start();
		this.txt = new Ramu.Text('', 10, 10, 300);
		this.txt.fillStyle = '#ffffff';
		
		this.timeToInstantiate = 0.2;
		this.currentTimeToInstantiate = 5;
		
		this.timeToStop = 3;
		this.currentTimeToStop = 0;
		
		this.started = false;
	}
	
	update(){
		super.update();
		this.txt.text = `${Ramu.gameObjs.length} GameObjects in scene.`;
		
		if(!this.started){
			this.txt.text += " Click to start/restart the particles."
			return;
		}
		
		if(this.currentTimeToStop >= this.timeToStop){
			this.currentTimeToStop = 0;
			this.started = false;
			return;
		}
		this.currentTimeToStop += Ramu.time.delta;	
		
		if (this.currentTimeToInstantiate >= this.timeToInstantiate){
			this.currentTimeToInstantiate = 0;
			
			let r = new Rect(Math.random() * Ramu.width, Math.random() * Ramu.height, 1, 1);
			let p = new SuicideParticle(img, r, 1, 1000);	
		}
		this.currentTimeToInstantiate += Ramu.time.delta;
	}
	
	onClick(){
		this.started = !this.started;
	}
}

Ramu.init(300, 300);
new Game(0, 0, 300, 300);
