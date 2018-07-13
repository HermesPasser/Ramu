/// Simple abstraction to execute instructions when audio ends, and add a func to stop.
Ramu.Audio = class extends GameObj{
	constructor(src){
		super();
		if (arguments.length != 1) throw new Error('ArgumentError: Wrong number of arguments');
		this.audio = new Audio(src);
		this.isPlaying = false;
	}

	play(startAt = 0){
		this.isPlaying = true;
		this.audio.currentTime = startAt;
		this.audio.play();
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
		this.audio.play();
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
