
__WORDS__ = [
    ['a', 'à', 'ah', 'bleu', 'bleue'],
    ['b', 'bé', 'baie', 'vert', 'vers', 'ver', 'verte'],
    ['c', 'c\'est', 'sais', 'jaune', 'orange'],
    ['d', 'dé', 'des', 'rouge']
]

SpeechRecognition = function() {

    this.stop = function() {
       
        if('androidSpeechRecognition' in window) {
            window.androidSpeechRecognition.stop();
        }
        /*else if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel()
        }*/
    };

    this.start = function(callback)
    {
        console.debug("Recognition", text, voice);

        if(callback != undefined)
        {
            callback = (function(status, values) {
                console.log("Callback")
                console.log(values)
                i = 0;
                answer = undefined;

                while(answer == undefined && values != undefined && i < values.length) {
                    words = values[i].toLowerCase().split(' ')
                    j = 0;
                    while(answer == undefined && j < __WORDS__.length) {
                        k = 0;
                        while(answer == undefined && k < __WORDS__[j].length) {
                            if(words[j].indexOf(__WORDS__[j][k]) != -1)
                                answer = j;
                            else
                                k++;
                        }
                        j++;
                    }
                    i++;
                }

                this.callback(answer);

            }).bind({callback: callback})
        }

        if('androidSpeechRecognition' in window) {
            //.debug(callback)
            window.androidSpeechRecognition.start(callback);
        }
        else
        {
            console.warn("No SpeechRecognition, bypassing...")
            if(callback != undefined)
                callback([])
        }
        /*else if ('speechSynthesis' in window) {
    
        }
       */
    };
};

var SpeechRecognition = new SpeechRecognition();
