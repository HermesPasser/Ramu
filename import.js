// Simple script to import latest ramu from github

function getCode(url){
	var request = new XMLHttpRequest();
	request.open('GET', url, false);
	request.send();
	return request.responseText;
}

function importRamu(){
	var rawText = getCode('https://raw.githubusercontent.com/HermesPasser/Ramu/master/Ramu.js');
	var scriptTag = document.createElement('script');
	scriptTag.setAttribute('type', 'text/javascript');
	scriptTag.innerHTML = rawText;
	document.body.appendChild(scriptTag);
}
