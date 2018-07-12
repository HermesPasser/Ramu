// ============ RAMU DESTROY 1.7 - 2018-06-30 ============ //

// TODO
// não ta deletando todos os que tem canDestroy = true, ele entra no laço umas duas vezes e sai mesmo não tendo break
// desistir disso, usando o hash também não é bom já que sortear a prioridade é zoado
// tentar fazer algo como usar o instanceof para iterar dentro do game object mesmo quando tentar remover
// o drawable e collisor?
Ramu.destroyObjs = function(){
	for (var d in Ramu.gameObjs) console.log(Ramu.gameObjs[d])
			console.log(Ramu.gameObjs)
	for (let i = 0; i < Ramu.gameObjs.length; i++){
		console.log(Ramu.gameObjs[i])
		if (Ramu.gameObjs[i].canDestroy){
			
			console.log(Ramu.gameObjs[i])

			if (Ramu.gameObjs[i] instanceof Drawable)
				Ramu.removeDrawable(Ramu.gameObjs[i]);
			
			if (Ramu.gameObjs[i] instanceof Collisor)
				Ramu.removeCollisor(Ramu.gameObjs[i]);
			
			Ramu.gameObjs.splice(i, 1);
		}
	}
	console.log(Ramu.gameObjs)

}

Ramu.removeDrawable = function(parentObj){
	for (let i = 0; i < Ramu.objsToDraw.length; i++){
		if (Ramu.objsToDraw[i] === parentObj){
			Ramu.objsToDraw.splice(i, 1);
			break;
		}
	}
}

Ramu.removeCollisor = function(parentObj){
	for (let i = 0; i < Ramu.objsToCollide.length; i++){
		if (Ramu.objsToCollide[i] === parentObj){
			Ramu.objsToCollide.splice(i, 1);
			break;
		}
	}
}

Ramu.getChildren = function(parentObj){
	var childs = [];
	Object.keys(parentObj).forEach(function(key) {
		if (parentObj[key] instanceof GameObj)
			childs.push(parentObj[key]);
		
	});
	
	return childs;
}
