__STORY__ = {
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
}