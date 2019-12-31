"use strict"
const img = Ramu.Utils.getImage("img/particleblue.png");

console.warn("i think Timer is slowing this down, compare with 0.7b version")

class SuicideParticle extends SimpleParticle{
	start(){
		super.start();
		this.otherTimer = new Timer(this.lifeSpan, null, false);
		this.otherTimer.start();
	}
	update() {
		if (this.isOver)
			this.init();

		super.update();
		
		if (this.otherTimer.timeOut){
			console.log("...")
			this.destroy();
		}
	}
}

class Game extends Clickable{
	start(){
		super.start();
		this.txt = new Ramu.Text('', 10, 10, 300);
		this.txt.fillStyle = '#ffffff';
		
		// this.timeToInstantiate = 0.2;
		// this.currentTimeToInstantiate = 5;
		
		this.instantiateTimer = new Timer(0.2, null, false);
		
		this.instantiateTimer._currentTime = 5;
		this.instantiateTimer.start();
		
		this.stopTimer = new Timer(3, null, false);
		this.stopTimer.start();
		
		// this.timeToStop = 3;
		// this.currentTimeToStop = 0;
		this.started = false;
	}
	
	update(){
		super.update();
		this.txt.text = `${Ramu.gameObjs.length} GameObjects in scene.`;
		
		if(!this.started){
			this.txt.text += " Click to start/restart the particles."
			return;
		}

		if(this.stopTimer.timeOut){
			
			// this.currentTimeToStop = 0;
			this.started = false;
			this.stopTimer.restart();
			return;
		}
		// this.currentTimeToStop += Ramu.time.delta;	
		
		if (this.instantiateTimer.timeOut){
			// this.currentTimeToInstantiate = 0;
			let r = new Rect(Math.random() * Ramu.width, Math.random() * Ramu.height, 1, 1);
			let p = new SuicideParticle(img, r, 1, 1000);	
			this.stopTimer.restart();
		}
		// this.currentTimeToInstantiate += Ramu.time.delta;
	}
	
	onClick(){
		this.started = !this.started;
	}
}

Ramu.init(300, 300);
new Game(0, 0, 300, 300);
