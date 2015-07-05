__STORIES__ = {
  'camille':{
    _settings: {
      title:"Camille",
      vocie:"French Female"
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
      voice:"UK English Male"
    },
    'start':{
        text:'Do you want some tea with your madeleine ?',
        voice:'UK English Male',
        choices: [
          {next:2, message:"Yes, sir!"},
          {next:2, message:"Do you have coffee ?"},
        ]
    },
    2:{
        text:'And what else ?',
        voice:'UK English Male',
        choices: [
          {next:1, message:"Some cookies"},
          {next:1, message:"Biscuits!"},
        ]
    }
  }
}