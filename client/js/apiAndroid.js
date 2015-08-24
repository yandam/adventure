
if(window.AndroidMirrorLink != undefined)
	window.androidApp = window.AndroidMirrorLink.getAndroidVersion();
else
	window.androidApp = false
console.info("AndroidApp : " + window.androidApp);

/*************************************************************************************
 * Text2Speech
 * Text -> Voice
 * JS - Android interface
 *************************************************************************************/
if(window.AndroidTextToSpeech)
{
	AndroidText2Speech = function()  {

		callbackMap = {};

		/**
		 * Speak a sentence
		 * @param  {String}   text     The sentence to spell
		 * @param  {Function} callback Callback function to return status. callback(status). status = 0 when started, 1 when error occured, 2 when the sentence is finished
		 */
		this.speak = function(text, voice, callback)
		{
			if(voice != undefined && 'pitch' in voice)
				pitch = voice.pitch;
			else
				pitch = 1;

			if(voice != undefined && 'rate' in voice)
				rate = voice.rate;
			else
				rate = 1;

			if(voice.lang == "fr-FR")
				voice = "FR"
			else
				voice = "EN"

			id = window.AndroidTextToSpeech.speak(text, voice, pitch, rate);

			// TODO Voice
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
				if(status == 0 && callbackMap[id]['onStart'] != undefined)
					callbackMap[id]['onStart']();
				else if(status == 2 && callbackMap[id]['onEnd'] != undefined)
					callbackMap[id]['onEnd']();
				//callbackMap[id](status);
			}
		}

	}

	androidText2Speech = new AndroidText2Speech();
}

/*************************************************************************************
 * Audio2Speech
 * Audio -> Voice
 * JS - Android interface
 *************************************************************************************/
if(window.AndroidAudioToSpeech)
{
	AndroidAudio2Speech = function()  {

		callbackMap = {};

		/**
		 * Speak a sentence
		 * @param  {String}   text     The sentence to spell
		 * @param  {Function} callback Callback function to return status. callback(status). status = 0 when started, 1 when error occured, 2 when the sentence is finished
		 */
		this.speak = function(url, callback)
		{
			
			id = window.AndroidAudioToSpeech.play(url);

			if(id == -1) {
				if(callback != undefined && 'onEnd' in callback)
					callback['onEnd']();
			} else {
				callbackMap[id] = callback;
				if('onStart' in callback && callback['onStart'] != undefined)
					callback['onStart']();
			}

		}

		/**
		 * Stop the voice
		 */
		this.stop = function()
		{
			window.AndroidAudioToSpeech.stop()
		}

		/**
		 * Android callback
		 * Do not call directly
		 */
		this.AndroidCallback = function(id, status)
		{
			if(callbackMap[id] != undefined && 'onEnd' in callbackMap[id])
			{
				callbackMap[id]['onEnd']();
			}
		}

	}

	androidAudio2Speech = new AndroidAudio2Speech();
}

/*************************************************************************************
 * SpeechRecognition
 * Voice -> Text
 * JS - Android interface
 *************************************************************************************/
if(window.AndroidSpeechRecognition) {

	AndroidSpeechRecognitionClient = function() {

		callback = undefined;

		/**
		 * Start a SpeechRecognition
		 * @param  {Function} callback Callback method for the answer. callback(status, answerText)
		 */
		this.start = function(callback) {

			this.callback = callback;
			window.AndroidSpeechRecognition.start();

		}

		this.stop = function() {
			window.AndroidSpeechRecognition.stop();
		}

		/**
		 * Android callback
		 * Do not call directly
		 */
		this.AndroidCallback = function(status, answerText)
		{
			if(this.callback != undefined)
			{
				this.callback(status, answerText);
			}
		}

	}

	androidSpeechRecognition = new AndroidSpeechRecognitionClient();
}


/*************************************************************************************
 * MirrorLink
 * JS - Android interface
 *************************************************************************************/
if(window.AndroidMirrorLink)
{
	MirrorLink = function() {

		sessionState 	= undefined;
		nightMode 		= undefined;
		driveMode 		= undefined;
		audioBlocked	= false;
		frameBlocked	= false;


		/**
		 * Return if the night mode is activate
		 * @type {Boolean}
		 */
		this.isNightMode = function() {
			return window.AndroidMirrorLink.isNightMode();
		}

		/**
		 * Return if the vehicule is in mouvement
		 * @type {Boolean}
		 */
		this.isDriveMode = function() {
			return window.AndroidMirrorLink.isDriveMode;
		}

		/**
		 * Return if there is a connection with mirrorlink
		 * @type {Boolean}
		 */
		this.isSessionEstablished = function() {
			return window.AndroidMirrorLink.isSessionEstablished;
		}


		/**
		 * Android callback
		 * Do not call directly
		 */
		this.AndroidSetSessionState = function(status)
		{
			this.sessionState = status;
			if(this.onSessionState != undefined)
			{
				this.onSessionState(status);
			}
		}

		/**
		 * Android callback
		 * Do not call directly
		 */
		this.AndroidSetNightMode = function(status)
		{
			this.nightMode = status;
			if(this.onNightMode != undefined)
			{
				this.onNightMode(status);
			}
		}

		/**
		 * Android callback
		 * Do not call directly
		 */
		this.AndroidSetDriveMode = function(status)
		{
			this.driveMode = status;
			if(this.onDriveMode != undefined)
			{
				this.onDriveMode(status);
			}
		}

		/**
		 * Android callback
		 * Do not call directly
		 */
		this.AndroidSetFramebufferBlocked = function(status, reason)
		{
			this.frameBlocked = status;
			if(this.onFramebufferBlocked != undefined)
				this.onFramebufferBlocked(status, reason);
		}
		/**
		 * Android callback
		 * Do not call directly
		 */
		this.AndroidSetAudioBlocked = function(status, reason)
		{
			this.audioBlocked = status;
			if(this.onAudioBlocked != undefined)
				this.onAudioBlocked(status, reason);
		}

	}

	mirrorLink = new MirrorLink();

}