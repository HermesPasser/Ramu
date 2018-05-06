class RamuUtils{
	constructor(){
		throw new Error('This is a static class');
	}
	
	/// Get a image with source
	static getImage(src){
		let img = new Image();
		img.src = src;
		return img;
	}
	
	static playSound(sound, volume = null){
		if (volume != null)
			sound.volume = volume;
		
		const playPromise = sound.play();
		if (playPromise !== null){
			
			playPromise.catch( () => { 
				sound.play();
			});
		}
	}
	
	/// Check if image is loaded
	static imageIsLoaded(img){
		if (!(img instanceof Image)) return false;
		return img.complete && img.naturalWidth !== 0 && img.naturalHeight !== 0;
	}
		
	static isOutOfCanvas(gameObject){
		return gameObject.x < 0 || gameObject.x > Ramu.canvas.width ||
			   gameObject.y < 0 || gameObject.y > Ramu.canvas.height;
	}
	
	static CustomTypeError(instance, classToCompare){
		return new Error("TypeError: " + Object.keys({instance})[0] + ' must be a ' + classToCompare.name + ' instance.');
	}

}