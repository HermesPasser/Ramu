// ============ RAMU UTILS 1.7 - 2018-07-10 ============ //

Ramu.Utils = class Utils{
	constructor(){
		throw new Error('This is a static class');
	}
	
	/// Get a image with source
	static getImage(src){
		let img = new Image();
		img.src = src;
		return img;
	}
	
	// Move to RamuAudio soon
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
	
	/// Check if the gameObject position (x,y) is out of the canvas
	static isOutOfCanvas(gameObject){ // canvas rect starts at 0 and ends at canvas.size - 1
		return gameObject.x < 0 || gameObject.x >= Ramu.canvas.width ||
			   gameObject.y < 0 || gameObject.y >= Ramu.canvas.height;
	}
	
	/// Check if the part of gameObject size (x,y,w,h) is inside of the canvas
	static isInsidesOfCanvas(gameObject){ // canvas rect starts at 0 and ends at canvas.size - 1
		return (gameObject.x + gameObject.width) >= 0  && 
				gameObject.x < Ramu.width  &&
				(gameObject.y + gameObject.height) >= 0 &&
				gameObject.y < Ramu.height;	   
	}
	
	/// Check if object/hash is empty
	static isEmpty(obj){
		for(var key in obj)
			return false;
		return true;
	}
	
	/// Used in ramu internal to throw erros
	static CustomTypeError(instance, classToCompare){
		// esse keys é inutil pois ele retorna a palavra instance e não o nome da variavel que passei no metodo
		// criar um outro método só para converter para string e passar como parametro aqui
		return new Error("TypeError: " + Object.keys({instance})[0] + ' must be a ' + classToCompare.name + ' instance.');
	}
}
