__LETTERS__ = [ 'A', 'B', 'C', 'D' ];

__STATES__ = {

    librairy: {
        content: "contentLibrairy",
        title: "Adventure - Bibliothèque",
        menu: {},
        render: function(self, content, options) {
            //////////////////////////////////////////////////////////////////////
            // Stop Text2Speech
            Text2Speech.stop()

            //////////////////////////////////////////////////////////////////////
            // Styles
            ul = content.getElementsByTagName('ul')[0]

            // Remove children
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }

            styles = []
            for(story in __STORIES__) {
                story = __STORIES__[story];

                if('categories' in story._settings) {
                    for(categorie in story._settings.categories) {
                        categorie = story._settings.categories[categorie];
                        if(styles.indexOf(categorie) == -1)
                            styles.push(categorie);
                    }
                }
            }

            styles.sort()
            styles.unshift('tous')

            for(style in styles) {
                style = styles[style];

                li = document.createElement('li')
                li.innerHTML = style.capitalizeFirstLetter()
                classNameAppend(li, style)
                li.onclick = (function() {
                    route("librairy", this.style)
                }).bind({style: style})
                classNameAppend(li, "clickable")
                li.style.width = (100 / styles.length) + "%"
                ul.appendChild(li);

                classNameRemove(content, style);
            }

            if(options[0] == "tous" || styles.indexOf(options[0]) == -1)
            {
                selectedStyle = undefined
                classNameAppend(content, 'tous')
            }
            else
            {
                selectedStyle = options[0]
                classNameAppend(content, selectedStyle)
            }


            //////////////////////////////////////////////////////////////////////
            // Librairy
            librairy = content.getElementsByTagName('librairy')[0]

            // Remove children
            while (librairy.firstChild) {
                librairy.removeChild(librairy.firstChild);
            }

            // Create all books
            for(story in __STORIES__) {
                settings = __STORIES__[story]._settings

                if(selectedStyle == undefined || ('categories' in settings && settings.categories.indexOf(selectedStyle) != -1))
                {

                    book = document.createElement('book')

                    illustration = document.createElement('illustration')
                    bg = settings.bg || '';
                    illustration.style.backgroundImage = "url('data/"+bg+"')"
                    book.appendChild(illustration)

                    h1 = document.createElement('h1')
                    h1.innerText = settings.title
                    book.appendChild(h1)

                    synopsis = document.createElement('synopsis')
                    if(settings.synopsis)
                        synopsis.innerText = settings.synopsis
                    else
                        synopsis.innerText = "(Synopsis indisponible)"
                    book.appendChild(synopsis)
                    
                    categories = document.createElement('categories')
                    for(categorie in settings.categories) {
                        cat = document.createElement('categorie')
                        cat.innerHTML = settings.categories[categorie];
                        cat.className = settings.categories[categorie];
                        categories.appendChild(cat);
                    }
                    book.appendChild(categories);

                    background = document.createElement('background')
                    background.innerHTML = settings.icon;
                    book.appendChild(background);

                    book.onclick = (function() {
                        route('play', this.story)
                    }).bind({story: story})

                    librairy.appendChild(book)
                }
            }

        }

    },

    play: {
        content: "contentPlay",
        title: "Jouer",
        menu: {
            left: [
                { name: "<icon>📚</icon>", call: function() { route('librairy'); } }
            ],
            right: [
                { name: "<icon>🔊</icon> Répéter", call: function() { window.onhashchange() }},
                { name: "<icon>💢</icon> Annuler", call: function() { window.history.go(-1) }}
            ]
        },
        render: function(self, content, options) {

            //////////////////////////////////////////////////////////////////////
            // Stop Text2Speech
            Text2Speech.stop()

            //////////////////////////////////////////////////////////////////////
            // Status
            if(options[0] == undefined || !(options[0] in __STORIES__)) {
                console.error("No Story Id found")
                route('librairy')
                return
            }
            storyId = options[0];
            story = __STORIES__[storyId]

            // Find the current position in the story
            if(options[1] == undefined || !(options[1] in story))
                pos = 'start'
            else
                pos = options[1]

            current = story[pos]

            //////////////////////////////////////////////////////////////////////
            // Set title
            self.title = story._settings.title

            // Background
            bg = current.bg || story._settings.bg || '';
            content.style.backgroundImage = "url('data/"+bg+"')"

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

                        // Say the answer
                        Text2Speech.speak(__LETTERS__[i], voices['default']);
                        Text2Speech.speak(text, voice, { 

                            // Show button
                            onStart: (function() {
                                renderBox(this.i)
                            }).bind({i: i}),

                            // Next answer
                            onEnd: (function() {
                                sayBox(this.i)
                            }).bind({i: i+1})

                        });

                    } else
                        document.getElementById('speaking').style.display = "none"
                }
                else if('next' in current)
                    route('play', storyId, current.next)       // No action, jumping
                else
                    route("end", storyId)                      // End Story
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
            document.getElementById('speaking').onclick = function() {
                Text2Speech.stop()

                document.getElementById('speaking').style.display = "none"

                if('choices' in current) {                      // Actions
                    for(i=0; i < boxes.length && i < current.choices.length; i++) {
                        renderBox(i);
                    }
                }
                else if('next' in current)
                    route('play', storyId, current.next)        // No action
                else
                    route("end", storyId)                       // End Story
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
    },

    end: {
        content: "contentEnd",
        title: "Fin de l'histoire",
        menu: {
            left: [
                { name: "<icon>📚</icon>", call: function() { route('librairy'); } }
            ],
            right: [
                { name: "<icon>🔊</icon> Répéter", call: function() { window.history.go(-1) }},
                { name: "<icon>💢</icon> Annuler", call: function() { window.history.go(-2) }}
            ]
        },
        render: function(self, content, options) {

            if(options[0] == undefined || !(options[0] in __STORIES__)) {
                console.error("No Story Id found")
                route('librairy')
                return
            }
            storyId = options[0];

            story = __STORIES__[storyId]

            // Stop Text2Speech
            Text2Speech.stop()

            // Set title story
            self.title = story._settings.title

            // Say the end
            Text2Speech.speak('Fin !')
        }
    }
}



function route(state) {
    arguments = Array.prototype.slice.call(arguments)
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

    // Menu
    updateMenu(document.getElementById('menuLeft') , newState.menu['left'] )
    updateMenu(document.getElementById('menuRight'), newState.menu['right'])

    // Title
    document.getElementById('title').innerHTML = newState.title

    return true;
}

function updateMenu(obj, menu) {
    if(menu != {}) {
        ul = obj.children[0];

        // Remove children
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }

        // Add entries
        for(submenu in menu) {
            li = document.createElement('li')
            li.innerHTML = menu[submenu].name
            li.onclick = menu[submenu].call
            ul.appendChild(li);
        }

        // Show
        obj.style.display = ""
    } else {
        // Hide
        obj.style.display = "none"
    }
}




window.onhashchange = function(e) {
    states = document.location.hash.split("#").slice(1)

    if(states.length == 0)
        states = ['librairy']

    switchState(states[0], states.slice(1)) 
}

// Restore last state or home
window.onhashchange()