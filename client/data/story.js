__STORIES__ = {
  'camille':{
    _settings: {
      title:"Camille",
      voice:"French Female",
      icon: "🐙"
    },
    start: {
        text:'Salut camille, yo!',
        choices: [
          {next:2, message:"Oui?"},
          {next:2, message:"Euuh.."},
          {next:2, message:"C'est moi!"}
        ]
    },
    2: {
      text:"Mais attend, c'est qui ton ennemi juré ?",
      choices: [
          {next:4, message:'Melon, ce pianotateur'},
          {next:3, message:'Carotte, cette pianiste'},
          {next:3, message:'AHAHAHAHAHAH'}
        ]
    },
    3: {
      text:"Et ben c'est fini! Voila!",
      choices: [
          {next:"start", message:'Je veux re-essayer!'},
        ]
    },
    4: {
      text:"Mwahahahahahah!",
      choices: [
          {next:3, message:'Quoi ? Que va tu faire ?'},
        ]
    },
  },
  'tea':{
    _settings: {
      title:"Tea time",
      voice:"UK English Male",
      icon: "🍵"
    },
    'start':{
        text:'Do you want some tea with your madeleine ?',
        choices: [
          {next:2, message:"Yes, sir!"},
          {next:2, message:"Do you have coffee ?"},
        ]
    },
    2:{
        text:'And what else ?',
        choices: [
          {next:'start', message:"Some cookies"},
          {next:'start', message:"Biscuits!"},
        ]
    },
  },
  'quizz':{
    _settings: {
      title:"Quizz",
      voice:"UK English Male",
      icon: "🐼"
    },
    'start':{
        text:"What's the real name of Woody Allen ?",
        choices: [
          {next:2, message:"Allen Stewart Konigsberg"},
          {next:"wrong", message:"Emmanual Goldenburg"},
          {next:"wrong", message:"Issur Danielovitch"},
          {next:"wrong", message:"Woody woodpecker"},
        ]
    },
    'wrong':{
      text:"wooops, wrong answer!",
      voice:"UK English Female",
      choices: [],
    },
    2:{
      text:
      "Nice! Creating computer software is always a demanding and painstaking"
      +" process -- an exercise in logic, clear expression, and almost fanatical"
      +" attention to detail.  It requires intelligence, dedication, and an"
      +" enormous amount of hard work.  But, a certain amount of unpredictable"
      +" and often unrepeatable inspiration is what usually makes the difference"
      +" between adequacy and excellence.",
      choices: [],
    }
  },
}