class Train extends SimpleRectCollisor{
	constructor(x, y){
		super(x, y, 32, 47);
		this.sprite = new Sprite(RamuUtils.getImage('res/train.gif'), this.x, this.y, 32, 47);
		this.sprite.drawPriority = 1;
		
		this.drawPriority = this.sprite.drawPriority + 1;	
		this.velocity = 50;
		this.canGo = false;
		this.tag = 'train';
	}
	
	update(){
		super.update();
		
		if (this.canGo){			
			this.y -= this.velocity * Ramu.time.delta;
			this.sprite.y -= this.velocity * Ramu.time.delta;
		}
		
		if (RamuUtils.isOutOfCanvas(this)){
			game.lose();
			game.audio.pause();
			this.canGo = false;
		}
	}
	
	teleport(){
		this.x = game.exPortal.x - 1;
		this.y = game.exPortal.y;
		this.sprite.x = game.exPortal.x - 1;
		this.sprite.y = game.exPortal.y;
	}
}

class EntranceTunnel extends SimpleRectCollisor{
	constructor(x, y){
		super(x, y, 34, 17);
		this.sprite = new Sprite(RamuUtils.getImage('res/entrance_tunnel.png'), this.x, this.y, 34, 97);
		this.drawPriority = this.sprite.drawPriority + 1;
	}
	
	onCollision(){
		for (let i = 0; i < this.collision.length; i++)
			if (this.collision[i].tag === 'train'){
				game.train.canGo = false;
				game.audio.pause();
				game.win();
			}
	}
}

class EntrancePortal extends SimpleRectCollisor{
	constructor(x, y){
		super(x, y, 26, 6);
		this.sprite = new Sprite(RamuUtils.getImage('res/entrance_portal.gif'), this.x, this.y, 26, 18);
	}
	
	onCollision(){
		for (let i = 0; i < this.collision.length; i++)
			if (this.collision[i].tag === 'train')
				game.train.teleport();
	}
	
	setPosition(){
		this.x = Ramu.click.X;
		this.y = Ramu.click.Y;

		this.sprite.x = Ramu.click.X;
		this.sprite.y = Ramu.click.Y;
	}
	
	destroy(){
		super.destroy();
		this.sprite.destroy();
	}
}

class Game extends GameObj{
	start(){		
		this.eventCreated = false;
		new Sprite(RamuUtils.getImage('res/ground.gif'), 0, 0, Ramu.width, Ramu.height);
		
		this.audio = new Audio('res/steam-train-whistle-daniel_simon.wav');
		this.audio.loop = true;
		
		this.infoDump = new Text('Click to place the portal. Hermes Passer in 2018-06-29', 100, 490);
		this.result = new Text('', 200, 250);
		
		this.enTunnel = new EntranceTunnel(300, 1)
		this.exTunnel = new Sprite(RamuUtils.getImage('res/exit_tunnel.gif'), 30, Ramu.height - 97, 34, 97);
		this.enTunnel.drawPriority = 2;
		this.exTunnel.drawPriority = 2;
		
		this.exPortal = new Sprite(RamuUtils.getImage('res/exit_portal.gif'), 302, 300, 26, 18);
		this.enPortal = new EntrancePortal(355, 30)
		
		this.train = new Train(this.exTunnel.x + 1, this.exTunnel.y + 20);
		
		this.setRules();
	}
	
	update(){ this.createEvent(); }
	
	lose(){ this.result.text = "YOU LOST" }
	
	win(){ this.result.text = "YOU WON" }
	
	setRules(){
		this.btn = new SimpleSpriteButton(RamuUtils.getImage('res/button.gif'), 350, 475, 108, 20)
		this.btn.setOnClick(function(){
			game.train.canGo = true;
			game.audio.play();
		});
		
		this.clickableCanvas = new Clickable(0, this.exTunnel.height, Ramu.width, Ramu.height - this.exTunnel.height * 2 - 50);
		this.clickableCanvas.onClick = function(){
			game.enPortal.setPosition();
		}
	}
	
	createEvent(){
		// Ramu.canvas will be defined after Ramu.init was called
		if (!Ramu.canvas || this.eventCreated)
			return;
		
		this.eventCreated = true;
		
		// esse metodo não é tão bom, clicar apos deixar a aba ativa gerara isso a ser chamado varias vezes num mesmo clique
		
		// Get click
		Ramu.canvas.addEventListener('click', event => {
			let bound = Ramu.canvas.getBoundingClientRect();
			let x = event.clientX - bound.left - Ramu.canvas.clientLeft;
			let y = event.clientY - bound.top - Ramu.canvas.clientTop;
			
			Ramu.click = { X: x, Y: y};
		});
	}
}

Ramu.init(500, 500); 
// Ramu.debugMode = true;
var game = new Game();
