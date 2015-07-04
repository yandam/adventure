
/*************************************************************************************
 * Text2Speech
 * Text -> Voice
 * JS - Android interface
 *************************************************************************************/
Text2Speech = function()  {

	callbackMap = {};

	/**
	 * Speak a sentence
	 * @param  {String}   text     The sentence to spell
	 * @param  {Function} callback Callback function to return status. callback(status). status = 0 when started, 1 when error occured, 2 when the sentence is finished
	 */
	this.speak = function(text, callback)
	{
		id = window.AndroidTextToSpeech.speak(text);
		callbackMap[id] = callback;
	}

	/**
	 * Add a silence
	 * @param  {[type]}   time     Time in millisecond
	 * @param  {Function} callback  Callback function to return status. callback(status). status = 0 when started, 1 when error occured, 2 when the sentence is finished
	 */
	this.silence = function(time, callback)
	{
		id = window.AndroidTextToSpeech.slience(time);
		callbackMap[id] = callback;
	}

	/**
	 * Stop the voice
	 */
	this.stop = function()
	{
		window.AndroidTextToSpeech.stop()
	}

	/**
	 * Set the level of the voice pitch
	 * @param {[float]} pitch Pitch coefficient
	 */
	this.setPitch = function(pitch)
	{
		window.AndroidTextToSpeech.setPitch(pitch)
	}

	/**
	 * Android callback
	 * Do not call directly
	 */
	this.AndroidCallback = function(id, status)
	{
		if(callbackMap[id] != undefined)
		{
			callbackMap[id](status);
		}
	}

}
var Text2Speech = new Text2Speech();

