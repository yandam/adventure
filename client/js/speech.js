

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
        console.debug("Voice", text);

        if('androidText2Speech' in window) {
            window.androidText2Speech.speak(text, voice, callback);
        }
        else if ('speechSynthesis' in window) {
            var utterance = new SpeechSynthesisUtterance(text);

            utterance.onend = (function() {
                if(this.stopI == _this.stopI && this.callback != undefined && 'onEnd' in this.callback)
                    this.callback['onEnd']()
            }).bind({callback: callback, stopI: this.stopI})

            if(callback != undefined && 'onStart' in callback)
                utterance.onstart = callback['onStart']

            window.speechSynthesis.speak(utterance);
        }
        else {
            console.log('FAKE SPEAK', text);
        }
    };
};

var Text2Speech = new Text2Speech();
