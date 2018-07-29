
class Text extends Drawable {
	constructor(text, x, y, maxWidth, lineHeight = 25){
		super(x, y, 1, 1, true);
		if (arguments.length < 4) throw new Error('ArgumentError: Wrong number of arguments');
		this.text = text;
		this.maxWidth = maxWidth;
		this.lineHeight = lineHeight;
		
		this.font = Ramu.ctx.font;
		this.fillStyle = Ramu.ctx.fillStyle;
		
		this.drawOutOfCanvas = true;
	}
	
	start(){
		// this.setUp();
	}

	// Adapted from www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial
	draw(){
		let y = this.y, testWidth = 0;
		let line = '', testLine = '', metrics = null;
		
		let oldFont = Ramu.ctx.font;
		let oldStyle = Ramu.ctx.fillStyle;
		
		Ramu.ctx.font = this.font;
		Ramu.ctx.fillStyle = this.fillStyle;
		
		this._words = this.text.replace(/\n/g, " \\n ").split(' ');
		
		for(var n = 0; n < this._words.length; n++) {
			testLine = line + this._words[n] + ' ';
			metrics = Ramu.ctx.measureText(testLine);			
			testWidth = metrics.width;
			
			if (this._words[n] == "\\n"){
				Ramu.ctx.fillText(line, this.x, y);
				line = '';
				y += this.lineHeight;
				
			}
			else if (testWidth > this.maxWidth && n > 0) {
				Ramu.ctx.fillText(line, this.x, y);
				line = this._words[n] + ' ';
				y += this.lineHeight;
			}
			else {
				line = testLine;
			}
		}
		
		Ramu.ctx.fillText(line, this.x, y);
		Ramu.ctx.font = oldFont;
		Ramu.ctx.fillStyle = oldStyle;
	}
	
	// setUp(){ // break in apathy cloud
		// this._words = this.text.replace(/\n/g, " \\n ").split(' ');
	// }
}
