const BTN_IMG = Ramu.Utils.getImage('res/btn.png');

class ButtonWText extends SimpleSpritesheetButton{
	constructor(x,y,txt){
		super(x,y,60,60,BTN_IMG,
						new Rect(0,0,60,60),
						new Rect(59,0,60,60),
						new Rect(118,0,60,60));
		this.marginX = 15;
		this.marginY = 45;
		this.txt = new Text(txt, x + this.marginX, y + this.marginY, 60);
		this.txt.font = '60px sans-serif';
		
		this.setOnClick(function(){
			game.move(this);
		});
	}
	
	set text(txt){
		this.txt.text = txt;
	}
	
	get text(){
		return this.txt.text;
	}
}

class Game extends GameObj{
	start(){
		this.isXTurn = true;
		this.endGame = false;
		this.btns = [
			new ButtonWText(100,100,''),
			new ButtonWText(160,100,''),
			new ButtonWText(220,100,''),
			
			new ButtonWText(100,160,''),
			new ButtonWText(160,160,''),
			new ButtonWText(220,160,''),
			
			new ButtonWText(100,220,''),
			new ButtonWText(160,220,''),
			new ButtonWText(220,220,'')
		];
		this.infoDump = new Text('x turn.', 100, 300, 200);
		this.infoDump.font = '25px sans-serif';
	}
	
	get player(){
		return this.isXTurn ? 'x' : 'o';
	}
	
	move(btn){
		if (this.endGame || btn.text !== '')
			return;
		
		btn.text = this.player;
		
		if (this.checkVictory())
			return;
		
		if (this.checkDraw())
			return;
		
		this.isXTurn = !this.isXTurn;
		this.infoDump.text = this.player + ' turn.';
	}
	
	checkVictory(){
		const positions = [
			[0,1,2],
			[2,3,5],
			[6,7,8],
			
			[0,3,6],
			[1,4,7],
			[2,5,8],
			
			[0,4,8],
			[2,4,6]
		];
		
		for (let i in positions){
			const pos = positions[i];
			const pos1 = this.btns[pos[0]].text;
			const pos2 = this.btns[pos[1]].text;
			const pos3 = this.btns[pos[2]].text;
			
			if (pos1 === this.player && pos2 === this.player && pos3 === this.player){
				this.infoDump.text = this.player + ' won!';
				this.endGame = true;
				return true;
			}
		}
		return false;
	}
	
	checkDraw(){
		for (let i in this.btns){
			if (this.btns[i].text === '')
				return false;
		}
		this.infoDump.text = 'draw!'
		this.endGame = true;
		return true;
	}
}

Ramu.init();
var game = new Game();
