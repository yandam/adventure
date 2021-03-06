

Text2Speech = function() {
    _this = this;
    this.stopI = 0;

    this.stop = function() {
        this.stopI += 1

        if('androidText2Speech' in window) {
            window.androidText2Speech.stop();
        }
        else if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel()
        }
    };

    this.silence = function(time, callback) {
        if('androidText2Speech' in window) {
            window.androidText2Speech.silence(time, callback);
        }
    };

    this.speak = function(text, voice, callback)
    {
        console.debug("Voice", text, voice);

        if(voice == undefined)
            voice = {lang: 'fr-FR', sex: 'female', pitch: 1.0}



        
        callback = {
            'onStart': (callback != undefined)?callback['onStart']:undefined,
            'onEnd': (function() {
                if(this.stopI == _this.stopI && this.callback != undefined && 'onEnd' in this.callback)
                    this.callback['onEnd']()
            }).bind({callback: callback, stopI: this.stopI})
        }

        if('androidText2Speech' in window) {
            window.androidText2Speech.speak(text, voice, callback);
        }
        else if ('speechSynthesis' in window) {

            // Fix, text too long
            var textSplit = text.split(" ")
            while(textSplit.length > 50)
            {
                text = textSplit.splice(0, 50)
                textSplit.slice(0)
                this.speak(text.join(" "), voice)
            }

            // Text
            var utterance = new SpeechSynthesisUtterance(textSplit.join(" "));

            // Callbacks
            utterance.addEventListener('start', callback['onEnd'])
            utterance.addEventListener('end', callback['onStart'])

            // Language
            utterance.lang = voice['lang'];

            // Pitch
            utterance.pitch = voice['pitch'];

            // Choice voice
            if(voice['lang'] == 'fr-FR')
                voiceURI = "Google Français"
            else if(voice['lang'] == 'en-UK') {
                voiceURI = "Google UK English "
                if(voice['sex'] == 'male')
                    voiceURI += "Male"
                else
                    voiceURI += "Female"
            }
            else if(voice['lang'] == 'en-US')
                voiceURI = "Google US English"
            else
                voiceURI = "Google Français"

            // Set voice
            utterance.voiceURI = voiceURI;

            console.debug("🔊", voiceURI, ":", textSplit.join(" "))

            // onStart
            window.speechSynthesis.speak(utterance);
        }
        else {
            console.log('FAKE SPEAK', text);
        }
    };
};

var Text2Speech = new Text2Speech();


Audio2Speech  = function() {
    _this = this;
    this.stopI = 0;
    this.last = null;

    this.stop = function() {
        this.stopI += 1

        if('androidAudio2Speech' in window) {
            window.androidAudio2Speech.stop();
        }
        else
        {
            if(this.last)
                this.last.pause()
        }
    };

    this.speak = function(storyId, pos, i, callback)
    {
        console.debug("🔊", storyId, pos, i);

        callback = {
            'onStart': (callback != undefined)?callback['onStart']:undefined,
            'onEnd': (function() {
                if(this.stopI == _this.stopI && this.callback != undefined && 'onEnd' in this.callback)
                    this.callback['onEnd']()
            }).bind({callback: callback, stopI: this.stopI})
        }

        url = "data/"+storyId+"/sound/"+pos+"_"+i+".ogg"

        if('androidAudio2Speech' in window) {  
            window.androidAudio2Speech.speak(url, callback);
        } else {
            a = new Audio(url);
            this.last = a
            a.onplaying = callback.onStart
            a.onended = callback.onEnd
            a.onerror = callback.onEnd
            a.play()
        }
    };
};

var Audio2Speech = new Audio2Speech();