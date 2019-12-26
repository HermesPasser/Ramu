
Ramu.Text = class extends Drawable {
	constructor(text, x, y, maxWidth, lineHeight = 25){
		super(x, y, 1, 1, true);
		if (arguments.length < 4) throw new Error('ArgumentError: Wrong number of arguments');
		this.text = text;
		this.maxWidth = maxWidth; // this don't break the line in the middle of a word
		this.lineHeight = lineHeight;
		
		this.font = Ramu.ctx.font;
		this.fillStyle = Ramu.ctx.fillStyle;
		
		this.drawOutOfCanvas = true;
	}
	
	get textWidth() {
		return Ramu.ctx.measureText(this.text).width;  // probably not work when _addLineBreak breaks the lines
	}
	
	start(){
		// this._addLineBreak();
	}

	// Adapted from www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial
	draw(){
		let y = this.y, testWidth = 0;
		let line = '', testLine = '', metrics = null;
				
		Ramu.ctx.font = this.font;
		Ramu.ctx.fillStyle = this.fillStyle;
		
		this._words = this.text.replace(/\n/g, " \\n ").split(' ');
		
		for(var n = 0, len = this._words.length; n < len; ++n) {
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
	}
	
	_addLineBreak(){ // throwin exception in apathy cloud
		this._words = this.text.replace(/\n/g, " \\n ").split(' ');
	}
}
