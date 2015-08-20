__STORIES__ = {
  'camille':{
    _settings: {
      title:"Camille",
      icon: "🐙",
      categories: ['aventure', 'sf'],
      bg: 'camille.jpg',
      voices: {
        default: {lang: 'fr-FR', sex: 'female', pitch: 1.0 },    // Narateur
      }
    },
    _state: {
      downloaded: false
    },
    start: {
        text: 'Salut camille, yo!',
        choices: [
          {next:2, message:"Oui?"},
          {next:2, message:"Euh",short:"Euuh..."},
          {next:2, message:"C'est moi!"}
        ]
    },
    2: {
      text:"Mais attend, c'est qui ton ennemi juré ?",
      choices: [
          {next:4, message:'Melon, ce pianotateur'},
          {next:3, message:'Carotte, cette pianiste'},
          {next:3, message:'AH AH AH AH AH',short:"AHAHAHAHAHAH"}
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
      icon: "🍵",
      categories: ['enfance'],
      synopsis: 'Histoire autour du thé.',
      bg: 'tea.jpg',
      voices: {
        default: {lang: 'en-US', sex: 'female', pitch: 1.0 },    // Narateur
      }
    },
    _state: {
      downloaded: true
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
      icon: "🐼",
      categories: ['polar'],
      bg: 'quizz.jpg',
      price: 2,
      voices: {
        default: {lang: 'en-UK', sex: 'male', pitch: 1.0 },    // Narateur
      }
    },
    _state: {
      downloaded: false
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
    },
    2:{
      text:
      "Nice! Creating computer software is always a demanding and painstaking"
      +" process -- an exercise in logic, clear expression, and almost fanatical"
      +" attention to detail.  It requires intelligence, dedication, and an"
      +" enormous amount of hard work.  But, a certain amount of unpredictable"
      +" and often unrepeatable inspiration is what usually makes the difference"
      +" between adequacy and excellence."
    }
  },
}