

Text2Speech = function() {

    this.stop = function() {
        if('androidText2Speech' in window) {
            window.androidText2Speech.stop();
        }
    };

    this.silence = function(time, callback) {
        if('androidText2Speech' in window) {
            window.androidText2Speech.silence(time, callback);
        }
    };

    this.speak = function(text, voice, callback)
    {
        console.debug("Voice", text);

        if('androidText2Speech' in window) {
            window.androidText2Speech.speak(text, voice, callback);
        }
        else if ('speechSynthesis' in window) {
            var utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
            if(callback != undefined) {
                if(callback['onStart'] != undefined)
                    setTimeout(callback['onStart'],1000);
            }
        }
        else {
            console.log('FAKE SPEAK', text);
        }
    };
};

var Text2Speech = new Text2Speech();
