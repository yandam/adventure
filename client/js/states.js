__LETTERS__ = [ 'A', 'B', 'C', 'D' ];

__STATES__ = {

    librairy: {
        content: "contentLibrairy",
        title: "Adventure - Bibliothèque",
        menu: {},
        render: function(self, content, options) {

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
                //li.style.fontSize = Math.min(100, (10 / style.length * 70)) + "%"
                ul.appendChild(li);

                classNameRemove(content, style);
                //classNameRemove(ul, style);
            }

            if(options[0] == "tous" || styles.indexOf(options[0]) == -1)
            {
                selectedStyle = undefined
                classNameAppend(content, 'tous')
                //classNameAppend(ul, 'tous')
            }
            else
            {
                selectedStyle = options[0]
                classNameAppend(content, selectedStyle)
                //classNameAppend(ul, selectedStyle)
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

            if(options[0] == undefined || !(options[0] in __STORIES__)) {
                console.error("No Story Id found")
                route('librairy')
                return
            }
            storyId = options[0];

            story = __STORIES__[storyId]

            // Set title
            self.title = story._settings.title

            // Stop Text2Speech
            Text2Speech.stop()

            // Find the current position in the story
            if(options[1] == undefined || !(options[1] in story))
                pos = 'start'
            else
                pos = options[1]

            current = story[pos]

            // Render box
            boxes = content.getElementsByTagName('box')

            renderBox = function(i) {
                boxObj = boxes[i];

                boxObj.style.visibility = ""
                boxObj.getElementsByTagName('text')[0].innerText = ('short' in current.choices[i])?current.choices[i].short:current.choices[i].message
                boxObj.getElementsByTagName('background')[0].style.visibility = ""
                classNameAppend(boxObj,"clickable")
                
                boxObj.onclick = (function() {
                    route('play', this.storyId, this.pos)
                }).bind({storyId: storyId, pos: current.choices[i].next})
            }
                
            // Reset all
            for(i=0; i < boxes.length; i++) {
                boxObj = boxes[i];
                boxObj.style.visibility = "hidden"
                boxObj.getElementsByTagName('text')[0].innerText = ""
                boxObj.getElementsByTagName('background')[0].style.visibility = "hidden"
                classNameRemove(boxObj, "clickable")
                boxObj.onclick = undefined
            }

            // Stop speaking 
            document.getElementById('speaking').onclick = function() {
                Text2Speech.stop()

                document.getElementById('speaking').style.display = "none"

                if('choices' in current) {
                    for(i=0; i < boxes.length && i < current.choices.length; i++) {
                        renderBox(i);
                    }
                } else
                    route("end", storyId)    // End Story
            }

            // Show speaking icon
            document.getElementById('speaking').style.display = "";

            // Choice of the voice
            voice = story._settings.voice || 'UK English Female';
            if(current.voice != undefined)
                voice = current.voice;
            // TODO : Pitch
            
            // Say the text
            Text2Speech.speak(current.text, voice, { onEnd: function() {

                boxes = content.getElementsByTagName('box')

                showBox = function(i)
                {
                    if(i in current.choices)
                    {
                        // Say text for the answer
                        Text2Speech.speak(__LETTERS__[i]+'. '+current.choices[i].message, voice, { 

                            onStart: (function() {
                                // Show button
                                renderBox(this.i)
                            }).bind({i: i}),

                            onEnd: (function() {
                                // Next answer
                                showBox(this.i)
                            }).bind({i: i+1})

                        })
                    }
                    else
                    {
                        document.getElementById('speaking').style.display = "none"
                    }
                }

                if('choices' in current)
                    showBox(0)
                else
                    route("end", storyId)   // End Story

            }});
            

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
            Text2Speech.speak('Fin !', 'France Female')
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