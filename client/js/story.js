function progression(story, historyKeys) {

	nbPass = historyKeys.length;

	if(historyKeys[nbPass - 1] == "__end__")
		return 1;

	nbMax = Object.keys(story).length - 2;

	return nbPass/nbMax;

}

function resetStory(story) {
	stories = Storage.get("stories")
    delete stories[story]
    Storage.set("stories", stories)
}