__STORY__ = {
  start: {
      text:'Welcome home Damien',
      choices: [
        {next:2, message:'It feels home'},
        {next:3, message:'Like a new'},
        {next:4, message:'Adventure ?'}
      ]
  },
  2: {
    text:'Keep doing it!',
    choices: [
        {next:2, message:'Here again'},
        {next:3, message:'What the hell'},
        {next:4, message:'Here is your piqure'}
      ]
  },
  3: {
    text:'LOOOOL',
    choices: [
        {next:2, message:'What else ?'},
      ]
  },
  4: {
    text:'LOOOOL',
    choices: [
        {next:"start", message:'MDR'},
      ]
  }
}