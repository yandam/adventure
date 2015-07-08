var StoryChoice = React.createClass({
    addStory: function(){
        var key = 'new_story_1';
        __STORIES__[key] = {
            '_settings': {
                'title':'New story #1',
            },
            'start': {
                text:'Hello world!',
                choices: [
                  {next:2, message:"Hi man!"},
                  {next:2, message:"What's up bro ?"},
                ]
            },
        };
        changeURL('editor/'+key)
    },
    render:function(){
        var lis = Object.keys(this.props.stories).sort().map(function(story_key){
            var story = this.props.stories[story_key];
            return (<li key={story_key}>
                <a onClick={function(){changeURL('editor/'+story_key)}}>
                {story._settings.title}
                </a></li>)
        }.bind(this))
        var add = (<a onClick={this.addStory}>+ Add new one</a>)
        return (<ul>
            {lis}
            <li>{add}</li>
        </ul>)
        }
})

var StoryEdit = React.createClass({
    addStep: function(){
        var key = 'new_step_1';
        this.props.story[key] = 
        {
            text:'A new step',
            choices: [
              {next:2, message:"Go to step 2"},
              {next:3, message:"Go to step 3"},
            ]
        };
        changeURL('editor/'+key)
    },
    render:function(){
        var story = this.props.story;
        var json = <pre>{JSON.stringify(story,null,2)}</pre>;
        var steps = Object.keys(story).map(function(key){
            if(key != "_settings"){
                var step = story[key];
                console.log(key,step)
                var choices = step.choices.map(function(choice,i){
                    return (<li key={i}>{choice.message} =&gt; {choice.next}</li>)
                })
                return (<div style={
                        {border:"1px solid black",padding:10,margin:10}
                        } key={key}>
                        <h3>{key}</h3>
                        <p>{step.text}</p>
                        <ol>{choices}</ol>
                    </div>)
            }
        }.bind(this))
        steps.push(<a onClick={this.addStep}>+ Add step</a>)
        return (<div>
            <h2>{story._settings.title}</h2>
            {steps}
        </div>)
    }
})

var Editor = React.createClass({
  render: function(){
    var stories = this.props.stories;
    var route = this.props.route;
    var view = <StoryChoice stories={stories}/>
    if(route.length > 1){
        var story = stories[route[1]];
        view = <StoryEdit story={story} />
    }
    return (<div style={{margin:'auto','maxWidth':800}}>
        <h1 onClick={changeURL.bind(null,'editor')}>Editor</h1>
        <hr/>
        {view}
    </div>)
  }
})