/// Simple abstraction to execute instructions when audio ends, and add a func to stop.
Ramu.Audio = class extends GameObj{
	constructor(src){
		super();
		if (arguments.length != 1) throw new Error('ArgumentError: Wrong number of arguments');
		this.audio = new Audio(src);
		this.isPlaying = false;
		
		var ref = this;
		this.promiseCatch = function(){
			ref.isPlaying = false;
			if (Ramu.debugMode)
				console.warn('Ramu.Audio: Cannot play if the user did not interact with the document first.')
		};
	}
	
	prepareToPlay(){
		this.audio.play().catch(this.promiseCatch);
	}
	
	play(startAt = 0){
		if (!this.canUpdate)
			return;
		this.isPlaying = true;
		this.audio.currentTime = startAt;
		this.audio.load()
		this.prepareToPlay();
	}
	
	stop(){
		this.isPlaying = false;
		this.audio.pause();
		this.audio.currentTime = 0;
	}
	
	pause(){
		this.audio.pause();
	}
	
	resume(){
		if (!this.canUpdate)
			return;
		this.prepareToPlay();
	}
	
	update(){
		if (this.isPlaying && this.audio.ended){
			this.stop();
			this.onAudioEnd();
		}
	}
		
	setActive(bool){
		super.setActive(bool);
		this.pause();
	}
	
	/// Virtual to be inherited
	onAudioEnd(){ } 
}
