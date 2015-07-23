__STORIES__.example = {
    _settings: {
      title:"Crown of Despesia",
      icon: "K",
      categories: ['aventure', 'moyen-age']
    },
    start: {
        short: "What do you do?",
        text:'Your majesty, your people are starving in the streets, '
        +' and threaten revolution.Our enemies to the west are weak, '
        +' but they threaten soon to invade.  What will you do?',
        choices: [
          {
            next:"war",
            message:"Make pre-emptive war on the western lands.",
            short:"War",
          },{
            next:"trade",
            message:"Beat swords to plowshares and trade food to the westerners for protection.",
            short:"Trade",
          },{
            next:"abdicate",
            message:"Abdicate the throne. I have clearly mismanaged this kingdom!",
            short:"Abdicate",
          },
        ]
    },
    abdicate:{
        text:"The kingdom descends into chaos, but you manage to escape with your own hide."
        +" Perhaps in time you can return to restore order to this fair land.",
        choices:[],
    },
    war:{
        short:'How will you win the war?',
        text:
            "If you can seize their territory, your kingdom will flourish.  But your army's"
            + " morale is low and the kingdom's armory is empty.  How will you win the war?'",
        choices: [
          {
            next:"slavery",
            message:"Drive the peasants like slaves; if we work hard enough, we'll win.",
            short:"Slavery",
          },{
            next:"knights",
            message:"Appoint charismatic knights and give them land, peasants, and resources.",
            short:"Knights",
          },{
            next:"steal",
            message:"Steal food and weapons from the enemy in the dead of night.",
            short:"Steal",
          },
        ]
    },
    slavery:{
        text:
            "Unfortunately, morale doesn't work like that.  Your army soon turns against you"
          +" and the kingdom falls to the western barbarians.",
    },
    knights:{
        text:
            "Your majesty's people are eminently resourceful.  Your knights win the day,"
        +" but take care: they may soon demand a convention of parliament.",
    },
    steal:{
        text:
            "A cunning plan.  Soon your army is a match for the westerners; they choose"
          +"not to invade for now, but how long can your majesty postpone the inevitable?",
    },
    trade:{
        text:"The westerners have you at the point of a sword.  They demand unfair terms from you.",
        choices: [
          {
            next:"accept",
            message:"Accept the terms for now.",
            short:"Accept",
          },{
            next:"threaten",
            message:"Threaten to salt our fields if they don't offer better terms.",
            short:"Threaten",
          },
        ]
    },
    accept:{
        text:"Eventually, the barbarian westerners conquer you anyway, destroying their"
          +" bread basket, and the entire region starves.",
    },
    threaten:{
        text:"They blink.  Your majesty gets a fair price for wheat.",
    }
}