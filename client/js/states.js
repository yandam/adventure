__LETTERS__ = [ 'A', 'B', 'C', 'D' ];

__STATES__ = {

    home: {
        content: "contentHome",
        render: function(self, content, options) {
            //////////////////////////////////////////////////////////////////////
            // Stop Voice
            Text2Speech.stop()
            SpeechRecognition.stop();
        }
    },
    profile: {
        content: "contentProfile",
        render: function(self, content, options) {
        }
    },
    options: {
        content: "contentOptions",
        render: function(self, content, options) {

            form = content.getElementsByTagName('form')[0]
            // Remove children
            while (form.firstChild) {
                form.removeChild(form.firstChild);
            }

            addOption = function(key, title, description) {

                // Recognition
                label = document.createElement('label')
                h1 = document.createElement('h1')
                h1.innerHTML = title
                descrip = document.createElement('description')
                descrip.innerHTML = description
                label.appendChild(h1)
                label.appendChild(descrip)

                input = document.createElement('input')
                input.type = "checkbox"
                input.name = key

                if(Storage.get(key))
                    input.checked = "checked"

                input.onchange = function(e) {
                    Storage.set(this.name, this.checked)
                }

                label.appendChild(input);
                form.appendChild(label);
            }

            addOption('activeRecognition', 'Reconnaissance vocale', 'Activer la reconnaissance vocale pour le choix des réponses.')
            //addOption('activeNightMode', 'Mode nuit', 'Activer le passage automatique en mode nuit.')

        }
    },
    shopping: {
        content: "contentShopping",
        render: function(self, content, options) {
        }
    },
    filters: {
        content: "contentFilters",
        render: function(self, content, options) {

            //////////////////////////////////////////////////////////////////////
            // Catégorie
            categories = []
            for(story in __STORIES__) {
                story = __STORIES__[story];

                if('categories' in story._settings) {
                    for(categorie in story._settings.categories) {
                        categorie = story._settings.categories[categorie];
                        if(categories.indexOf(categorie) == -1)
                            categories.push(categorie);
                    }
                }
            }

            categories.sort()

            form = content.getElementsByTagName('form')[0]
            // Remove children
            while (form.firstChild) {
                form.removeChild(form.firstChild);
            }

            st = Storage.get('filters')

            for(categorie in categories) {
                label = document.createElement('label')
                label.innerHTML = categories[categorie].capitalizeFirstLetter()

                input = document.createElement('input')
                input.type = "checkbox"
                input.value = categories[categorie]

                if(st.indexOf(categories[categorie]) != -1)
                    input.checked = "checked"

                input.onchange = function(e) {
                    st = Storage.get('filters')
                    if(this.checked && st.indexOf(this.value) == -1) 
                        st.push(this.value)
                    else if(!this.checked && st.indexOf(this.value) != -1)
                        st.splice(st.indexOf(this.value), 1)
                    Storage.set('filters', st)
                }

                label.appendChild(input);
                form.appendChild(label);
            }


        }
    },
    details: {
        content: "contentDetails",
        render: function(self, content, options) {
            //////////////////////////////////////////////////////////////////////
            // Stop Voice
            Text2Speech.stop()
            SpeechRecognition.stop();

            //////////////////////////////////////////////////////////////////////
            // Status
            if(options[0] == undefined || !(options[0] in __STORIES__)) {
                console.error("No Story Id found")
                route('library')
                return
            }
            storyId  = options[0]
            story    = __STORIES__[storyId]
            settings = story._settings
            state    = story._state

            illustration = content.getElementsByTagName('illustration')[0]
            bg = settings.bg || '';
            illustration.style.backgroundImage = "url('data/"+bg+"')"

            h1 = content.getElementsByTagName('h1')[0]
            h1.innerText = settings.title

            author = content.getElementsByTagName('author')[0]
            author.innerText = settings.author

            price = content.getElementsByTagName('price')[0]
            if(settings.price == undefined || settings.price == 0)
                price.innerText = "Gratuit"
            else
                price.innerText = settings.price+"€"

            synopsis = content.getElementsByTagName('synopsis')[0]
            synopsis.innerText = settings.synopsis
            
            categories = content.getElementsByTagName('categories')[0]
            // Remove children
            while (categories.firstChild) {
                categories.removeChild(categories.firstChild);
            }
            for(categorie in settings.categories) {
                cat = document.createElement('categorie')
                cat.innerHTML = settings.categories[categorie];
                categories.appendChild(cat);
            }

            btns = content.getElementsByTagName('buttons')[0]
            // Remove children
            while (btns.firstChild) {
                btns.removeChild(btns.firstChild);
            }

            if(!state.downloaded) {
                btn_download = document.createElement('button')
                if(settings.price == undefined || settings.price == 0)
                    btn_download.innerHTML = "Télécharger";
                else
                    btn_download.innerHTML = "Acheter";
                btns.appendChild(btn_download);
            } else  {
                btn_play = document.createElement('button')
                btn_play.innerHTML = "Jouer";
                btn_play.onclick = (function() {
                    route('play', this.story)
                }).bind({story: story})
                btns.appendChild(btn_play);
            }

        }
    },
    library: {
        content: "contentLibrary",
        render_book: function(story, modePlay) {
            settings = __STORIES__[story]._settings
            state   = __STORIES__[story]._state

            book = document.createElement('book')

            illustration = document.createElement('illustration')
            bg = settings.bg || '';
            illustration.style.backgroundImage = "url('data/"+bg+"')"
            book.appendChild(illustration)

            h1 = document.createElement('h1')
            h1.innerText = settings.title
            book.appendChild(h1)
            
            if(!modePlay) {
                categories = document.createElement('categories')
                for(categorie in settings.categories) {
                    cat = document.createElement('categorie')
                    cat.innerHTML = settings.categories[categorie].capitalizeFirstLetter();
                    categories.appendChild(cat);
                }
                book.appendChild(categories);
            }

            btns = document.createElement('buttons')

            if(!state.downloaded) {
                btn_download = document.createElement('button')
                if(settings.price == undefined || settings.price == 0)
                    btn_download.innerHTML = "Télécharger";
                else
                    btn_download.innerHTML = "Acheter "+settings.price+"€";
                btns.appendChild(btn_download);
            } else  {
                btn_play = document.createElement('button')

                stories = Storage.get('stories')
                if(story in stories) {
                    left = document.createElement('left')
                    left.innerHTML = "Continuer"
                    right = document.createElement('right')
                    p = Math.round(progression(__STORIES__[story], stories[story].historyKey) * 100)
                    if(modePlay) {
                        left.className = "big"
                        right.innerHTML = getDate(new Date(stories[story].lastDate))
                        h1 = document.createElement('h1')
                        h1.innerHTML = p + "%"
                        right.appendChild(h1)
                    } else {
                        right.innerHTML = p + "%"
                    }
                    btn_play.appendChild(left)
                    btn_play.appendChild(right)
                } else {
                    btn_play.innerHTML = "Jouer";
                }
                
                btn_play.onclick = (function() {
                    route('play', this.story)
                }).bind({story: story})
                btns.appendChild(btn_play);

                if(modePlay && story in stories) {
                    btn_replay = document.createElement('button')
                    btn_replay.innerHTML = "Recommencer"
                    btn_replay.onclick = (function() {
                        resetStory(this.story)
                        route('play', this.story)
                    }).bind({story: story})
                    btns.appendChild(btn_replay);

                }
            }

            if(!modePlay) {
                btn_details = document.createElement('button')
                btn_details.innerHTML = "Détails";
                btn_details.onclick = (function() {
                        route('details', this.story)
                    }).bind({story: story})
                btns.appendChild(btn_details);
            }

            book.appendChild(btns);

            return book
        },
        render: function(self, content, options) {
            //////////////////////////////////////////////////////////////////////
            // Stop Voice
            Text2Speech.stop()
            SpeechRecognition.stop();

            //////////////////////////////////////////////////////////////////////
            // Filtres
            selectedStyle = Storage.get('filters')

            filters = content.getElementsByTagName('h2')[0]

            if(selectedStyle.length == 0)
                filters.innerHTML = "Tous"
            else if(selectedStyle.length == 1)
                filters.innerHTML = selectedStyle[0].capitalizeFirstLetter()
            else
                filters.innerHTML = "Multiples"



            //////////////////////////////////////////////////////////////////////
            // Library
            library = content.getElementsByTagName('library')[0]

            // Remove children
            while (library.firstChild) {
                library.removeChild(library.firstChild);
            }

            // Create all books
            for(story in __STORIES__) {
                settings = __STORIES__[story]._settings
                state   = __STORIES__[story]._state

                show = false
                if(selectedStyle.length == 0 || !('categories' in settings))
                    show = true

                l = selectedStyle.length
                while(!show && l >= 0) {
                    if(settings.categories.indexOf(selectedStyle[l]) != -1)
                        show = true
                    else
                        l -= 1
                }


                if(show)
                {
                    book = self.render_book(story)
                    

                    library.appendChild(book)
                }
            }
        }
    },
    histories: {
        content: "contentHistories",
        render: function(self, content, options) {
            //////////////////////////////////////////////////////////////////////
            // Stop Voice
            Text2Speech.stop()
            SpeechRecognition.stop();

            //////////////////////////////////////////////////////////////////////
            // Library
            library = content.getElementsByTagName('library')[0]

            // Remove children
            while (library.firstChild) {
                library.removeChild(library.firstChild);
            }

            stories = Storage.get('stories')
            // Create all books
            for(story in __STORIES__) {
            
                if(story in stories)
                {
                    book = __STATES__.library.render_book(story, true)

                    library.appendChild(book)
                }
            }
        }
    },
    play: {
        content: "contentPlay",
        title: "Jouer",
        render: function(self, content, options) {

            //////////////////////////////////////////////////////////////////////
            // Stop Text2Speech
            Text2Speech.stop()
            SpeechRecognition.stop()

            //////////////////////////////////////////////////////////////////////
            // Status
            if(options[0] == undefined || !(options[0] in __STORIES__)) {
                console.error("No Story Id found")
                route('library')
                return
            }
            storyId = options[0]
            story = __STORIES__[storyId]

            ///////////////////////////////////////////////////////////////////////
            // Recover story
            
            // Find the current position in the story
            if(options[1] == "__end__")
                pos = "__end__"
            else if(options[1] == undefined || !(options[1] in story))
                pos = 'start'
            else
                pos = options[1]

            // History
            stories = Storage.get('stories')
            if(storyId in stories) {
                historyKey = stories[storyId].historyKey
                if(historyKey[historyKey.length - 1] != pos)
                    historyKey.push(pos)
            } else {
                stories[storyId] = {
                    startDate: new Date()
                }
                historyKey = [pos]
            }

            stories[storyId].historyKey = historyKey
            stories[storyId].lastDate = new Date()
            Storage.set('stories', stories)


            // Progression
            p = progression(story, historyKey) * 100
            content.getElementsByTagName("progressDigit")[0].innerText = Math.round(p) + "%"
            content.getElementsByTagName("progress")[0].value = p


            end = content.getElementsByTagName("end")[0]
            speak = content.getElementsByTagName("speak")[0]
            boxes = content.getElementsByTagName("boxes")[0]

            if(pos == "__end__") {

                end.style.display = "block"
                speak.style.display = "none"
                boxes.style.display = "none"

                btn = end.getElementsByTagName('button')[0]
                btn.onclick = function() {
                    resetStory(storyId)
                    route('play', storyId)
                }


            } else {

                end.style.display = "none"
                speak.style.display = "block"
                boxes.style.display = "block"
                current = story[pos]
           
                self.makingChoice = false;

                //////////////////////////////////////////////////////////////////////
                // Set title
                self.title = story._settings.title
                content.getElementsByTagName("h1")[0].innerText = current.title || self.title

                // Illustration
                bg = current.bg || story._settings.bg || '';
                content.getElementsByTagName('illustration')[0].style.backgroundImage = "url('data/"+bg+"')"

            

                //////////////////////////////////////////////////////////////////////
                // Load voices
                voices = story._settings.voices;

                if(voices == undefined)
                    return console.error("Missing voices in _settings")

                if(!('default' in voices))
                    return console.error("Missing 'default' voices in _settings")
                
                //////////////////////////////////////////////////////////////////////
                // Render box
                boxes = content.getElementsByTagName('box')

                renderBox = function(i) {
                    boxObj = boxes[i];

                    txt = current.choices[i].show || current.choices[i].short ||current.choices[i].message
                    boxObj.getElementsByTagName('text')[0].innerText = txt
                    classNameAppend(boxObj,"clickable")
                    boxObj.style.visibility = ""
                    
                    boxObj.onclick = (function() {
                        route('play', this.storyId, this.pos)
                    }).bind({storyId: storyId, pos: current.choices[i].next})
                }
                
                sayBox = function(i) {
                    if('choices' in current)
                    {
                        if(i in current.choices)
                        {
                            // Get text and voice from object
                            if(!('text' in current.choices[i]) && !('message' in current.choices[i]))
                                return console.error("Missing text in story", current)

                            if(typeof current.choices[i].text == 'string' || typeof current.choices[i].message == 'string') {
                                text  = current.choices[i].text || current.choices[i].message 
                                voice = current.choices[i].voice
                            } else if(typeof current.choices[i].text == 'object') {
                                text  =  current.choices[i].text[0].t
                                voice = current.choices[i].text[0].v
                            } else 
                                return console.error("Missing text in choices", current)

                            // Voice choice
                            voice = voice || 'default'

                            if(voice in voices)
                                voice = voices[voice]
                            else {
                                voice = voices['default']
                                console.warn("Missing voice attributes for ", voice)
                            }

                            // Show question
                            if(i == 0) {
                                content.getElementsByTagName("h1")[0].innerText = current.show || current.short || current.title ||  story._settings.title
                            }


                            // Say the answer
                            Text2Speech.speak(__LETTERS__[i], voices['default'],{
                                // Show button
                                onStart: (function() {
                                    renderBox(this.i)
                                }).bind({i: i}),
                            });
                            Text2Speech.speak(text, voice, { 
                                // Next answer
                                onEnd: (function() {
                                    sayBox(this.i)
                                }).bind({i: i+1})

                            });

                        } else {
                            self.makingChoice = true;
                            document.getElementById('speaking').style.display = "none"
                            if(Storage.get('activeRecognition')) {
                                SpeechRecognition.start(function(value) {
                                    console.debug('SpeechRecognition', value)
                                    if(value != undefined && value in current.choices)
                                        boxes[value].onclick()
                                })
                            }
                        }
                    }
                    else if('next' in current)
                        route('play', storyId, current.next)       // No action, jumping
                    else
                        route("play", storyId, "__end__")          // End Story
                }

                // Reset all
                for(i=0; i < boxes.length; i++) {
                    boxObj = boxes[i];
                    boxObj.style.visibility = "hidden"
                    //boxObj.getElementsByTagName('text')[0].innerText = ""
                    //classNameRemove(boxObj, "clickable")
                    //boxObj.onclick = undefined
                }

                //////////////////////////////////////////////////////////////////////
                // Stop speaking 
                document.getElementById('centerButton').onclick = function() {
                    Text2Speech.stop()
                    SpeechRecognition.stop()

                    if(self.makingChoice)
                        window.onhashchange()
                    else
                    {
                        self.makingChoice = true;
                        document.getElementById('speaking').style.display = "none"
                        content.getElementsByTagName("h1")[0].innerText = current.show || current.short || current.title ||  story._settings.title
                           
                        if('choices' in current) {                      // Actions
                            for(i=0; i < boxes.length && i < current.choices.length; i++) {
                                renderBox(i);
                            }
                        }
                        else if('next' in current)
                            route('play', storyId, current.next)        // No action
                        else
                            route("play", storyId, "__end__")           // End Story
                    }
                }

                // Show speaking icon
                document.getElementById('speaking').style.display = "";

                //////////////////////////////////////////////////////////////////////
                // Speaking the text
                sayText = function(i) {
                    if(!('text' in current))
                        return console.error("Missing text in story", current)

                    if(typeof current.text == 'string') {
                        text  = current.text
                        voice = current.voice
                        length = 1
                    } else if(typeof current.text == 'object') {
                        text  =  current.text[i].t
                        voice = current.text[i].v
                        length = current.text.length
                    } else 
                        return console.error("Missing text in choices", current)

                    if(voice == undefined || !(voice in voices))
                        voice = voices['default']
                    else
                        voice = voices[voice]

                    if(i == (length - 1))  // Last text
                        Text2Speech.speak(text, voice, {
                            // Show answers
                            onEnd: function() {
                                sayBox(0)
                            }
                        });
                    else
                        Text2Speech.speak(text, voice, {
                            onEnd: (function() {
                                sayText(this.i)
                            }).bind({i: i+1})
                        });
                }

                // Start speaking
                sayText(0)

            }
        }
    },
}



function route(state) {
    arguments = Array.prototype.slice.call(arguments)
    hash = document.location.hash.split("#").slice(1)

    if(arguments[0] == hash[0] && arguments[1] == hash[1])
        // Rerender if the page and the firt option is the same (usefull for play)
        switchState(arguments[0], arguments.slice(1))
    else
        document.location.hash = arguments.join('#')
}




function switchState(newState, options) {

    // Existing state 
    if(!(newState in __STATES__))
    {
        console.error("Unknown state", newState)
        return false;
    }

    newState = __STATES__[newState];

    // Content
    for(state in __STATES__) {
        state = __STATES__[state];
        document.getElementById(state.content).style.display = "none"
    }

    document.getElementById(newState.content).style.display = ""

    // Render
    if('render' in newState)
        newState.render(newState, document.getElementById(newState.content), options)

    // Scroll
    if(document.getElementById(newState.content).getElementsByTagName("scroll").length > 0)
    {
        right = document.getElementById(newState.content).getElementsByTagName("right")[0];
        scroll = function(direction) {

            right.scrollTop += direction * (right.offsetHeight + 5)

        }

        scrollDiv = document.getElementById(newState.content).getElementsByTagName("scroll")[0].children;
        scrollDiv[0].onclick = function() {
            scroll(-1);
        }
        scrollDiv[1].onclick = function() {
            scroll(+1);
        }
    }

    return true;
}

window.onhashchange = function(e) {
    states = document.location.hash.split("#").slice(1)

    if(states.length == 0)
        states = ['home']

    switchState(states[0], states.slice(1)) 
}

// Restore last state or home
window.onhashchange()