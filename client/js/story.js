__STORIES__  = {}


function progression(story, historyKeys) {

	nbPass = historyKeys.length;

	if(historyKeys[nbPass - 1] == "__end__")
		return 1;

	nbMax = Object.keys(story.story).length - 2;

	return nbPass/nbMax;

}

function resetStory(story) {
	stories = Storage.get("stories")
    delete stories[story]
    Storage.set("stories", stories)
}

function getAjax() {
	var ajax = null;
	try {
		ajax = new XMLHttpRequest();
	}
	catch(e) {
		ajax = new ActiveXObject("Msxml2.XMLHTTP");
	}

	return ajax
}

function getJSON(url, callback) {
	ajax = getAjax()
	
	ajax.onreadystatechange = function() {
		if(ajax.readyState == 4) { // && ajax.status == 200
			callback(JSON.parse(ajax.responseText))
		}
	}


	ajax.open('GET', url, false); // Sync mode
	ajax.setRequestHeader("Content-type","application/xhtml+xml");
	ajax.setRequestHeader("cache-control", "no-cache");
	ajax.crossDomain = true;
	ajax.send(null);
}

function loadStory(id, download) {
	__STORIES__[id] = {}

	getJSON("data/"+id+"/header.json", function(json) {
		__STORIES__[id].header = json
		console.log(__STORIES__[id])
	})

	if(download) {
		getJSON("data/"+id+"/story.json", function(json) {
			__STORIES__[id].story = json
		})
	}

	if(!("state" in __STORIES__[id]))
		__STORIES__[id].state = {}
		
	__STORIES__[id].state.downloaded = download
}

function buyStory(id) {

	loadStory(id, true)
	__STORIES__[id].state.bought = true

}

function removeStory(id) {
	console.debug(id)
	if(id in __STORIES__) {
		__STORIES__[id].state.downloaded = false
		delete __STORIES__[id].story
	}
}

buyStory("valise")
buyStory("crown")
loadStory("quizz", false)
loadStory("tea", false)
loadStory("camille", false)