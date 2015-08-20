Storage = function() {
    
    this.defaults = {
        filters: [],
        stories: {},
        activeRecognition: true,
    }
    
    this.set = function(key, value) {
        this.store[key] = value
        console.log("Storage.set", key, value)
        this.update();
    }

    this.get = function(key) {
        if(key in this.store) {
            console.log("Storage.get", key, this.store[key])
            return this.store[key]
        } else {
            console.log("Storage.get", key, this.defaults[key], "default")
            return this.defaults[key]
        }
    }

    this.update = function() {
        localStorage.setItem("settings",JSON.stringify(this.store))
    }

    this.read = function() {
        this.store = JSON.parse(localStorage.getItem("settings"))
        if(this.store == undefined)
            this.store = {}
    }

    this.read();
}
var Storage = new Storage();
