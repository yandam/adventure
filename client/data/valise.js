__STORIES__.valise = {
_settings: {
  title:"Faire sa valise, c'est compliqué...",
  author: "BeMyApp",
  synopsis: "Patrick est heureux. L’école est finie et, avec Papa et Maman, les vacances se préparent. La petite famille va prendre la voiture de maman et direction la mer.",
  icon: "",
  categories: ['enfance', 'aventure'],
  bg: 'valise2.JPG',
  price: 5.00,
  voices: {
    default: {lang: 'fr-FR', sex: 'female', pitch: 1.0 },    // Narateur
    mamie:   {lang: 'fr-FR', sex: 'female', pitch: 1.25},    // Mamie
    homme:   {lang: 'fr-FR', sex: 'male',   pitch: 1.0 },    // Homme
    garçon:  {lang: 'fr-FR', sex: 'male',   pitch: 1.5 },    // Jeune garçon
    peluche: {lang: 'fr-FR', sex: 'male',   pitch: 1.25},    // Peluche
  }
},
_state: {
  downloaded: true

},
start: {
  title: 'Dans la chambre de Patrick',
  text: [
    {             t: "Patrick est heureux. L’école est finie et, avec Papa et Maman, les vacances se préparent. La petite famille va prendre la voiture de maman et direction la mer."},
    {v: 'homme',  t: "Préparer les valises, c’est du boulot."},
    {             t: "Papa avait prévenu Patrick, avant d’ajouter"},
    {v: 'homme',  t: "tu es grand maintenant, tu vas faire ta valise tout seul, c’est d’accord ?"},
    {             t: "Heureux d’avoir la confiance de son père, Patrick avait tout de suite dit oui. Il était dans sa chambre, fier comme un roi devant son château"},
    {v: 'garçon', t: "Juste un tour de trottinette et je commence."},
    {             t: "avait pensé Patrick. Et, oubliant sa mission, il avait joué toute l’après-midi."},
    {v: 'garçon', t: "Oh non, je n’ai pas fait ma valise. Papa et Maman ne vont pas être content."},
    {             t: "En tant que peluche préféré de Patrick, tu as vu toute la scène. Que lui dis-tu ?"}
  ],
  show: 'Que lui dis-tu ?',

  choices: [
    {
      next: "1",
      text: [
        {v: 'peluche', t: "Tu vas te faire gronder, c’est bien fait pour toi !"}
      ],
      show: "Gronder"
    },{
      next: "2",
      text: [
        {v: 'peluche', t: "Ne t’en fais pas, Patrick, je vais t’aider !"}
      ],
      show: "Aider"
    },{
      next: "3",
      text: [
        {v: 'peluche', t: "Tellement de travail et si peu de temps… Comment vas-t-on faire ?"}
      ],
      show: "Comment faire ?"
    },{
      next: "4",
      text: [
        {v: 'peluche', t: "Ne t’en fais pas, Papa et Maman vont bien finir par le faire à ta place."}
      ],
      show: "Papa Maman"
    }
  ]
},
"1": {
  title: 'Dans la chambre de Patrick',
  text: [
    {             t: "Patrick n’en revient pas. Son doudou est toujours aussi méchant."},
    {v: 'garçon', t: "C’est pas que ma faute si j’ai pas regardé l’heure !"},
    {             t: "dit Patrick en soufflant."},
    {v: 'peluche',t: "Bien sur que c’est ta faute ! Tu savais que tu avais une mission, tu as préféré jouer. c’est normal que tu sois grondé et puni."},
    {             t: "lui réponds-tu."},
    {v: 'peluche',t: "Et arrête de faire ta tête de lard, ça sera encore pire si tu dis ça devant Papa ou Maman"},
    {v: 'garçon', t: "Tu as raison. Il faut que je me dépêche de faire ma valise."},
    {             t: "se dit Patrick. Il commence à faire une liste des habits qu’il aimerait bien prendre : "},
    {v: 'garçon', t: "En vacances, il faut : des shorts, des t-shirts, un ballon, une casquette ou un chapeau, des sandales et des chaussures. Et aussi des lunettes de soleil."}
  ],
  next: "5"
},
"2": {
  title: 'Dans la chambre de Patrick',
  text: [
    {v: 'garçon', t: "Oh merci, ma peluche préférée."},
    {             t: "Patrick prend la peluche dans ses bras et commence-t-a lui faire un câlin."},
    {v: 'garçon', t: "Et si, je faisais juste un autre tour de trottinette ? J’ai le temps, maintenant que je sais que tu vas m’aider"},
    {v: 'peluche',t: "Patrick, c’est non. Tu dois ranger tes affaires. La mission que t’a donnée ton Papa est très importante, il compte sur toi."},
    {             t: "lui signale la peluche."},
    {v: 'garçon', t: "Tu as raison. Il faut que je me dépêche de faire ma valise."},
    {             t: "se dit Patrick. Il commence à faire une liste des habits qu’il aimerait bien prendre : "},
    {v: 'garçon', t: "En vacances, il faut : des shorts, des t-shirts, un ballon, une casquette ou un chapeau, des sandales et des chaussures. Et aussi des lunettes de soleil."}
  ],
  next: "5"
},
"3": {
  title: 'Dans la chambre de Patrick',
  text: [
    {v: 'garçon', t: "Pas de souci, doudou, je m’occupe de tout."},
    {             t: "répond Patrick, "},
    {v: 'garçon', t: "Mais je ne sais pas par où commencer"},
    {             t: "D’un doigt hésitant, tu lui montres le tas de jouet : "},
    {v: 'peluche',t: "Et si, on commençait par là ?"},
    {             t: "Et le petit garçon commence à ranger, un cube par ci, une voiture par là. Il ne ménage pas ces efforts, pour rassurer sa gentille peluche."},
    {v: 'peluche', t: "C’est bien Patrick, mais c’est loin d’être fini, il faut faire la valise maintenant"},
    {v: 'garçon', t: "Tu as raison. Il faut que je me dépêche de faire ma valise."},
    {             t: "se dit Patrick. Il commence à faire une liste des habits qu’il aimerait bien prendre : "},
    {v: 'garçon', t: "En vacances, il faut : des shorts, des t-shirts, un ballon, une casquette ou un chapeau, des sandales et des chaussures. Et aussi des lunettes de soleil."}
  ],
  next: "5"
},
"4": {
  title: 'Dans la chambre de Patrick',
  text: [
    {v: 'garçon', t: "Mais c’est ma mission !"},
    {             t: "crie un Patrick en colère."},
    {v: 'garçon', t: "C’est pas à eux de faire mon sac. Je suis grand, c’est à moi de le faire."},
    {             t: "Patrick se retourne dans sa chambre et commence à rassembler ses affaires"},
    {v: 'garçon', t: "Tu as raison. Il faut que je me dépêche de faire ma valise."},
    {             t: "se dit Patrick. Il commence à faire une liste des habits qu’il aimerait bien prendre : "},
    {v: 'garçon', t: "En vacances, il faut : des shorts, des t-shirts, un ballon, une casquette ou un chapeau, des sandales et des chaussures. Et aussi des lunettes de soleil."}
  ],
  next: "5"
},
"5": {
  title: 'Dans la chambre de Patrick',
  text: [
    {             t: "Patrick se retourne et lève les yeux au ciel."},
    {v: 'garçon', t: "Mais où sont mes lunettes de soleil ? Je ne les retrouve pas. Elles sont perdues, je crois"},
    {             t: "Vous commencez à chercher partout dans la pièce, sous les matelas, dans les placards, les tiroirs, dans les poches de pantalon et les cachettes à bonbon. Impossible de mettre la mains sur les lunettes.  Mais comment partir en vacances sans lunettes ? Ce sont de belles lunettes de soleil, les mêmes que celle  d’un agent secret. Le pauvre Patrick a l’air si triste. Sûr de toi, tu regardes Patrick et lui dit : "},
    {v: 'peluche',t: "Laisse-faire l’inspecteur Peluche"},
    {             t: "avant d’ajouter :"},
  ],
  show: 'Où vas-tu ?',

  choices: [
    {
      next: "salon1",
      text: [
        {v: 'peluche', t: "Allons dans le salon pour y mener l’enquête"}
      ],
      show: "Salon"
    },{
      next: "chambreSoeur1",
      text: [
        {v: 'peluche', t: "Vite, les lunettes sont peut-être dans la chambre de Jena, ta petite soeur"}
      ],
      show: "Chambre de ta soeur"
    },{
      next: "jardin1",
      text: [
        {v: 'peluche', t: "Fouillons le jardin !"}
      ],
      show: "Jardin"
    },{
      next: "garage1",
      text: [
        {v: 'peluche', t: "Et si la solution était dans le garage ?"}
      ],
      show: "Garage"
    }
  ]
},
"salon1": {
  title: 'Dans le salon',
  text: [
    {             t: "Arrivé dans le salon, Patrick cherche ses lunettes partout. Derrière le canapé, sous les fauteuils, sur la table basse. Il regarde près du bureau de papa, et dans le meuble   Aucunes traces des lunettes de soleil.                     Il soulève même le tapis et regarde en dessous. Pas de traces des lunettes. C’est à ce moment que mamie sortit de la cuisine et,                     lorsqu’elle vu Patrick, elle lui proposa de manger un goûter. Patrick ne pouvait pas dire non à mamie mais il avait des choses à faire.                     Que fais-tu ?"}
  ],
  show: 'Que fais-tu ?',

  choices: [
    {
      next: "salon2",
      text: [
        {t: "Tu laisses Patrick avec Mamie."}
      ],
      show: "Laisser Patrick"
    },{
      next: "salon3",
      text: [
        {t: "Tu fais diversion pour que Patrick puisse te rejoindre. "}
      ],
      show: "Faire diversion"
    }
  ]
},
"salon2": {
  title: 'Dans le salon',
  text: [
    {             t: "Mamie, comme toujours, prépare un bon goûter : des pains aux chocolats, un verre de lait et du jus de pommes. Patrick adore goûter avec Mamie. "},
    {v: 'garçon', t: "Dis Mamie, tu n’aurais pas vu mes lunettes de soleil, s’il-te-plaît ?"},
    {v: 'mamie',  t: "Je savais bien que tu cherchais quelque chose, j’ai entendu le bruit que tu fais"},
    {             t: "répond-elle."},
    {v: 'mamie',  t: "Malheureusement, je n’ai pas vu tes lunettes,  veux-tu que je t’aide à les chercher ?"},
    {             t: "Patrick peut toujours compter sur Mamie. Les recherches reprennent de plus belle. Toujours pas de traces des  lunettes, cela devient désespérant. Patrick sent que Mamie se fatigue : "},
    {v: 'garçon', t: "Il faut te reposer, grand-mère !  Je vais continuer mes recherches avec l’inspecteur Peluche."},
    {             t: "Quel est la prochaine direction ?"}
  ],
  show: 'Quel est la prochaine direction ?',

  choices: [
    {
      next: "chambreSoeur1",
      text: [
        {t: "La chambre de la petite soeur"}
      ],
      show: "Chambre de la soeur"
    },{
      next: "jardin1",
      text: [
        {t: "Le jardin"}
      ],
      show: "Jardin"
    },{
      next: "garage1",
      text: [
        {t: "Le garage"}
      ],
      show: "Garage"
    }
  ]
},
"salon3": {
  title: 'Dans le salon',
  text: [
    {             t: "Caché derrière le canapé, tu commences à imiter le bruit du téléphone.  Mamie s’énerve et essaye de trouver le combiné."},
    {v: 'mamie',  t: "Où est ce sacré combiné ? J’étais pourtant sur qu’il était là"},
    {             t: "Heureusement que tu l’as caché avant de commencer à détourner l’attention. Mamie cherche partout le combiné.  Patrick en profite pour s’éclipser en direction  :"}
  ],
  show: 'Quelle direction ?',

  choices: [
    {
      next: "chambreSoeur1",
      text: [
        {t: "De la chambre de la petite soeur"}
      ],
      show: "Chambre de la soeur"
    },{
      next: "jardin1",
      text: [
        {t: "du jardin"}
      ],
      show: "Jardin"
    },{
      next: "garage1",
      text: [
        {t: "du garage"}
      ],
      show: "Garage"
    }
  ]
},
"chambreSoeur1": {
  title: 'Dans la chambre de la petite soeur',
  text: [
    {             t: "Patrick n’aime pas trop aller dans la chambre de sa petite sœur.  Parce qu’il n’aime pas trop qu’elle vienne dans la sienne. Il avance à pas de loups  dans la petite chambre aux murs roses. Parfois, c’est vrai que sa petite sœur lui prend ses affaires,  Papa et Maman lui ont expliqué que c’est bien de partager. Patrick, lui, ça ne le dérange pas,  sauf quand sa petite sœur perd ses affaires. La fouille commence, minutieusement,  Patrick dérange et repose chaque jouet. C’est dans le château de poupée qu’il trouve un indice, un peu de terre.  On dirait la même que celle du jardin. "}
  ],
  show: 'Quelle direction ?',

  choices: [
    {
      next: "jardin1",
      text: [
        {voice: 'peluche', t: "C’est là qu’il faut aller, c’est sur !"}
      ],
      show: "Jardin"
    },{
      next: "garage1",
      text: [
        {voice: 'peluche', t: "Allons d’abord vérifier le garage"}
      ],
      show: "Garage"
    }
  ]
},
"jardin1": {
  title: 'Dans la jardin',
  text: [
    {             t: "Dans le jardin, il y a Diamant, le chien de papa. Diamant est un gentil toutou,  qui aime courir partout, toujours prêt à faire des bêtises. Patrick aime beaucoup Diamant,  avec ses grandes oreilles, ses poils longs et blancs et son long museau.  Lorsqu’il vous voit,  il se met à tirer la langue et à aboyer de joie. Patrick prend une petite balle qui traîne et la  jette le plus loin possible. Diamant la ramène, la dépose à vos pieds et tire la langue. "},
    {v: 'garçon', t: "Diamant, nous cherchons mes lunettes de soleil, les as-tu vu ? j’ai trouvé de la terre dans la  chambre de ma sœur, peut-être les as-t-elle pris et caché ici ?"},
    {             t: "Diamant, du mufle indique un petit coin du jardin, près de la  balançoire."},
    {v: 'garçon', t: "Tu vois, Doudou, ma sœur adore cette balançoire. nous devrions chercher autour"},
    {             t: "Vous commencez à chercher les lunettes. Et, vous les trouvez enfin, posé sous la balançoire.  Jena a du les prendre et les oublier ici. Soulagé, Patrick peut retourner faire son sac."}
  ]
}
,
"garage1": {
  title: 'Dans le garage',
  text: [
    {             t: "Dans le garage, il fait tout noir. Papa et Maman ont déjà sorti la voiture devant la maison. Il n’y a rien du tout ici."},
  ],
  show: 'Quelle direction ?',
  choices: [
    {
      next: "chambreSoeur1",
      text: [
        {t: "Continuer vers la chambre de la petite soeur"}
      ],
      show: "Chambre de la soeur"
    },{
      next: "jardin1",
      text: [
        {t: "Aller vers le jardin"}
      ],
      show: "Jardin"
    },{
      next: "salon1",
      text: [
        {t: "Aller en direction du salon"}
      ],
      show: "Salon"
    }
  ]
}


}